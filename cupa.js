(function () {
  'use strict';

  Lampa.Platform.tv();
  //  if (Lampa.Manifest.app_digital >= 300) {
  (function () {
    'use strict';
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

    function _0x471660() {
      Lampa.Controller.listener.follow("toggle", function (_0x391a82) {
        if (_0x391a82.name == "select") {
          setTimeout(function () {
            if (Lampa.Activity.active().component == 'full') {
              if (document.querySelector('.ad-server') !== null) {
                $(".ad-server").remove();
              }
            }
            if (Lampa.Activity.active().component === "modss_online") {
              $(".selectbox-item--icon").remove();
            }
          }, 0x14);
        }
      });
    }

    function _0x1a369f() {
      // Перевірку пройдено

      var _0x1b0158 = document.createElement("style");
      _0x1b0158.innerHTML = ".button--subscribe { display: none; }.black-friday__button { display: none; }.icon--blink { display: none; }.womens_day__button { display: none; }.christmas__button { display: none; }.notice--icon { display: none; }";
      document.body.appendChild(_0x1b0158);
      setTimeout(function () {
        if ($(".open--broadcast").length > 0x0) {
          $(".open--broadcast").remove();
        }
      }, 0x3e8);

      Lampa.Settings.listener.follow('open', function (_0x22b6ac) {
        if (_0x22b6ac.name == "server") {
          if (document.querySelector(".ad-server") !== null) {
            $(".ad-server").remove();
          }
        }
        if (_0x22b6ac.name == "more") {
          _0x22b6ac.body.find("[data-name=\"card_quality\"]").remove();
          _0x22b6ac.body.find("[data-name=\"export\"]").remove();
          $("div > span:contains(\"Консоль\")").parent().remove();
          _0x22b6ac.body.find("[data-name=\"terminal\"]").remove();
        }
        if (_0x22b6ac.name == "interface") {
          _0x22b6ac.body.find("[data-name=\"card_interfice_reactions\"]").remove();
        }
      });

      Lampa.Listener.follow("full", function (_0x1b6e64) {
        if (_0x1b6e64.type == 'complite') {
          $('.button--book').on('hover:enter', function () {});
          setTimeout(function () {
            $(".button--options").remove();
          }, 0x0);
        }
      });
    }

    if (window.appready) {
      _0x1a369f();
      _0x471660();
    } else {
      Lampa.Listener.follow("app", function (_0x5062c7) {
        if (_0x5062c7.type == 'ready') {
          _0x1a369f();
          _0x471660();
          $("[data-action=timetable]").eq(0x0).remove();
          setTimeout(function () {
            $("#app > div.wrap.layer--height.layer--width > div.wrap__left.layer--height > div > div > div > div > div:nth-child(1) > ul > li:contains(\"Спорт\")").remove();
          }, 0x3e8);
        }
      });
    }
  })();