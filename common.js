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
  fetch('https://toropogy.github.io/tools-site/menu.json')
  .then(res => res.json())
  .then(menu => {
    const list = document.getElementById('category-list');
    menu.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${item.url}">${item.label}</a>`;
      list.appendChild(li);
    });
  });

});
