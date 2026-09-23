(function () {
    'use strict';

    if (window.lampa_rss_ticker) return;
    window.lampa_rss_ticker = true;

    // =============================================
    // ДЖЕРЕЛА
    // =============================================
    var RSS_FEEDS = {
        crypto_news: {
            label: 'Крипто-новини',
            urls: [
                'https://cointelegraph.com/rss',
                'https://decrypt.co/feed',
                'https://cryptoslate.com/feed/'
            ]
        },
        fuel: {
            label: 'Паливо / енергетика',
            urls: [
                'https://www.nefterynok.info/rss',
                'https://enkorr.ua/feed'
            ]
        },
        news: {
            label: 'Українські новини',
            urls: [
                'https://rss.unian.net/site/news_ukr.rss',
                'https://www.ukrinform.ua/rss/news.xml',
                'https://lb.ua/rss.xml',
                'https://nv.ua/rss/all.xml',
                'https://www.pravda.com.ua/rss/'
            ]
        }
    };

    // Публічні API для курсів (без ключів)
    var RATES_API = {
        nbu: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json',
        coingecko: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=usd,uah&include_24hr_change=true',
        // ePalne — ціни на паливо (потрібен X-Api-Key)
        fuel: 'https://api.epalne.com.ua/v1/today'
    };

    var FUEL_API_KEY_DEFAULT = 'epk_7331c89d25d42dea0cbbde55174c593c4e2cd3203900083e';

    var FUEL_REGION_OPTS = {
        'kievskaya': 'Київська',
        'lvovskaya': 'Львівська',
        'odesskaya': 'Одеська',
        'harkovskaya': 'Харківська',
        'dnepropetrovskaya': 'Дніпропетровська',
        'zaporozhskaya': 'Запорізька',
        'vinnickaya': 'Вінницька',
        'poltavskaya': 'Полтавська',
        'chernigovskaya': 'Чернігівська',
        'sumskaya': 'Сумська',
        'zhitomirskaya': 'Житомирська',
        'chernovickaya': 'Чернівецька',
        'ivanofrankovskaya': 'Івано-Франківська',
        'ternopolskaya': 'Тернопільська',
        'rovenskaya': 'Рівненська',
        'volynskaya': 'Волинська',
        'hmelnickaya': 'Хмельницька',
        'kirovogradskaya': 'Кіровоградська',
        'nikolaevskaya': 'Миколаївська',
        'hersonskaya': 'Херсонська',
        'cherkasskaya': 'Черкаська'
    };

    var FUEL_TYPE_OPTS = {
        'a95': 'А-95',
        'a95plus': 'А-95+',
        'a92': 'А-92',
        'diesel': 'ДП (дизель)',
        'gas': 'Газ (LPG)'
    };

    // Повітряні тривоги (Trivoga / air-alert)
    var ALERTS_API = {
        alerts: 'https://api.trivoga.app/api/alerts',
        threat: 'https://api.trivoga.app/api/threat'
    };
    var ALERTS_API_KEY_DEFAULT = 'P71TD21uldgub&lIeCEJN';


    // Ланцюжок CORS-проксі (fallback)
    var CORS_PROXIES = [
        function (url) { return 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(url); },
        function (url) { return 'https://easy-ofilia-oslovienka-18d5d406.koyeb.app/' + encodeURIComponent(url); },
        function (url) { return 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url); },
        function (url) { return 'https://api.allorigins.win/get?url=' + encodeURIComponent(url); }, // JSON wrapper
        function (url) { return 'https://corsproxy.io/?' + encodeURIComponent(url); }
    ];

    // =============================================
    // ДЕФОЛТНІ НАЛАШТУВАННЯ
    // =============================================
    var DEFAULTS = {
        rss_enabled:      true,
        rss_show_rates:   true,   // блок курсів (валюти + крипто)
        rss_show_news:    true,   // новини
        rss_crypto:       true,   // крипто-ціни в блоці курсів
        rss_currency:     true,   // валюти НБУ
        rss_crypto_news:  true,
        rss_fuel:         true,
        rss_news:         true,
        rss_custom_1:     '',
        rss_custom_2:     '',
        rss_custom_3:     '',
        rss_speed:        '60',
        rss_text_color:   '#ffffff',
        rss_bg_color:     '#000000',
        rss_opacity:      '0.75',
        rss_separator:    '  ✦  ',
        rss_position:     'bottom',
        rss_height:       '36',
        rss_show_date:    true,
        rss_show_source:  true,
        rss_refresh_min:  '20',   // хвилин
        rss_max_per_feed: '5',    // скільки новин брати з кожного джерела
        rss_currencies:   'USD,EUR,PLN', // які валюти показувати
        rss_cryptos:      'BTC,ETH,SOL', // які крипто
        rss_custom_proxy: '',     // власний CORS-проксі (напр. Cloudflare Worker), пробується першим
        // Ціни на паливо (ePalne)
        rss_fuel_prices:  true,
        rss_fuel_region:  'kievskaya',
        rss_fuel_type:    'a95',
        rss_fuel_companies: 'ОККО,WOG,SOCAR,AMIC,UPG,UKRNAFTA,KLO',
        rss_fuel_api_key: '',     // якщо порожньо — береться вбудований ключ
        // Повітряні тривоги
        rss_alerts:           true,
        rss_alerts_hide_long: true,   // ховати «постійні» (Крим, Луганська з 2022)
        rss_alerts_regions:   '',     // фільтр областей, порожньо = усі
        rss_alerts_api_key:   ''      // якщо порожньо — вбудований
    };

    function get(key) {
        var v = Lampa.Storage.get(key);
        return (v === undefined || v === null) ? DEFAULTS[key] : v;
    }
    function set(key, val) { Lampa.Storage.set(key, val); }

    Object.keys(DEFAULTS).forEach(function (k) {
        if (Lampa.Storage.get(k) === undefined) set(k, DEFAULTS[k]);
    });

    // =============================================
    // DOM
    // =============================================
    var $container, $inner;
    var _animFrame, _animStart, _totalWidth, _speed;
    var _cacheKey = 'rss_ticker_cache_v2';
    var _cacheTimeKey = 'rss_ticker_cache_time_v2';

    function hexToRgb(hex) {
        hex = (hex || '#000000').replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        var n = parseInt(hex, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }

    function fontSizeFromHeight(height) {
        return Math.round(height * 0.58);
    }

    function applyStyles() {
        if (!$container) return;
        var opacity  = parseFloat(get('rss_opacity')) || 0.75;
        var bgHex    = get('rss_bg_color') || '#000000';
        var rgb      = hexToRgb(bgHex);
        var height   = parseInt(get('rss_height'), 10) || 36;
        var fontSize = fontSizeFromHeight(height);
        var pos      = get('rss_position') === 'top' ? 'top' : 'bottom';

        $container.css({
            background: 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')',
            height: height + 'px',
            lineHeight: height + 'px',
            top:    pos === 'top'    ? '0' : '',
            bottom: pos === 'bottom' ? '0' : '',
            fontSize: fontSize + 'px'
        });
        $inner.css({ color: get('rss_text_color') || '#ffffff' });

        if (!get('rss_enabled')) {
            $container.hide();
        } else {
            $container.show();
            // Рестартуємо тільки якщо анімація ще не йде (перший запуск / був вимкнений) —
            // це прибирає зайві "стрибки" рядка при кожній косметичній зміні налаштувань.
            if ($inner.css('animation-name') !== 'rss-ticker-scroll') restartAnimation();
        }
    }

    function buildDOM() {
        if ($('#rss-ticker-wrap').length) return;

        // Подвійний сегмент + CSS keyframes замість ручного JS requestAnimationFrame:
        // рух іде на композитор-потоці браузера, тому не залежить від навантаження
        // на головний потік (парсинг RSS, відео тощо) і не "лагає"/не сіпається.
        $('head').append(
            '<style id="rss-ticker-style">' +
            '#rss-ticker-wrap {' +
            '  position: fixed; left: 0; width: 100%; z-index: 9999;' +
            '  overflow: hidden; white-space: nowrap; pointer-events: none;' +
            '  box-shadow: 0 0 12px rgba(0,0,0,0.6);' +
            '}' +
            '#rss-ticker-track {' +
            '  display: inline-flex; will-change: transform;' +
            '  animation-timing-function: linear; animation-iteration-count: infinite;' +
            '  transition: opacity 0.25s ease;' +
            '}' +
            '.rss-ticker-seg { display: inline-block; padding-right: 60px; }' +
            '@keyframes rss-ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }' +
            '</style>'
        );

        $('body').append(
            '<div id="rss-ticker-wrap">' +
            '  <span id="rss-ticker-track">' +
            '    <span class="rss-ticker-seg" id="rss-ticker-seg-a">Завантаження...</span>' +
            '    <span class="rss-ticker-seg" id="rss-ticker-seg-b">Завантаження...</span>' +
            '  </span>' +
            '</div>'
        );

        $container = $('#rss-ticker-wrap');
        $inner     = $('#rss-ticker-track');
        applyStyles();
    }

    // =============================================
    // АНІМАЦІЯ (CSS-driven)
    // =============================================
    function stopAnimation() {
        if (!$inner || !$inner.length) return;
        $inner.css('animation-name', 'none');
    }

    function restartAnimation() {
        if (!$inner || !$inner.length) return;
        var segWidth = $inner[0].scrollWidth / 2; // два однакові сегменти
        _speed = parseInt(get('rss_speed'), 10) || 60;
        var duration = Math.max(segWidth / _speed, 5);

        $inner.css('animation-name', 'none');
        void $inner[0].offsetWidth; // форсуємо reflow, щоб рестарт анімації був чистим
        $inner.css({
            'animation-name': 'rss-ticker-scroll',
            'animation-duration': duration + 's'
        });
    }

    // =============================================
    // FETCH з fallback проксі + прямий запит
    // =============================================
    function fetchDirect(url) {
        return fetch(url, { cache: 'no-store', mode: 'cors' })
            .then(function (r) {
                if (!r.ok) throw new Error('HTTP ' + r.status);
                return r.text();
            });
    }

    function fetchViaProxy(url, proxyFn) {
        var proxyUrl = proxyFn(url);
        return fetch(proxyUrl, { cache: 'no-store' })
            .then(function (r) {
                if (!r.ok) throw new Error('Proxy HTTP ' + r.status);
                var ct = (r.headers.get('content-type') || '').toLowerCase();
                if (ct.indexOf('application/json') !== -1) {
                    return r.json().then(function (data) {
                        // allorigins /get повертає { contents: "..." }
                        if (data && typeof data.contents === 'string') return data.contents;
                        if (data && typeof data.body === 'string') return data.body;
                        return JSON.stringify(data);
                    });
                }
                return r.text();
            });
    }

    function buildProxyList() {
        var custom = (get('rss_custom_proxy') || '').trim();
        var list = [];
        if (custom) {
            list.push(function (url) {
                return custom.indexOf('?') !== -1
                    ? custom + encodeURIComponent(url)
                    : custom + (custom.slice(-1) === '/' ? '' : '/') + '?url=' + encodeURIComponent(url);
            });
        }
        return list.concat(CORS_PROXIES);
    }

    function smartFetch(url, preferDirect) {
        var attempts = [];
        if (preferDirect) {
            attempts.push(function () { return fetchDirect(url); });
        }
        buildProxyList().forEach(function (fn) {
            attempts.push(function () { return fetchViaProxy(url, fn); });
        });
        if (!preferDirect) {
            attempts.push(function () { return fetchDirect(url); });
        }

        var i = 0;
        function next() {
            if (i >= attempts.length) {
                return Promise.reject(new Error('All fetch methods failed for ' + url));
            }
            return attempts[i++]().catch(function () {
                return next();
            });
        }
        return next();
    }

    // =============================================
    // ПАРСИНГ RSS
    // =============================================
    function formatDate(pubDateStr) {
        if (!pubDateStr) return '';
        try {
            var d = new Date(pubDateStr);
            if (isNaN(d.getTime())) return '';
            var now = Date.now();
            var diffMin = Math.floor((now - d.getTime()) / 60000);
            if (diffMin >= 0 && diffMin < 60) return diffMin <= 1 ? 'щойно' : diffMin + ' хв';
            if (diffMin >= 60 && diffMin < 24 * 60) {
                var h = Math.floor(diffMin / 60);
                return h + ' год';
            }
            var months = ['січ', 'лют', 'бер', 'кві', 'трав', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру'];
            return d.getDate() + ' ' + months[d.getMonth()];
        } catch (e) { return ''; }
    }

    function sourceName(url) {
        try {
            return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        } catch (e) { return ''; }
    }

    function parseXml(xmlText, feedUrl) {
        try {
            var doc = new DOMParser().parseFromString(xmlText, 'text/xml');
            var items = doc.querySelectorAll('item');
            if (!items.length) items = doc.querySelectorAll('entry'); // Atom
            var results = [];
            var showDate   = get('rss_show_date');
            var showSource = get('rss_show_source');
            var src = showSource ? sourceName(feedUrl) : '';
            var maxItems = parseInt(get('rss_max_per_feed'), 10) || 5;
            if (maxItems < 1) maxItems = 5;
            if (maxItems > 100) maxItems = 100; // safety cap

            for (var i = 0; i < Math.min(items.length, maxItems); i++) {
                var titleEl = items[i].querySelector('title');
                if (!titleEl || !titleEl.textContent) continue;

                var title = titleEl.textContent.trim().replace(/\s+/g, ' ');
                if (title.length < 8) continue;

                var parts = [];
                if (showDate) {
                    var pubEl = items[i].querySelector('pubDate') ||
                                items[i].querySelector('published') ||
                                items[i].querySelector('updated');
                    var dateStr = formatDate(pubEl ? pubEl.textContent : '');
                    if (dateStr) parts.push('[' + dateStr + ']');
                }
                if (src) parts.push('[' + src + ']');
                parts.push(title);
                results.push({
                    text: parts.join(' '),
                    rawTitle: title.toLowerCase(),
                    date: (function () {
                        var el = items[i].querySelector('pubDate') || items[i].querySelector('published');
                        return el ? new Date(el.textContent).getTime() : 0;
                    })()
                });
            }
            return results;
        } catch (e) {
            console.warn('[RSS] parse error', feedUrl, e);
            return [];
        }
    }

    // =============================================
    // КУРСИ (НБУ + CoinGecko)
    // =============================================
    function parseSelectedList(str, fallback) {
        var list = (str || fallback || '').split(',').map(function (s) {
            return s.trim().toUpperCase();
        }).filter(Boolean);
        return list.length ? list : fallback.split(',');
    }

    function formatNum(n, decimals) {
        if (n == null || isNaN(n)) return '—';
        var d = decimals != null ? decimals : (n >= 1000 ? 0 : (n >= 10 ? 2 : 4));
        return Number(n).toLocaleString('uk-UA', {
            minimumFractionDigits: 0,
            maximumFractionDigits: d
        });
    }

    function changeArrow(chg) {
        if (chg == null || isNaN(chg)) return '';
        if (chg > 0.15) return ' ↑';
        if (chg < -0.15) return ' ↓';
        return '';
    }

    function fetchNBU() {
        if (!get('rss_currency')) return Promise.resolve([]);
        return smartFetch(RATES_API.nbu, true)
            .then(function (text) {
                var data = JSON.parse(text);
                var wanted = parseSelectedList(get('rss_currencies'), 'USD,EUR,PLN');
                var map = {};
                data.forEach(function (row) {
                    if (row.cc) map[row.cc.toUpperCase()] = row;
                });
                var parts = [];
                wanted.forEach(function (code) {
                    var r = map[code];
                    if (r && r.rate != null) {
                        parts.push(code + ' ' + formatNum(r.rate, 2));
                    }
                });
                if (!parts.length) return [];
                return ['₴ ' + parts.join('  ·  ')];
            })
            .catch(function (err) {
                console.warn('[RSS] NBU failed', err && err.message);
                return [];
            });
    }

    function fetchCrypto() {
        if (!get('rss_crypto')) return Promise.resolve([]);
        return smartFetch(RATES_API.coingecko, true)
            .then(function (text) {
                var data = JSON.parse(text);
                var wanted = parseSelectedList(get('rss_cryptos'), 'BTC,ETH,SOL');
                var idMap = {
                    BTC: 'bitcoin',
                    ETH: 'ethereum',
                    SOL: 'solana',
                    USDT: 'tether'
                };
                var parts = [];
                wanted.forEach(function (sym) {
                    var id = idMap[sym];
                    if (!id || !data[id]) return;
                    var p = data[id];
                    var price = p.usd != null ? p.usd : p.uah;
                    var chg = p.usd_24h_change;
                    var suffix = p.usd != null ? '$' : '₴';
                    parts.push(sym + ' ' + formatNum(price) + suffix + changeArrow(chg));
                });
                if (!parts.length) return [];
                return ['₿ ' + parts.join('  ·  ')];
            })
            .catch(function (err) {
                console.warn('[RSS] CoinGecko failed', err && err.message);
                return [];
            });
    }

    function fetchFuelPrices() {
        if (!get('rss_fuel_prices')) return Promise.resolve([]);

        var region = (get('rss_fuel_region') || 'kievskaya').trim();
        var fuel   = (get('rss_fuel_type') || 'a95').trim().toLowerCase();
        var key    = (get('rss_fuel_api_key') || '').trim() || FUEL_API_KEY_DEFAULT;
        var url    = RATES_API.fuel + '?region=' + encodeURIComponent(region) + '&fuel=' + encodeURIComponent(fuel);

        var wanted = parseSelectedList(get('rss_fuel_companies'), 'ОККО,WOG,SOCAR,AMIC,UPG,UKRNAFTA,KLO');
        // нормалізуємо імена для порівняння (без регістру, без зайвих пробілів)
        var wantedNorm = wanted.map(function (s) { return s.toLowerCase().replace(/\s+/g, ''); });

        function parseFuelJson(text) {
            var data = typeof text === 'string' ? JSON.parse(text) : text;
            var list = (data && data.prices) || [];
            if (!list.length) return [];

            var parts = [];
            var fuelLabel = (FUEL_TYPE_OPTS[fuel] || fuel).replace(/\s*\(.*\)/, '');

            // якщо список компаній заданий — фільтруємо; інакше беремо топ за ціною (дешевші спочатку)
            var filtered = list;
            if (wantedNorm.length) {
                filtered = list.filter(function (row) {
                    var n = (row.company || '').toLowerCase().replace(/\s+/g, '');
                    return wantedNorm.some(function (w) {
                        return n === w || n.indexOf(w) !== -1 || w.indexOf(n) !== -1;
                    });
                });
                // зберігаємо порядок як у налаштуванні
                filtered.sort(function (a, b) {
                    var na = (a.company || '').toLowerCase().replace(/\s+/g, '');
                    var nb = (b.company || '').toLowerCase().replace(/\s+/g, '');
                    var ia = wantedNorm.findIndex(function (w) { return na === w || na.indexOf(w) !== -1 || w.indexOf(na) !== -1; });
                    var ib = wantedNorm.findIndex(function (w) { return nb === w || nb.indexOf(w) !== -1 || w.indexOf(nb) !== -1; });
                    return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
                });
            } else {
                filtered = list.slice().sort(function (a, b) { return (a.price || 999) - (b.price || 999); }).slice(0, 8);
            }

            filtered.forEach(function (row) {
                if (row.price == null || isNaN(row.price)) return;
                var arrow = changeArrow(row.changePct);
                parts.push((row.company || '?') + ' ' + formatNum(row.price, 2) + arrow);
            });

            if (!parts.length) return [];
            return ['⛽ ' + fuelLabel + ': ' + parts.join('  ·  ')];
        }

        // Прямий запит з API-ключем (CORS: *)
        function fetchWithKey() {
            return fetch(url, {
                cache: 'no-store',
                mode: 'cors',
                headers: { 'X-Api-Key': key, 'Accept': 'application/json' }
            }).then(function (r) {
                if (!r.ok) throw new Error('Fuel HTTP ' + r.status);
                return r.text();
            });
        }

        // Fallback через проксі (ключ у query не передаємо — проксі можуть його відрізати,
        // тому спочатку прямий запит)
        return fetchWithKey()
            .then(parseFuelJson)
            .catch(function (err) {
                console.warn('[RSS] Fuel direct failed, trying proxies', err && err.message);
                return smartFetch(url, false).then(parseFuelJson);
            })
            .catch(function (err) {
                console.warn('[RSS] Fuel prices failed', err && err.message);
                return [];
            });
    }

    function shortRegionName(name) {
        if (!name) return '';
        return name
            .replace(/\s*область\s*$/i, '')
            .replace(/^Автономна Республіка\s+/i, '')
            .replace(/\s*район\s*$/i, '')
            .trim();
    }

    function formatAlertDuration(startedAt) {
        if (!startedAt) return '';
        try {
            var ms = Date.now() - new Date(startedAt).getTime();
            if (ms < 0) return '';
            var min = Math.floor(ms / 60000);
            if (min < 60) return min <= 1 ? 'щойно' : min + ' хв';
            var h = Math.floor(min / 60);
            if (h < 24) return h + ' год';
            var d = Math.floor(h / 24);
            return d + ' д';
        } catch (e) { return ''; }
    }

    function fetchAlerts() {
        if (!get('rss_alerts')) return Promise.resolve([]);

        var key = (get('rss_alerts_api_key') || '').trim() || ALERTS_API_KEY_DEFAULT;
        var hideLong = get('rss_alerts_hide_long');
        var filterRaw = (get('rss_alerts_regions') || '').trim();
        var filterList = filterRaw
            ? filterRaw.split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean)
            : [];

        function parseAlerts(text) {
            var data = typeof text === 'string' ? JSON.parse(text) : text;
            var list = (data && data.activeAlerts) || [];
            var parts = [];

            list.forEach(function (reg) {
                if (!reg) return;
                if (hideLong && reg.longRunningAlert) return;

                var regName = shortRegionName(reg.name || '');
                var regNameLower = (reg.name || '').toLowerCase();

                if (filterList.length) {
                    var match = filterList.some(function (f) {
                        return regNameLower.indexOf(f) !== -1 || regName.toLowerCase().indexOf(f) !== -1;
                    });
                    if (!match) return;
                }

                var activeDistricts = (reg.districts || []).filter(function (d) { return d && d.active; });

                if (reg.active) {
                    // вся область під тривогою
                    var dur = formatAlertDuration(reg.startedAt);
                    parts.push(regName + (dur ? ' (' + dur + ')' : ''));
                } else if (activeDistricts.length) {
                    var dNames = activeDistricts.map(function (d) {
                        return shortRegionName(d.name || '');
                    }).filter(Boolean);
                    if (!dNames.length) return;
                    // якщо багато районів — коротко
                    if (dNames.length > 3) {
                        parts.push(regName + ' (' + dNames.length + ' р-нів)');
                    } else {
                        parts.push(regName + ' (' + dNames.join(', ') + ')');
                    }
                }
            });

            if (!parts.length) {
                return ['✅ Повітряних тривог немає'];
            }
            return ['🚨 Тривога: ' + parts.join('  ·  ')];
        }

        function fetchWithKey() {
            return fetch(ALERTS_API.alerts, {
                cache: 'no-store',
                mode: 'cors',
                headers: { 'x-api-key': key, 'Accept': 'application/json' }
            }).then(function (r) {
                if (!r.ok) throw new Error('Alerts HTTP ' + r.status);
                return r.text();
            });
        }

        // Потрібен x-api-key. Спочатку прямий запит (працює, якщо середовище
        // не блокує CORP); інакше — проксі (ключ не передасться, тому для
        // CORS-обмежених ТВ краще вказати свій Worker у «Свій CORS-проксі»,
        // який додає заголовок на сервері).
        return fetchWithKey()
            .then(parseAlerts)
            .catch(function (err1) {
                console.warn('[RSS] Alerts direct failed', err1 && err1.message);
                return smartFetch(ALERTS_API.alerts, false).then(parseAlerts);
            })
            .catch(function (err) {
                console.warn('[RSS] Alerts failed', err && err.message);
                return [];
            });
    }

    // =============================================
    // НОВИНИ (RSS)
    // =============================================
    function collectNewsUrls() {
        var urls = [];
        if (get('rss_crypto_news')) urls = urls.concat(RSS_FEEDS.crypto_news.urls);
        if (get('rss_fuel')) urls = urls.concat(RSS_FEEDS.fuel.urls);
        if (get('rss_news')) urls = urls.concat(RSS_FEEDS.news.urls);

        ['rss_custom_1', 'rss_custom_2', 'rss_custom_3'].forEach(function (k) {
            var v = (get(k) || '').trim();
            if (!v) return;
            v = v.replace(/^\/\//, 'https://');           // protocol-relative //example.com/rss
            if (!/^https?:\/\//i.test(v)) v = 'https://' + v; // без схеми — не гублячи URL
            urls.push(v);
        });
        return urls;
    }

    function fetchNews() {
        if (!get('rss_show_news')) return Promise.resolve([]);
        var urls = collectNewsUrls();
        if (!urls.length) return Promise.resolve([]);

        var headlines = [];
        var done = 0;

        return new Promise(function (resolve) {
            function finish() {
                done++;
                if (done >= urls.length) {
                    // дедуплікація + сортування за датою
                    var seen = {};
                    var unique = [];
                    headlines.sort(function (a, b) { return (b.date || 0) - (a.date || 0); });
                    headlines.forEach(function (h) {
                        var key = h.rawTitle.slice(0, 60);
                        if (!seen[key]) {
                            seen[key] = true;
                            unique.push(h.text);
                        }
                    });
                    // Загальний ліміт залежить від налаштування «скільки з одного джерела»
                    var perFeed = parseInt(get('rss_max_per_feed'), 10) || 5;
                    var totalLimit = Math.min(100, Math.max(25, perFeed * 4));
                    resolve(unique.slice(0, totalLimit));
                }
            }

            urls.forEach(function (url) {
                smartFetch(url, false)
                    .then(function (xml) {
                        var items = parseXml(xml, url);
                        headlines = headlines.concat(items);
                        finish();
                    })
                    .catch(function (err) {
                        console.warn('[RSS] feed failed:', url, err && err.message);
                        finish();
                    });
            });
        });
    }

    // =============================================
    // ЗБІРКА + КЕШ
    // =============================================
    var _lastText = '';
    function setText(str) {
        if (!$inner || !$inner.length) return;
        if (str === _lastText) return; // ті самі дані — не смикаємо анімацію
        _lastText = str;
        $inner.css('opacity', '0.4');
        setTimeout(function () {
            $('#rss-ticker-seg-a').text(str);
            $('#rss-ticker-seg-b').text(str);
            $inner.css('opacity', '1');
            restartAnimation();
        }, 180);
    }

    function buildTickerText(rateLines, newsLines) {
        var sep = get('rss_separator') || '  ✦  ';
        var parts = [];

        if (rateLines && rateLines.length) {
            parts.push(rateLines.join(sep));
        }
        if (newsLines && newsLines.length) {
            parts.push(newsLines.join(sep));
        }
        return parts.join(sep + '  │  ' + sep) || 'Немає даних для відображення. Перевірте налаштування.';
    }

    function saveCache(text) {
        try {
            set(_cacheKey, text);
            set(_cacheTimeKey, Date.now());
        } catch (e) {}
    }

    function loadCache() {
        try {
            var t = get(_cacheKey);
            var ts = get(_cacheTimeKey);
            if (t && ts && (Date.now() - Number(ts) < 2 * 60 * 60 * 1000)) {
                return t;
            }
        } catch (e) {}
        return null;
    }

    var _fetchTimer;
    var _alertsTimer;
    var _fetching = false;
    var _alertsFetching = false;
    var _retryTimer;
    var _retryCount = 0;

    // Останні зібрані частини стрічки (щоб тривоги оновлювати окремо, без повного refetch)
    var _lastRateLines  = []; // курси + паливо
    var _lastAlertLines = [];
    var _lastNewsLines  = [];

    var ALERTS_POLL_MS = 61 * 1000; // опитування тривог кожні 61 с

    // Публічні CORS-проксі (allorigins/corsproxy) часто тимчасово падають або
    // рейтліммять — саме через це раніше довантаження "не спрацьовувало" одразу
    // і допомагав ручний тумблер вимкнути/увімкнути. Тепер при невдачі плагін
    // сам пробує ще раз з експоненційною паузою, не чекаючи наступного 20-хв циклу.
    function scheduleRetry() {
        clearTimeout(_retryTimer);
        if (_retryCount >= 5) return;
        var delay = Math.min(15000 * Math.pow(2, _retryCount), 5 * 60 * 1000);
        _retryCount++;
        _retryTimer = setTimeout(fetchAll, delay);
    }

    function rebuildTickerFromParts() {
        var rates = [].concat(_lastRateLines || [], _lastAlertLines || []);
        var news  = _lastNewsLines || [];
        var text  = buildTickerText(rates, news);
        if (!rates.length && !news.length) return;
        setText(text);
        saveCache(text);
    }

    /** Лише повітряні тривоги — кожні 61 с */
    function fetchAlertsOnly() {
        if (!get('rss_enabled') || !get('rss_alerts') || _alertsFetching) return;
        _alertsFetching = true;
        fetchAlerts()
            .then(function (lines) {
                _lastAlertLines = lines || [];
                rebuildTickerFromParts();
            })
            .catch(function (err) {
                console.warn('[RSS] alerts poll error', err && err.message);
            })
            .then(function () {
                _alertsFetching = false;
            });
    }

    function fetchAll() {
        if (!get('rss_enabled') || _fetching) return;
        _fetching = true;

        var showRates = get('rss_show_rates');
        var showNews  = get('rss_show_news');

        if (!showRates && !showNews && !get('rss_fuel_prices') && !get('rss_alerts')) {
            setText('Увімкніть блок курсів, новин, палива або тривог у налаштуваннях.');
            _fetching = false;
            return;
        }

        var rateP = showRates
            ? Promise.all([fetchNBU(), fetchCrypto()]).then(function (arr) {
                return [].concat(arr[0] || [], arr[1] || []);
            })
            : Promise.resolve([]);

        var fuelP = fetchFuelPrices(); // незалежно від блоку курсів — свій тумблер
        // тривоги — окремим таймером (61 с); тут підтягуємо один раз разом із повним оновленням
        var alertsP = get('rss_alerts') ? fetchAlerts() : Promise.resolve([]);
        var newsP = showNews ? fetchNews() : Promise.resolve([]);

        Promise.all([rateP, fuelP, alertsP, newsP])
            .then(function (results) {
                _lastRateLines  = [].concat(results[0] || [], results[1] || []);
                _lastAlertLines = results[2] || [];
                _lastNewsLines  = results[3] || [];

                var rates = [].concat(_lastRateLines, _lastAlertLines);
                var news  = _lastNewsLines;
                var text  = buildTickerText(rates, news);

                if ((!rates.length && !news.length)) {
                    var cached = loadCache();
                    if (cached) {
                        setText(cached + '  (кеш)');
                    } else {
                        setText('Не вдалося завантажити дані. Перевірте інтернет.');
                    }
                    scheduleRetry();
                } else {
                    setText(text);
                    saveCache(text);
                    _retryCount = 0;
                }
            })
            .catch(function (err) {
                console.warn('[RSS] fetchAll error', err);
                var cached = loadCache();
                setText(cached ? cached + '  (кеш)' : 'Помилка завантаження.');
                scheduleRetry();
            })
            .then(function () {
                _fetching = false;
            });
    }

    function clearTickerCache() {
        try {
            set(_cacheKey, '');
            set(_cacheTimeKey, 0);
        } catch (e) {}
        _lastText = '';
        _lastRateLines = [];
        _lastAlertLines = [];
        _lastNewsLines = [];
        _retryCount = 0;
    }

    /** Примусове оновлення: скидає кеш і одразу тягне свіжі дані */
    function forceRefresh() {
        clearTickerCache();
        _fetching = false;
        _alertsFetching = false;
        clearTimeout(_retryTimer);
        fetchAll();
        if (get('rss_alerts')) fetchAlertsOnly();
    }

    function scheduleAlertsPoll() {
        clearInterval(_alertsTimer);
        clearTimeout(_alertsTimer);
        if (!get('rss_enabled') || !get('rss_alerts')) return;
        // одразу + кожні 61 с
        fetchAlertsOnly();
        _alertsTimer = setInterval(fetchAlertsOnly, ALERTS_POLL_MS);
    }

    function scheduleRefresh() {
        clearTimeout(_fetchTimer);
        clearInterval(_fetchTimer);
        clearTimeout(_retryTimer);
        _retryCount = 0;
        // при зміні налаштувань — без старого кешу, щоб рядок одразу перебудувався
        clearTickerCache();
        fetchAll();
        var mins = parseInt(get('rss_refresh_min'), 10) || 20;
        mins = Math.max(5, Math.min(120, mins));
        _fetchTimer = setInterval(fetchAll, mins * 60 * 1000);
        scheduleAlertsPoll();
    }

    // =============================================
    // НАЛАШТУВАННЯ
    // =============================================
    var SPEED_OPTS    = { '30': 'Повільно', '60': 'Нормально', '100': 'Швидко', '150': 'Дуже швидко' };
    var OPACITY_OPTS  = { '0.3': '30%', '0.5': '50%', '0.75': '75%', '0.9': '90%', '1': '100%' };
    var COLOR_OPTS    = {
        '#ffffff': 'Білий', '#000000': 'Чорний', '#ffff00': 'Жовтий',
        '#00ff00': 'Зелений', '#00ffff': 'Блакитний', '#ff4444': 'Червоний', '#ff8800': 'Помаранчевий'
    };
    var HEIGHT_OPTS   = { '28': 'Вузька (28px)', '36': 'Стандарт (36px)', '44': 'Широка (44px)', '54': 'Дуже широка (54px)' };
    var POS_OPTS      = { 'bottom': 'Знизу', 'top': 'Зверху' };
    var SEP_OPTS      = {
        '  ✦  ': '✦ Зірочка', '  |  ': '| Риса', '  •  ': '• Точка',
        '  >>>  ': '>>> Стрілки', '   ': 'Пробіл'
    };
    var REFRESH_OPTS  = { '10': '10 хв', '20': '20 хв', '30': '30 хв', '60': '60 хв' };
    var MAX_ITEMS_OPTS = { '5': '5', '10': '10', '25': '25', '50': 'Максимум (50)' };

    function registerSettings() {
        Lampa.SettingsApi.addComponent({
            component: 'rss_ticker',
            name: 'RSS Рухомий рядок',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 15.64A2.18 2.18 0 0 1 8.36 17.82C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82A2.18 2.18 0 0 1 6.18 15.64M4 4.44A15.56 15.56 0 0 1 19.56 20H16.73A12.73 12.73 0 0 0 4 7.27V4.44M4 10.1A9.9 9.9 0 0 1 13.9 20H11.07A7.07 7.07 0 0 0 4 12.93V10.1Z"/></svg>'
        });

        function addTextInput(key, label, desc) {
            Lampa.SettingsApi.addParam({
                component: 'rss_ticker',
                param: { name: key, type: 'trigger', default: DEFAULTS[key] },
                field: { name: label, description: desc || (get(key) || '') },
                onRender: function (item) {
                    item.find('.settings-param__value').text(get(key) || '—');
                    item.on('hover:enter', function () {
                        Lampa.Input.edit(
                            { title: label, value: get(key) || '', free: true, nosave: true },
                            function (val) {
                                set(key, (val || '').trim());
                                item.find('.settings-param__value').text(get(key) || '—');
                                scheduleRefresh();
                            }
                        );
                    });
                }
            });
        }

        function addSelect(key, label, opts, desc, refresh) {
            Lampa.SettingsApi.addParam({
                component: 'rss_ticker',
                param: { name: key, type: 'select', values: opts, default: DEFAULTS[key] },
                field: { name: label, description: desc || '' },
                onChange: function () {
                    applyStyles();
                    if (refresh) scheduleRefresh();
                }
            });
        }

        function normalizeFeedUrl(v) {
            v = (v || '').trim().replace(/^\/\//, 'https://');
            if (v && !/^https?:\/\//i.test(v)) v = 'https://' + v;
            return v;
        }

        function addCustomInput(key, label) {
            Lampa.SettingsApi.addParam({
                component: 'rss_ticker',
                param: { name: key, type: 'trigger', default: '' },
                field: { name: label, description: get(key) || 'Натисніть для введення URL' },
                onRender: function (item) {
                    item.find('.settings-param__value').text(get(key) ? 'Задано' : 'Не задано');
                    item.on('hover:enter', function () {
                        Lampa.Input.edit(
                            { title: label + ' (RSS XML URL)', value: get(key) || '', free: true, nosave: true },
                            function (val) {
                                val = normalizeFeedUrl(val);
                                set(key, val);

                                if (!val) {
                                    item.find('.settings-param__value').text('Не задано');
                                    scheduleRefresh();
                                    return;
                                }

                                item.find('.settings-param__value').text('Перевірка...');
                                smartFetch(val, false).then(function (xml) {
                                    var items = parseXml(xml, val);
                                    if (!items.length) {
                                        item.find('.settings-param__value').text('Задано (0 новин)');
                                        Lampa.Noty.show('Джерело відповіло, але новин не знайдено. Це точно RSS/Atom XML, а не JSON-фід чи HTML-сторінка?');
                                    } else {
                                        item.find('.settings-param__value').text('Задано (' + items.length + ' новин)');
                                        Lampa.Noty.show('Джерело підключено: знайдено ' + items.length + ' новин');
                                    }
                                    scheduleRefresh();
                                }).catch(function (err) {
                                    item.find('.settings-param__value').text('Помилка завантаження');
                                    Lampa.Noty.show('Не вдалося завантажити це джерело: ' + (err && err.message ? err.message : 'помилка мережі/CORS'));
                                    scheduleRefresh();
                                });
                            }
                        );
                    });
                }
            });
        }

        // ========== 1. ОСНОВНЕ + ОНОВЛЕННЯ ==========
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_enabled', type: 'trigger', default: true },
            field: { name: '▸ Увімкнути рухомий рядок' },
            onChange: function () { applyStyles(); scheduleRefresh(); }
        });

        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_force_refresh', type: 'trigger', default: false },
            field: {
                name: '🔄 Оновити стрічку зараз',
                description: 'Скидає кеш і одразу завантажує свіжі дані'
            },
            onChange: function () {
                set('rss_force_refresh', false);
                forceRefresh();
                Lampa.Noty.show('Оновлення стрічки…');
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_clear_cache', type: 'trigger', default: false },
            field: {
                name: '🗑 Скинути кеш',
                description: 'Очистити збережений текст стрічки (без нового завантаження)'
            },
            onChange: function () {
                set('rss_clear_cache', false);
                clearTickerCache();
                setText('Кеш очищено. Натисніть «Оновити стрічку зараз».');
                Lampa.Noty.show('Кеш стрічки очищено');
            }
        });

        addSelect('rss_refresh_min', 'Інтервал оновлення', REFRESH_OPTS, 'Як часто автоматично оновлювати дані', true);

        // ========== 2. КУРСИ (валюти + крипто) ==========
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_rates', type: 'trigger', default: true },
            field: { name: '▸ Курси: валюти + крипто', description: 'Блок офіційного курсу НБУ та CoinGecko' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_currency', type: 'trigger', default: true },
            field: { name: '  · Валюти НБУ', description: 'Офіційний курс гривні' },
            onChange: function () { scheduleRefresh(); }
        });
        addTextInput('rss_currencies', '  · Які валюти', 'Наприклад: USD,EUR,PLN,GBP');
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_crypto', type: 'trigger', default: true },
            field: { name: '  · Крипто-ціни', description: 'BTC, ETH, SOL з CoinGecko' },
            onChange: function () { scheduleRefresh(); }
        });
        addTextInput('rss_cryptos', '  · Які крипто', 'Наприклад: BTC,ETH,SOL,USDT');

        // ========== 3. ПАЛИВО (ціни АЗС) ==========
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_fuel_prices', type: 'trigger', default: true },
            field: {
                name: '▸ Ціни на паливо',
                description: 'Актуальні ціни АЗС (ePalne / minfin)'
            },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_fuel_region', type: 'select', values: FUEL_REGION_OPTS, default: DEFAULTS.rss_fuel_region },
            field: { name: '  · Область', description: 'Регіон для цін АЗС' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_fuel_type', type: 'select', values: FUEL_TYPE_OPTS, default: DEFAULTS.rss_fuel_type },
            field: { name: '  · Тип палива', description: 'А-95, дизель, газ тощо' },
            onChange: function () { scheduleRefresh(); }
        });
        addTextInput('rss_fuel_companies', '  · Які АЗС', 'Напр: ОККО,WOG,SOCAR (порожньо = топ-8 дешевих)');
        addTextInput('rss_fuel_api_key', '  · API-ключ ePalne', 'Порожньо = вбудований ключ');

        // ========== 4. ПОВІТРЯНІ ТРИВОГИ ==========
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_alerts', type: 'trigger', default: true },
            field: {
                name: '▸ Повітряні тривоги',
                description: 'Активні тривоги (Trivoga / air-alert)'
            },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_alerts_hide_long', type: 'trigger', default: true },
            field: {
                name: '  · Ховати постійні',
                description: 'Не показувати Крим, Луганську тощо з 2022'
            },
            onChange: function () { scheduleRefresh(); }
        });
        addTextInput('rss_alerts_regions', '  · Фільтр областей', 'Напр: Київ, Харків (порожньо = усі)');
        addTextInput('rss_alerts_api_key', '  · API-ключ Trivoga', 'Порожньо = вбудований ключ');

        // ========== 5. НОВИНИ (RSS) ==========
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_news', type: 'trigger', default: true },
            field: { name: '▸ Новини (RSS)', description: 'Увімкнути блок новин у стрічці' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_news', type: 'trigger', default: true },
            field: { name: '  · Українські новини', description: 'UNIAN, Ukrinform, LB, NV, Правда' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_crypto_news', type: 'trigger', default: true },
            field: { name: '  · Крипто-новини', description: 'Cointelegraph, Decrypt, CryptoSlate' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_fuel', type: 'trigger', default: true },
            field: { name: '  · Новини: паливо / енергетика', description: 'Nefterynok, Enkorr (не ціни АЗС)' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_max_per_feed', type: 'select', values: MAX_ITEMS_OPTS, default: DEFAULTS.rss_max_per_feed },
            field: {
                name: '  · Скільки новин з джерела',
                description: '5 / 10 / 25 або максимум (50)'
            },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_date', type: 'trigger', default: true },
            field: { name: '  · Показувати дату новини', description: 'Напр. [2 год] або [7 трав]' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_source', type: 'trigger', default: true },
            field: { name: '  · Показувати джерело', description: 'Напр. [unian.net]' },
            onChange: function () { scheduleRefresh(); }
        });

        // ========== 6. ВЛАСНІ RSS ==========
        addCustomInput('rss_custom_1', '  · Своє джерело 1');
        addCustomInput('rss_custom_2', '  · Своє джерело 2');
        addCustomInput('rss_custom_3', '  · Своє джерело 3');

        // ========== 7. ЗОВНІШНІЙ ВИГЛЯД ==========
        addSelect('rss_position',   '▸ Положення',        POS_OPTS,     'Зверху або знизу екрана', false);
        addSelect('rss_height',     '  · Висота рядка',   HEIGHT_OPTS,  '', false);
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_speed', type: 'select', values: SPEED_OPTS, default: DEFAULTS.rss_speed },
            field: { name: '  · Швидкість прокрутки', description: 'px/сек' },
            onChange: function () { applyStyles(); restartAnimation(); }
        });
        addSelect('rss_text_color', '  · Колір тексту',   COLOR_OPTS,   '', false);
        addSelect('rss_bg_color',   '  · Колір фону',     COLOR_OPTS,   '', false);
        addSelect('rss_opacity',    '  · Прозорість фону', OPACITY_OPTS, '', false);
        addSelect('rss_separator',  '  · Роздільник',     SEP_OPTS,     '', false);

        // ========== 8. МЕРЕЖА ==========
        addTextInput('rss_custom_proxy', '▸ Свій CORS-проксі', 'URL воркера (Cloudflare Worker тощо), пробується першим');
    }

    // =============================================
    // ХОВАТИ ПІД ЧАС ВІДТВОРЕННЯ
    // =============================================
    function bindPlayerEvents() {
        Lampa.Listener.follow('player', function (e) {
            if (!$container) return;
            if (e.type === 'start') $container.fadeOut(300);
            if (e.type === 'destroy') {
                if (get('rss_enabled')) $container.fadeIn(300);
            }
        });
    }

    // =============================================
    // СТАРТ
    // =============================================
    function init() {
        registerSettings();
        buildDOM();

        // Показати кеш одразу, якщо є
        var cached = loadCache();
        if (cached) setText(cached);

        scheduleRefresh();
        bindPlayerEvents();
    }

    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }

})();
