const navItems = document.querySelectorAll('.nav__item._rel');
const header = document.querySelector('.header');

navItems.forEach(navItem => {
  if (navItem) {
    const btn = navItem.querySelector('.nav__item-btn');
    const subItems = navItem.querySelector('.nav__subitems');
  
    btn.addEventListener('click', ev => {
      navItem.classList.toggle('_opened');
      const subItemsHeight = subItems.clientHeight;

      if (navItem.classList.contains('_opened') && window.innerWidth <= 650) {
        navItem.style.marginBottom = '147px';
      } else {
        navItem.style.marginBottom = '0';
      }
    });
  }
});

if (header) {
  const menuBtn = header.querySelector('.header__menu-btn');

  if (menuBtn) {
    const nav = header.querySelector('.nav');

    menuBtn.addEventListener('click', ev => {
      menuBtn.classList.toggle('_opened');
      nav.classList.toggle('_opened');
    });
  }
}