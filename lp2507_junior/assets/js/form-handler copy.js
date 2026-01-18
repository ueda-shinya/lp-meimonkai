document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const csrfInput = form.querySelector('input[name="csrf_token"]');

  // CSRFトークン再取得用関数
  async function refreshCsrfToken() {
    try {
      const res = await fetch("/csrf-token.php", {
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      });
      if (!res.ok) throw new Error("CSRF token fetch failed");
      const data = await res.json();
      if (data.token) {
        csrfInput.value = data.token;
      }
    } catch (err) {
      console.error("CSRFトークンの再取得に失敗しました", err);
    }
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const text = await res.text();

      if (res.ok) {
        alert(text);          // 正常送信
        form.reset();         // フォーム初期化
      } else {
        alert("送信エラー：" + text); // エラー内容を表示
      }

      await refreshCsrfToken(); // 成否問わずトークンを再取得

    } catch (error) {
      alert("通信エラーが発生しました。");
      console.error(error);
      await refreshCsrfToken(); // 通信エラー時も再取得
    }
  });
});
