"use strict";
(function ($) {
  // ==========================================================================
  // 教室紹介　地図のhover
  // ==========================================================================
  const mapHover = function () {
    $(window).on('load', function () {
      $('[data-termid]').hover(
        function() {
          const termId = $(this).data('termid');
          $('[data-termid="' + termId + '"]').addClass('_js-hover');
        },
        function() {
          const termId = $(this).data('termid');
          $('[data-termid="' + termId + '"]').removeClass('_js-hover');
        }
      );
    });
  };
  // ==========================================================================
  // 対象者別　mainvisualのslider
  // ==========================================================================
  const targetSlider = function () {
    $(window).on('load', function () {
      const news_swiper = new Swiper('.targetMV_swiper-container:not(._set-1)', {
        loop: true,
        loopAdditionalSlides: 1,
        slidesPerView: 1,
        speed: 1000,
        watchOverflow: true,
        centeredSlides: true,
        allowTouchMove: true, // スワイプでの切り替え
        // autoplay: {
        //   delay: 4500,
        //   disableOnInteraction: false
        // },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
              spaceBetween: 40,
            },
        },
      });
    });
  };
  // ==========================================================================
  // 対象者別　重要なお知らせ
  // ==========================================================================
  const targetInformation = function () {
    $(window).on('load', function () {
      const news_swiper = new Swiper('.targetInfo_swiper-container', {
        loop: true,
        loopAdditionalSlides: 1,
        slidesPerView: 1,
        speed: 1000,
        spaceBetween: 20,
        watchOverflow: true,
        centeredSlides: true,
        allowTouchMove: true, // スワイプでの切り替え
        autoplay: {
          delay: 4500,
          disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
      });
    });
  };

  // ==========================================================================
  // 実行
  // ==========================================================================
  mapHover();
  targetSlider();
  targetInformation();

})(jQuery);