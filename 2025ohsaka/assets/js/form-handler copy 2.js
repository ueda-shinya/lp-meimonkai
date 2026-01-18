document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const csrfInput = form.querySelector('input[name="csrf_token"]');

  async function refreshCsrfToken() {
    try {
      const res = await fetch("/csrf-token.php", {
        method: "GET",
        headers: { "Accept": "application/json" }
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
        alert(text);
        form.reset();
      } else {
        alert("送信エラー：" + text);
      }

      await refreshCsrfToken();
    } catch (error) {
      alert("通信エラーが発生しました。");
      console.error(error);
      await refreshCsrfToken();
    }
  });
});
