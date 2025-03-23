"use strict";

var cardServices = document.querySelectorAll('.card-service');
var spollerChoose = document.querySelector('.spoller-choose');
var videos = document.querySelectorAll('.video');
var playerVideos = document.querySelectorAll('.player-video');
var clientTestimonials = document.querySelectorAll('.client-testimonial');
var navItems = document.querySelectorAll('.nav__item');
var popArticle = document.querySelector('.pop-article');
var itemTeams = document.querySelectorAll('.item-team');
var itemFaqs = document.querySelectorAll('.item-faq');
var header = document.querySelector('.header');
var testimonial = document.querySelector('.testimonial');
navItems.forEach(function (navItem, key) {
  if (navItem.classList.contains('_rel')) {
    var btn = navItem.querySelector('.nav__item-btn');
    var noLink = navItem.querySelector('a[href="javascript:0;"]');
    var subItems = navItem.querySelector('.nav__subitems');
    var btnListener = function btnListener(ev) {
      navItems.forEach(function (navItem1, key1) {
        if (key1 !== key) {
          navItem1.classList.remove('_opened');
          navItem1.style.marginBottom = '0';
        }
      });
      navItem.classList.toggle('_opened');
      var subItemsHeight = subItems.clientHeight;
      if (navItem.classList.contains('_opened') && window.innerWidth <= 650) {
        navItem.style.marginBottom = subItemsHeight + 'px';
      } else {
        navItem.style.marginBottom = '0';
      }
    };
    btn.addEventListener('click', btnListener);
    if (noLink) {
      noLink.addEventListener('click', btnListener);
    }
  }
});
if (header) {
  var menuBtn = header.querySelector('.header__menu-btn');
  if (menuBtn) {
    var nav = header.querySelector('.nav');
    menuBtn.addEventListener('click', function (ev) {
      menuBtn.classList.toggle('_opened');
      nav.classList.toggle('_opened');
      document.body.classList.toggle('no-scroll');
    });
  }
  window.addEventListener('scroll', function (ev) {
    if (window.scrollY >= 10) {
      header.classList.add('_scrolled');
    } else {
      header.classList.remove('_scrolled');
    }
  });
}
cardServices.forEach(function (cardService) {
  if (cardService) {
    document.addEventListener('click', function (ev) {
      var clck = ev.composedPath().includes(cardService);
      if (clck) {
        cardService.classList.add('_active');
      } else {
        cardService.classList.remove('_active');
      }
    });
  }
});
if (spollerChoose) {
  var items = spollerChoose.querySelectorAll('.spoller-choose__item');
  items.forEach(function (item, key) {
    var title = item.querySelector('.spoller-choose__title');
    var text = item.querySelector('.spoller-choose__text');
    var marginBottom = text.clientHeight;
    title.addEventListener('click', function (ev) {
      items.forEach(function (item1, key1) {
        if (key !== key1) {
          item1.classList.remove('_opened');
          item1.style.marginBottom = '0';
        }
      });
      item.classList.toggle('_opened');
      if (item.classList.contains('_opened')) {
        item.style.marginBottom = marginBottom + 'px';
      } else {
        item.style.marginBottom = '0';
      }
    });
  });
}
videos.forEach(function (video) {
  if (video) {
    var popup = video.querySelector('.video__popup');
    /** @type {HTMLVideoElement} */
    var videoElem = popup.querySelector('.player-video__video');
    video.addEventListener('click', function (ev) {
      if (!popup.classList.contains('_visibled')) {
        popup.classList.add('_visibled');
        document.body.classList.add('no-scroll');
        video.style.zIndex = 160;
      } else {
        var player = video.querySelector('.player-video');
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
playerVideos.forEach(function (playerVideo) {
  /** @type {HTMLVideoElement} */
  var video = playerVideo.querySelector('.player-video__video');
  var preview = playerVideo.querySelector('.player-video__preview');
  var overlay = playerVideo.querySelector('.player-video__overlay');
  var playBtn = playerVideo.querySelector('.player-video__play');
  var line = playerVideo.querySelector('.player-video__line');
  var lineBuffer = line.querySelector('._buffer');
  var lineProgress = line.querySelector('._progress');
  var startTime = 0;
  var isHideOverlay = false;
  playBtn.addEventListener('click', function (ev) {
    if (video.paused || video.ended) {
      video.play();
      playerVideo.classList.add('_played');
    } else {
      video.pause();
      playerVideo.classList.remove('_played');
    }
  });
  playerVideo.addEventListener('click', function (ev) {
    var info = playerVideo.querySelector('.player-video__info');
    var controlls = playerVideo.querySelector('.player-video__controlls');
    if (!ev.composedPath().includes(info) && !ev.composedPath().includes(controlls)) {
      if (video.currentTime != 0 && video.currentTime != video.duration) {
        playerVideo.classList.toggle('_hide-overlay');
      }
    }
    startTime = video.currentTime;
    isHideOverlay = true;
  });
  video.addEventListener('timeupdate', function (ev) {
    var duration = video.duration;
    if (duration > 0) {
      for (var i = 0; video.buffered.length; i++) {
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
  video.addEventListener('play', function (ev) {
    preview.classList.add('_hide');
    startTime = video.currentTime;
    isHideOverlay = true;
  });
  line.addEventListener('click', function (ev) {
    var x = ev.clientX - line.getBoundingClientRect().left;
    var width = line.getBoundingClientRect().width;
    lineProgress.style.width = x / width * 100 + "%";
    video.currentTime = x / width * video.duration;
  });
  video.addEventListener('ended', function () {
    preview.classList.remove('_hide');
    playerVideo.classList.remove('_hide-overlay');
    playerVideo.classList.remove('_played');
  });
});
clientTestimonials.forEach(function (clientTestimonial) {
  if (clientTestimonial) {
    document.addEventListener('click', function (ev) {
      if (ev.composedPath().includes(clientTestimonial)) {
        clientTestimonial.classList.add('_active');
      } else {
        clientTestimonial.classList.remove('_active');
      }
    });
  }
});
if (testimonial) {
  var clientWrappers = document.querySelectorAll('.testimonial__client-wrapper');
  clientWrappers.forEach(function (clientWrapper) {
    var client = clientWrapper.querySelector('.testimonial__client');
    var clientContent = client.querySelector('.client-testimonial__content');
    document.addEventListener('click', function (ev) {
      if (ev.composedPath().includes(client)) {
        clientWrapper.classList.add('_active');
      } else {
        clientWrapper.classList.remove('_active');
      }
    });
  });
}
if (popArticle) {
  var slider = new Swiper('.pop-article__slider', {
    slidesPerView: 1,
    direction: 'horizontal',
    loop: true,
    pagination: {
      el: '.pop-article__pagination',
      clickable: true
    },
    autoplay: {
      delay: 2000
    }
  });
}
itemTeams.forEach(function (itemTeam) {
  if (itemTeam) {
    document.addEventListener('click', function (ev) {
      if (ev.composedPath().includes(itemTeam)) {
        itemTeam.classList.add('_active');
      } else {
        itemTeam.classList.remove('_active');
      }
    });
  }
});
itemFaqs.forEach(function (itemFaq) {
  var btn = itemFaq.querySelector('.item-faq__label');
  btn.addEventListener('click', function (ev) {
    itemFaq.classList.toggle('_opened');
  });
});
//# sourceMappingURL=main.js.map
