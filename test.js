
'use strict';

// HTML шаблон елемента меню (SVG спрощено до плейсхолдера,
// у твоєму файлі там повний шлях path d="M 3 20.5 ...")
Lampa.Template.add('menu_yt', `
  <li class="menu__item menu_yt">
    <div class="menu__ico">
      <!-- SVG іконка YouTube (витягни з оригінального коду, де починається '<svg ...>') -->
      <svg xmlns="http://www.w3.org/2000/svg"
           x="0px" y="0px" width="100" height="50"
           viewBox="0 0 50 50" style="fill:#ffffff;">
        <path d="M 3 20.5  ...  Z"></path>
      </svg>
    </div>
    <div class="menu__text">YouTube</div>
  </li>
`);

// Після ініціалізації додатку додаємо пункт у меню
Lampa.Listener.follow('app', function (event) {
  if (event.type !== 'ready') return;

  // створюємо кнопку з шаблону
  const btn = Lampa.Template.get('menu_yt');

  // на hover/enter по елементу меню відкриваємо YouTube TV
  btn.on('hover:enter', function () {
    // додаємо (або просто клікаємо) посилання на youtube.com/tv
    const link = $('<a target="_blank" href="https://www.antutu.com/html5"></a>')[0];
    link.click();
  });

  // додаємо кнопку до основного списку меню
  $('.menu .menu__list').eq(0).append(btn);
});

// Додатковий обробник для подій у меню (на випадок, якщо Lampa шле подію по name)
Lampa.Listener.follow('menu', function (event) {
  if (event.type === 'hover:enter' && event.name === 'menu_yt') {
    // знаходимо наш елемент та симулюємо клік
    const link = $('<a target="_blank" href="https://youtube.com/tv"></a>')[0];
    link.click();
  }
});
