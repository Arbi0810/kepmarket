$(document).ready(function(){

    $('.text-left > a').bind('click', function(){
        $(this).next().slideToggle();
        $(this).toggleClass('active');
    });


    $.fn.equalHeights = function() {
        var maxHeight = 0,
            $this = $(this);

        $this.each( function() {
            var height = $(this).innerHeight();

            if ( height > maxHeight ) { maxHeight = height; }
        });

        return $this.css('height', maxHeight);
    };



    if( $(window).width() < 451 ){

        $('.cont-layer h2.first').bind('click', function(){
            $(this).toggleClass('active');
            $(this).next().slideToggle('slow');
        });

        $('.footer-layer .bottom-menu-wrap h3').bind('click', function(){
            $(this).next().slideToggle('slow');    
            $(this).toggleClass('active');
        });

        $('.navbar.catalog-top-filter + .cont-layer.gray-bg .thumbnail h3').bind('click', function(){
            $(this).next().slideToggle('slow');    
            $(this).toggleClass('active');
        });

        //Прячем на мобилке фильтр
        $('.catalog-aside .thumbnail.show-or-hide-filter').bind('click', function(){
            if( !$(this).hasClass('active') ){
                $(this).find('h3').html('Скрыть фильтр <span class="fa fa-angle-right fa-lg"></span>');
            }else{
                $(this).find('h3').html('Показать фильтр <span class="fa fa-angle-right fa-lg"></span>');
            }

            $(this).next().slideToggle();
            $(this).toggleClass('active');
        });

        //Если заголовок слишком длинный, уменьшаем размер шрифта
        var sectionTitle = $('nav.catalog-top-filter').next('.cont-layer.gray-bg.catalog-page').find('h2.first');
        var sectionTitleText = sectionTitle.text();
        var sectionTitleLength = sectionTitleText.length;
        if(sectionTitleLength > 25){
            sectionTitle.css('font-size', '18px');
        }

    }


    

    if( $(window).width() < 500 ){
        //Немного выравниваем блоки с текстом на товарах
        $('.catalog-section .filtered-item .catalog-section-info').equalHeights();

    }

    $('.new-ones').bind('click', function(){
        $('.item-info-wrap').equalHeights();
    })

    $('.similar-items .item-info-wrap').equalHeights();

    //Скрываем на мобилке самое верхнее выпадающее меню и основное, если кликаем не по ним.
    $('body').bind('click', function(event){

        var eventTarget = event.target;
        // var menu = $('.top-multi-menu');
        // var button = $('span.fa.fa-bars');
        // if( eventTarget != menu[0] && menu.has(eventTarget).length === 0 && eventTarget != button[0] ){
        //     button.removeClass('active');
        //     menu.parent().removeClass('active');
        // }

        var manButton = $('.text-left > a');
        var userMenuWrap = $('.header-top-line-nav');
        if( userMenuWrap.has(eventTarget).length === 0 ){
            manButton.removeClass('active').next().slideUp();

        }

    });

	//Удаляю все эти хиддены, чтобы можно было нормально юзать nth-child
    $('.hidden-sm:not(.needed)').remove();

	if (getCookie('hidefloat') != 1) {
		$('.float-banner').addClass('active');
	}
	
	$('.closefloat').click(function(){
		setCookie ('hidefloat', 1, 86400, "/");
		$('.float-banner').fadeOut();
	});
	
   //if($('.bxslider-main').length>0){
   //    $('.bxslider-main').bxSlider({
   //        minSlides: 6,
   //        maxSlides: 6,
   //        slideWidth: ($('.bxslider-main').parent().width()-40)/2,
           //slideMargin: 10,
           //pager: false,
           //controls: true
       //});
   //}

    if($("#catalog-filter-range").length>0){
        $("#catalog-filter-range").ionRangeSlider({
            type: "double",
            grid: false,
            min: $("#catalog-filter-range").attr('data-min'),
            max: $("#catalog-filter-range").attr('data-max'),
            from: $("#catalog-filter-range").attr('data-from'),
            to: $("#catalog-filter-range").attr('data-to'),
            decorate_both: false,
            onFinish: function (data) {
                $('#catalog-filter-price-hide > input:eq(0)').val(data.from);
                $('#catalog-filter-price-hide > input:eq(1)').val(data.to);
            }
        });
    }

    if($("[data-need-range]").length>0){
        $("[data-need-range]").each(function(){
            var SliderObj = $(this);
            SliderObj.ionRangeSlider({
                type: "double",
                grid: false,
                min: SliderObj.attr('data-min'),
                max: SliderObj.attr('data-max'),
                from: SliderObj.attr('data-from'),
                to: SliderObj.attr('data-to'),
                decorate_both: false,
                onFinish: function (data) {
                    SliderObj.parent('.price-filter').find('[data-price-hide] > input:eq(0)').val(data.from);
                    SliderObj.parent('.price-filter').find('[data-price-hide] > input:eq(1)').val(data.to);
                }
            });
        });
    }

    if($('#bx-detail-slider .bxslider').length>0){
        $('#bx-detail-slider .bxslider').bxSlider({
            slideWidth: $('#bx-detail-slider').width(),
            slideMargin: 0,
            controls: false,
            mode: 'horizontal',
            pagerCustom: '#bx-pager'
        });
        $('#bx-pager').bxSlider({
            mode: 'vertical',
            slideWidth: 80,
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 10,
            pager: false,
            controls: true,
            nextSelector: '#slider-next',
            prevSelector: '#slider-prev',
            nextText: 'Onward →',
            prevText: '← Go back'
        });

    }

    $('#authorize-form').validate({
        errorLabelContainer: '#authorize-form div.error',
        rules: {
            USER_LOGIN: {
                required: true                
            },
            USER_PASSWORD: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            USER_LOGIN: {
                required: "Вы не ввели почтовый адрес!"                
            },
            USER_PASSWORD: {
                required: "Вы не ввели пароль!",
                minlength: "Пароль не может быть короче 6 символов!"
            }
        }
    });
    $('#registration-form').validate({
        errorLabelContainer: '#registration-form div.error',
        rules: {
            USER_EMAIL: {
                required: true,
                email: true
            },
            USER_NAME: "required",
            USER_LAST_NAME: "required",
            USER_PASSWORD: {
                required: true,
                minlength: 6
            },
            USER_CONFIRM_PASSWORD: {
                required: true,
                minlength: 6,
                equalTo: "#registration_USER_PASSWORD"
            }
        },
        messages: {
            USER_EMAIL: {
                required: "Вы не ввели почтовый адрес!",
                email: "Вы ввели почтовый адрес в недопустимом формате!"
            },
            USER_NAME: "Вы не ввели имя!",
            USER_LAST_NAME: "Вы не ввели фамилию!",
            USER_PASSWORD: {
                required: "Вы не ввели пароль!",
                minlength: "Пароль не может быть короче 6 символов!"
            },
            USER_CONFIRM_PASSWORD: {
                required: "Вы не ввели пароль!",
                minlength: "Пароль не может быть короче 6 символов!",
                equalTo: "Пароли не совпадают!"
            }
        }
    });
    $('#forget-form').validate({
        errorLabelContainer: '#forget-form div.error',
        rules: {
            USER_EMAIL: {
                required: true,
                email: true
            }
        },
        messages: {
            USER_EMAIL: {
                required: "Вы не ввели почтовый адрес!",
                email: "Вы ввели почтовый адрес в недопустимом формате!"
            }
        }
    });
});

