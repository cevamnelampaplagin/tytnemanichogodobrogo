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
        coingecko: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,tether&vs_currencies=usd,uah&include_24hr_change=true'
    };

    // Ланцюжок CORS-проксі (fallback)
    var CORS_PROXIES = [
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
        rss_currencies:   'USD,EUR,PLN', // які валюти показувати
        rss_cryptos:      'BTC,ETH,SOL'  // які крипто
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
            restartAnimation();
        }
    }

    function buildDOM() {
        if ($('#rss-ticker-wrap').length) return;

        $('head').append(
            '<style id="rss-ticker-style">' +
            '#rss-ticker-wrap {' +
            '  position: fixed; left: 0; width: 100%; z-index: 9999;' +
            '  overflow: hidden; white-space: nowrap; pointer-events: none;' +
            '  box-shadow: 0 0 12px rgba(0,0,0,0.6);' +
            '}' +
            '#rss-ticker-inner {' +
            '  display: inline-block; padding-left: 100vw; will-change: transform;' +
            '  transition: opacity 0.25s ease;' +
            '}' +
            '</style>'
        );

        $('body').append(
            '<div id="rss-ticker-wrap">' +
            '  <span id="rss-ticker-inner">Завантаження...</span>' +
            '</div>'
        );

        $container = $('#rss-ticker-wrap');
        $inner     = $('#rss-ticker-inner');
        applyStyles();
    }

    // =============================================
    // АНІМАЦІЯ
    // =============================================
    function stopAnimation() {
        if (_animFrame) {
            cancelAnimationFrame(_animFrame);
            _animFrame = null;
        }
    }

    function restartAnimation() {
        stopAnimation();
        if (!$inner || !$inner.length) return;
        _speed      = parseInt(get('rss_speed'), 10) || 60;
        _totalWidth = $inner[0].scrollWidth + window.innerWidth;
        _animStart  = null;

        function step(ts) {
            if (!_animStart) _animStart = ts;
            var elapsed = ts - _animStart;
            var px = (_speed * elapsed / 1000) % _totalWidth;
            $inner.css('transform', 'translateX(-' + px + 'px)');
            _animFrame = requestAnimationFrame(step);
        }
        _animFrame = requestAnimationFrame(step);
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

    function smartFetch(url, preferDirect) {
        var attempts = [];
        if (preferDirect) {
            attempts.push(function () { return fetchDirect(url); });
        }
        CORS_PROXIES.forEach(function (fn) {
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
            var maxItems = 5;

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
            if (v && v.indexOf('http') === 0) urls.push(v);
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
                    resolve(unique.slice(0, 25));
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
    function setText(str) {
        if (!$inner) return;
        $inner.css('opacity', '0.4');
        setTimeout(function () {
            $inner.text(str);
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
    var _fetching = false;

    function fetchAll() {
        if (!get('rss_enabled') || _fetching) return;
        _fetching = true;

        var showRates = get('rss_show_rates');
        var showNews  = get('rss_show_news');

        if (!showRates && !showNews) {
            setText('Увімкніть блок курсів або новин у налаштуваннях.');
            _fetching = false;
            return;
        }

        var rateP = showRates
            ? Promise.all([fetchNBU(), fetchCrypto()]).then(function (arr) {
                return [].concat(arr[0] || [], arr[1] || []);
            })
            : Promise.resolve([]);

        var newsP = showNews ? fetchNews() : Promise.resolve([]);

        Promise.all([rateP, newsP])
            .then(function (results) {
                var rates = results[0] || [];
                var news  = results[1] || [];
                var text  = buildTickerText(rates, news);

                if ((!rates.length && !news.length)) {
                    var cached = loadCache();
                    if (cached) {
                        setText(cached + '  (кеш)');
                    } else {
                        setText('Не вдалося завантажити дані. Перевірте інтернет.');
                    }
                } else {
                    setText(text);
                    saveCache(text);
                }
            })
            .catch(function (err) {
                console.warn('[RSS] fetchAll error', err);
                var cached = loadCache();
                setText(cached ? cached + '  (кеш)' : 'Помилка завантаження.');
            })
            .then(function () {
                _fetching = false;
            });
    }

    function scheduleRefresh() {
        clearTimeout(_fetchTimer);
        clearInterval(_fetchTimer);
        fetchAll();
        var mins = parseInt(get('rss_refresh_min'), 10) || 20;
        mins = Math.max(5, Math.min(120, mins));
        _fetchTimer = setInterval(fetchAll, mins * 60 * 1000);
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

    function registerSettings() {
        Lampa.SettingsApi.addComponent({
            component: 'rss_ticker',
            name: 'RSS Рухомий рядок',
            icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.18 15.64A2.18 2.18 0 0 1 8.36 17.82C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82A2.18 2.18 0 0 1 6.18 15.64M4 4.44A15.56 15.56 0 0 1 19.56 20H16.73A12.73 12.73 0 0 0 4 7.27V4.44M4 10.1A9.9 9.9 0 0 1 13.9 20H11.07A7.07 7.07 0 0 0 4 12.93V10.1Z"/></svg>'
        });

        // --- Основне ---
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_enabled', type: 'trigger', default: true },
            field: { name: 'Увімкнути рухомий рядок' },
            onChange: function () { applyStyles(); scheduleRefresh(); }
        });

        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_rates', type: 'trigger', default: true },
            field: { name: 'Показувати курси (валюти + крипто)', description: 'Офіційний курс НБУ та ціни з CoinGecko' },
            onChange: function () { scheduleRefresh(); }
        });

        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_news', type: 'trigger', default: true },
            field: { name: 'Показувати новини (RSS)', description: 'Українські новини, крипто, паливо' },
            onChange: function () { scheduleRefresh(); }
        });

        // --- Курси ---
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_currency', type: 'trigger', default: true },
            field: { name: 'Валюти НБУ', description: 'Офіційний курс гривні' },
            onChange: function () { scheduleRefresh(); }
        });

        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_crypto', type: 'trigger', default: true },
            field: { name: 'Крипто-ціни', description: 'BTC, ETH, SOL з CoinGecko' },
            onChange: function () { scheduleRefresh(); }
        });

        // Вибір валют (через input)
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

        addTextInput('rss_currencies', 'Які валюти показувати', 'Наприклад: USD,EUR,PLN,GBP');
        addTextInput('rss_cryptos', 'Які крипто показувати', 'Наприклад: BTC,ETH,SOL,USDT');

        // --- Категорії новин ---
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_news', type: 'trigger', default: true },
            field: { name: 'Українські новини', description: 'UNIAN, Ukrinform, LB, NV, Правда' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_crypto_news', type: 'trigger', default: true },
            field: { name: 'Крипто-новини', description: 'Cointelegraph, Decrypt, CryptoSlate' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_fuel', type: 'trigger', default: true },
            field: { name: 'Паливо / енергетика', description: 'Nefterynok, Enkorr' },
            onChange: function () { scheduleRefresh(); }
        });

        // --- Власні RSS ---
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
                                set(key, (val || '').trim());
                                item.find('.settings-param__value').text(val.trim() ? 'Задано' : 'Не задано');
                                scheduleRefresh();
                            }
                        );
                    });
                }
            });
        }
        addCustomInput('rss_custom_1', 'Своє джерело 1');
        addCustomInput('rss_custom_2', 'Своє джерело 2');
        addCustomInput('rss_custom_3', 'Своє джерело 3');

        // --- Зовнішній вигляд ---
        function addSelect(key, label, opts, desc) {
            Lampa.SettingsApi.addParam({
                component: 'rss_ticker',
                param: { name: key, type: 'select', values: opts, default: DEFAULTS[key] },
                field: { name: label, description: desc || '' },
                onChange: function () { applyStyles(); }
            });
        }

        addSelect('rss_position',  'Положення',           POS_OPTS,     'Зверху або знизу екрана');
        addSelect('rss_height',    'Висота рядка',        HEIGHT_OPTS,  '');
        addSelect('rss_speed',     'Швидкість прокрутки', SPEED_OPTS,   'px/сек');
        addSelect('rss_text_color','Колір тексту',        COLOR_OPTS,   '');
        addSelect('rss_bg_color',  'Колір фону',          COLOR_OPTS,   '');
        addSelect('rss_opacity',   'Прозорість фону',     OPACITY_OPTS, '');
        addSelect('rss_separator', 'Роздільник',          SEP_OPTS,     '');
        addSelect('rss_refresh_min','Інтервал оновлення', REFRESH_OPTS, 'Як часто оновлювати дані');

        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_date', type: 'trigger', default: true },
            field: { name: 'Показувати дату / час новини', description: 'Напр. [2 год] або [7 трав]' },
            onChange: function () { scheduleRefresh(); }
        });
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_show_source', type: 'trigger', default: true },
            field: { name: 'Показувати джерело', description: 'Напр. [unian.net]' },
            onChange: function () { scheduleRefresh(); }
        });

        // Кнопка примусового оновлення
        Lampa.SettingsApi.addParam({
            component: 'rss_ticker',
            param: { name: 'rss_force_refresh', type: 'trigger', default: false },
            field: { name: 'Оновити зараз', description: 'Примусово завантажити свіжі дані' },
            onChange: function () {
                set('rss_force_refresh', false);
                fetchAll();
                Lampa.Noty.show('Оновлення стрічки...');
            }
        });
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
