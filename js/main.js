$(document).ready(function () {
  var modal = $('.modal'),
      modalBtn = $('[data-toggle="modal"]'),
      closeBtn = $('.modal__close'),
      modalSuccess = $ ('.modal__success'),
      successCloseBtn = $('.modal__success__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  successCloseBtn.on('click', function () {
    modalSuccess.toggleClass('modal__success--visible');
  });

  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');

  next.css('left', prev.width() + 35 + bullets.width() + 35)
  bullets.css('left', prev.width() + 35)

  new WOW().init();

  //плавная прокрутка вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 70) {
      $('#upbutton').fadeIn();
    } else {
      $('#upbutton').fadeOut();
    }
  });

  $('#upbutton').click(function () {
  $("html, body").animate({
    scrollTop: 0
  }, 600);
  return false;
  });

  // валидация формы узнать стоимость
  $(".prices__form").validate({
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userEmail: {
        required: true,
        email: true
      },
      userSite: {
        required: true,
        url: true
      },
      userMessage: {
        required: true,
        minlength: 10
      }
    },
    errorElement: "ep",
    errorClass: "invalid",
    //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее 15 букв" 
      }, 
      userEmail: {
        required: "E-mail обязателен",
        email: "Введите верный e-mail" 
      },
      userSite: {
        required: "Адрес сайта обязателен",
        url: "Введите верный адрес сайта"
      },
      userMessage: {
        required: "Напишите что-нибудь",
        minlength: "Напишите больше"
      }
    },  
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.modal__success').addClass('modal__success--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса' + response);
        }
      });
    }
  });

  $("#footerForm").validate({
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 10
      },
      userQuestion: {
        required: true,
        minlength: 10
      },
      // валидация чекбокса
      policyCheckbox: {
        required: true
      }
    },
    errorElement: "ef",
    errorClass: "invalid",
    //сообщения
    messages: {
      userName: {
        required: "Имя обязательно",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длиннее 15 букв" 
      }, 
      userPhone: {
        required: "Телефон обязателен",
        minlength: "Введите телефон полностью" 
      },
      userQuestion: {
        required: "Хочешь спросить - спрашивай",
        minlength: "Напиши больше" 
      },
      policyCheckbox: "Согласитесь с обработкой данных"
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $(form)[0].reset();
          $('.modal__success').addClass('modal__success--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса' + response);
        }
      });
    }  
  });

  // маска для телефона
  $('[type=tel]').mask('+7 000 000-00-00', {placeholder: "+7 999 888-88-88"});
 
  //видеоплеер
  var player;
  var stastics = $('.statistics__description');
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '633px',
      width: '100%',
      videoId: '0uwmN9Bj3Ko',
      events: {
        'onReady': videoPlay,
      },
    });
    stastics.css('display', 'none');
  });

  function videoPlay(event) {
    event.target.playVideo();
  }
});


// прокрутка якорных ссылок
$("body").on('click', '[href*="#"]', function(e){
  var fixed_offset = 100;
  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
  e.preventDefault();
});



