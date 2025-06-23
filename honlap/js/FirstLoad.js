/*--------------------------------------------------
Function Firs tLoad
---------------------------------------------------*/
function FirstLoad() {

    $("html,body").animate({ scrollTop: 0 }, 1);

    $("main").css('background', function () {
        return $("#page-content").data('bgcolor');
    });

    $('.has-animation').removeClass('animate-in');

    $('.item').each(function () {
        var image = $(this).find('.item-image').data('src');
        // $(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
        $(this).find('.item-shadow').prepend($('<img>', { src: image }));
    });

    $('.section').each(function () {
        var image = $(this).find('.section-image').data('src');
        $(this).find('.section-image').css({ 'background-image': 'url(' + image + ')' });
        $(this).find('.section-image-mirror').css({ 'background-image': 'url(' + image + ')' });
        $(this).find('.section-shadow').prepend($('<img>', { src: image }));
    });

    $('a.ajax-link').on('click', function () {
        $('header, #menu-overlay, footer').removeClass('light-content');
        setTimeout(function () {
            TweenMax.to($("#hero, .menu-info, .next-project-info"), 0.4, { force3D: true, opacity: 0, y: -100, ease: Power2.easeInOut });
            TweenMax.to($("#main-content, .fp-tableCell"), 0.4, { force3D: true, opacity: 0, y: -150, delay: 0.1, ease: Power2.easeInOut });
            TweenMax.to($("#showcase-holder"), 0.4, { force3D: true, opacity: 0, delay: 0.1, ease: Power1.easeInOut });
            TweenMax.to($("#footer-container"), 0.4, { opacity: 0, ease: Power0.easeNone });
            TweenMax.to($("#hero-bg-wrapper"), 0.2, { opacity: 0, ease: Power1.easeInOut });
        }, 10);
    });

    $('a.ajax-link-project').on('click', function () {
        TweenMax.to($("#footer-container"), 0.3, { opacity: 0, ease: Power0.easeNone });
        $("body").addClass("transition");
        $('.menu-info, .next-project-info').css({ opacity: '0', });
        if ($('.section').hasClass("light-content")) {
            setTimeout(function () {
                $('body').addClass('light-content');
            }, 200);
        }

    });

    //Page Action Overlay
    function closeFilters() {
        $('.page-action-overlay').toggleClass('active');
        setTimeout(function () {
            if ($('.page-action-overlay').hasClass("active")) {
                //Fade In Content
                TweenMax.to($(".page-action-text"), 0.4, { force3D: true, opacity: 1, y: 0, delay: 0.2, ease: Power3.easeOut });
                TweenMax.to($(".page-action-content"), 0.4, { force3D: true, opacity: 1, y: 0, delay: 0.25, ease: Power3.easeOut });
                //Fade In Navigation Lists
                var tl = new TimelineLite();
                tl.set($(".jssocials-share, #filters li"), { y: 60, opacity: 0 });
                $(".jssocials-share, #filters li").each(function (index, element) {
                    tl.to(element, 0.3, { y: 0, opacity: 1, delay: 0.3, ease: Power3.easeOut }, index * 0.05);
                });
            } else {
                //Fade Out Navigation Lists					
                var tl = new TimelineLite();
                $(".jssocials-share, #filters li").each(function (index, element) {
                    tl.to(element, 0.2, { y: -100, delay: 0.1, opacity: 0, ease: Power1.easeIn }, index * 0.1);
                });
                //Fade Out Content
                TweenMax.to($(".page-action-text"), 0.4, { force3D: true, opacity: 0, y: -100, ease: Power2.easeInOut });
                TweenMax.to($(".page-action-content"), 0.4, { force3D: true, opacity: 0, y: -100, delay: 0.1, ease: Power2.easeInOut });
                setTimeout(function () {
                    TweenMax.set($(".page-action-text"), { y: 100 });
                    TweenMax.set($(".page-action-content"), { y: 200 });
                }, 500);
            }
        }, 20);
    }

    $('#open-filters, #sharetheme, .close-page-action').on('click', function () { closeFilters(); });
    $('#filters > li > a').on('click', function () {
        setTimeout(() => {
            closeFilters();
        }, 200);
    });

    //Overlay Menu
    $('#burger-circle, #close-menu').on('click', function () {
        $('header').toggleClass('open');
        $('#hero-bg-wrapper').toggleClass('blur');
        $('#menu-burger').toggleClass('open');
        $('#menu-overlay').toggleClass('active');
        setTimeout(function () {
            if ($('#menu-burger').hasClass("open")) {
                //Fade Out Content
                TweenMax.to($("#hero, .menu-info, .next-project-info"), 0.4, { force3D: true, opacity: 0, y: -100, ease: Power2.easeInOut });
                TweenMax.to($("#main-content, .fp-tableCell"), 0.4, { force3D: true, opacity: 0, y: -150, delay: 0.1, ease: Power2.easeInOut });
                TweenMax.to($(".socials-text, .copyright"), 0.4, { force3D: true, opacity: 0, y: -100, delay: 0.2, ease: Power2.easeInOut });
                setTimeout(function () {
                    TweenMax.set($("#hero, .menu-info, .next-project-info"), { y: 100 });
                    TweenMax.set($("#main-content, .fp-tableCell, .socials-text, .copyright"), { y: 200 });
                }, 500);
                //Fade In Navigation Lists
                var tl = new TimelineLite();
                tl.set($("nav ul li.mp"), { y: 60, opacity: 0 });
                $("nav ul li.mp").each(function (index, element) {
                    tl.to(element, 0.3, { y: 0, opacity: 1, delay: 0.3, ease: Power3.easeOut }, index * 0.1);
                });

            } else {
                //Fade Out Navigation Lists					
                var tl = new TimelineLite();
                $("nav ul li.mp").each(function (index, element) {
                    tl.to(element, 0.25, { y: -80, opacity: 0, ease: Power1.easeIn }, index * 0.05);
                });
                //Fade In Content
                TweenMax.to($("#hero, .menu-info, .next-project-info"), 0.4, { force3D: true, opacity: 1, y: 0, delay: 0.4, ease: Power3.easeOut });
                TweenMax.to($("#main-content, .fp-tableCell"), 0.4, { force3D: true, opacity: 1, y: 0, delay: 0.45, ease: Power3.easeOut });
                TweenMax.to($(".socials-text, .copyright"), 0.4, { force3D: true, opacity: 1, y: 0, delay: 0.5, ease: Power3.easeOut });
            }
        }, 20);
    });

    //Fade Out Navigation Lists	On Page Transition
    $('.main-menu .ajax-link').on('click', function () {
        var tl = new TimelineLite();
        $("nav ul li.mp").each(function (index, element) {
            tl.to(element, 0.25, { y: -80, opacity: 0, ease: Power1.easeIn }, index * 0.05);
        });
    });

    //Drop Down Navigaation
    $('nav li.has-sub > a').on('click', function () {
        $(this).removeAttr('href');
        var element = $(this).parent('li');
        if (element.hasClass('open')) {
            element.removeClass('open');
            element.find('li').removeClass('open');
            element.find('ul').slideUp();
        }
        else {
            element.addClass('open');
            element.children('ul').slideDown();
            element.siblings('li').children('ul').slideUp();
            element.siblings('li').removeClass('open');
            element.siblings('li').find('li').removeClass('open');
            element.siblings('li').find('ul').slideUp();
        }
    });

    //Parallax Burger Menu
    $('#burger-wrapper').mouseleave(function (e) {
        TweenMax.to(this, 0.3, { scale: 1 });
        TweenMax.to('#burger-circle, #menu-burger', 0.3, { scale: 1, x: 0, y: 0 });
    });
    $('#burger-wrapper').mouseenter(function (e) {
        TweenMax.to(this, 0.3, { transformOrigin: '0 0', scale: 1 });
        TweenMax.to('#burger-circle', 0.3, { scale: 1.3 });
    });
    $('#burger-wrapper').mousemove(function (e) {
        callParallax(e);
    });
    function callParallax(e) {
        parallaxIt(e, '#burger-circle', 60);
        parallaxIt(e, '#menu-burger', 40);
    }
    function parallaxIt(e, target, movement) {
        var $this = $('#burger-wrapper');
        var boundingRect = $this[0].getBoundingClientRect();
        var relX = e.pageX - boundingRect.left;
        var relY = e.pageY - boundingRect.top;
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        TweenMax.to(target, 0.3, {
            x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
            y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.width * movement,
            ease: Power2.easeOut
        });
    }


} // End First Load

