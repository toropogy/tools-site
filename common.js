document.addEventListener('DOMContentLoaded', () => {
  // ヘッダー
  fetch('https://toropogy.github.io/tools-site/header.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
    });

  // フッター
  fetch('https://toropogy.github.io/tools-site/footer.html')
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
});
