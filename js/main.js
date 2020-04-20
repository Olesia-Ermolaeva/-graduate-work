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

  //валидация формы модального окна
  $('.modal__form').validate({
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
      // правило-объект
      userEmail: {
        required: true,
        email: true
      },
      // валидация чекбокса
      policyCheckbox: {
        required: true
      }
    },
    errorElement: "em",
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
      userEmail: {
        required: "Обязательно укажите email",
        email: "Введите в формате: name@domain.com"
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
          modal.removeClass('modal--visible');
          $('.modal__success').addClass('modal__success--visible');
        },
        error: function (response) {
          console.error('Ошибка запроса' + response);
        }
      });
    }  
  });

  // валидация формы онлайн-контроль
  $(".control__form").validate({
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
      // валидация чекбокса
      policyCheckbox: {
        required: true
      }
    },
    errorElement: "ec",
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
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "Ваш номер телефона:"});
  //видеоплеер
  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'RHzzLqJWqHs',
      events: {
        'onReady': videoPlay,
      }
    });
  })

  function videoPlay(event) {
    event.target.playVideo();
  }
});

//загрузка карты
YaMapsShown = false;
$(document).ready(function (){
  $(window).scroll(function() {
    if (!YaMapsShown){
     if($(window).scrollTop() + $(window).height() > $(document).height() - 700) {      
      showYaMaps();
      YaMapsShown = true;
     }
    }
  });
});

function showYaMaps(){
  var script   = document.createElement("script");
  script.type  = "text/javascript";
  script.src   = "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Abd34938594550b3ce2d66bcb5f2a1d7f673189f8678aa2a77ba2c843bf53da47&amp;width=100%25&amp;height=100%&amp;lang=ru_RU&amp;scroll=false";
  document.getElementById("YaMaps").appendChild(script);
}

// прокрутка якорных ссылок
$("body").on('click', '[href*="#"]', function(e){
  var fixed_offset = 100;
  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
  e.preventDefault();
});



