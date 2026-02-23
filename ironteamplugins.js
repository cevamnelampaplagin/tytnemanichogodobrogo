(function() {
    'use strict';
    Lampa.Lang.add({
        iron_store: {
            uk: "Додаткові плагіни",
            en: "Additional plugins",
            ru: "Дополнительные плагины",
        }
    });
    // https://tv.ironteam.com.ua/plugins.js 
    function addStore() {
        if (Lampa.Settings.main && !Lampa.Settings.main().render().find('[data-component="iron_store"]').length) {
            var field = "<div class=\"settings-folder selector\" data-component=\"iron_store\" data-static=\"true\">\n\
            <div class=\"settings-folder__icon\">\n\
                <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"white\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n\
                    <path d=\"M19.43 12.98c.39-.4.39-1.04 0-1.44-.34-.34-.85-.38-1.24-.15a1.02 1.02 0 0 1-1.07 0 1 1 0 0 1 0-1.7c.39-.23.9-.2 1.24.15.39.39.39 1.03 0 1.43-.33.33-.33.87 0 1.2s.87.33 1.2 0zm-5.88-4.09c.39-.4.39-1.04 0-1.44-.34-.34-.85-.38-1.24-.15a1.02 1.02 0 0 1-1.07 0 1 1 0 0 1 0-1.7c.39-.23.9-.2 1.24.15.39.39.39 1.03 0 1.43-.33.33-.33.87 0 1.2s.87.33 1.2 0zM22 13.5c0 1.1-.9 2-2 2h-1v1c0 1.1-.9 2-2 2h-2v1c0 1.1-.9 2-2 2s-2-.9-2-2v-1H7c-1.1 0-2-.9-2-2v-2H4c-1.1 0-2-.9-2-2s.9-2 2-2h1V9c0-1.1.9-2 2-2h2V6c0-1.1.9-2 2-2s2 .9 2 2v1h2c1.1 0 2 .9 2 2v2h1c1.1 0 2 .9 2 2z\"/>\n\
                </svg>\n\
            </div>\n\
            <div class=\"settings-folder__name\">" + Lampa.Lang.translate('iron_store') + "</div>\n\
        </div>";
            Lampa.Settings.main().render().find('[data-component="more"]').after(field);
            Lampa.Settings.main().update();
        }
    }
    Lampa.Settings.listener.follow('open', function(e) {
        if (e.name == 'main') {
            e.body.find('[data-component="iron_store"]').on('hover:enter', function() {
                Lampa.Extensions.show({
                    store: 'https://ironteam-ua.github.io/msx/mods/extensions.json',
                    with_installed: true
                });
            });
        }
    });
    if (window.appready) addStore();
    else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type == 'ready') addStore();
        });
    }

})();