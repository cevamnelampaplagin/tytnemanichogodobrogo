(function () {
    'use strict';
//orig https://piwas84.github.io/vimuw3/ext_iptv_player.js mod 300826
    if (window.ext_iptv_player_plugin_v2) return;
    window.ext_iptv_player_plugin_v2 = true;

    var TAG = '[ExtIPTV]';
    var COMPONENT = 'ext_iptv';
    var DEFAULT_TARGET = 'vimu';
    var DEFAULT_WINDOW = 500;
    var CACHE_TTL = 90000;
    var cache = { key: '', urls: null, titles: null, ts: 0 };

    // Player targets: package = Android application id used to build the
    // explicit intent; preferred_player is just a tag some Android bridges
    // read to pick UI/behaviour.
    var TARGETS = {
        vimu: { name: 'Vimu', package: 'net.gtvbox.videoplayer', preferred_player: 'vimu' },
        wiseplay: { name: 'Wiseplay', package: 'com.wiseplay', preferred_player: 'wiseplay' },
        xplayer: { name: 'XPlayer', package: 'video.player.videoplayer', preferred_player: 'xplayer' },
        justplus: { name: 'Just+', package: 'com.brouken.player', preferred_player: 'justplus' }
    };

    function isDebug() {
        var v = Lampa.Storage.get('ext_iptv_debug', 'false');
        return v === true || v === 'true';
    }

    function log() {
        try { console.log.apply(console, [TAG].concat([].slice.call(arguments))); } catch (e) {}
    }

    function dlog() {
        if (!isDebug()) return;
        log.apply(null, arguments);
    }

    function error() {
        try { console.error.apply(console, [TAG].concat([].slice.call(arguments))); } catch (e) {}
    }

    function isAndroid() {
        return typeof AndroidJS !== 'undefined' ||
            typeof Android !== 'undefined' ||
            (Lampa.Platform && Lampa.Platform.is && Lampa.Platform.is('android'));
    }

    function getTargetKey() {
        var v = Lampa.Storage.get('ext_iptv_target', DEFAULT_TARGET) || DEFAULT_TARGET;
        return TARGETS[v] ? v : DEFAULT_TARGET;
    }

    function getTarget() {
        return TARGETS[getTargetKey()];
    }

    function getWindowSize() {
        var n = parseInt(Lampa.Storage.get('ext_iptv_window', DEFAULT_WINDOW), 10);
        if (isNaN(n) || n < 50) n = 50;
        if (n > 800) n = 800;
        return n;
    }

    function isEnabled() {
        var v = Lampa.Storage.get('ext_iptv_enable', 'true');
        return v === true || v === 'true';
    }

    function channelUrl(ch) {
        return ch ? ((ch.url || ch.stream || ch.link || '') + '') : '';
    }

    function channelTitle(ch, i) {
        if (!ch) return 'Канал ' + (i + 1);
        return ((ch.name || ch.title || ch.channel || '') + '') || ('Канал ' + (i + 1));
    }

    // Grab only a window of channels around the current position via
    // onGetChannel(i), instead of the whole list — keeps the Android Intent
    // payload well under its size limit even for 10k+ channel lists.
    function collectWindow(get, from, to) {
        var urls = [];
        var titles = [];
        for (var i = from; i < to; i++) {
            var ch;
            try { ch = get(i); } catch (e) { continue; }
            var u = channelUrl(ch);
            if (!u) continue;
            urls.push(u);
            titles.push(channelTitle(ch, i));
        }
        return { urls: urls, titles: titles };
    }

    function buildPlaylist(data) {
        var total = parseInt(data.total, 10) || 0;
        var pos = parseInt(data.position, 10) || 0;
        var winSize = getWindowSize();
        if (pos < 0) pos = 0;
        if (total > 0 && pos >= total) pos = total - 1;

        var firstUrl = (data.url || '') + '';
        var cacheKey = total + '|' + pos + '|' + winSize + '|' + firstUrl.slice(0, 48);

        if (cache.urls && cache.key === cacheKey && (Date.now() - cache.ts) < CACHE_TTL) {
            dlog('cache hit', cache.urls.length);
            return { urls: cache.urls, titles: cache.titles };
        }

        var t0 = Date.now();
        var urls = [];
        var titles = [];
        var get = data.onGetChannel;

        dlog('build: total=', total, 'position=', pos, 'has onGetChannel=', typeof get);

        if (typeof get === 'function' && total > 0) {
            var half = winSize >> 1;
            var from = pos - half;
            var to = from + winSize;
            if (from < 0) { to -= from; from = 0; }
            if (to > total) {
                from -= (to - total);
                to = total;
                if (from < 0) from = 0;
            }
            var win = collectWindow(get, from, to);
            urls = win.urls;
            titles = win.titles;
            var localPos = pos - from;
            if (localPos > 0 && localPos < urls.length) {
                urls = urls.slice(localPos).concat(urls.slice(0, localPos));
                titles = titles.slice(localPos).concat(titles.slice(0, localPos));
            }
            dlog('window', from + '..' + (to - 1), 'of', total, '→', urls.length, 'ms=', Date.now() - t0);
        } else if (data.playlist && data.playlist.length) {
            var list = data.playlist;
            var t = list.length;
            var half2 = winSize >> 1;
            var p = 0;
            if (firstUrl) {
                for (var k = 0; k < t; k++) {
                    if (channelUrl(list[k]) === firstUrl) { p = k; break; }
                }
            }
            var f2 = Math.max(0, Math.min(p - half2, Math.max(0, t - winSize)));
            var t2 = Math.min(t, f2 + winSize);
            for (var j = f2; j < t2; j++) {
                var u2 = channelUrl(list[j]);
                if (!u2) continue;
                urls.push(u2);
                titles.push(channelTitle(list[j], j));
            }
            var lp = p - f2;
            if (lp > 0 && lp < urls.length) {
                urls = urls.slice(lp).concat(urls.slice(0, lp));
                titles = titles.slice(lp).concat(titles.slice(0, lp));
            }
        } else if (firstUrl) {
            urls = [firstUrl];
            titles = [channelTitle(data, 0)];
        }

        cache.key = cacheKey;
        cache.urls = urls;
        cache.titles = titles;
        cache.ts = Date.now();
        dlog('built channels=', urls.length);
        return { urls: urls, titles: titles };
    }

    function openPlayer(urls, titles, originalData) {
        if (!urls.length) {
            Lampa.Noty.show('ExtIPTV: немає URL');
            return false;
        }

        var target = getTarget();
        var playlist = new Array(urls.length);
        for (var i = 0; i < urls.length; i++) {
            playlist[i] = { url: urls[i], title: titles[i] || ('Канал ' + (i + 1)) };
        }

        var payload = {
            title: titles[0] || 'IPTV',
            url: urls[0],
            playlist: playlist,
            iptv: true,
            tv: true,
            preferred_player: target.preferred_player,
            package: target.package
        };

        // Carry over HTTP headers (auth tokens, referer, user-agent) so
        // protected streams still work in the external player.
        if (originalData && originalData.headers) payload.headers = originalData.headers;

        dlog('openPlayer target=', target.name, 'N=', urls.length, 'first=', urls[0].substring(0, 70));

        try {
            if (Lampa.Android && typeof Lampa.Android.openPlayer === 'function') {
                Lampa.Android.openPlayer(urls[0], payload);
            } else if (typeof AndroidJS !== 'undefined' && AndroidJS.openPlayer) {
                AndroidJS.openPlayer(urls[0], JSON.stringify(payload));
            } else if (typeof Android !== 'undefined' && Android.openPlayer) {
                Android.openPlayer(urls[0], JSON.stringify(payload));
            } else {
                error('немає openPlayer bridge');
                Lampa.Noty.show('ExtIPTV: немає Android bridge');
                return false;
            }
            Lampa.Noty.show(target.name + ': ' + urls.length + ' каналів');
            return true;
        } catch (e) {
            error('openPlayer', e && (e.message || e));
            if (urls.length > 1) return openPlayer([urls[0]], [titles[0]], originalData);
            Lampa.Noty.show('ExtIPTV помилка: ' + (e.message || e));
            return false;
        }
    }

    function launch(data) {
        if (!isEnabled() || !isAndroid() || !data) return false;
        var pl = buildPlaylist(data);
        return pl.urls.length ? openPlayer(pl.urls, pl.titles, data) : false;
    }

    function addSettings() {
        if (!Lampa.SettingsApi) return;

        try {
            Lampa.SettingsApi.addComponent({
                component: COMPONENT,
                name: 'IPTV → Vimu / Wiseplay / XPlayer / Just+',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
            });
        } catch (e) {
            dlog('addComponent skip', e && e.message);
        }

        Lampa.SettingsApi.addParam({
            component: COMPONENT,
            param: { name: 'ext_iptv_enable', type: 'trigger', default: true },
            field: {
                name: 'Увімкнути плагін',
                description: 'Перехоплювати IPTV і відкривати зовнішній плеєр'
            }
        });

        Lampa.SettingsApi.addParam({
            component: COMPONENT,
            param: {
                name: 'ext_iptv_target',
                type: 'select',
                values: {
                    vimu: 'Vimu',
                    wiseplay: 'Wiseplay',
                    xplayer: 'XPlayer (Android Video Player)',
                    justplus: 'Just+ (Media3 player, justplus.levende.xyz)'
                },
                default: DEFAULT_TARGET
            },
            field: {
                name: 'Плеєр',
                description: 'Один раз обери його в списку Android-плеєрів, якщо система запитає.'
            },
            onChange: function () {
                cache.key = '';
                cache.urls = null;
            }
        });

        Lampa.SettingsApi.addParam({
            component: COMPONENT,
            param: {
                name: 'ext_iptv_window',
                type: 'select',
                values: {
                    '200': '200 каналів',
                    '300': '300 каналів',
                    '500': '500 каналів',
                    '800': '800 каналів (макс.)'
                },
                default: String(DEFAULT_WINDOW)
            },
            field: {
                name: 'Вікно каналів',
                description: 'Скільки каналів навколо поточного віддавати в плеєр (не всі 15k — ліміт Android Intent)'
            },
            onChange: function () {
                cache.key = '';
                cache.urls = null;
            }
        });

        Lampa.SettingsApi.addParam({
            component: COMPONENT,
            param: { name: 'ext_iptv_debug', type: 'trigger', default: false },
            field: {
                name: 'Debug лог',
                description: 'Детальний лог у консоль для діагностики проблем'
            }
        });
    }

    function init() {
        addSettings();

        if (!Lampa.Player || typeof Lampa.Player.iptv !== 'function') {
            error('Player.iptv відсутній');
            Lampa.Noty.show('ExtIPTV: Player.iptv не знайдено');
            return;
        }

        var origIptv = Lampa.Player.iptv.bind(Lampa.Player);

        Lampa.Player.iptv = function (data) {
            if (!isEnabled()) return origIptv(data);

            dlog('Player.iptv', {
                url: data && data.url ? String(data.url).substring(0, 60) : null,
                position: data && data.position,
                total: data && data.total,
                hasGet: data && typeof data.onGetChannel
            });

            var p = Lampa.Storage.field('player_iptv') || Lampa.Storage.field('player') || '';
            dlog('player_iptv=', p);

            if (isAndroid() && (p === 'android' || p === 'external')) {
                if (launch(data)) {
                    dlog('відкрито зовні, внутрішній iptv скасовано');
                    return;
                }
                error('launch не вдався, fallback origIptv');

                var pl = buildPlaylist(data);
                if (pl.urls.length > 1) {
                    data.playlist = pl.urls.map(function (u, i) {
                        return { url: u, title: pl.titles[i] };
                    });
                    data.launch_player = 'android';
                }
            }

            return origIptv(data);
        };

        if (Lampa.Player.listener) {
            Lampa.Player.listener.follow('create', function (e) {
                if (!isEnabled() || !e || !e.data || !(e.data.iptv || e.data.tv)) return;
                if (!isAndroid()) return;
                var p = Lampa.Storage.field('player_iptv') || '';
                if (p !== 'android' && p !== 'external') return;
                if (e.data.playlist && e.data.playlist.length > 1) return;
                if (launch(e.data) && typeof e.abort === 'function') e.abort();
            });
        }

        var t = getTarget();
        Lampa.Noty.show('ExtIPTV: ' + t.name + ' / вікно ' + getWindowSize());
        log('init ok', getTargetKey(), getWindowSize());
    }

    if (window.appready) init();
    else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') init();
        });
    }
})();
