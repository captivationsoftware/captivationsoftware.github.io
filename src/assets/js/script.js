function svgIcons() {
  if ($('#svg-inject-me').length) {
    SVGInjector(document.getElementById('svg-inject-me'));
  }
}

function sliders() {
  const $solutions = $('.solutions'),
        $clients = $('.clients');

  $solutions.slick({
    slidesToShow: 6,
    dots: false,
    arrows: false,
    rows: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 767,
        settings: "unslick"
      }
    ]
  });

  $clients.slick({
    slidesToShow: 1,
    dots: false,
    arrows: false,
    rows: 0
  });

  $('.clients-btn,.solutions-btn').click(function(e) {
    e.preventDefault();
  });

  $('#solutions-prev').click(() => {
    $solutions.slick('prev');
  });

  $('#solutions-next').click(() => {
    $solutions.slick('next');
  });

  $('#clients-prev').click(() => {
    $clients.slick('prev');
  });

  $('#clients-next').click(() => {
    $clients.slick('next');
  });
}

function careers() {
  if ($(window).width() < 992) {
    $('.careers__open').removeClass('active');
  }

  if ($('.careers-item').length < 0) {
    $('.careers__open').click(function(e) {
      e.preventDefault();

      if ($(window).width() > 992) {
        $('.careers-view').empty().hide();
        $('.careers__open').removeClass('active');
        $(this).addClass('active');
        $('.careers-view').fadeIn();
        $(this).parents('.careers').find('.careers__info').clone().appendTo('.careers-view');
      } else {
        $(this).toggleClass('active');
        $(this).parents('.careers').find('.careers__info').slideToggle();
      }
    });
  } else {
    $('.careers__open').click(function(e) {
      e.preventDefault();

      if ($(window).width() > 991) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          $('.careers-view').empty().hide();
        } else {
          $('.careers-view').empty().hide();
          $('.careers__open').removeClass('active');
          $('.careers-view').fadeIn();
          $(this).addClass('active');
          $(this).parents('.careers').find('.careers__info').clone().appendTo('.careers-view');
        }
      } else {
        $(this).toggleClass('active');
        $(this).parents('.careers').find('.careers__info').slideToggle();
      }
    });
  }

  if ($('.careers__open').hasClass('active')) {
    $('.is-active').find('.careers__info').clone().appendTo('.careers-view');
  }
}

function fixedHeader() {
  if ($('.site-header--home').length > 0) {
    let header = document.querySelector('.site-header--home');

    function doFixed() {
      if (window.pageYOffset > window.innerHeight - 70) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
        $('.scroll-spy').removeAttr('style');
        $('.site-header__open-menu').removeClass('active');
      }
    }

    window.onscroll = () => doFixed();
  }
}

function popup() {
  $('.custom-upload').click(function(e) {
    e.preventDefault();

    $('.custom-file').trigger('click');
  });

  function showPopup() {
    $('body').addClass('popup-visible');
    $('.popup__bg').css('opacity', 1);
    $('.popup__item').css({
      'opacity': 1,
      'transform': 'scale(1)'
    });
  }

  function closePopup() {
    $('.popup__item').css({
      'opacity': 0,
      'transform': 'scale(.2)'
    });
    $('.popup__bg').css('opacity', 0);
    $('.popup__item').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      $('body').removeClass('popup-visible');
    });
  }

  $(document).on('click', '.apply-btn,.careers__btn', function(e) {
    e.preventDefault();

    showPopup();
  });


  $('.popup__close').click(function(e) {
    e.preventDefault();

    closePopup();
  });

  $(document).keydown(function(e) {
     if (e.keyCode == 27) {
       closePopup();
    }
  });
}

function animatedLabel() {
  const $el = $('.form-group input,.form-group textarea,.form-group select');

  function checkVal() {
    $el.each(function(){
      const val = $(this).val();

      if(val) {
        $(this).addClass('has-value');
      } else {
        $(this).removeClass('has-value');
      }
    });
  }

  $(document).on('click', '.form-group label', function() {
    const $el = $(this).parents('.form-group').find('input,textarea');

    $el.focus();
  });

  $el.blur(function(){
    const val = $(this).val();

    if(val) {
      $(this).addClass('has-value');
    } else {
      $(this).removeClass('has-value');
    }
  });

  checkVal();
}

