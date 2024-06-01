const cardServices = document.querySelectorAll('.card-service');
const spollerChoose = document.querySelector('.spoller-choose');
const videos = document.querySelectorAll('.video');
const playerVideos = document.querySelectorAll('.player-video');
const clientTestimonials = document.querySelectorAll('.client-testimonial');
const navItems = document.querySelectorAll('.nav__item._rel');
const popArticle = document.querySelector('.pop-article');
const itemTeams = document.querySelectorAll('.item-team');
const itemFaqs = document.querySelectorAll('.item-faq');

const header = document.querySelector('.header');
const testimonial = document.querySelector('.testimonial');

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

videos.forEach(video => {
  if (video) {
    const popup = video.querySelector('.video__popup');
    /** @type {HTMLVideoElement} */
    const videoElem = popup.querySelector('.player-video__video');

    video.addEventListener('click', ev => {
      if (!popup.classList.contains('_visibled')) {
        popup.classList.add('_visibled');
        document.body.classList.add('no-scroll');
        video.style.zIndex = 160;
      } else {
        const player = video.querySelector('.player-video');

        if (!ev.composedPath().includes(player)) {
          popup.classList.remove('_visibled');
          document.body.classList.remove('no-scroll');
          video.style.zIndex = 5;
          videoElem.currentTime = videoElem.duration;
        }
      }
    });
  }
});

playerVideos.forEach(playerVideo => {
  /** @type {HTMLVideoElement} */
  const video = playerVideo.querySelector('.player-video__video');
  const preview = playerVideo.querySelector('.player-video__preview');
  const overlay = playerVideo.querySelector('.player-video__overlay');
  const playBtn = playerVideo.querySelector('.player-video__play');
  const line = playerVideo.querySelector('.player-video__line');
  const lineBuffer = line.querySelector('._buffer');
  const lineProgress = line.querySelector('._progress');

  let startTime = 0;
  let isHideOverlay = false;

  playBtn.addEventListener('click', ev => {
    if (video.paused || video.ended) {
      video.play();
      playerVideo.classList.add('_played');
    } else {
      video.pause();
      playerVideo.classList.remove('_played');
    }
  });

  playerVideo.addEventListener('click', ev => {
    const info = playerVideo.querySelector('.player-video__info');
    const controlls = playerVideo.querySelector('.player-video__controlls');

    if (
      !ev.composedPath().includes(info) &&
      !ev.composedPath().includes(controlls)
    ) {
      if (video.currentTime != 0 && video.currentTime != video.duration) {
        playerVideo.classList.toggle('_hide-overlay');
      }
    }

    startTime = video.currentTime;
    isHideOverlay = true;
  });

  video.addEventListener('timeupdate', ev => {
    const duration = video.duration;
    if (duration > 0) {
      for (let i = 0; video.buffered.length; i++) {
        if (video.buffered.start(i) < video.currentTime) {
          lineBuffer.style.width = video.buffered.end(i) * 100 / duration + "%";
          break;
        }
      }
    }

    lineProgress.style.width = video.currentTime / duration * 100 + "%";

    if (video.currentTime - startTime > 2 && isHideOverlay) {
      playerVideo.classList.add('_hide-overlay');
      isHideOverlay = false;
    }
  });

  video.addEventListener('play', ev => {
    preview.classList.add('_hide');

    startTime = video.currentTime;
    isHideOverlay = true;
  });

  line.addEventListener('click', ev => {
    let x = ev.clientX - line.getBoundingClientRect().left;
    let width = line.getBoundingClientRect().width;
    
    lineProgress.style.width = x / width * 100 + "%";
    video.currentTime = x / width * video.duration;
  });

  video.addEventListener('ended', function() {
    preview.classList.remove('_hide');
    playerVideo.classList.remove('_hide-overlay');
    playerVideo.classList.remove('_played');
  });

});

clientTestimonials.forEach(clientTestimonial => {
  if (clientTestimonial) {
    document.addEventListener('click', ev => {
      if(ev.composedPath().includes(clientTestimonial)) {
        clientTestimonial.classList.add('_active');
      } else {
        clientTestimonial.classList.remove('_active');
      }
    });
  }
});

if (testimonial) {
  const clientWrappers = document.querySelectorAll('.testimonial__client-wrapper');

  clientWrappers.forEach(clientWrapper => {
    const client = clientWrapper.querySelector('.testimonial__client');
    const clientContent = client.querySelector('.client-testimonial__content');

    document.addEventListener('click', ev => {
      if(ev.composedPath().includes(client)) {
        clientWrapper.classList.add('_active');
      } else {
        clientWrapper.classList.remove('_active');
      }
    })
  });
}

if (popArticle) {
  const slider = new Swiper('.pop-article__slider', {
    slidesPerView: 1,
    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '.pop-article__pagination',
      clickable: true,
    },

    autoplay: {
      delay: 2000
    }
  })
}

itemTeams.forEach(itemTeam => {
  if (itemTeam) {
    document.addEventListener('click', ev => {
      if(ev.composedPath().includes(itemTeam)) {
        itemTeam.classList.add('_active');
      } else {
        itemTeam.classList.remove('_active');
      }
    })
  }
});

itemFaqs.forEach(itemFaq => {
  const btn = itemFaq.querySelector('.item-faq__label');

  btn.addEventListener('click', ev => {
    itemFaq.classList.toggle('_opened');
  })
})