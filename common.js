document.addEventListener('DOMContentLoaded', () => {
  const headerURL = 'https://toropogy.github.io/tools-site/header.html';
  const footerURL = 'https://toropogy.github.io/tools-site/footer.html';
  const menuURL = 'https://toropogy.github.io/tools-site/menu.json';

  // ヘッダーを読み込む
  fetch(headerURL)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);

      // ヘッダーのCSSは header.html に埋め込まれている前提

      // カテゴリメニューの読み込み
      fetch(menuURL)
        .then(res => res.json())
        .then(menu => {
          const list = document.getElementById('category-list');
          if (!list) return;
          menu.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.url}">${item.label}</a>`;
            list.appendChild(li);
          });
        });

      // 分類ボタンクリックでドロップダウン開閉
      document.addEventListener('click', e => {
        const target = e.target;
        const menu = document.getElementById('category-list');
        if (!menu) return;

        if (target.id === 'category-toggle') {
          menu.classList.toggle('hidden');
        } else if (!menu.contains(target)) {
          menu.classList.add('hidden');
        }
      });

      // 🔽 スクロールによる AppBar 表示切り替え
      let lastScrollY = window.scrollY;
      const header = document.querySelector('.appbar');

      window.addEventListener('scroll', () => {
        const currentY = window.scrollY;

        if (!header) return;

        if (currentY < lastScrollY) {
          // 上にスクロール → ヘッダー表示
          header.style.transform = 'translateY(0)';
        } else {
          // 下にスクロール → ヘッダー非表示
          header.style.transform = 'translateY(-100%)';
        }

        lastScrollY = currentY;
      }, { passive: true });

      // 初期状態で見えてるようにする
      const initHeader = document.querySelector('.appbar');
      if (initHeader) {
        initHeader.style.transition = 'transform 0.3s ease';
      }
    });

  // フッターを読み込む
  fetch(footerURL)
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    });
});