function menus() {
  let lastId,
      topMenu = $(".scroll-spy"),
      headerHeight = $('.site-header').outerHeight(),
      topMenuHeight = headerHeight,
      // All list items
      menuItems = topMenu.find("a"),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  $('.anchor-menu a').click(function(e) {
    e.preventDefault();

    let anchor = $(this).attr('href');
    window.location.hash = anchor;

    $('html,body').animate({ scrollTop: $(anchor).offset().top - headerHeight}, 800);
  });

  if (window.location.href.indexOf('#') > -1) {
    $('html,body').animate({scrollTop: $(window.location.hash).offset().top - headerHeight}, 800);
  }

  menuItems.click(function(e){
    e.preventDefault();

    let href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;

    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    $('.site-header__open-menu').trigger('click');
  });

  $(window).scroll(function(){
    let fromTop = $(this).scrollTop()+topMenuHeight;

    // Get id of current scroll item
    let cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    let id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href='#"+id+"']").parent().addClass("active");
    }
  });

  $('.site-header__open-menu').click(function(e) {
    e.preventDefault();

    $(this).toggleClass('active');
    if ($(this).hasClass('active')) {
      $('.site-header__nav').css({
        'opacity': 1,
        'transform': 'translate3d(0, 0, 0)',
        'visibility': 'visible'
      });
      $('.site-header__nav').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $('.site-header__nav ul').css({
          'opacity': 1,
          'transform': 'translate3d(0, 0, 0)'
        });
      });
    } else {
      $('.site-header__nav ul').css({
        'opacity': 0,
        'transform': 'translate3d(0, -120px, 0)'
      });
      $('.site-header__nav').css({
        'opacity': 0,
        'transform': 'translate3d(0, 120px, 0)',
        'visibility': 'hidden'
      });
    }
  });
}

function animation() {
  $('.animate').waypoint(function() {
    $(this.element).addClass('animated');
    this.destroy();
  }, {
    offset: '85%'
  });

  $('.animate-article').waypoint(function() {
    $(this.element).addClass('animated');
    this.destroy();
  }, {
    offset: '100%'
  });

  $('.home__header').waypoint(function() {

    $('.home__header-menu li').each(function(i) {
      setTimeout(() => {
        $(this).addClass('animated-each');
      }, 100 * i);
    });
    setTimeout(() => {
      $('.home__header-title h1').addClass('animated-each');
      $('.home__header-title p').addClass('animated-each');
    }, 300);
    setTimeout(() => {
      $('.home__talk-to-us').addClass('animated-each');
    }, 400);
    this.destroy();
  }, {
    offset: '90%'
  });

  $('.home__solutions').waypoint(function() {
    $('.solution').each(function(i) {
      setTimeout(() => {
        $(this).addClass('animated-each');
      }, 200 * i);
    });
    this.destroy();
  }, {
    offset: '90%'
  });

  $('.home__solutions').waypoint(function() {
    $('.home__header-menu li').each(function(i) {
      setTimeout(() => {
        $(this).addClass('animated-each');
      }, 200 * i);
    });
    this.destroy();
  }, {
    offset: '90%'
  });

  $('.home__about').waypoint(function() {
    $('.about-number').each(function(i) {
      setTimeout(() => {
        $(this).addClass('animated-each');

        $(this).find('span').each(function() {
          $(this).prop('Counter', 1).animate({
            Counter: $(this).text()
          }, {
            duration: 1500,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
        });
      }, 200 * i);
    });
    this.destroy();
  }, {
    offset: '90%'
  });

  $('.home__leadership').waypoint(function() {
    $('.leadership__people').each(function(i) {
      setTimeout(() => {
        $(this).addClass('animated-each');
      }, 300 * i);
    });
    this.destroy();
  }, {
    offset: '90%'
  });

  $('.home__news').waypoint(function() {
    $('.col-news').each(function(i) {
      setTimeout(() => {
        $(this).addClass('animated-each');
      }, 200 * i);
    });
    this.destroy();
  }, {
    offset: '90%'
  });
}

svgIcons();
sliders();
careers();
fixedHeader();
popup();
animatedLabel();
menus();
animation();

setTimeout(() => {
  document.body.className = '';
}, 1000)
