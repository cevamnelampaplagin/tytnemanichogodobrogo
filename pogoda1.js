(function () {
    'use strict';
//orig https://maxbox39.github.io/lampa-weather/weather.js 130926
    if (window.lampa_weather_plugin) return;
    window.lampa_weather_plugin = true;

    var PLUGIN = 'lampa_weather';
    var STORAGE = 'lampa_weather_settings';

    var DEFAULTS = {
        city: 'Київ',
        lat: 50.4501,
        lon: 30.5234,
        units: 'celsius',
        refresh_min: 30,
        enabled: true
    };

    // WMO weather codes -> icon set key (kept separate from the SVG markup
    // so new codes just need a one-line mapping).
    var WMO_ICON = {
        0: 'clear', 1: 'mostly-clear', 2: 'partly-cloudy', 3: 'cloudy',
        45: 'fog', 48: 'fog',
        51: 'drizzle', 53: 'drizzle', 55: 'drizzle',
        56: 'drizzle', 57: 'drizzle',
        61: 'rain', 63: 'rain', 65: 'rain',
        66: 'rain', 67: 'rain',
        71: 'snow', 73: 'snow', 75: 'snow',
        77: 'snow',
        80: 'rain', 81: 'rain', 82: 'rain',
        85: 'snow', 86: 'snow',
        95: 'thunder', 96: 'thunder', 99: 'thunder'
    };

    // Compact inline SVG icon set (weather-icons style, single currentColor
    // fill/stroke) so the widget renders identically on Android TV, webOS
    // and tvOS instead of depending on whatever emoji font the platform ships.
    var ICONS = {
        'clear': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none"/><g stroke-linecap="round"><path d="M12 2v2.4"/><path d="M12 19.6V22"/><path d="M4.2 4.2l1.7 1.7"/><path d="M18.1 18.1l1.7 1.7"/><path d="M2 12h2.4"/><path d="M19.6 12H22"/><path d="M4.2 19.8l1.7-1.7"/><path d="M18.1 5.9l1.7-1.7"/></g></svg>',
        'mostly-clear': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9.5" cy="9.5" r="3.6" fill="currentColor" stroke="none"/><g stroke-linecap="round"><path d="M9.5 2.6v1.8"/><path d="M2.6 9.5h1.8"/><path d="M4.6 4.6l1.3 1.3"/><path d="M14.4 4.6l-1.3 1.3"/></g><path d="M8 20.5h9a4 4 0 0 0 .4-8 5.6 5.6 0 0 0-10.6 1.8A3.6 3.6 0 0 0 8 20.5z" fill="currentColor" stroke="none" opacity="0.9"/></svg>',
        'partly-cloudy': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8.5" cy="8" r="3" fill="currentColor" stroke="none" opacity="0.85"/><path d="M7.5 20h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.6 11 3.8 3.8 0 0 0 7.5 20z" fill="currentColor" stroke="none"/></svg>',
        'cloudy': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.5 19.5h11a4.2 4.2 0 0 0 .4-8.38 6.2 6.2 0 0 0-11.9 1.9 3.9 3.9 0 0 0 .5 6.48z"/></svg>',
        'fog': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M4 8.5h13"/><path d="M4 12h16"/><path d="M4 15.5h13"/><path d="M8 19h9"/></svg>',
        'drizzle': '<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 14.5h11a4.2 4.2 0 0 0 .4-8.38 6.2 6.2 0 0 0-11.9 1.9 3.9 3.9 0 0 0 .5 6.48z" fill="currentColor"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 18.5l-1 2"/><path d="M13 18.5l-1 2"/><path d="M17 18.5l-1 2"/></g></svg>',
        'rain': '<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 13.5h11a4.2 4.2 0 0 0 .4-8.38 6.2 6.2 0 0 0-11.9 1.9 3.9 3.9 0 0 0 .5 6.48z" fill="currentColor"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M8.5 17.5l-1.4 3"/><path d="M12.5 17.5l-1.4 3"/><path d="M16.5 17.5l-1.4 3"/></g></svg>',
        'snow': '<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 12.5h11a4.2 4.2 0 0 0 .4-8.38 6.2 6.2 0 0 0-11.9 1.9 3.9 3.9 0 0 0 .5 6.48z" fill="currentColor"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 17v4"/><path d="M7 19h4"/><path d="M15 17v4"/><path d="M13 19h4"/></g></svg>',
        'thunder': '<svg viewBox="0 0 24 24" fill="none"><path d="M6.5 12h10.5a4.2 4.2 0 0 0 .4-8.38 6.2 6.2 0 0 0-11.9 1.9A3.9 3.9 0 0 0 6.5 12z" fill="currentColor"/><path d="M12.5 12.5l-3 5h2.6l-1.4 3.8 4.3-6h-2.6l1.6-2.8z" fill="currentColor" stroke="currentColor" stroke-width="0.6" stroke-linejoin="round"/></svg>',
        'default': '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="1.6"/><path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0-4a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 18a1 1 0 0 1 1 1v1.2a1 1 0 1 1-2 0V21a1 1 0 0 1 1-1z" opacity="0.6"/></svg>'
    };

    function iconSvgFor(code) {
        var key = WMO_ICON[code] || 'default';
        return ICONS[key] || ICONS['default'];
    }

    // Emoji kept only for native tooltips/Noty text below, where it's the
    // OS's own text rendering rather than the widget's controlled icon glyph.
    var WMO = {
        0: '☀️', 1: '🌤', 2: '⛅', 3: '☁️',
        45: '🌫', 48: '🌫',
        51: '🌦', 53: '🌦', 55: '🌧',
        56: '🌧', 57: '🌧',
        61: '🌧', 63: '🌧', 65: '🌧',
        66: '🌧', 67: '🌧',
        71: '🌨', 73: '🌨', 75: '❄️',
        77: '🌨',
        80: '🌦', 81: '🌧', 82: '⛈',
        85: '🌨', 86: '❄️',
        95: '⛈', 96: '⛈', 99: '⛈'
    };

    var timer = null;
    var $widget = null;

    function getSettings() {
        var s = Lampa.Storage.get(STORAGE, {});
        return Object.assign({}, DEFAULTS, s);
    }

    function setSettings(obj) {
        var s = getSettings();
        Object.assign(s, obj);
        Lampa.Storage.set(STORAGE, s);
    }

    function injectCSS() {
        if (document.getElementById('lampa-weather-css')) return;
        var css = `
            .lampa-weather-widget {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 0.3em;
                padding: 0.28em 0.7em;
                margin-right: 0.5em;
                border-radius: 999px;
                background: rgba(255,255,255,0.12);
                font-size: 0.95em;
                line-height: 1;
                white-space: nowrap;
                width: auto;
                max-width: none;
                box-sizing: border-box;
                cursor: pointer;
            }
            .lampa-weather-widget:hover,
            .lampa-weather-widget.focus {
                background: rgba(255,255,255,0.2);
            }
            .lampa-weather-widget__icon {
                width: 1.2em;
                height: 1.2em;
                line-height: 1;
                flex-shrink: 0;
                color: currentColor;
            }
            .lampa-weather-widget__icon svg {
                display: block;
                width: 100%;
                height: 100%;
            }
            .lampa-weather-widget__temp {
                font-weight: 600;
                line-height: 1;
                flex-shrink: 0;
                min-width: 2.4em;
            }
            .lampa-weather-widget__city {
                display: none;
            }
            .lampa-weather-widget.loading {
                opacity: 0.55;
            }
            @keyframes lampa-weather-pulse {
                0%, 100% { opacity: 0.35; }
                50% { opacity: 0.9; }
            }
            .lampa-weather-widget.pending .lampa-weather-widget__icon,
            .lampa-weather-widget.pending .lampa-weather-widget__temp {
                border-radius: 4px;
                background: rgba(255,255,255,0.28);
                color: transparent;
                animation: lampa-weather-pulse 1.2s ease-in-out infinite;
            }
            .lampa-weather-widget.pending .lampa-weather-widget__temp {
                height: 0.95em;
            }
        `;
        var style = document.createElement('style');
        style.id = 'lampa-weather-css';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function request(url, success, error) {
        var net = new Lampa.Reguest();
        net.timeout(10000);
        net.silent(url, success, error || function () {});
    }

    function formatTemp(t, units) {
        if (units === 'fahrenheit') {
            return Math.round(t * 9 / 5 + 32) + '°F';
        }
        return Math.round(t) + '°C';
    }

    function updateWidget(data) {
        if (!$widget || !data) return;
        var s = getSettings();
        var code = data.weather_code;
        var temp = formatTemp(data.temperature, s.units);
        var city = s.city || '';

        $widget.removeClass('loading pending');
        $widget.find('.lampa-weather-widget__icon').html(iconSvgFor(code));
        $widget.find('.lampa-weather-widget__temp').text(temp);
        $widget.find('.lampa-weather-widget__city').text(city);
        $widget.attr('title', city + ': ' + temp + (data.wind != null ? ', вітер ' + Math.round(data.wind) + ' км/г' : ''));
    }

    function fetchWeather() {
        var s = getSettings();
        if (!s.enabled || !s.lat || !s.lon) return;

        if ($widget) $widget.addClass('loading');

        var url = 'https://api.open-meteo.com/v1/forecast'
            + '?latitude=' + s.lat
            + '&longitude=' + s.lon
            + '&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m'
            + '&timezone=auto'
            + '&wind_speed_unit=kmh';

        request(url, function (json) {
            if (!json || !json.current) {
                if ($widget) $widget.removeClass('loading');
                return;
            }
            var cur = json.current;
            var payload = {
                temperature: cur.temperature_2m,
                weather_code: cur.weather_code,
                humidity: cur.relative_humidity_2m,
                wind: cur.wind_speed_10m
            };
            updateWidget(payload);
            setSettings({
                last: Object.assign({}, payload, { ts: Date.now() })
            });
        }, function () {
            if ($widget) $widget.removeClass('loading');
            var s2 = getSettings();
            if (s2.last) updateWidget(s2.last);
        });
    }

    function searchCity(query, callback) {
        if (!query || query.length < 2) {
            callback([]);
            return;
        }
        var url = 'https://geocoding-api.open-meteo.com/v1/search'
            + '?name=' + encodeURIComponent(query)
            + '&count=8'
            + '&language=uk'
            + '&format=json';

        request(url, function (json) {
            var list = (json && json.results) ? json.results : [];
            callback(list.map(function (r) {
                return {
                    title: r.name + (r.admin1 ? ', ' + r.admin1 : '') + (r.country ? ' (' + r.country + ')' : ''),
                    name: r.name,
                    lat: r.latitude,
                    lon: r.longitude,
                    country: r.country || ''
                };
            }));
        }, function () {
            callback([]);
        });
    }

    function openCitySelect() {
        Lampa.Input.edit({
            title: 'Місто',
            value: getSettings().city || '',
            free: true,
            nosave: true
        }, function (value) {
            if (!value) {
                Lampa.Controller.toggle('settings');
                return;
            }

            Lampa.Noty.show('Шукаю місто...');
            searchCity(value, function (results) {
                if (!results.length) {
                    Lampa.Noty.show('Місто не знайдено');
                    Lampa.Controller.toggle('settings');
                    return;
                }

                Lampa.Select.show({
                    title: 'Оберіть місто',
                    items: results.map(function (r) {
                        return {
                            title: r.title,
                            city: r
                        };
                    }),
                    onSelect: function (item) {
                        var c = item.city;
                        setSettings({
                            city: c.name,
                            lat: c.lat,
                            lon: c.lon
                        });
                        Lampa.Noty.show('Місто: ' + c.name);
                        fetchWeather();
                        Lampa.Controller.toggle('settings');
                    },
                    onBack: function () {
                        Lampa.Controller.toggle('settings');
                    }
                });
            });
        });
    }

    function showDetails() {
        var s = getSettings();
        var last = s.last;
        if (!last) {
            Lampa.Noty.show('Немає даних про погоду');
            return;
        }

        var lines = [
            (WMO[last.weather_code] || '🌡') + '  ' + formatTemp(last.temperature, s.units),
            'Місто: ' + (s.city || '—')
        ];
        if (last.humidity != null) lines.push('Вологість: ' + last.humidity + '%');
        if (last.wind != null) lines.push('Вітер: ' + Math.round(last.wind) + ' км/г');

        Lampa.Noty.show(lines.join(' · '));
    }

    function createWidget() {
        if ($widget && $widget.length) return;

        $widget = $(
            '<div class="lampa-weather-widget pending selector head__action">' +
                '<span class="lampa-weather-widget__icon"></span>' +
                '<span class="lampa-weather-widget__temp"></span>' +
                '<span class="lampa-weather-widget__city"></span>' +
            '</div>'
        );

        $widget.on('hover:enter', function () {
            showDetails();
        });

        try {
            if (Lampa.Head && Lampa.Head.addElement) {
                Lampa.Head.addElement($widget[0], function () {
                    showDetails();
                });
            } else {
                var $actions = $('.head__actions, .head .head__body').first();
                if ($actions.length) $actions.prepend($widget);
                else $('body').append($widget);
            }
        } catch (e) {
            var $head = $('.head__actions').first();
            if ($head.length) $head.prepend($widget);
        }

        var s = getSettings();
        if (s.last) updateWidget(s.last);
    }

    function startRefreshTimer() {
        if (timer) clearInterval(timer);
        var s = getSettings();
        var ms = Math.max(5, s.refresh_min || 30) * 60 * 1000;
        timer = setInterval(fetchWeather, ms);
    }

    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: PLUGIN,
            name: 'Погода',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>'
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: { name: 'weather_enabled', type: 'trigger', default: true },
            field: {
                name: 'Показувати віджет',
                description: 'Віджет погоди у шапці біля годинника'
            },
            onChange: function (value) {
                setSettings({ enabled: value });
                if ($widget) $widget.toggle(!!value);
                if (value) fetchWeather();
            }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: { name: 'weather_city', type: 'button' },
            field: {
                name: 'Місто',
                description: 'Поточне: ' + (getSettings().city || 'не вибрано')
            },
            onChange: function () {
                openCitySelect();
            },
            onRender: function (item) {
                var city = getSettings().city || 'не вибрано';
                setTimeout(function () {
                    $('.settings-param__descr', item).text('Поточне: ' + city);
                }, 50);
            }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: {
                name: 'weather_units',
                type: 'select',
                values: {
                    'celsius': '°C (Цельсій)',
                    'fahrenheit': '°F (Фаренгейт)'
                },
                default: 'celsius'
            },
            field: {
                name: 'Одиниці температури',
                description: 'В яких одиницях показувати температуру'
            },
            onChange: function (value) {
                setSettings({ units: value });
                var s = getSettings();
                if (s.last) updateWidget(s.last);
            }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: {
                name: 'weather_refresh',
                type: 'select',
                values: {
                    '15': '15 хвилин',
                    '30': '30 хвилин',
                    '60': '1 година',
                    '120': '2 години'
                },
                default: '30'
            },
            field: {
                name: 'Оновлювати кожні',
                description: 'Як часто запитувати погоду'
            },
            onChange: function (value) {
                setSettings({ refresh_min: parseInt(value, 10) });
                startRefreshTimer();
            }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN,
            param: { name: 'weather_refresh_now', type: 'button' },
            field: {
                name: 'Оновити зараз',
                description: 'Запросити актуальну погоду'
            },
            onChange: function () {
                fetchWeather();
                Lampa.Noty.show('Оновлюю погоду...');
            }
        });
    }

    function start() {
        injectCSS();
        addSettings();

        var s = getSettings();
        Lampa.Storage.set('weather_enabled', s.enabled);
        Lampa.Storage.set('weather_units', s.units);
        Lampa.Storage.set('weather_refresh', String(s.refresh_min));

        createWidget();

        if (s.enabled) {
            fetchWeather();
            startRefreshTimer();
        } else if ($widget) {
            $widget.hide();
        }

        console.log('[lampa-weather] loaded');
    }

    if (window.appready) start();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();