function CatalogASideOpenAll($LinkObg){
    if(!$LinkObg.parent().hasClass('open')){
        $LinkObg.parent().find('ul li').each(function(){
            $(this).show(150);
        });
        $LinkObg.text('Скрыть');
        $LinkObg.parent().addClass('open');
    }else{
        $LinkObg.parent().find('ul li').each(function(){
            console.log($(this).index());
            if($(this).index()>4){
                $(this).hide(150);
            }
        });
        $LinkObg.text('Показать все');
        $LinkObg.parent().removeClass('open');
    }
}
function ModalErrorOpen(TabCode){
    setTimeout(function(){
        $('a[data-target="#ModalAuthorizeAndRegistration"]:eq(0)').trigger('click');
        $('#ModalAuthorizeAndRegistration a[aria-controls='+TabCode+']').tab('show');
    },10);
}


function DeleteProductFromCheck(id){
    $.ajax({
        url:'/basket/', // Куда отсылаем запрос
        data:({ // Что отсылаем
            action: 'delete',
            id: id
        }),
        async:false, // Ждем пока аякс придет и идем дальше
        type:'POST', // Каким методом
        dataType: 'html'
    });
}


function setCookie (name, value, seconds, path, domain, secure) {

    var expires;
    if (seconds) {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }

    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}


function getCookie(name) {
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
        offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}