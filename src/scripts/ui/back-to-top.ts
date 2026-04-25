export function initBackToTop() {
  const backToTop = document.getElementById('back-to-top');
  if (!backToTop) return;

  backToTop.replaceWith(backToTop.cloneNode(true));
  const newBackToTop = document.getElementById('back-to-top');

  newBackToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
