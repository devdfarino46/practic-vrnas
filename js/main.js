const navItems = document.querySelectorAll('.nav__item._rel');
const header = document.querySelector('.header');
const cardServices = document.querySelectorAll('.card-service');

navItems.forEach((navItem, key) => {
  if (navItem) {
    const btn = navItem.querySelector('.nav__item-btn');
    const subItems = navItem.querySelector('.nav__subitems');
  
    btn.addEventListener('click', ev => {
      navItems.forEach((navItem1, key1) => {
        if (key1 !== key) {
          navItem1.classList.remove('_opened');
          navItem1.style.marginBottom = '0';
        }
      });
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
      document.body.classList.toggle('no-scroll');
    });
  }

  window.addEventListener('scroll', ev => {
    if (window.scrollY >= 10) {
      header.classList.add('_scrolled');
    } else {
      header.classList.remove('_scrolled');
    }
  });
}

cardServices.forEach(cardService => {
  if (cardService) {
    document.addEventListener('click', ev => {
      // cardService.classList.add('_active');
      const clck = ev.composedPath().includes(cardService);
      if (clck) {
        cardService.classList.add('_active');
      } else {
        cardService.classList.remove('_active');
      }
    })
  }
})