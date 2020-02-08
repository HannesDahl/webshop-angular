$(document).ready(function () {
    $('.sidenav').sidenav({
        edge: 'right'
    });
});
$(document).ready(function () {
    $('select').formSelect();
});
var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 5000,
    },
    pagination: {
        el: '.swiper-pagination',
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
