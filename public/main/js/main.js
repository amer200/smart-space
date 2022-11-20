(function ($) {
    "use strict";

    // Initiate the wowjs
    new WOW().init();


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });


    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonial Slider
    $('.testimonial-slider').slick({
        infinite: true,
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.testimonial-slider-nav'
    });
    $('.testimonial-slider-nav').slick({
        arrows: false,
        dots: false,
        focusOnSelect: true,
        centerMode: true,
        centerPadding: '22px',
        slidesToShow: 3,
        asNavFor: '.testimonial-slider'
    });
    $('.testimonial .slider-nav').css({ "position": "relative", "height": "160px" });


    // Blogs carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

})(jQuery);

/* captcha */

// document.querySelector() is used to select an element from the document using its ID
let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');

// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];
// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
    emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''), captchaText.width / 4, captchaText.height / 2);

// This event listener is stimulated whenever the user press the "Enter" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
userText.addEventListener('keyup', function (e) {
    // Key Code Value of "Enter" Button is 13
    if (e.keyCode === 13) {
        if (userText.value === c) {
            output.classList.add("correctCaptcha");
            output.innerHTML = "Correct!";
        } else {
            output.classList.add("incorrectCaptcha");
            output.innerHTML = "Incorrect, please try again";
        }
    }
});
// This event listener is stimulated whenever the user clicks the "Submit" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
submitButton.addEventListener('click', function () {
    if (userText.value === c) {
        output.classList.add("correctCaptcha");
        output.innerHTML = "Correct!";
        document.getElementById('contactForm').submit();
    } else {
        output.classList.add("incorrectCaptcha");
        output.innerHTML = "Incorrect, please try again";
    }
});
// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function () {
    userText.value = "";
    let refreshArr = [];
    for (let j = 1; j <= 7; j++) {
        refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
    }
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    c = refreshArr.join('');
    ctx.fillText(refreshArr.join(''), captchaText.width / 4, captchaText.height / 2);
    output.innerHTML = "";
});