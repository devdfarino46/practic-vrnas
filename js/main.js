const navItems = document.querySelectorAll('.nav__item._rel');
const header = document.querySelector('.header');
const cardServices = document.querySelectorAll('.card-service');
const spollerChoose = document.querySelector('.spoller-choose');

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
        navItem.style.marginBottom = subItemsHeight+'px';
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

if (spollerChoose) {
  const items = spollerChoose.querySelectorAll('.spoller-choose__item');

  items.forEach((item, key) => {
    const title = item.querySelector('.spoller-choose__title');
    const text = item.querySelector('.spoller-choose__text');
    const marginBottom = text.clientHeight;
    
    if (key === 0) {
      item.classList.add('_opened');
      item.style.marginBottom = marginBottom+'px';
    }

    title.addEventListener('click', ev => {
      items.forEach((item1, key1) => {
        if (key !== key1) {
          item1.classList.remove('_opened');
          item1.style.marginBottom = '0';
        }
      });

      item.classList.toggle('_opened');

      if (item.classList.contains('_opened')) {
        item.style.marginBottom = marginBottom+'px';
      } else {
        item.style.marginBottom = '0';
      }
    });
  })
}