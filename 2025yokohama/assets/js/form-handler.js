document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const csrfInput = form.querySelector('input[name="csrf_token"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData
      });

      const result = await res.json();

      if (res.ok && result.message) {
        alert(result.message);
        form.reset();
        if (result.token) {
          csrfInput.value = result.token; // ✅ 新トークンを受け取り反映
        }
      } else {
        alert("送信エラー：" + (result.error || "不明なエラー"));
        if (result.token) {
          csrfInput.value = result.token; // 念のため更新
        }
      }
    } catch (error) {
      alert("通信エラーが発生しました。");
      console.error(error);
    }
  });
});
