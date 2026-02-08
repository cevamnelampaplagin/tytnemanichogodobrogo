(function() {
    'use strict';

    Lampa.Platform.tv();

    function _0x341dae(_0x98e855, _0x3d337a) {
        var _0x230d03 = Lampa.Storage.get('device_name'),
            _0x5d1a95 = [];

        // Оновлені пункти
        _0x5d1a95.push({
            'title': 'Speedtest.net.ua',
            'url': 'https://speedtest.net.ua/ua/'
        });
        
        _0x5d1a95.push({
            'title': 'Speedtest.net (Ookla)',
            'url': 'https://www.speedtest.net/'
        });

        // Виклик вибору сервісу
        Lampa.Select.show({
            'title': 'Оберіть сервіс',
            'items': _0x5d1a95,
            'onSelect': function(item) {
                Lampa.Activity.push({
                    'url': item.url,
                    'title': item.title,
                    'component': 'web_view',
                    'page': 1
                });
            },
            'onBack': function() {
                Lampa.Controller.toggle('content');
            }
        });
    }

    // Решта
})();
