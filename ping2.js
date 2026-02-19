(async function () {
  'use strict';

  Lampa.Platform.tv();

  // --------------------------------------------------
  // Список серверів
  // login / password можна залишати пустими
  // --------------------------------------------------
  const servers = [
    { host: '95.174.93.5:8090', login: '', password: '' },
    { host: '83.143.113.137:8090', login: '', password: '' },
    { host: '146.59.45.143:8090', login: 'bazarnetua', password: 'lampaua' },
    { host: 'lam.maxvol.pro/ts', login: '1zmugz8t', password: 'ts' }
  ];

  // --------------------------------------------------
  // Скидання статусів
  // --------------------------------------------------
  servers.forEach((_, i) => {
    Lampa.Storage.set(`FreeServ_${i + 1}`, 'NotFound');
  });

  // --------------------------------------------------
  // Формування URL з логіном
  // --------------------------------------------------
  function buildUrl(server) {

    // ТУТ підставляється login і password якщо вони є
    if (server.login && server.password) {
      return `http://${server.login}:${server.password}@${server.host}`;
    }

    return `http://${server.host}`;
  }

  // --------------------------------------------------
  // Ping через Image (працює в Lampa)
  // --------------------------------------------------
  function pingServer(server, index) {

    return new Promise((resolve) => {

      const img = new Image();
      const url = buildUrl(server) + '/echo?' + Date.now();

      let finished = false;

      const timeout = setTimeout(() => {
        if (!finished) {
          finished = true;
          Lampa.Storage.set(`FreeServ_${index + 1}`, 'NotFound');
          resolve();
        }
      }, 4000);

      img.onload = function () {
        if (!finished) {
          finished = true;
          clearTimeout(timeout);
          Lampa.Storage.set(`FreeServ_${index + 1}`, server.host);
          resolve();
        }
      };

      img.onerror = function () {
        if (!finished) {
          finished = true;
          clearTimeout(timeout);
          Lampa.Storage.set(`FreeServ_${index + 1}`, server.host);
          resolve();
        }
      };

      img.src = url;
    });
  }

  // --------------------------------------------------
  // Послідовний ping
  // --------------------------------------------------
  async function pollServers() {
    for (let i = 0; i < servers.length; i++) {
      await pingServer(servers[i], i);
    }
  }

  // --------------------------------------------------
  // Приховування NotFound
  // --------------------------------------------------
  setInterval(() => {
    const el = $('.selectbox-item.selector > div:contains("NotFound")');
    if (el.length > 0) el.parent('div').hide();
  }, 100);

  pollServers();

  // --------------------------------------------------
  // Додавання в налаштування
  // --------------------------------------------------
  setTimeout(() => {

    Lampa.SettingsApi.addParam({
      component: 'server',
      param: {
        name: 'freetorrserv',
        type: 'select',
        values: servers.reduce((acc, _, i) => {
          acc[i + 1] = Lampa.Storage.get(`FreeServ_${i + 1}`) + '';
          return acc;
        }, {}),
        default: 0
      },
      field: {
        name: 'Free TorrServer #public',
        description: 'Оберіть знайдений сервер'
      },
      onChange: function (value) {

        if (value === '0') {
          Lampa.Storage.set('torrserver_url_two', '');
        } else {

          const server = servers[Number(value) - 1];

          // ТУТ автоматично підставляється login:password@host
          const fullUrl = buildUrl(server).replace('http://', '');

          Lampa.Storage.set('torrserver_url_two', fullUrl);
        }

        Lampa.Storage.set('torrserver_use_link', 'two');
        Lampa.Settings.update();
      }
    });

  }, 5000);

})();
