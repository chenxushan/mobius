import Fuse from 'fuse.js';

/* --------------------------------------------
 * Menu
 * ------------------------------------------ */
function initMenu() {
  const menuOpenIcon = document.querySelector(".icon__menu");
  const menuCloseIcon = document.querySelector(".nav__icon-close");
  const menuList = document.querySelector(".main-nav");

  menuOpenIcon?.addEventListener("click", () => {
    menuList?.classList.add("is-open");
  });

  menuCloseIcon?.addEventListener("click", () => {
    menuList?.classList.remove("is-open");
  });
}

/* --------------------------------------------
 * Theme Switcher
 * ------------------------------------------ */
function themeToggle() {
  const toggle = document.querySelector('.toggle-theme');
  if (!toggle) return;

  toggle.replaceWith(toggle.cloneNode(true));
  const newToggle = document.querySelector('.toggle-theme');

  newToggle?.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark-mode');

    if (isDark) {
      html.classList.remove('dark-mode');
      html.classList.add('light-mode');
      html.removeAttribute("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
      html.setAttribute("dark", "");
      localStorage.setItem("theme", "dark");
    }
  });
}

/* --------------------------------------------
 * Search
 * ------------------------------------------ */
async function initSearch() {
  const searchOpenIcon = document.querySelector(".icon__search");
  const searchCloseIcon = document.querySelector(".search__close");
  const searchInput = document.getElementById('js-search-input') as HTMLInputElement;
  const resultsContainer = document.getElementById('js-results-container');
  const searchOverlay = document.querySelector(".search");

  if (!searchInput || !resultsContainer) return;

  searchOpenIcon?.addEventListener("click", () => {
    searchOverlay?.classList.add("is-visible");
    setTimeout(() => searchInput?.focus(), 300);
  });

  searchCloseIcon?.addEventListener("click", () => {
    searchOverlay?.classList.remove("is-visible");
    searchInput.value = '';
    resultsContainer.innerHTML = '';
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchOverlay?.classList.remove("is-visible");
      searchInput.value = '';
      resultsContainer.innerHTML = '';
    }
  });

  const response = await fetch('/search.json');
  const searchData = await response.json();

  const fuse = new Fuse(searchData, {
    keys: [
      { name: 'title', weight: 1.0 },
      { name: 'description', weight: 0.5 },
      { name: 'content', weight: 0.2 },
    ],
    threshold: 0.15,
    ignoreLocation: true,
  });

  searchInput.addEventListener('input', () => {
    const results = fuse.search(searchInput.value);
    resultsContainer.innerHTML = '';

    if (results.length === 0 && searchInput.value) {
      resultsContainer.innerHTML = '<h3 class="no-results">No results found</h3>';
      return;
    }

    results.slice(0, 9).forEach(({ item }: any) => {
      const date = new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      resultsContainer.innerHTML += `
        <div class="article col col-4 col-d-6 col-t-12 animate">
          <div class="article__inner">
            <div class="article__head">
              <div class="article__date">
                <time datetime="${item.pubDate}">${date}</time>
              </div>
              ${item.image ? `
                <a class="article__image" href="${item.url}">
                  <img loading="lazy" src="${item.image}" alt="${item.title}">
                </a>
              ` : ''}
            </div>
            <div class="article__content">
              <h2 class="article__title">
                <a href="${item.url}">${item.title}</a>
              </h2>
              <p class="article__excerpt">${item.description || ''}</p>
            </div>
          </div>
        </div>
      `;
    });
  });
}

/* --------------------------------------------
 * Zoom Image (Custom Implementation)
 * ------------------------------------------ */
let overlay: HTMLDivElement | null = null;
let zoomHandlers: Array<() => void> = [];

export function cleanupZoom() {
  zoomHandlers.forEach((cleanup) => cleanup());
  zoomHandlers = [];
  if (overlay && overlay.parentNode) overlay.remove();
  overlay = null;
  document.body.classList.remove("is-zoom-locked");
}

