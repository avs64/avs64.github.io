$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 1200,
      dots: false,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: false
          }
        }
      ]
    }); 

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

  function toggleItems (item){
    $(item).each(function(i){
      $(this).on('click', function(e){
       e.preventDefault();
       $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
       $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
   });
  };  
   
  toggleItems ('.catalog-item__link');
  toggleItems ('.catalog-item__back');

  //modal
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function(){
    $('#consultation, #order, #thanks, .overlay').fadeOut();
  });

  $('.button_mini').each(function(i){
    $(this).on('click', function(){
    $('.modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn();
    })
  });

  //validation

  valideForm ("#consultation .form");
  valideForm ('#order .form');
  valideForm ('#consultation-form');
  
  function valideForm (form){
    $(form).validate({
      rules: {name: 'required',
              phone: 'required',
              email: { required: true,
                       email: true}},
      messages: {
        name: "Введите ваше имя",
        phone: "Введите номер вашего телефона",
        email: "Введите адрес почты "
      }
      }
    );
  };
//phone mask
$('input[name=phone]').mask("+38(999) 999-99-99");

//submit
$('form').submit(function(e){
  e.preventDefault();
  if (!$(this).valid()){
    return;
  }
  $.ajax({
    type: 'POST',
    url: 'mailer/smart.php',
    data: $(this).serialize()
  }).done(function(){
    $(this).find('input').val('');
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn();

    $('form').trigger('reset');
  });
  return false;
})

//pageup
  $(window).scroll(function(){
    if($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    }
    else {
      $('.pageup').fadeOut();
    }
  });
 
  $('.pageup').on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      const hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
   
  new WOW().init();

  });