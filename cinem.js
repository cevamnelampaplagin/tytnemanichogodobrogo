(function () {
    'use strict';

    // Основний об'єкт плагіна
    var CinemaByWolf = {
        name: 'cinemabywolf',
        version: '2.2.0', // Оновлено версію
        debug: true,
        settings: {
            enabled: true,
            show_ru: false, // За замовчуванням вимкнено
            show_en: true,
            show_ua: true
        }
    };

    // Список російських кінотеатрів (залишено для сумісності, але вимкнено за замовчуванням)
    var RU_CINEMAS = [
        { name: 'Start', networkId: '2493' },
        { name: 'Premier', networkId: '2859' },
        { name: 'KION', networkId: '4085' },
        { name: 'Okko', networkId: '3871' },
        { name: 'КиноПоиск', networkId: '3827' },
        { name: 'Wink', networkId: '5806' },
        { name: 'ИВИ', networkId: '3923' },
        { name: 'Смотрим', networkId: '5000' }
    ];

    // Список іноземних кінотеатрів
    var EN_CINEMAS = [
        { name: 'Netflix', networkId: '213' },
        { name: 'Apple TV', networkId: '2552' },
        { name: 'HBO', networkId: '49' },
        { name: 'Disney+', networkId: '2739' },
        { name: 'Amazon Prime', networkId: '1024' },
        { name: 'Hulu', networkId: '453' },
        { name: 'SyFy', networkId: '77' },
        { name: 'NBC', networkId: '6' },
        { name: 'ABC', networkId: '49' },
        { name: 'CBS', networkId: '16' },
        { name: 'AMC', networkId: '174' },
        { name: 'Showtime', networkId: '67' }
    ];

    // Список українських кінотеатрів та каналів (РОЗШИРЕНО)
    // ID взяті з бази TheMovieDB (TMDB)
    var UA_CINEMAS = [
        { name: '1+1', networkId: '1254' },
        { name: 'Новий канал', networkId: '1256' },
        { name: 'ICTV', networkId: '1166' },
        { name: 'СТБ', networkId: '1206' },
        { name: 'ТЕТ', networkId: '1258' },
        { name: '2+2', networkId: '1255' },
        { name: 'Megogo', networkId: '4627' }, // Originals
        { name: 'Інтер', networkId: '1168' },
        { name: 'НЛО TV', networkId: '2668' },
        { name: 'Україна', networkId: '1208' }, // Архівний контент
        { name: 'К1', networkId: '2262' },
        { name: 'НТН', networkId: '2261' },
        { name: 'Суспільне', networkId: '2809' }
    ];

    // Локалізація
    function addLocalization() {
        if (Lampa && Lampa.Lang) {
            Lampa.Lang.add({
                cinemabywolf_ru: {
                    ru: 'RU Кінотеатри',
                    en: 'RU Cinemas',
                    uk: 'RU Кінотеатри'
                },
                cinemabywolf_en: {
                    ru: 'EN Кінотеатри',
                    en: 'EN Cinemas',
                    uk: 'EN Кінотеатри'
                },
                cinemabywolf_ua: {
                    ru: 'UA Кінотеатри',
                    en: 'UA Cinemas',
                    uk: 'UA Кінотеатри'
                },
                cinemabywolf_title: {
                    ru: 'Онлайн кінотеатри',
                    en: 'Online Cinemas',
                    uk: 'Онлайн кінотеатри'
                }
            });
        }
    }

    // Видалити кнопки з головного меню
    function removeMenuButtons() {
        $('.cinemabywolf-btn-ru').remove();
        $('.cinemabywolf-btn-en').remove();
        $('.cinemabywolf-btn-ua').remove();
    }

    // Додавання кнопок у головне меню
    function addMenuButtons() {
        // Видаляємо існуючі кнопки
        $('.menu__item.cinemabywolf-btn-ru, .menu__item.cinemabywolf-btn-en, .menu__item.cinemabywolf-btn-ua').remove();

        var $menu = $('.menu .menu__list').eq(0);
        if (!$menu.length) return;

        // RU Кінотеатри
        if (String(CinemaByWolf.settings.show_ru).toLowerCase() === 'true') {
            var ico = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48">
                <text x="50%" y="55%" text-anchor="middle" font-family="Arial" font-size="38" 
                      font-weight="700" fill="currentColor" dominant-baseline="middle">RU</text>
            </svg>`;
            var $btnRU = $(`
                <li class="menu__item selector cinemabywolf-btn-ru">
                    <div class="menu__ico">${ico}</div>
                    <div class="menu__text">Кінотеатри</div>
                </li>
            `);
            $btnRU.on('hover:enter', function () { openCinemasModal('ru'); });
            $menu.append($btnRU);
        }

        // EN Кінотеатри
        if (String(CinemaByWolf.settings.show_en).toLowerCase() !== 'false') {
            var ico = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48">
                <text x="50%" y="55%" text-anchor="middle" font-family="Arial" font-size="38" 
                      font-weight="700" fill="currentColor" dominant-baseline="middle">EN</text>
            </svg>`;
            var $btnEN = $(`
                <li class="menu__item selector cinemabywolf-btn-en">
                    <div class="menu__ico">${ico}</div>
                    <div class="menu__text">Кінотеатри</div>
                </li>
            `);
            $btnEN.on('hover:enter', function () { openCinemasModal('en'); });
            $menu.append($btnEN);
        }

        // UA Кінотеатри
        if (String(CinemaByWolf.settings.show_ua).toLowerCase() !== 'false') {
            var ico = `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 48 48">
                <text x="50%" y="55%" text-anchor="middle" font-family="Arial" font-size="38" 
                      font-weight="700" fill="currentColor" dominant-baseline="middle">UA</text>
            </svg>`;
            var $btnUA = $(`
                <li class="menu__item selector cinemabywolf-btn-ua">
                    <div class="menu__ico">${ico}</div>
                    <div class="menu__text">Кінотеатри</div>
                </li>
            `);
            $btnUA.on('hover:enter', function () { openCinemasModal('ua'); });
            $menu.append($btnUA);
        }
    }

    // Отримати логотип (з кешу або через запит до TMDB)
    function getLogoPathFromCache(networkId) {
        if (Lampa && Lampa.TMDB && Lampa.TMDB.networks) {
            for (var i = 0; i < Lampa.TMDB.networks.length; i++) {
                if (String(Lampa.TMDB.networks[i].id) === String(networkId)) {
                    return Lampa.TMDB.networks[i].logo_path || null;
                }
            }
        }
        return null;
    }

    function getCinemaLogo(networkId, name, callback) {
        var logoPath = getLogoPathFromCache(networkId);
        if (logoPath) {
            var url = Lampa.TMDB && Lampa.TMDB.image ? Lampa.TMDB.image('t/p/w300' + logoPath) : 'https://image.tmdb.org/t/p/w300' + logoPath;
            callback('<img src="' + url + '" alt="' + name + '" style="max-width:80%;max-height:80%;object-fit:contain;">');
            return;
        }
        
        var apiUrl = Lampa.TMDB.api('network/' + networkId + '?api_key=' + Lampa.TMDB.key());
        $.ajax({
            url: apiUrl,
            type: 'GET',
            success: function (data) {
                if (data && data.logo_path) {
                    // Зберігаємо в кеш Lampa, якщо можливо
                    if (Lampa.TMDB && Lampa.TMDB.networks) {
                        Lampa.TMDB.networks.push(data);
                    }
                    var imgUrl = Lampa.TMDB && Lampa.TMDB.image ? Lampa.TMDB.image('t/p/w300' + data.logo_path) : 'https://image.tmdb.org/t/p/w300' + data.logo_path;
                    callback('<img src="' + imgUrl + '" alt="' + name + '" style="max-width:80%;max-height:80%;object-fit:contain;">');
                } else {
                    callback('<div style="font-size:22px;color:#fff;font-weight:bold;">' + name + '</div>');
                }
            },
            error: function () {
                callback('<div style="font-size:22px;color:#fff;font-weight:bold;">' + name + '</div>');
            }
        });
    }

    // Відкриття каталогу за networkId (TMDB)
    function openCinemaCatalog(networkId, name) {
        var sort = CinemaByWolf.settings.sort_mode;
        if (sort === 'release_date.desc') sort = 'first_air_date.desc';
        if (sort === 'release_date.asc') sort = 'first_air_date.asc';
        
        Lampa.Activity.push({
            url: 'discover/tv',
            title: name,
            networks: networkId, // Фільтр за ID мережі TMDB
            sort_by: sort,
            component: 'category_full',
            source: 'tmdb',
            card_type: true,
            page: 1
        });
    }

    // Контролер для карток
    function activateCardsController($container) {
        var name = 'cinemabywolf-cards';
        var $cards = $container.find('.cinemabywolf-card.selector');
        var lastFocus = 0;

        function getCardsPerRow() {
            if ($cards.length < 2) return 1;
            var firstTop = $cards.eq(0).offset().top;
            for (var i = 1; i < $cards.length; i++) {
                if ($cards.eq(i).offset().top !== firstTop) return i;
            }
            return $cards.length;
        }

        function updateFocus(index) {
            $cards.removeClass('focus').attr('tabindex', '-1');
            if ($cards.eq(index).length) {
                $cards.eq(index).addClass('focus').attr('tabindex', '0').focus();
                var card = $cards.get(index);
                if (card && card.scrollIntoView) {
                    card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
                lastFocus = index;
            }
        }

        Lampa.Controller.add(name, {
            toggle: function() {
                Lampa.Controller.collectionSet($container);
                updateFocus(lastFocus);
            },
            up: function() {
                var perRow = getCardsPerRow();
                var idx = lastFocus - perRow;
                if (idx >= 0) updateFocus(idx);
            },
            down: function() {
                var perRow = getCardsPerRow();
                var idx = lastFocus + perRow;
                if (idx < $cards.length) updateFocus(idx);
            },
            left: function() {
                var idx = lastFocus - 1;
                if (idx >= 0) updateFocus(idx);
            },
            right: function() {
                var idx = lastFocus + 1;
                if (idx < $cards.length) updateFocus(idx);
            },
            back: function() {
                Lampa.Modal.close();
                Lampa.Controller.toggle('menu');
            },
            enter: function() {
                $cards.eq(lastFocus).trigger('hover:enter');
            }
        });
        Lampa.Controller.toggle(name);
    }

    // Модальне вікно вибору кінотеатру
    function openCinemasModal(type) {
        var cinemas = type === 'ru' ? RU_CINEMAS : type === 'en' ? EN_CINEMAS : UA_CINEMAS;
        var enabled = type === 'ru' ? CinemaByWolf.settings.ru_cinemas : type === 'en' ? CinemaByWolf.settings.en_cinemas : CinemaByWolf.settings.ua_cinemas;
        var filtered = [];
        
        // Якщо налаштувань ще немає для нових каналів, вважаємо їх увімкненими
        for (var i = 0; i < cinemas.length; i++) {
            if (enabled[cinemas[i].networkId] !== false) filtered.push(cinemas[i]);
        }

        var titleText = type === 'ru' ? 'Російські платформи' : type === 'en' ? 'Іноземні платформи' : 'Українські телеканали та платформи';
        var svgIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7m4 0h6m0 0v6m0-6L14 10"/></svg>';
        
        var $header = $('<div class="cinemabywolf-modal-header"></div>');
        $header.append(svgIcon);
        $header.append('<span class="cinemabywolf-modal-title">' + titleText + '</span>');
        
        var $container = $('<div class="cinemabywolf-cards"></div>');
        
        for (var j = 0; j < filtered.length; j++) {
            (function (c) {
                var $card = $('<div class="cinemabywolf-card selector"></div>');
                var $logo = $('<div class="cinemabywolf-card__logo"></div>');
                
                // Завантажувач
                $logo.html('<div class="broadcast__scan"></div>');
                
                getCinemaLogo(c.networkId, c.name, function(logoHtml) {
                    $logo.html(logoHtml);
                });
                
                $card.append($logo);
                $card.append('<div class="cinemabywolf-card__name">' + c.name + '</div>');
                $card.on('hover:enter', function () {
                    Lampa.Modal.close();
                    openCinemaCatalog(c.networkId, c.name);
                });
                $container.append($card);
            })(filtered[j]);
        }

        var $wrap = $('<div></div>');
        $wrap.append($header).append($container);
        
        Lampa.Modal.open({
            title: '',
            html: $wrap,
            onBack: function () {
                Lampa.Modal.close();
                Lampa.Controller.toggle('menu');
            },
            size: 'full'
        });
        
        setTimeout(function() {
            activateCardsController($container);
        }, 100);
    }

    // Стилі
    function addStyles() {
        var style = '<style id="cinemabywolf-styles">'
            + '.cinemabywolf-cards { max-height: 70vh; overflow-y: auto; display: flex; flex-wrap: wrap; justify-content: center; padding: 20px; }'
            + '.cinemabywolf-card { width: 140px; height: 160px; background: rgba(255,255,255,0.05); border-radius: 10px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 10px; transition: all 0.2s; border: 2px solid transparent; }'
            + '.cinemabywolf-card.focus { background: rgba(255,255,255,0.1); border-color: #fff; transform: scale(1.05); box-shadow: 0 0 20px rgba(0,0,0,0.5); }'
            + '.cinemabywolf-card__logo { width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; margin-bottom: 10px; background: #fff; border-radius: 50%; padding: 5px; }'
            + '.cinemabywolf-card__name { font-size: 14px; text-align: center; color: #aaa; font-weight: 500; }'
            + '.cinemabywolf-card.focus .cinemabywolf-card__name { color: #fff; }'
            + '.cinemabywolf-modal-header { display: flex; align-items: center; justify-content: center; padding-bottom: 20px; font-size: 1.5em; font-weight: bold; }'
            + '.cinemabywolf-modal-header svg { margin-right: 15px; width: 30px; height: 30px; }'
            // Стилі для налаштувань
            + '.cinemabywolf-cinema-btns { max-height: 60vh; overflow-y: auto; }'
            + '.cinemabywolf-cinema-btn { display: flex; align-items: center; padding: 15px; margin: 5px 0; background: rgba(255,255,255,0.05); border-radius: 5px; cursor: pointer; }'
            + '.cinemabywolf-cinema-btn.focus { background: rgba(255,255,255,0.1); }'
            + '.cinemabywolf-cinema-btn__icon { margin-right: 15px; font-weight: bold; }'
            + '.cinemabywolf-cinema-btn.enabled .cinemabywolf-cinema-btn__icon { color: #4b6; }'
            + '.cinemabywolf-cinema-btn:not(.enabled) .cinemabywolf-cinema-btn__icon { color: #d44; }'
            + '</style>';
        if (!$('#cinemabywolf-styles').length) $('head').append(style);
    }

    // --- НАЛАШТУВАННЯ ---
    var STORAGE_KEY = 'cinemabywolf_settings_v2'; // Новий ключ для оновлених налаштувань
    var SORT_MODES = {
        'popularity.desc': 'Популярні',
        'release_date.desc': 'За датою (нові)',
        'first_air_date.desc': 'За датою виходу (ТБ)',
        'vote_average.desc': 'За рейтингом'
    };

    function loadSettings() {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                var obj = JSON.parse(saved);
                for (var k in obj) {
                    CinemaByWolf.settings[k] = obj[k];
                }
            } catch (e) {}
        }
        
        // Ініціалізація об'єктів для вибору окремих каналів
        if (!CinemaByWolf.settings.ru_cinemas) CinemaByWolf.settings.ru_cinemas = {};
        if (!CinemaByWolf.settings.en_cinemas) CinemaByWolf.settings.en_cinemas = {};
        if (!CinemaByWolf.settings.ua_cinemas) CinemaByWolf.settings.ua_cinemas = {};

        // Заповнення новими каналами, якщо їх немає в налаштуваннях
        RU_CINEMAS.forEach(function(c) { if (CinemaByWolf.settings.ru_cinemas[c.networkId] === undefined) CinemaByWolf.settings.ru_cinemas[c.networkId] = true; });
        EN_CINEMAS.forEach(function(c) { if (CinemaByWolf.settings.en_cinemas[c.networkId] === undefined) CinemaByWolf.settings.en_cinemas[c.networkId] = true; });
        UA_CINEMAS.forEach(function(c) { if (CinemaByWolf.settings.ua_cinemas[c.networkId] === undefined) CinemaByWolf.settings.ua_cinemas[c.networkId] = true; });

        if (!CinemaByWolf.settings.sort_mode) CinemaByWolf.settings.sort_mode = 'popularity.desc';
    }

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(CinemaByWolf.settings));
    }

    function createCinemaToggleModal(title, list, storageKey) {
        var $container = $('<div class="cinemabywolf-cinema-btns"></div>');
        
        list.forEach(function(c, idx) {
            var enabled = CinemaByWolf.settings[storageKey][c.networkId];
            var $btn = $('<div class="cinemabywolf-cinema-btn selector"></div>');
            var icon = enabled ? '<span class="cinemabywolf-cinema-btn__icon">✓</span>' : '<span class="cinemabywolf-cinema-btn__icon">✗</span>';
            
            $btn.html(icon + '<span>' + c.name + '</span>');
            $btn.toggleClass('enabled', enabled);
            
            $btn.on('hover:enter', function() {
                var newState = !CinemaByWolf.settings[storageKey][c.networkId];
                CinemaByWolf.settings[storageKey][c.networkId] = newState;
                saveSettings();
                
                $btn.toggleClass('enabled', newState);
                $btn.find('.cinemabywolf-cinema-btn__icon').text(newState ? '✓' : '✗');
            });
            $container.append($btn);
        });

        Lampa.Modal.open({
            title: title,
            html: $container,
            size: 'medium',
            onBack: function() {
                Lampa.Modal.close();
                Lampa.Controller.toggle('settings');
            }
        });
        
        // Простий контролер для списку
        Lampa.Controller.collectionSet($container);
        Lampa.Controller.toggle('content'); 
    }

    function addSettingsComponent() {
        Lampa.SettingsApi.addComponent({
            component: 'cinemabywolf',
            name: 'Онлайн кінотеатри',
            icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>'
        });

        Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: { name: 'show_ua', type: 'trigger', default: true },
            field: { name: 'Показувати UA Кінотеатри' },
            onChange: function(val) {
                CinemaByWolf.settings.show_ua = val;
                saveSettings();
                refreshMenuButtons();
            }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: { name: 'show_en', type: 'trigger', default: true },
            field: { name: 'Показувати EN Кінотеатри' },
            onChange: function(val) {
                CinemaByWolf.settings.show_en = val;
                saveSettings();
                refreshMenuButtons();
            }
        });

      Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: { name: 'show_en', type: 'trigger', default: true },
            field: { name: 'Показувати EN Кінотеатри' },
            onChange: function(val) {
                CinemaByWolf.settings.show_en = val;
                saveSettings();
                refreshMenuButtons();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: { name: 'show_ru', type: 'trigger', default: false },
            field: { name: 'Показувати RU Кінотеатри' },
            onChange: function(val) {
                CinemaByWolf.settings.show_ru = val;
                saveSettings();
                refreshMenuButtons();
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: { type: 'button' },
            field: { name: 'Налаштувати список UA каналів' },
            onChange: function() { createCinemaToggleModal('UA Канали', UA_CINEMAS, 'ua_cinemas'); }
        });
        
        Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: { type: 'button' },
            field: { name: 'Налаштувати список EN платформ' },
            onChange: function() { createCinemaToggleModal('EN Платформи', EN_CINEMAS, 'en_cinemas'); }
        });

        Lampa.SettingsApi.addParam({
            component: 'cinemabywolf',
            param: {
                name: 'sort_mode',
                type: 'select',
                values: SORT_MODES,
                default: 'popularity.desc'
            },
            field: { name: 'Сортування контенту' },
            onChange: function(val) {
                CinemaByWolf.settings.sort_mode = val;
                saveSettings();
            }
        });
    }

    function refreshMenuButtons() {
        addMenuButtons();
    }

    function startPlugin() {
        window.cinemabywolf = CinemaByWolf;
        loadSettings();
        addLocalization();
        addStyles();
        addSettingsComponent();
        
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') setTimeout(refreshMenuButtons, 100);
        });
        
        // Оновлення при відкритті меню
        Lampa.Listener.follow('menu', function(e) {
            if (e.type === 'open') refreshMenuButtons();
        });
    }

    if (!window.cinemabywolf) {
        startPlugin();
    }

})();