(function () {
  'use strict';

  Lampa.Platform.tv();

  (function () {
    'use strict';

    var _0xstrings = [
      "toggle",                          // 0
      "select",                          // 1
      "full",                            // 2
      ".ad-server",                      // 3
      "modss_online",                    // 4
      ".selectbox-item--icon",           // 5
      ".button--subscribe { display: none; }.black-friday__button { display: none; }.icon--blink { display: none; }.womens_day__button { display: none; }.christmas__button { display: none; }.notice--icon { display: none; }", // 6
      ".open--broadcast",                 // 7
      "open",                             // 8
      "server",                           // 9
      "more",                             // 10
      "[data-name=\"card_quality\"]",     // 11
      "[data-name=\"export\"]",           // 12
      "div > span:contains(\"Консоль\")", // 13
      "[data-name=\"terminal\"]",         // 14
      "interface",                        // 15
      "[data-name=\"card_interfice_reactions\"]", // 16
      "complite",                         // 17
      ".button--book",                    // 18
      "hover:enter",                      // 19
      ".button--options",                 // 20
      "app",                              // 21
      "ready",                            // 22
      "[data-action=timetable]",          // 23
      "#app > div.wrap.layer--height.layer--width > div.wrap__left.layer--height > div > div > div > div > div:nth-child(1) > ul > li:contains(\"Спорт\")" // 24
    ];

    window.lampa_settings = window.lampa_settings || {};
    window.lampa_settings.socket_use = false;
    window.lampa_settings.socket_url = undefined;
    window.lampa_settings.socket_methods = false;
    window.lampa_settings.account_use = true;
    window.lampa_settings.account_sync = true;
    window.lampa_settings.plugins_use = true;
    window.lampa_settings.plugins_store = true;
    window.lampa_settings.torrents_use = true;
    window.lampa_settings.white_use = false;
    window.lampa_settings.lang_use = true;
    window.lampa_settings.read_only = false;
    window.lampa_settings.dcma = false;
    window.lampa_settings.push_state = true;
    window.lampa_settings.iptv = false;
    window.lampa_settings.feed = false;
    window.lampa_settings.geo = false;
    window.lampa_settings.mirrors = true;
    window.lampa_settings.disable_features = window.lampa_settings.disable_features || {};
    window.lampa_settings.disable_features.dmca = true;
    window.lampa_settings.disable_features.reactions = true;
    window.lampa_settings.disable_features.discuss = true;
    window.lampa_settings.disable_features.ai = true;
    window.lampa_settings.disable_features.subscribe = true;
    window.lampa_settings.disable_features.blacklist = true;
    window.lampa_settings.disable_features.persons = true;
    window.lampa_settings.disable_features.ads = true;
    window.lampa_settings.disable_features.trailers = false;
    window.lampa_settings.disable_features.install_proxy = true;
    window.lampa_settings.developer = window.lampa_settings.developer || {};
    window.lampa_settings.developer.ads = false;
    window.lampa_settings.developer.enabled = false;
    window.lampa_settings.developer.fps = false;
    window.lampa_settings.developer.nodemo = false;
    window.lampa_settings.developer.nopremium = false;

    function _0xaaa() {
      Lampa.Controller.listener.follow(_0xstrings[0], function (e) {
        if (e.name == _0xstrings[1]) {
          setTimeout(function () {
            if (Lampa.Activity.active().component == _0xstrings[2]) {
              if (document.querySelector(_0xstrings[3]) !== null) {
                $(_0xstrings[3]).remove();
              }
            }
            if (Lampa.Activity.active().component === _0xstrings[4]) {
              $(_0xstrings[5]).remove();
            }
          }, 20);
        }
      });
    }

    function _0xbbb() {
      var style = document.createElement("style");
      style.innerHTML = _0xstrings[6];
      document.body.appendChild(style);
      setTimeout(function () {
        if ($(_0xstrings[7]).length > 0) {
          $(_0xstrings[7]).remove();
        }
      }, 1000);

      Lampa.Settings.listener.follow(_0xstrings[8], function (p) {
        if (p.name == _0xstrings[9]) {
          if (document.querySelector(_0xstrings[3]) !== null) {
            $(_0xstrings[3]).remove();
          }
        }
        if (p.name == _0xstrings[10]) {
          p.body.find(_0xstrings[11]).remove();
          p.body.find(_0xstrings[12]).remove();
          $(_0xstrings[13]).parent().remove();
          p.body.find(_0xstrings[14]).remove();
        }
        if (p.name == _0xstrings[15]) {
          p.body.find(_0xstrings[16]).remove();
        }
      });

      Lampa.Listener.follow(_0xstrings[2], function (ev) {
        if (ev.type == _0xstrings[17]) {
          $(_0xstrings[18]).on(_0xstrings[19], function () {});
          setTimeout(function () {
            $(_0xstrings[20]).remove();
          }, 0);
        }
      });
    }

    if (window.appready) {
      _0xbbb();
      _0xaaa();
    } else {
      Lampa.Listener.follow(_0xstrings[21], function (e) {
        if (e.type == _0xstrings[22]) {
          _0xbbb();
          _0xaaa();
          $(_0xstrings[23]).eq(0).remove();
          setTimeout(function () {
            $(_0xstrings[24]).remove();
          }, 1000);
        }
      });
    }
  })();
})();