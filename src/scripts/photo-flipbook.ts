type PageFlipInstance = {
  getPageCount: () => number;
  loadFromHTML: (pages: NodeListOf<Element>) => void;
  flipPrev: (corner?: string) => void;
  flipNext: (corner?: string) => void;
  turnToPage: (page: number) => void;
  on: (event: string, callback: (event: { data: any }) => void) => void;
};

type PageFlipConstructor = new (element: Element, settings: Record<string, unknown>) => PageFlipInstance;

declare global {
  interface Window {
    St?: { PageFlip: PageFlipConstructor };
  }
}

let pageFlipRuntimePromise: Promise<PageFlipConstructor> | undefined;

function loadPageFlipRuntime(): Promise<PageFlipConstructor> {
  if (window.St?.PageFlip) return Promise.resolve(window.St.PageFlip);
  if (pageFlipRuntimePromise) return pageFlipRuntimePromise;

  pageFlipRuntimePromise = new Promise((resolve, reject) => {
    document.getElementById('photo-flipbook-runtime')?.remove();

    const script = document.createElement('script');
    script.id = 'photo-flipbook-runtime';
    script.src = '/vendor/photo-flipbook/page-flip.browser.js';
    script.async = true;
    script.addEventListener('load', () => {
      if (window.St?.PageFlip) resolve(window.St.PageFlip);
      else reject(new Error('PageFlip runtime loaded without exposing St.PageFlip.'));
    }, { once: true });
    script.addEventListener('error', () => {
      reject(new Error('Unable to load the PageFlip runtime.'));
    }, { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    pageFlipRuntimePromise = undefined;
    throw error;
  });

  return pageFlipRuntimePromise;
}

function afterVisibleLayout(root: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    let attempts = 0;

    const check = () => {
      attempts += 1;
      const rig = root.querySelector<HTMLElement>('.photo-flipbook__rig');
      const hasLayout = root.isConnected && root.getBoundingClientRect().width > 0 &&
        Boolean(rig && rig.getBoundingClientRect().height > 0);

      if (hasLayout || attempts >= 30) resolve();
      else requestAnimationFrame(check);
    };

    requestAnimationFrame(() => requestAnimationFrame(check));
  });
}

async function initializePhotoFlipbooks() {
  try {
    await loadPageFlipRuntime();
  } catch (error) {
    console.error(error);
    return;
  }

  const roots = document.querySelectorAll<HTMLElement>('.photo-flipbook:not([data-ready]):not([data-initializing])');

  await Promise.all(Array.from(roots, async (root) => {
    root.dataset.initializing = 'true';
    await afterVisibleLayout(root);

    if (!root.isConnected || root.dataset.ready === 'true') {
      delete root.dataset.initializing;
      return;
    }

    const bookElement = root.querySelector<HTMLElement>('.photo-flipbook__book');
    const previousButton = root.querySelector<HTMLButtonElement>('.photo-flipbook__previous');
    const nextButton = root.querySelector<HTMLButtonElement>('.photo-flipbook__next');
    const pageStatus = root.querySelector<HTMLElement>('.photo-flipbook__page-status');
    const orientationStatus = root.querySelector<HTMLElement>('.photo-flipbook__orientation');

    if (!bookElement || !previousButton || !nextButton || !pageStatus || !orientationStatus) {
      delete root.dataset.initializing;
      return;
    }

    const pages = bookElement.querySelectorAll('.book-page');
    const pageWidth = Number(bookElement.dataset.pageWidth) || 360;
    const pageHeight = Number(bookElement.dataset.pageHeight) || 640;
    const pageFlip = new window.St!.PageFlip(bookElement, {
      width: pageWidth,
      height: pageHeight,
      size: 'stretch',
      minWidth: Math.max(1, Math.round(pageWidth * 0.56)),
      maxWidth: Math.max(1, Math.round(pageWidth * 1.04)),
      minHeight: Math.max(1, Math.round(pageHeight * 0.56)),
      maxHeight: Math.max(1, Math.round(pageHeight * 1.04)),
      drawShadow: true,
      flippingTime: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 180 : 760,
      usePortrait: true,
      startZIndex: 10,
      autoSize: true,
      maxShadowOpacity: 0.42,
      showCover: true,
      mobileScrollSupport: false,
      clickEventForward: true,
      useMouseEvents: true,
      swipeDistance: 24,
      showPageCorners: true,
      disableFlipByClick: false,
    });

    let currentPage = 0;
    let isTurning = false;

    const updateControls = () => {
      const pageCount = pageFlip.getPageCount();
      const lastPage = pageCount - 1;
      previousButton.disabled = currentPage === 0 || isTurning;
      nextButton.disabled = currentPage === lastPage || isTurning;

      if (currentPage === 0) pageStatus.textContent = '封面';
      else if (currentPage === lastPage) pageStatus.textContent = '封底';
      else pageStatus.textContent = `${String(currentPage).padStart(2, '0')} / ${String(pageCount - 2).padStart(2, '0')}`;
    };

    pageFlip.on('flip', (event) => {
      currentPage = Number(event.data);
      updateControls();
    });

    pageFlip.on('changeState', (event) => {
      isTurning = event.data !== 'read';
      updateControls();
    });

    const updateOrientation = (orientation: string) => {
      orientationStatus.textContent = orientation === 'portrait' ? '单页浏览' : '双页展开';
    };

    pageFlip.on('init', (event) => updateOrientation(event.data.mode));
    pageFlip.on('changeOrientation', (event) => updateOrientation(event.data));
    pageFlip.loadFromHTML(pages);
    root.dataset.ready = 'true';
    delete root.dataset.initializing;
    updateControls();

    previousButton.addEventListener('click', () => {
      if (!isTurning) pageFlip.flipPrev('bottom');
    });

    nextButton.addEventListener('click', () => {
      if (!isTurning) pageFlip.flipNext('bottom');
    });

    const handleKeyboardNavigation = (event: KeyboardEvent) => {
      if (!root.isConnected) {
        window.removeEventListener('keydown', handleKeyboardNavigation);
        return;
      }

      const target = event.target;
      const isTyping = target instanceof HTMLElement && (
        target.matches('input, textarea, select') || target.isContentEditable
      );
      const isInteractive = target instanceof Element && Boolean(target.closest('button, a'));

      if (isTyping || event.altKey || event.ctrlKey || event.metaKey || isTurning) return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        pageFlip.flipPrev('bottom');
      }
      if (event.key === 'ArrowRight' || (event.key === ' ' && !isInteractive)) {
        event.preventDefault();
        pageFlip.flipNext('bottom');
      }
      if (event.key === 'Home') pageFlip.turnToPage(0);
      if (event.key === 'End') pageFlip.turnToPage(pageFlip.getPageCount() - 1);
    };

    window.addEventListener('keydown', handleKeyboardNavigation);
    document.addEventListener('astro:before-swap', () => {
      window.removeEventListener('keydown', handleKeyboardNavigation);
    }, { once: true });
  }));
}

function schedulePhotoFlipbookInitialization() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => void initializePhotoFlipbooks());
  });
}

document.addEventListener('astro:page-load', schedulePhotoFlipbookInitialization);

if (document.readyState === 'complete') schedulePhotoFlipbookInitialization();
