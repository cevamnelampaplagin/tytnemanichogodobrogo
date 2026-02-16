(function () {
  "use strict";

  // Список усіх URL-адрес для завантаження
  const ALL_URLS = [
    "http://wtch.ch/m", // Онлайн без преміум
    "https://lampame.github.io/main/bo.js", // Бандера Онлайн
    "https://icantrytodo.github.io/lampa/torrent_styles_v2.js", // стиль торентів (може конфліктувати)
    "https://darkestclouds.github.io/plugins/easytorrent/easytorrent.min.js", // рекомендація торрентів
    "https://вашепосилання009",
  ];

  // Функція перевірки доступності одного URL (без виконання скрипта)
  function isUrlReachable(url) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/plain'; // не виконується, тільки завантажується
      script.src = url;

      // Таймаут на випадок дуже повільної відповіді
      const timeout = setTimeout(() => {
        cleanup();
        resolve(false);
      }, 10000); // 10 секунд

      const cleanup = () => {
        clearTimeout(timeout);
        if (script.parentNode) script.parentNode.removeChild(script);
        script.onload = script.onerror = null;
      };

      script.onload = () => {
        cleanup();
        resolve(true);
      };
      script.onerror = () => {
        cleanup();
        resolve(false);
      };

      document.head.appendChild(script);
    });
  }

  // Асинхронне фільтрування працюючих URL
  async function getWorkingUrls(urls) {
    const results = await Promise.all(urls.map(url => isUrlReachable(url)));
    return urls.filter((_, index) => results[index]);
  }

  // Функція завантаження скриптів (тільки з працюючих URL)
  async function loadScripts() {
    const working = await getWorkingUrls(ALL_URLS);
    if (working.length > 0) {
      Lampa.Utils.putScriptAsync(working, () => {});
    } else {
      console.warn('Жоден URL не доступний. Скрипти не завантажено.');
    }
  }

  // Чекаємо на появу Lampa
  const timer = setInterval(function () {
    if (typeof Lampa !== "undefined") {
      clearInterval(timer);

      // Перше завантаження після перевірки
      loadScripts();

      // Перевірка кожні 2 години (оновлюємо внутрішній список, але не перезавантажуємо)
      setInterval(() => {
        getWorkingUrls(ALL_URLS).then(working => {
          // Можна зберегти десь, але для прикладу просто логуємо
          console.log('Перевірено URL. Працюють:', working);
        });
      }, 2 * 60 * 60 * 1000); // 2 години
    }
  }, 200);
})();
