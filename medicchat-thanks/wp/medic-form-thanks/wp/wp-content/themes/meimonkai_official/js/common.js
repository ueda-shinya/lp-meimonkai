'use strict';
// ==========================================================================
// OSやブラウザを判定してbodyにclassを付与
// ==========================================================================
const ua = navigator.userAgent.toLowerCase(),
  ver = navigator.appVersion.toLowerCase(),
  rootClass = document.documentElement.classList;
//ブラウザ判定
const isMSIE = ua.indexOf('msie') > -1 && ua.indexOf('opera') === -1, // IE(11以外)
  isIE6 = isMSIE && ver.indexOf('msie 6.') > -1, // IE6
  isIE7 = isMSIE && ver.indexOf('msie 7.') > -1, // IE7
  isIE8 = isMSIE && ver.indexOf('msie 8.') > -1, // IE8
  isIE9 = isMSIE && ver.indexOf('msie 9.') > -1, // IE9
  isIE10 = isMSIE && ver.indexOf('msie 10.') > -1, // IE10
  isIE11 = ua.indexOf('trident/7') > -1, // IE11
  isIE = isMSIE || isIE11, // IE
  isEdge = ua.indexOf('edge') > -1, // Edge
  isChrome = ua.indexOf('chrome') > -1 && ua.indexOf('edge') === -1, // Google Chrome
  isFirefox = ua.indexOf('firefox') > -1, // Firefox
  isSafari = ua.indexOf('safari') > -1 && ua.indexOf('chrome') === -1, // Safari
  isOpera = ua.indexOf('opera') > -1; // Opera
{
  //デバイス判定
  const _ua = (function (u) {
    return {
      Tablet:
        (u.indexOf('windows') !== -1 &&
          u.indexOf('touch') !== -1 &&
          u.indexOf('tablet pc') === -1) ||
        u.indexOf('ipad') !== -1 ||
        (u.indexOf('android') !== -1 && u.indexOf('mobile') === -1) ||
        (u.indexOf('firefox') !== -1 && u.indexOf('tablet') !== -1) ||
        u.indexOf('kindle') !== -1 ||
        u.indexOf('silk') !== -1 ||
        u.indexOf('playbook') !== -1,
      Mobile:
        (u.indexOf('windows') !== -1 && u.indexOf('phone') !== -1) ||
        u.indexOf('iphone') !== -1 ||
        u.indexOf('ipod') !== -1 ||
        (u.indexOf('android') !== -1 && u.indexOf('mobile') !== -1) ||
        (u.indexOf('firefox') !== -1 && u.indexOf('mobile') !== -1) ||
        u.indexOf('blackberry') !== -1,
    };
  })(window.navigator.userAgent.toLowerCase());

  if (_ua.Mobile) {
    rootClass.add('_device-mobile'); //スマホならつけるクラス
  } else if (_ua.Tablet) {
    rootClass.add('_device-tablet'); //タブレットならつけるクラス
  } else {
    rootClass.add('_device-pc'); //スマホ・タブレット以外ならつけるクラス
  }
  if (navigator.platform.indexOf('Win') !== -1) {
    rootClass.add('_os-win'); //Windowsならつけるクラス
  } else if (navigator.platform.toLowerCase().indexOf('mac') > -1) {
    rootClass.add('_os-mac'); //Windows以外ならつけるクラス
  }
  if (ua.indexOf('iPhone') > 0) {
    rootClass.add('_mobile-iphone'); //iPhoneならつけるクラス
  } else if (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    rootClass.add('_mobile-android'); //Androidのスマホならつけるクラス
  } else if (ua.indexOf('iPad') > 0) {
    rootClass.add('_mobile-ipad'); //iPadならつけるクラス
  }
  if (isOpera) {
    rootClass.add('_browser-opera'); //オペラならつけるクラス
  } else if (isIE) {
    rootClass.add('_browser-ie'); //IEならつけるクラス
  } else if (isChrome) {
    rootClass.add('_browser-chrome'); //Chromeならつけるクラス
  } else if (isSafari) {
    rootClass.add('_browser-safari'); //Safariならつけるクラス
  } else if (isEdge) {
    rootClass.add('_browser-edge'); //Edgeならつけるクラス
  } else if (isFirefox) {
    rootClass.add('_browser-firefox'); //Firefoxならつけるクラス
  }
}
// ==========================================================================
// CSS遅延読み込み（class="async"をrel="stylesheet"に置換）
// ==========================================================================
{
  const webFonts = document.querySelectorAll('.async');
  for (let i = 0, l = webFonts.length; i < l; i++) {
    webFonts[i].rel = 'stylesheet';
  }
}
// ==========================================================================
// Google WebFont設定（familiesで指定したフォントを遅延読み込み）
// ==========================================================================
window.WebFontConfig = {
  google: {
    families: ['Crimson+Text:400i', 'Noto+Sans+JP:300,500,700&subset=japanese'],
  },
  active: function () {
    sessionStorage.fonts = true;
  },
};
{
  const wf = document.createElement('script');
  wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
}
// ==========================================================================
//【CSS】IEでposition: fixed;をやったらガタガタ揺れる場合の対応策 https://www.amezo.net/
// ==========================================================================
if (isIE) {
  $('body').on('mousewheel', function () {
    event.preventDefault();
    let wd = event.wheelDelta;
    let csp = window.pageYOffset;
    window.scrollTo(0, csp - wd);
  });
}
(function ($) {
  // ==========================================================================
  // ターゲットが特定位置を過ぎたらclass付与（ヘッダー追従）https://terkel.jp/archives/2011/05/jquery-floating-widget-plugin/
  // ==========================================================================
  const scrollClass = function() {
    // scroll イベントを設定
  /**
   * デバウンス関数
   * @param {function} func - 実行したい関数
   * @param {number} wait - 遅延させる時間 (ミリ秒)
   * @returns {function} デバウンス処理が施された関数
   */
  function debounce(func, wait) {
    var timeout; // setTimeoutのIDを保持するための変数

    // 実際にイベントハンドラとして登録される関数
    return function() {
      var context = this; // イベント発生時のthisを保持
      var args = arguments; // イベントの引数を保持

      clearTimeout(timeout); // 既にタイマーが設定されていれば、それをクリア
      // 指定されたwait時間後に、元の関数(func)を実行する新しいタイマーを設定
      timeout = setTimeout(function() {
        func.apply(context, args); // contextとargsを引き継いで関数を実行
      }, wait);
    };
  }

  // クラスを付け外しするメインの処理
  var scrollClass = function() {
    var scrollThreshold = 30; // クラスを切り替えるスクロール量の閾値 (30px)
    var debounceWaitTime = 100; // デバウンスの待ち時間 (100ミリ秒 = 0.1秒)
                               // この時間を調整することで、反応の具合を変えられます

    // scrollイベントが発生した時に、デバウンス処理を施した関数を実行
    $(window).on('scroll', debounce(function() {
      // 現在のウィンドウの垂直方向のスクロール量を取得
      var scrollY = $(window).scrollTop();

      if (scrollY > scrollThreshold) {
        // スクロール量が閾値を超えていたら、body要素に「_fixed」クラスを付与
        // jQueryのaddClassは、既にクラスが付いていても重複して付与しないので安心です
        $('body').addClass('_fixed');
      } else {
        // スクロール量が閾値以下なら、body要素から「_fixed」クラスを削除
        // removeClassも、クラスが存在しない場合にエラーになったりはしません
        $('body').removeClass('_fixed');
      }
    }, debounceWaitTime)); // 第2引数に待ち時間を指定
  };

  // 上で定義したscrollClass関数を実行して、スクロール監視を開始
  scrollClass();
  };
  // ==========================================================================
  // グローバルナビゲーションカレント制御
  // ==========================================================================
  const globalNavCurrent = function () {
    const nav = $('#global_navigation'); // 第二階層をデフォルトで折りたたみ
    let condIndex =
      /(http[s]?:\/\/(?:[\w-_]+\.?){1,6}\/?)|\/[0-9]*\/[0-9]*\/[\w]*\.html?|\/[\w]*\.html?/; // index 除去条件
    let path = location.href.replace(condIndex, '/'); // URL
    const checks = [path];

    // 文字列末尾から 1 ディレクトリずつ削り、URL を収集
    while (path && '/' !== path) {
      path = path.replace(/[^/]*\/?$/, '');
      checks.push(path);
    }

    // メニューの href 属性値をすべて取得
    let href = $('a', nav).map(function () {
      return $(this).attr('href').replace(condIndex, '/');
    });

    // URL と href 属性値の一致を判定
    // 一致した a 要素には class 属性値「current」を付与
    checkStart: for (let i = 0; i < checks.length; i++) {
      for (let j = 0; j < href.length; j++) {
        if (checks[i] === href[j]) {
          $('a', nav)
            .eq(j)
            .addClass('_current')
            .parents('li')
            .addClass('_parent');
          break checkStart;
        }
      }
    }
  };
  // ==========================================================================
  // ローカルナビゲーションカレント制御
  // ==========================================================================
  const localNavCurrent = function () {
    const nav = $('#local_navigation'); // 第二階層をデフォルトで折りたたみ
    let condIndex =
      /(http[s]?:\/\/(?:[\w-_]+\.?){1,6}\/?)|\/[0-9]*\/[0-9]*\/[\w]*\.html?|\/[\w]*\.html?/; // index 除去条件
    let path = location.href.replace(condIndex, '/'); // URL
    const checks = [path];

    // 文字列末尾から 1 ディレクトリずつ削り、URL を収集
    while (path && '/' !== path) {
      path = path.replace(/[^/]*\/?$/, '');
      checks.push(path);
    }

    // メニューの href 属性値をすべて取得
    let href = $('a', nav).map(function () {
      return $(this).attr('href').replace(condIndex, '/');
    });

    // URL と href 属性値の一致を判定
    // 一致した a 要素には class 属性値「current」を付与
    checkStart: for (let i = 0; i < checks.length; i++) {
      for (let j = 0; j < href.length; j++) {
        if (checks[i] === href[j]) {
          $('a', nav)
            .eq(j)
            .addClass('_current')
            .parents('li')
            .addClass('_parent')
            .closest('.lnl_wrapper')
            .css('display', 'block')
            .prevAll('button')
            .addClass('_open');
          break checkStart;
        }
      }
    }
  };
  // ==========================================================================
  // スムーススクロール制御（ヘッダー分の高さは「const header = $('#global_header').height() * 2.5;」で調整）
  // ==========================================================================
  const pageScroll = function () {
    $(document).ready(function () {
      //URLのハッシュ値を取得
      const urlHash = location.hash;
      //ハッシュ値があればページ内スクロール
      if ('' !== urlHash) {
        //スクロールを0に戻しておく
        $('body,html').stop().scrollTop(1);
        setTimeout(function () {
          //ロード時の処理を待ち、時間差でスクロール実行
          scrollToAnker(urlHash);
        }, 300);
      }

      //通常のクリック時
      $('a[href^="#"]')
        .not(
          'ul[class*="tab-head"] a[href^="#"], .lnl_title , .frm_repeat_buttons a',
        )
        .on('click', function () {
          //ページ内リンク先を取得
          const href = $(this).attr('href');
          //リンク先が#か空だったらhtmlに
          const hash = href === '#' || href === '' ? 'html' : href;
          //スクロール実行
          scrollToAnker(hash);
          //リンク無効化
          return false;
        });

      // 関数：スムーススクロール
      // 指定したアンカー(#ID)へアニメーションでスクロール
      function scrollToAnker(hash) {
        const target = $(hash);
        let navi = 0;
        if ($(window).width() >= 768) {
          //navi = $('#global_navigation .gn_subMenu').innerHeight();
        }
        const header = $('.headerNavigation').innerHeight() + 30 + navi;
        const position = target.offset().top - header;
        $('body,html').stop().animate({ scrollTop: position }, 300);
      }
    });
  };
  // ==========================================================================
  // SP用メニュー＆PCメガメニュー設定
  // ==========================================================================
  const toggleMenu = function () {
    const $body = $('body');
    // グローバルナビゲーション
    $('#gh_menu').on('click', function () {
      $body.toggleClass('_open-menu _open-bg');
    });
    $('#gn_close').on('click', function () {
      $body.removeClass('_open-menu _open-bg');
    });
    $(
      '.module_menu-01 > li [class*="mm_button"], .gf_links-01 > li .gfl_button',
    ).on('click', function () {
      $(this).next().next().toggleClass('_open').slideToggle(400);
      $(this).toggleClass('_open');
    });
    // グローバルメニューの動き
    $('.global_navigation .gn_links-01 > li._hasChild').on({
      mouseenter: function () {
        const height = $(this).find('.gnl_inner').outerHeight(true);
        if ($('html').hasClass('_pc')) {
          $body.addClass('_open-bg');
          $(this)
            .find('.gnl_wrapper')
            .first()
            .css({
              height: 0,
              visibility: 'inherit',
              opacity: '1',
              'pointer-events': 'auto',
            });
          $(this)
            .find('.gnl_wrapper')
            .first()
            .stop(true, true)
            .animate({ height: height }, 400, 'swing');
        }
        //ここにはマウスを離したときの動作を記述
      },
      mouseleave: function () {
        if ($('html').hasClass('_pc')) {
          $body.removeClass('_open-bg');
          $(this)
            .find('.gnl_wrapper')
            .animate({ height: 0 }, 400, 'swing')
            .queue(function () {
              $(this).removeAttr('style');
              $(this).dequeue();
            });
        }
      },
    });
    // 検索
    $('#search').on('click', function () {
      if ($body.hasClass('_open-bg')) {
        $body.addClass('_open-search');
      } else {
        if ($body.hasClass('_open-search')) {
          $body.removeClass('_open-search').removeClass('_open-bg');
        } else {
          $body.addClass('_open-search').addClass('_open-bg');
        }
      }
    });
    $('#gns_close, #overlay').on('click', function () {
      $body
        .removeClass('_open-search')
        .removeClass('_open-menu')
        .removeClass('_open-bg')
        .removeClass('_contentFixed');
    });
    // アーカイブ用のローカルナビゲーションを開閉式にする
    // $('body:not(.page) #local_navigation .ln_links-01 > li > .lnl_title').on(
    //   'click',
    //   function () {
    //     $(this).next().toggleClass('_open').slideToggle(400);
    //     $(this).toggleClass('_open');
    //     return false;
    //   },
    // );
    // アーカイブナビゲーション
    $('.an_links-01 > li > .anl_title').on('click', function () {
      $(this).next().toggleClass('_open').slideToggle(400);
      $(this).toggleClass('_open');
    });
    // アーカイブナビゲーション枠外クリック時に閉じる
    $(document).on('touchstart click', function (event) {
      if (!$(event.target).closest('.an_links-01').length) {
        $('.an_links-01 > li > .anl_title')
          .removeClass('_open')
          .next('.anl_wrapper')
          .removeClass('_open')
          .slideUp(400)
          .find('.anl_button, .anl_wrapper')
          .removeClass('_open')
          .siblings('.anl_wrapper')
          .slideUp(400);
      } else {
      }
    });
    $('.top_contents .content .button').on('click', function () {
      $(this)
        .closest('.club')
        .addClass('_open')
        .find('.bottom_contents')
        .slideDown(400);
    });

    $('.form_button .confirm input').on('click', function () {
      setTimeout(function () {
        const status = $('.wpcf7-form').attr('data-status');
        if (status === 'custom-wpcf7c-confirmed') {
          $('body').addClass('_confirm');
        }
        console.log(status);
      }, 500);
    });
    $('.form_button .back input').on('click', function () {
      $('body').removeClass('_confirm');
    });
    $('.module_accordion-01 .accordion .head').on('click', function () {
      $(this).next().slideToggle(400);
      $(this).closest('.accordion').toggleClass('_open');
    });

    // ウィンドウ幅によってクラス付与
    $(window).on('load resize', function () {
      const w = $(window).width();
      if (w <= 768) {
        $('html').addClass('_sp').removeClass('_pc _tablet');
        if ($('.module_menu-01 > li > .gnl_wrapper').hasClass('_open')) {
          $('.module_menu-01 > li > .gnl_wrapper._open').css(
            'display',
            'block',
          );
        }
      } else if (w < 1024) {
        $('html').addClass('_tablet').removeClass('_pc _sp');
      } else {
        $('html').addClass('_pc').removeClass('_tablet _sp');
      }
    });
  };
  // ==========================================================================
  // Class付与
  // ==========================================================================
  const addCss = function () {
    // 画像リンクのリンク先が画像の場合モーダル用class追加
    $('.gc_main a > img').each(function () {
      $(this)
        .parent(
          'a[href$=".jpg"],a[href$=".jpeg"], a[href$=".png"], a[href$=".gif"], a[href$=".svg"], a[href$=".webp"]',
        )
        .addClass('imgLink');
      $(this).parent('a').addClass('icon-none');
    });
    // エディタ内の画像配置classにラッパー要素を追加しclass付け替え
    $('.gc_main a > img.alignleft').each(function () {
      $(this)
        .removeClass('alignleft')
        .closest('a')
        .wrap('<div class="alignleft"></div>');
    });
    $('.gc_main a > img.alignright').each(function () {
      $(this)
        .removeClass('alignright')
        .closest('a')
        .wrap('<div class="alignright"></div>');
    });
    $('.gc_main a > img.aligncenter').each(function () {
      $(this)
        .removeClass('aligncenter')
        .closest('a')
        .wrap('<div class="aligncenter"></div>');
    });
    // エディタ内の表にclass追加
    $('.gc_main table:not([class])').each(function () {
      $(this).addClass('module_table-01');
    });
    // エディタ内の引用にclass追加
    $('.gc_main blockquote').each(function () {
      $(this).addClass('module_blockquote-01');
    });
    // エディタ内のリストにclass追加
    const notList = $('.gc_main ul:not([class]), .gc_main ol:not([class])');
    const notModule = $(
      '.gm_slider, [class*="module_gallery-"] ul, ul[class*="module_"], ol[class*="module_"], [class*="form_column-col"] ul, .module_menu-01 ul',
    );
    $(notList)
      .not(notModule)
      .each(function () {
        $(this).addClass('module_list-01');
      });
    // .global_contents内の新窓リンクにclass追加
    const notIcon = $(
      '[class*="module_card-"] a, .global_contents p a.icon-none, .top_banner-01 a',
    );
    $('.global_contents a:not([class])[target="_blank"]')
      .not(notIcon)
      .each(function () {
        $(this).addClass('icon-blank');
      });
    $('.module_pager-01 li.current')
      .prev('li')
      .addClass('current_prev')
      .prev('li')
      .addClass('current_prev2')
      .prev('li')
      .addClass('current_prev3')
      .prev('li')
      .addClass('current_prev4');
    $('.module_pager-01 li.current')
      .next('li')
      .addClass('current_next')
      .next('li')
      .addClass('current_next2')
      .next('li')
      .addClass('current_next3')
      .next('li')
      .addClass('current_next4');
  };
  // ==========================================================================
  // タグ追加・削除
  // ==========================================================================
  const initHTML = function () {
    // 空のpタグ削除
    $('.gc_main p').each(function () {
      let txt = $(this);
      if (txt.html().replace(/\s|&nbsp;/g, '').length === 0) {
        txt.remove();
      }
    });
    // 表にスクロール用ラッパー要素とclassを追加
    $('.module_table-01').wrap(
      '<div class="module_table-wrap js-scrollable"></div>',
    );
    $(window).on('load resize', function () {
      $('.module_table-wrap').each(function () {
        const $wrapperWidth = $(this).width();
        const $innerWidth = $(this).find('.module_table-01').width();
        if ($wrapperWidth < $innerWidth) {
          $(this).addClass('_scroll');
        } else {
          $(this).removeClass('_scroll');
        }
      });
    });
    // iframeにラッパー要素追加
    $('[class*="module_column-col"] iframe[src*="www.youtube.com"]').each(
      function () {
        $(this).unwrap().wrap('<div class="module_movie"></div>');
      },
    );
    $('[class*="module_column-col"] iframe[src*="www.google.com/maps/"]').each(
      function () {
        $(this).unwrap().wrap('<div class="module_map"></div>');
      },
    );
    // パスワード保護フォームinputにラッパー要素追加（疑似要素追加用）
    $('.module_password form input[type="submit"]').wrap(
      '<span class="mp_submit-wrap"><span class="mp_submit-inner"></span></span>',
    );
  };
  // ==========================================================================
  // モジュールスライダー設定
  // ==========================================================================
  const moduleSlider = function () {
    $(window).on('load', function () {
      $('.module_slider .swiper-container').each(function (i) {
        $(this).addClass('module_slider-' + (i + 2));
        const target = '.module_slider-';
        let target_i = $(target + (i + 2));
        let targetClass = '.module_slider-' + (i+2);

        let next = targetClass + ' .swiper-button-next';
        let prev = targetClass + ' .swiper-button-prev'; 
        let pagination = targetClass + ' .swiper-pagination'; 
        
        const slidesPerView_sp = 1; // スライド表示数
        const slidesPerView_pc = 1; // スライド表示数
        const $slide_sp = $(targetClass + ' .swiper-slide');
        const $slide_pc = $(targetClass + ' .swiper-slide');
        const slidable_sp = $slide_sp.length > slidesPerView_sp;
        const slidable_pc = $slide_pc.length > slidesPerView_pc;
        const containerModifierClass_sp =  slidable_sp ? 'is-active swiper-container-' : 'swiper-container-'; // スライドがアクティブな場合は、コンテナー要素にクラス名「is-active」を設定
        const containerModifierClass_pc =  slidable_pc ? 'is-active swiper-container-' : 'swiper-container-'; // スライドがアクティブな場合は、コンテナー要素にクラス名「is-active」を設定


        target_i.each(function () {
          const module_slider = new Swiper(target_i[0], {
            containerModifierClass: containerModifierClass_sp,
            slidesPerView: slidesPerView_sp,
            loop: slidable_sp,
            loopedSlides: '.swiper-slide'.length,
            speed: 800,
            autoplay: {
              delay: 8000,
              stopOnLastSlide: false,
              disableOnInteraction: false,
              reverseDirection: false,
            },
            navigation: {
              nextEl: next,
              prevEl: prev,
            },
            pagination: {
              el: pagination,
              clickable: true
            },
            watchOverflow: true, //スライドの枚数がスライダー生成の条件に満たさない時（わかりやすい話、１枚しかスライドがないとか）、コントロール関係を削除してスライド機能もなくす。
            breakpoints: {
              768: {
                containerModifierClass: containerModifierClass_pc,
                slidesPerView: slidesPerView_pc,
                loop: slidable_pc,
                spaceBetween: 30,
              },
            },
          });
        });

        // .swiper-button-nextと.swiper-button-prevの位置を.headの中央に移動させる
        const headHeight = target_i.find('.head').outerHeight();
        const buttonTop = headHeight / 2;
        target_i.find('.swiper-button-next, .swiper-button-prev').css({
          'top': buttonTop,
          'transform': 'translateY(-50%)'
        });

      });
    });
  };
  // ==========================================================================
  // モジュールモーダル設定 http://www.humaan.com/modaal/
  // ==========================================================================
  const moduleModal = function () {
    $(
      '[class*="module_gallery"] a, .module_column-col2 .imgLink, .module_column-col1 .imgLink',
    ).modaal({
      type: 'image',
    });
  };
  // ==========================================================================
  // モジュールアコーディオン設定
  // ==========================================================================
  const moduleAccordion = function () {
    $('.module_faqList-01 > li').each(function () {
      const $list = $(this);
      const $button = $(this).find('.head');
      $list.find('.body').hide();
      $button.on('click', function () {
        if ($list.hasClass('_open')) {
          $list.removeClass('_open');
          $list.find('.body').slideUp(300);
        } else {
          // 項目を開いたときに他の項目を閉じる場合は下記を追加
          // $('.module_faqList-01 > li').removeClass('_open').find('.body').slideUp(300);
          $list.addClass('_open');
          $list.find('.body').slideDown(300);
        }
      });
    });
  };
  // ==========================================================================
  // タブ切り替え設定 https://gist.github.com/sakunyo/4538094
  // ==========================================================================
  const dualTabSetting = function () {
    $('.module_tab-01').dualTab({
      selected: '_current',
      menus: '> .module_tab-head li',
      body: '> .module_tab-body',
    });
  };
  // ==========================================================================
  // 外部から来た時のタブ切り替え
  // ==========================================================================
  const tabLink = function () {
    const hash = location.hash;
    $('.module_tab-01 .module_tab-body').each(function () {
      let id = $(this).attr('id');
      id = '#' + id;
      if (hash.length !== 0) {
        if (hash === id) {
          $(this).attr('style', 'display:block');
        } else {
          $(this).attr('style', 'display:none');
        }
      }
    });
    $('.module_tab-01 .module_tab-head li a').each(function () {
      const href = $(this).attr('href');
      if (hash.length !== 0) {
        if (hash === href) {
        } else {
          $(this).parent().removeClass('_current');
        }
      }
    });
  };
  // ==========================================================================
  // メニューオープン時背景のスクロール禁止
  // ==========================================================================
  const contentFixed = function () {
    let state = false;
    let scrollpos;
    $('#gh_menu').on('click', function () {
      if (state == false) {
        scrollpos = $(window).scrollTop();
        $('body').addClass('_contentFixed').css({ top: -scrollpos });
        state = true;
      } else {
        $('body').removeClass('_contentFixed').css({ top: 0 });
        window.scrollTo(0, scrollpos);
        state = false;
      }
    });
    $('#gn_close').on('click', function () {
      $('body').removeClass('_contentFixed').css({ top: 0 });
      window.scrollTo(0, scrollpos);
      state = false;
    });
  };

  // ==========================================================================
  // table
  // スクロールヒント
  // ==========================================================================
  const scrollHint = function () {
    window.addEventListener('DOMContentLoaded', function () {
      new ScrollHint('.js-scrollable', {
        //scrollHintIconAppendClass: 'scroll-hint-icon-green', // white-icon will appear
        remainingTime: -1, //5000
        i18n: {
          scrollable: 'スクロールできます',
        },
      });
    });
  };

  // ==========================================================================
  // selectリンク
  // ==========================================================================
  const moduleSelect = function () {
    // select後移行
    $('.module_select-01 select').on('change', function () {
      if ($(this).val() != '') {
        location.href = $(this).val();
      }
    });
    // select移行後ラベルをselectedにする
    const dir = location.href.split('/');
    const dir1 = dir[dir.length - 2];
    const dir2 = dir[dir.length - 3];
    $('.module_select-01 select option').each(function () {
      let value = $(this).val();
      value = value.split('/');
      let value1 = value[value.length - 2];
      if (dir2 !== 'category' && dir2 !== 'date') {
        // /news/category/news/の場合や初期ラベル（カテゴリ、年度別）を除く
        $(this).prop('selected', true);
        return false;
      } else {
        if (dir1 === value1) {
          $(this).prop('selected', true);
        }
      }
    });
  };
  // ==========================================================================
  // pageTop
  // ==========================================================================
  const pageTop = function () {
    let topBtn = $('.gf_pageTop');
    //ボタンを非表示にする
    topBtn.hide();
    //スクロールしてページトップから100に達したらボタンを表示
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        //フェードインで表示
        topBtn.fadeIn();
      } else {
        //フェードアウトで非表示
        topBtn.fadeOut();
      }
    });
    //フッター手前でボタンを止める
    // $(window).scroll(function () {
    //   let ww = $(window).width();
    //   let height = $(document).height(); //ドキュメントの高さ
    //   let position = $(window).height() + $(window).scrollTop(); //ページトップから現在地までの高さ
    //   let footersp = $('.gf_information').innerHeight() + 30; //フッターの高さ
    //   let footertb = $('.gf_information').innerHeight() + 30; //フッターの高さ
    //   let footerpc = $('.gf_information').innerHeight() + 30; //フッターの高さ

    //   if (ww < 768) {
    //     if (height - position < footersp - 80) {
    //       topBtn.css({
    //         position: 'absolute',
    //         bottom: footersp,
    //       });
    //     } else {
    //       topBtn.css({
    //         position: 'fixed',
    //         bottom: '80px',
    //       });
    //     }
    //   } else if (ww < 1024) {
    //     if (height - position < footertb) {
    //       topBtn.css({
    //         position: 'absolute',
    //         bottom: footertb,
    //       });
    //     } else {
    //       topBtn.css({
    //         position: 'fixed',
    //         bottom: '80px',
    //       });
    //     }
    //   } else {
    //     if (height - position < footerpc) {
    //       topBtn.css({
    //         position: 'absolute',
    //         bottom: footerpc,
    //       });
    //     } else {
    //       topBtn.css({
    //         position: 'fixed',
    //         bottom: '40px',
    //       });
    //     }
    //   }
    // });
  };


  // jQueryの準備ができたら実行するお決まりの書き方です
