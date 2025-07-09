document.addEventListener('DOMContentLoaded', () => {
  const baseURL = 'https://toropogy.github.io/tools-site/';
  const headerURL = baseURL + 'header.html';
  const footerURL = baseURL + 'footer.html';
  const menuURL   = baseURL + 'menu.json';

  // ヘッダー読み込み
  fetch(headerURL)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      setupCategoryMenu();
      setupScrollBehavior();
    })
    .catch(console.error);

  // フッター読み込み
  fetch(footerURL)
    .then(r => r.text())
    .then(html => document.body.insertAdjacentHTML('beforeend', html))
    .catch(console.error);

  // 分類メニューの取得＆設定
  function setupCategoryMenu() {
    fetch(menuURL)
      .then(r => r.json())
      .then(menu => {
        const list = document.getElementById('category-list');
        menu.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${item.url}">${item.label}</a>`;
          list.appendChild(li);
        });
      })
      .catch(console.error);

    document.addEventListener('click', e => {
      const toggle = document.getElementById('category-toggle');
      const menu   = document.getElementById('category-list');
      if (!menu) return;
      if (e.target === toggle) {
        menu.classList.toggle('hidden');
      } else if (!menu.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });
  }

  // スクロールでヘッダーを隠す／表示
  function setupScrollBehavior() {
    let lastY = window.scrollY;
    const header = document.querySelector('.appbar');
    if (!header) return;
    header.style.transition = 'transform 0.3s ease';

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.style.transform = y < lastY ? 'translateY(0)' : 'translateY(-100%)';
      lastY = y;
    }, { passive: true });
  }
});
