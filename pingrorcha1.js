(async function () {
  'use strict';

  Lampa.Platform.tv();

  // --------------------------------------------------
  // Список серверів
  // login / password можна залишити '' якщо не потрібні
  // --------------------------------------------------
  const servers = [
    { host: '95.174.93.5:8090', login: '', password: '' },
    { host: '83.143.113.137:8090', login: '', password: '' },
    { host: '95.174.115.119:8090', login: '', password: '' },
    { host: '77.83.247.48:8090', login: '', password: '' },
    { host: '45.144.53.25:37940', login: '', password: '' },
    { host: '46.8.228.48:8090', login: '', password: '' },
    { host: '188.190.255.180:8090', login: '', password: '' },
    { host: '213.130.24.96:8090', login: '', password: '' },
    { host: '194.113.32.79:8090', login: '', password: '' },
    { host: '77.110.122.115:8090', login: '', password: '' },

    // сервер з авторизацією
    { host: '146.59.45.143:8090', login: 'bazarnetua', password: 'lampaua' },

    { host: 'ts.maxvol.pro', login: '', password: '' },

    // сервер з авторизацією
    { host: 'lam.maxvol.pro/ts', login: '1zmugz8t', password: 'ts' }
  ];

  // --------------------------------------------------
  // Скидання статусів
  // --------------------------------------------------
  servers.forEach((_, i) => {
    Lampa.Storage.set(`FreeServ_${i + 1}`, 'NotFound');
  });

  // --------------------------------------------------
  // Перевірка сервера (ping через /echo)
  // --------------------------------------------------
  async function pingServer(server, index) {
    try {

      let options = {
        method: 'GET'
      };

      // --------------------------------------------------
      // Якщо задано логін і пароль
      // тут створюється Basic Auth header
      // --------------------------------------------------
      if (server.login && server.password) {

        // ТУТ формується токен з login:password
        const token = btoa(server.login + ':' + server.password);

        options.headers = {
          // ТУТ підставляється логін і пароль у вигляді Authorization header
          'Authorization': 'Basic ' + token
        };
      }

      await fetch(`http://${server.host}/echo`, options);

      // Якщо сервер відповів — вважаємо його живим
      Lampa.Storage.set(`FreeServ_${index + 1}`, server.host);

    } catch (e) {
      Lampa.Storage.set(`FreeServ_${index + 1}`, 'NotFound');
    }
  }

  // --------------------------------------------------
  // Почергове опитування серверів
  // --------------------------------------------------
  async function pollServers() {
    for (let i = 0; i < servers.length; i++) {
      await pingServer(servers[i], i);
    }
  }

  // --------------------------------------------------
  // Приховування NotFound у списку
  // --------------------------------------------------
  setInterval(() => {
    const el = $('.selectbox-item.selector > div:contains("NotFound")');
    if (el.length > 0) el.parent('div').hide();
  }, 100);

  // Запуск перевірки
  pollServers();

  // --------------------------------------------------
  // Додавання пункту в налаштування
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
        name: 'Безкоштовний (public) TorrServer #free',
        description: 'Оберіть сервер зі списку знайдених'
      },

      onChange: function (value) {

        if (value === '0') {
          Lampa.Storage.set('torrserver_url_two', '');
          Lampa.Storage.set('torrserver_auth_two', '');
        } else {

          const idx = Number(value) - 1;
          const server = servers[idx];

          // --------------------------------------------
          // В URL логін НЕ вставляємо
          // --------------------------------------------
          Lampa.Storage.set('torrserver_url_two', server.host);

          // --------------------------------------------
          // Якщо сервер має авторизацію —
          // зберігаємо Authorization токен
          // --------------------------------------------
          if (server.login && server.password) {

            // ТУТ формується Basic Auth токен
            const token = btoa(server.login + ':' + server.password);

            // ТУТ зберігається токен для подальших запитів
            Lampa.Storage.set('torrserver_auth_two', 'Basic ' + token);

          } else {
            Lampa.Storage.set('torrserver_auth_two', '');
          }
        }

        Lampa.Storage.set('torrserver_use_link', 'two');
        Lampa.Settings.update();
      },

      onRender: function (item) {
        setTimeout(function () {
          if ($('div[data-name="freetorrserv"]').length > 1) item.hide();
          $('.settings-param__name', item).css('color', 'f3d900');
          $(".ad-server").hide();
          $('div[data-name="freetorrserv"]').insertAfter(
            'div[data-name="torrserver_use_link"]'
          );
        }, 0);
      }
    });

  }, 5000);

})();
