let overlay: HTMLDivElement | null = null;
let zoomHandlers: Array<() => void> = [];

export function cleanupZoom() {
  zoomHandlers.forEach((cleanup) => cleanup());
  zoomHandlers = [];
  if (overlay && overlay.parentNode) overlay.remove();
  overlay = null;
  document.body.classList.remove('is-zoom-locked');
}

function setupNewImagesForZoom() {
  if (!overlay) return;

  const images = document.querySelectorAll<HTMLImageElement>(
    '.post__content img:not(.zoom-target), .page__content img:not(.zoom-target), .gallery__image img:not(.zoom-target)'
  );

  images.forEach((img) => {
    if (img.closest('a')) return;
    if (!overlay) return;
    const cleanup = setupZoomableImage(img, overlay);
    zoomHandlers.push(cleanup);
  });
}

function setupZoomableImage(image: HTMLImageElement, overlayElement: HTMLDivElement) {
  let isZoomedIn = false;
  image.classList.add('zoom-target');

  const zoomOut = () => {
    if (!isZoomedIn) return;
    isZoomedIn = false;
    image.style.transform = '';
    overlayElement.classList.remove('is-active');
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

    image.classList.add('is-zoomed');
    image.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    overlayElement.classList.add('is-active');
    isZoomedIn = true;
  };

  const handleImageClick = (e: Event) => {
    e.stopPropagation();
    isZoomedIn ? zoomOut() : zoomIn();
  };

  const handleOverlayClick = () => zoomOut();
  const handleScroll = () => zoomOut();
  const handleTransitionEnd = () => {
    if (!isZoomedIn) image.classList.remove('is-zoomed');
  };

  image.style.transformOrigin = 'left top';
  image.addEventListener('click', handleImageClick);
  overlayElement.addEventListener('click', handleOverlayClick);
  window.addEventListener('scroll', handleScroll, { passive: true });
  image.addEventListener('transitionend', handleTransitionEnd);

  return () => {
    image.removeEventListener('click', handleImageClick);
    overlayElement.removeEventListener('click', handleOverlayClick);
    window.removeEventListener('scroll', handleScroll);
    image.removeEventListener('transitionend', handleTransitionEnd);
    image.classList.remove('zoom-target', 'is-zoomed');
    image.style.transform = '';
  };
}

export function initZoomImage() {
  cleanupZoom();

  overlay = document.createElement('div');
  overlay.className = 'zoom-overlay';
  document.body.appendChild(overlay);

  setupNewImagesForZoom();
}