const successScroll = function () {
  $(document).ready(function () {
    // HTML要素をjQueryオブジェクトとして取得します
    // $マークを変数名の頭につけるのは、jQueryオブジェクトであることを示す慣習です
    const $districtSelect = $('#district-select'); // 地区選択のセレクトボックス
    const $globalMenu = $('.headerNavigation');     // グローバルメニュー

    // セレクトボックスの値が変更された時に実行する処理
    $districtSelect.on('change', function () {
      // 選択された値を取得します。$(this) はイベントが発生した要素（この場合はセレクトボックス）を指します
      let selectedValue = $(this).val();

      // selectedValueが文字列型で、かつ '#' で始まる場合は、その '#' を取り除きます
      // (例: '#section1' -> 'section1')
      if (typeof selectedValue === 'string' && selectedValue.startsWith('#')) {
        selectedValue = selectedValue.substring(1);
      }

      // selectedValueに値がある（空っぽではない）場合のみ処理を進めます
      if (selectedValue) {
        // 選択された値と同じIDを持つHTML要素をページ内から探します
        const $targetBlock = $('#' + selectedValue);

        // $targetBlock が実際にページ内に存在する場合 (lengthが0より大きい場合)
        if ($targetBlock.length) {
          // グローバルメニューの高さを取得します。
          // $globalMenuが存在すればその高さ、なければ0とします。
          // .outerHeight() はpaddingとborderを含む高さを取得します。
          const headerHeight = ($globalMenu.length ? $globalMenu.outerHeight() : 0) + 8; // 8pxの追加オフセット

          // スクロール先の位置を計算します
          // $targetBlock.offset().top は、ドキュメントの先頭からの $targetBlock の距離です
          const position = $targetBlock.offset().top - headerHeight;

          // ページ全体（htmlとbody）を、計算した位置(position)までスクロールさせます
          // 500ミリ秒（0.5秒）かけてスムーズにスクロールします
          $('html, body').animate({
            scrollTop: position
          }, 500); // 500ミリ秒でアニメーション

          // (任意) スクロール後、セレクトボックスの選択をリセットします
          $(this).val(''); // セレクトボックスの値を空に戻す
        } else {
          // (任意) 対象の要素が見つからなかった場合の処理
          console.warn('スクロール対象の要素が見つかりませんでした: #' + selectedValue);
        }
      }
    });
  });
}

  // ==========================================================================
  // 実行
  // ==========================================================================
  globalNavCurrent();
  localNavCurrent();
  pageScroll();
  toggleMenu();
  addCss();
  initHTML();
  moduleSlider();
  moduleModal();
  moduleAccordion();
  dualTabSetting();
  tabLink();
  contentFixed();
  scrollHint();
  moduleSelect();
  pageTop();
  scrollClass();
  successScroll();
})(jQuery);
