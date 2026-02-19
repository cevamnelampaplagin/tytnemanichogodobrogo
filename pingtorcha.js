(async function () {
  'use strict';

  ///BDVburik.github.io
  ///2026
  ///freetorservlist https://t.me/s/torrserve_freeip/9
  //https://bdvburik.github.io/ts.js
  Lampa.Platform.tv();

  // -------- список серверів --------
  const servers = [
    { host: '95.174.93.5:8090',   login: '', password: '' },
    // { host: '90.189.153.32:8191', login: '', password: '' },
    { host: '95.174.115.119:8090',  login: '', password: '' },
    { host: '77.83.247.48:8090',     login: '', password: '' },
    { host: '45.144.53.25:37940', login: '', password: '' },
    { host: '46.8.228.48:8090',  login: '', password: '' },
    { host: '188.190.255.180:8090',  login: '', password: '' },
    { host: '213.130.24.96:8090',  login: '', password: '' },
    { host: '194.113.32.79:8090',  login: '', password: '' },
    { host: '45.144.53.25:37940',  login: '', password: '' },
    { host: '77.110.122.115:8090',  login: '', password: '' },
    { host: '146.59.45.143:8090',  login: 'bazarnetua', password: 'lampaua' }
  ];

  // -------- допоміжна затримка --------
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  // -------- скидаємо статуси --------
  servers.forEach((_, i) => {
    Lampa.Storage.set(`FreeServ_${i+1}`, 'NotFound');
  });

  // -------- перевірка сервера --------
  async function pingServer(server, index) {
    try {
      // складаємо URL з урахуванням логіну та паролю, якщо вони задані
      let url = server.host;
      if (server.login && server.password) {
        // підставляємо логін та пароль в URL
        url = `${server.login}:${server.password}@${server.host}`;
      }
      await fetch(`http://${url}/echo`);
      Lampa.Storage.set(`FreeServ_${index+1}`, server.host);
    } catch (e) {
      Lampa.Storage.set(`FreeServ_${index+1}`, 'NotFound');
    }
  }

  // -------- почергове опитування --------
  async function pollServers() {
    for (let i = 0; i < servers.length; i++) {
      pingServer(servers[i], i);
    }
  }

  // -------- приховуємо NotFound у списках, що випадають --------
  setInterval(() => {
    const el = $('.selectbox-item.selector > div:contains("NotFound")');
    if (el.length > 0) el.parent('div').hide();
  }, 100);

  // запускаємо опитування
  pollServers();

  // -------- створюємо елемент налаштувань --------
  setTimeout(() => {
    Lampa.SettingsApi.addParam({
      component: 'server',
      param: {
        name: 'freetorrserv',
        type: 'select',
        values: servers.reduce((acc, _, i) => {
          acc[i + 1] = Lampa.Storage.get(`FreeServ_${i+1}`) + '';
          return acc;
        }, {}),
        default: 0
      },
      field: {
        name: 'Безкоштовний (public) TorrServer #free Заповнить додаткове поле',
        description: 'Натисніть, щоб вибрати сервер зі списку знайдених, буде використаний у додатковому полі'
      },
      onChange: function (value) {
        if (value === '0') {
          Lampa.Storage.set('torrserver_url_two', '');
        } else {
          const idx = Number(value) - 1;
          const server = servers[idx];
          // формуємо адресу сервера з логіном та паролем, якщо вони задані
          let address = server.host;
          if (server.login && server.password) {
            // підставляємо логін та пароль на адресу
            address = `${server.login}:${server.password}@${server.host}`;
          }
          Lampa.Storage.set('torrserver_url_two', address);
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
