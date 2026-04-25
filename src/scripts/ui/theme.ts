export function initThemeToggle() {
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
      html.removeAttribute('dark');
      localStorage.setItem('theme', 'light');
      return;
    }

    html.classList.add('dark-mode');
    html.classList.remove('light-mode');
    html.setAttribute('dark', '');
    localStorage.setItem('theme', 'dark');
  });
}
