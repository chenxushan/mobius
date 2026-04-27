export function initMenu() {
  const menuOpenIcon = document.querySelector('.icon__menu');
  const menuCloseIcon = document.querySelector('.nav__icon-close');
  const menuList = document.querySelector('.main-nav');

  menuOpenIcon?.addEventListener('click', () => {
    menuList?.classList.add('is-open');
  });

  menuCloseIcon?.addEventListener('click', () => {
    menuList?.classList.remove('is-open');
  });
}
