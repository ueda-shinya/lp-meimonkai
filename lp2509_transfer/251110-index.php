<?php
session_start();
$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
?>
<!DOCTYPE html>
<html lang="ja">

  <head>
  <!-- Google Tag Manager -->
  <script>
    (function(w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-MKW6CZF');
  </script>
  <!-- End Google Tag Manager -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <title>本当に行きたい夢の第一志望校へ|名門会</title>
    <meta property="og:title" content="">
    <meta property="og:type" content="website">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <meta property="og:site_name" content="">
    <meta property="og:description" content="">
    <meta property="og:locale" content="ja_JP">
    <meta http-equiv="Cache-Control" content="no-store">
    <link rel="apple-touch-icon" href="./assets/images/favicon.ico" sizes="180x180">
    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico">
    <link rel="icon" href="./assets/images/favicon.ico" sizes="any">
    <link rel="stylesheet" type="text/css" href="./assets/css/destyle.css">
    <link rel="stylesheet" href="./assets/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap" rel="stylesheet">
  </head>

  <body>
  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MKW6CZF"
      height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->
    <header>
    </header>
    <main>
      <div class="cta-area header-wrapper">
        <h1>
          <img src="./assets/images/fv@2x.webp" alt="本当に行きたい夢の第一志望校へ" width="375" height="650">
        </h1>
        <a href="#contact-form">
          <img class="btn-cta_img  cta-fv cta_a" src="./assets/images/cta@2x.webp" alt="" width="344" height="62"
            decoding="async" loading="lazy">
        </a>
      </div>
      <div class="cta-area">
        <img src="./assets/images/page3@2x.webp" alt="" width="375" height="3021" decoding="async" loading="lazy">
        <a href="#contact-form" style="display: none;">
          <img class="btn-cta_img cta-page3 cta_a" src="./assets/images/cta@2x.webp" alt="" width="344" height="62"
          decoding="async" loading="lazy">
        </a>
      </div>
      <img src="./assets/images/page2@2x.webp" alt="" width="375" height="3324" decoding="async" loading="lazy">
      <img src="./assets/images/page1@2x.webp" alt="" width="375" height="2257" decoding="async" loading="lazy">
      <form id="contact-form" name="contact" action="sendmail.php" method="POST">
        <h2>お申し込み</h2>
        <!-- ご希望の場所 -->
        <fieldset>
          <legend>ご希望の場所 <span style="color:red;font-size:0.75em;">※必須</span></legend>
          <label><input type="radio" name="place" value="教室" required> 教室</label>
          <label><input type="radio" name="place" value="ご自宅" required> ご自宅</label>
          <label><input type="radio" name="place" value="オンライン" required> オンライン</label>
        </fieldset>
        <div>
          <label>お名前 <span style="color:red;font-size:0.75em;">※必須</span>
            <input type="text" name="name" required>
          </label>
        </div>
        <div>
          <label>フリガナ <span style="color:red;font-size:0.75em;">※必須</span>
            <input type="text" name="furigana" required>
          </label>
        </div>
        <!-- 郵便番号 自動入力対応 -->
        <div>
          <label>郵便番号 <span style="color:red;font-size:0.75em;">※必須</span><input type="text" name="postcode"
              placeholder="" required>
          </label>
        </div>
        <div>
          <label>都道府県 <span style="color:red;font-size:0.75em;">※必須</span><input type="text" name="pref" required>
          </label>
        </div>
        <div>
          <label>市区町村 <span style="color:red;font-size:0.75em;">※必須</span><input type="text" name="city" required>
          </label>
        </div>
        <div>
          <label>町名・番地 <span style="color:red;font-size:0.75em;">※必須</span><input type="text" name="address" required>
          </label>
        </div>
        <div>
          <label>建物名・部屋番号<input type="text" name="building">
          </label>
        </div>
        <div>
          <label>電話番号 <span style="color:red;font-size:0.75em;">※必須</span>
            <input type="tel" name="tel" required>
          </label>
        </div>
        <div>
          <label>メールアドレス <span style="color:red;font-size:0.75em;">※必須</span>
            <input type="email" name="email" required>
          </label>
        </div>
        <fieldset>
          <legend>性別 <span style="color:red;font-size:0.75em;">※必須</span></legend>
          <label><input type="radio" name="gender" value="男性" required> 男性</label>
          <label><input type="radio" name="gender" value="女性" required> 女性</label>
        </fieldset>
        <fieldset>
          <legend>学年 <span style="color:red;font-size:0.75em;">※必須</span></legend>
          <?php
        $grades = ['小学生未満', '小学1年生', '小学2年生', '小学3年生', '小学4年生', '小学5年生', '小学6年生', '中学1年生', '中学2年生', '中学3年生', '高校1年生', '高校2年生', '高校3年生', '高校卒'];
        foreach ($grades as $grade) {
          echo "<label><input type='radio' name='grade' value='{$grade}' required> {$grade}</label>\n";
        }
        ?>
        </fieldset>
        <fieldset>
          <legend>通われている学校</legend>
          <label><input type="radio" name="school_type" value="公立"> 公立</label>
          <label><input type="radio" name="school_type" value="国立"> 国立</label>
          <label><input type="radio" name="school_type" value="私立"> 私立</label>
        </fieldset>
        <div class="school">
          <label>通われている学校名<br>
            <input type="text" name="school_name">
            <small>※「学年」で「高校卒」を選択した方は、卒業された学校名をご入力願います。</small>
          </label>
        </div>
        <fieldset>
          <legend>お問い合わせされる方 <span style="color:red;font-size:0.75em;">※必須</span></legend>
          <label><input type="radio" name="contact_person" value="生徒ご本人" required> 生徒ご本人</label>
          <label><input type="radio" name="contact_person" value="お父様" required> お父様</label>
          <label><input type="radio" name="contact_person" value="お母様" required> お母様</label>
          <label><input type="radio" name="contact_person" value="他保護者様" required> 他保護者様</label>
          <label><input type="radio" name="contact_person" value="兄弟・姉妹" required> 兄弟・姉妹</label>
          <label><input type="radio" name="contact_person" value="その他" required> その他</label>
        </fieldset>
        <fieldset>
          <legend>リソー教育グループのご利用状況 <span style="color:red;font-size:0.75em;">※必須</span></legend>
          <label><input type="radio" name="resou_status" value="会員ではない" required> 会員ではない</label>
          <label><input type="radio" name="resou_status" value="名門会会員" required> 名門会会員</label>
          <label><input type="radio" name="resou_status" value="TOMEIKAI会員" required> TOMEIKAI会員</label>
          <label><input type="radio" name="resou_status" value="TOMAS会員" required> TOMAS会員</label>
          <label><input type="radio" name="resou_status" value="その他リソー教育グループ会員" required> その他リソー教育グループ会員</label>
        </fieldset>
        <div>
          <label>ご質問・ご相談<textarea name="message" rows="5" placeholder="ご自由にご記入ください"></textarea>
          </label>
        </div>
        <!-- CSRFトークン -->
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
        <!-- ハニーポット -->
        <div style="position:absolute; left:-9999px;" aria-hidden="true">
          <label>ニックネーム（空欄にしてください）： <input type="text" name="nickname" tabindex="-1" autocomplete="off">
          </label>
        </div>
        <button type="submit">送信</button>
      </form>
      <!--  -->
      <img src="./assets/images/page4@2x.webp" alt="" width="374" height="2150" decoding="async" loading="lazy">
      <img src="./assets/images/page5@2x.webp" alt="" width="374" height="983" decoding="async" loading="lazy">
    </main>
    <footer>
      <a class="footer_a" href="#contact-form">
        <img src="./assets/images/cta@2x.webp" alt="" width="344" height="62" decoding="async" loading="lazy">
      </a>
    </footer>
    <!-- スクリプト -->
    <script src="./assets/js/hide-footer-on-cta.js" defer></script>
    <script src="./assets/js/lazyload-prioritize.js" defer></script>
    <script src="./assets/js/form-handler.js" defer></script>
    <script src="./assets/js/zip.js" defer></script>
  </body>

</html>