function setupNewImagesForZoom() {
  if (!overlay) return;

  const images = document.querySelectorAll<HTMLImageElement>(
    ".post__content img:not(.zoom-target), .page__content img:not(.zoom-target), .gallery__image img:not(.zoom-target)"
  );

  images.forEach((img) => {
    if (img.closest("a")) return;
    if (overlay) {
      const cleanup = setupZoomableImage(img, overlay);
      zoomHandlers.push(cleanup);
    }
  });
}

function initZoomImage() {
  cleanupZoom();

  overlay = document.createElement("div");
  overlay.className = "zoom-overlay";
  document.body.appendChild(overlay);

  setupNewImagesForZoom();
}

function setupZoomableImage(image: HTMLImageElement, overlayElement: HTMLDivElement) {
  let isZoomedIn = false;
  image.classList.add("zoom-target");

  const zoomOut = () => {
    if (!isZoomedIn) return;
    isZoomedIn = false;
    image.style.transform = "";
    overlayElement.classList.remove("is-active");
  };

  const zoomIn = () => {
    const rect = image.getBoundingClientRect();
    const padding = 30;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;
    const availW = viewportWidth - padding * 2;
    const availH = viewportHeight - padding * 2;
    const maxScale = naturalWidth / image.clientWidth;
    const imgRatio = naturalWidth / naturalHeight;
    const viewRatio = availW / availH;

    let scale;
    if (naturalWidth < availW && naturalHeight < availH) {
      scale = maxScale;
    } else if (imgRatio < viewRatio) {
      scale = (availH / naturalHeight) * maxScale;
    } else {
      scale = (availW / naturalWidth) * maxScale;
    }

    const newW = image.clientWidth * scale;
    const newH = image.clientHeight * scale;
    const x = (viewportWidth - newW) / 2 - rect.left;
    const y = (viewportHeight - newH) / 2 - rect.top;

    image.classList.add("is-zoomed");
    image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    overlayElement.classList.add("is-active");
    isZoomedIn = true;
  };

  const handleImageClick = (e: Event) => {
    e.stopPropagation();
    isZoomedIn ? zoomOut() : zoomIn();
  };

  const handleOverlayClick = () => zoomOut();
  const handleScroll = () => zoomOut();
  const handleTransitionEnd = () => {
    if (!isZoomedIn) image.classList.remove("is-zoomed");
  };

  image.style.transformOrigin = "left top";
  image.addEventListener("click", handleImageClick);
  overlayElement.addEventListener("click", handleOverlayClick);
  window.addEventListener("scroll", handleScroll, { passive: true });
  image.addEventListener("transitionend", handleTransitionEnd);

  return () => {
    image.removeEventListener("click", handleImageClick);
    overlayElement.removeEventListener("click", handleOverlayClick);
    window.removeEventListener("scroll", handleScroll);
    image.removeEventListener("transitionend", handleTransitionEnd);
    image.classList.remove("zoom-target", "is-zoomed");
    image.style.transform = "";
  };
}

/* --------------------------------------------
 * Copy code blocks
 * ------------------------------------------ */
function initCopyCode() {
  const codeBlocks = document.querySelectorAll<HTMLElement>('.post__content pre, .page__content pre');

  codeBlocks.forEach((pre) => {
    if (pre.querySelector('.copy-code-button')) return;

    const button = document.createElement('button');
    const copyText = 'Copy';
    button.type = 'button';
    button.className = 'copy-code-button';
    button.ariaLabel = 'Copy code to clipboard';
    button.innerText = copyText;

    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.innerText.trimEnd() || '';
      try {
        await navigator.clipboard.writeText(code);
        button.innerText = 'Copied!';
        setTimeout(() => {
          button.blur();
          button.innerText = copyText;
        }, 2000);
      } catch (err) {
        console.error('Copy failed', err);
      }
    });

    pre.style.position = 'relative';
    pre.appendChild(button);
  });
}

/* --------------------------------------------
 * Back to Top
 * ------------------------------------------ */
function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.replaceWith(backToTop.cloneNode(true));
    const newBackToTop = document.getElementById('back-to-top');

    newBackToTop?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* --------------------------------------------
 * App init
 * ------------------------------------------ */
export function initApp() {
  initMenu();
  themeToggle();
  initSearch();
  initZoomImage();
  initCopyCode();
  initBackToTop();
}

initApp();

document.addEventListener('astro:page-load', initApp);