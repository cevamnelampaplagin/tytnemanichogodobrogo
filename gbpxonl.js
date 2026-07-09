(function() {
  'use strict';
  // pairing-ui-v4

  var Defined = {
    api: 'lampac',
    localhost: 'https://gpbx.me/',
    apn: ''
  };

  var balansers_with_search;

  var unic_id = '';

  function gpbayUidClean(value) {
    var uid = '';

    try {
      uid = value == null ? '' : String(value);
    } catch (e) {
      uid = '';
    }

    try {
      uid = uid.replace(/^\s+|\s+$/g, '').toLowerCase();
    } catch (e2) {}

    if (!uid || /^\{[^}]+\}$/.test(uid)) return '';
    if (uid == 'undefined' || uid == 'null' || uid == 'false') return '';
    if (!/^[a-z0-9]{8}$/.test(uid)) return '';
    return uid;
  }

  function gpbayCreateUid() {
    try {
      if (Lampa && Lampa.Utils && typeof Lampa.Utils.uid == 'function') {
        return gpbayUidClean(Lampa.Utils.uid(8).toLowerCase());
      }
    } catch (e) {}

    try {
      return gpbayUidClean(((Date.now ? Date.now() : new Date().getTime()).toString(36) + Math.random().toString(36).replace(/[^a-z0-9]+/g, '')).slice(-8));
    } catch (e2) {}

    return 'uid' + (new Date().getTime() + '').slice(-5);
  }

  function gpbayLocalStorageGet(key) {
    try {
      if (typeof window != 'undefined' && window.localStorage)
        return gpbayUidClean(window.localStorage.getItem(key));
    } catch (e) {}

    return '';
  }

  function gpbayLocalStorageSet(key, value) {
    try {
      if (typeof window != 'undefined' && window.localStorage)
        window.localStorage.setItem(key, value);
    } catch (e) {}
  }

  function gpbayStorageGet(key) {
    try {
      if (Lampa && Lampa.Storage)
        return gpbayUidClean(Lampa.Storage.get(key, ''));
    } catch (e) {}

    return '';
  }

  function gpbayStorageSet(key, value) {
    try {
      if (Lampa && Lampa.Storage)
        Lampa.Storage.set(key, value);
    } catch (e) {}
  }

  function gpbaySaveUid(uid) {
    uid = gpbayUidClean(uid);
    if (!uid) return '';

    gpbayStorageSet('lampac_unic_id', uid);
    gpbayLocalStorageSet('lampac_unic_id', uid);
    gpbayLocalStorageSet('gpbay_lampac_unic_id', uid);

    unic_id = uid;
    return uid;
  }

  function gpbayEnsureUid() {
    var uid = gpbayStorageGet('lampac_unic_id');

    if (!uid) uid = gpbayUidClean(unic_id);
    if (!uid) uid = gpbayLocalStorageGet('lampac_unic_id');
    if (!uid) uid = gpbayLocalStorageGet('gpbay_lampac_unic_id');
    if (!uid) uid = gpbayCreateUid();

    return gpbaySaveUid(uid);
  }

  unic_id = gpbayEnsureUid();
  
  try {
    if (typeof window != 'undefined' && typeof window.globalThis == 'undefined') {
      window.globalThis = window;
    }
  } catch (e) {}

  var GPBAY_GA4_ID = 'G-E8QT8F2JGR';
  var GPBAY_YM_ID = 110512060;
  var GPBAY_YM_SRC = 'https://mc.webvisor.org/metrika/tag_ww.js?id=' + GPBAY_YM_ID;
  var GPBAY_DATA_LAYER = 'gpbayDataLayer';
  var GPBAY_PAGE_TITLE = 'GProjectBay';
  var gpbay_last_page_title = GPBAY_PAGE_TITLE;

  function gpbayAnalyticsBase() {
    var base = '';

    try {
      base = (Defined.localhost || '').toString();
    } catch (e) {}

    if (!base || base.indexOf('{') >= 0) {
      try {
        base = window.location.origin + '/';
      } catch (e2) {
        base = '';
      }
    }

    return base.replace(/\/+$/, '');
  }

  function gpbayGaLocation(path) {
    var base = gpbayAnalyticsBase();
    path = (path || '/w') + '';
    if (path.charAt(0) != '/') path = '/' + path;
    return base ? base + path : path;
  }

  function gpbayCleanText(value) {
    try {
      return (value || '').toString().replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
    } catch (e) {
      return '';
    }
  }

  function gpbayMovieTitle(movie) {
    try {
      movie = movie || {};
      return gpbayCleanText(movie.title || movie.name || movie.original_title || movie.original_name || movie.search || '');
    } catch (e) {
      return '';
    }
  }

  function gpbayMovieYear(movie) {
    try {
      movie = movie || {};
      var year = ((movie.release_date || movie.first_air_date || movie.year || '0000') + '').slice(0, 4);
      return year && year != '0000' ? year : '';
    } catch (e) {
      return '';
    }
  }

  function gpbayMovieSeoTitle(movie, fallback) {
    var title = gpbayMovieTitle(movie);
    var year = gpbayMovieYear(movie);

    if (title) {
      return title + (year ? ' (' + year + ')' : '') + ' — смотреть онлайн';
    }

    return fallback || GPBAY_PAGE_TITLE;
  }

  function gpbayMoviePagePath(movie) {
    try {
      movie = movie || {};
      var type = (movie.number_of_seasons || movie.name) ? 'series' : 'movie';
      var source = movie.source || 'tmdb';
      var id = movie.tmdb_id || movie.id || movie.kinopoisk_id || movie.imdb_id || '';

      if (id) {
        return '/w/' + type + '/' + encodeURIComponent(source + '-' + id);
      }

      return '/w/' + type;
    } catch (e) {}

    return '/w';
  }

  function gpbayAnalyticsParams(params) {
    var clean = {};

    try {
      params = params || {};
      for (var key in params) {
        if (!Object.prototype.hasOwnProperty.call(params, key)) continue;

        var value = params[key];
        if (typeof value == 'undefined' || typeof value == 'function') continue;
        if (value === null) value = '';

        if (typeof value == 'object') {
          try {
            value = JSON.stringify(value);
          } catch (e) {
            value = '';
          }
        }

        clean[key] = value;
      }
    } catch (e2) {}

    clean.component = 'gpbay';
    clean.lampac_uid = unic_id || '';
    return clean;
  }

  function gpbayMovieParams(movie) {
    var params = {};

    try {
      if (movie) {
        params.content_type = movie.number_of_seasons || movie.name ? 'series' : 'movie';
        params.content_source = movie.source || 'tmdb';
        params.content_id = (params.content_source || 'tmdb') + ':' + (movie.id || movie.tmdb_id || '');
        params.tmdb_id = movie.tmdb_id || movie.id || '';
        params.kinopoisk_id = movie.kinopoisk_id || '';
        params.imdb_id = movie.imdb_id || '';
        params.content_title = gpbayMovieTitle(movie);
        params.content_year = gpbayMovieYear(movie);
        params.page_title = gpbayMovieSeoTitle(movie);
        params.page_path = gpbayMoviePagePath(movie);
        params.page_location = gpbayGaLocation(params.page_path);
      }
    } catch (e) {}

    return params;
  }

  function gpbayQualityValue(element) {
    try {
      if (!element) return '';
      if (typeof element.quality == 'string') return element.quality;
      if (element.quality && typeof element.quality == 'object') {
        for (var q in element.quality) {
          if (Object.prototype.hasOwnProperty.call(element.quality, q)) return q;
        }
      }
      if (typeof element.qualitys == 'string') return element.qualitys;
      if (element.qualitys && typeof element.qualitys == 'object') {
        for (var k in element.qualitys) {
          if (Object.prototype.hasOwnProperty.call(element.qualitys, k)) return k;
        }
      }
    } catch (e) {}
    return '';
  }

  function gpbayYmInit() {
    try {
      if (window.__gpbay_ym_inited) return;
      if (!document || !document.createElement) return;

      window.__gpbay_ym_inited = true;
      window.ym = window.ym || function() {
        (window.ym.a = window.ym.a || []).push(arguments);
      };
      window.ym.l = window.ym.l || 1 * new Date();

      var hasYmScript = false;
      var scripts = document.scripts || document.getElementsByTagName('script') || [];
      for (var j = 0; j < scripts.length; j++) {
        var src = scripts[j].src || '';
        if (src == GPBAY_YM_SRC || src.indexOf('/metrika/tag') >= 0 || scripts[j].getAttribute('data-gpbay-ym') == (GPBAY_YM_ID + '')) {
          hasYmScript = true;
          break;
        }
      }

      if (!hasYmScript) {
        var ymScript = document.createElement('script');
        ymScript.async = true;
        ymScript.src = GPBAY_YM_SRC;
        ymScript.setAttribute('data-gpbay-ym', GPBAY_YM_ID);

        var firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) firstScript.parentNode.insertBefore(ymScript, firstScript);
        else (document.head || document.documentElement || document.body).appendChild(ymScript);
      }

      window.ym(GPBAY_YM_ID, 'init', {
        defer: true,
        ssr: true,
        clickmap: false,
        ecommerce: false,
        accurateTrackBounce: false,
        trackLinks: false,
        webvisor: false,
        referrer: document.referrer,
        url: gpbayGaLocation('/w'),
        title: gpbay_last_page_title || GPBAY_PAGE_TITLE
      });

      if (unic_id) {
        window.ym(GPBAY_YM_ID, 'setUserID', unic_id);
        window.ym(GPBAY_YM_ID, 'userParams', { lampac_uid: unic_id, component: 'gpbay' });
      }
    } catch (e) {}
  }

  function gpbayYmEvent(name, params) {
    try {
      if (!window.__gpbay_ym_inited) gpbayYmInit();
      if (typeof window.ym != 'function') return;
      window.ym(GPBAY_YM_ID, 'reachGoal', name, gpbayAnalyticsParams(params));
    } catch (e) {}
  }

  function gpbayYmPage(title, params) {
    try {
      if (!window.__gpbay_ym_inited) gpbayYmInit();
      if (typeof window.ym != 'function') return;

      params = gpbayAnalyticsParams(params || {});
      var url = params.page_location || gpbayGaLocation(params.page_path || '/w');

      window.ym(GPBAY_YM_ID, 'hit', url, {
        title: title || params.page_title || GPBAY_PAGE_TITLE,
        referer: document.referrer,
        params: params
      });
    } catch (e) {}
  }

  function gpbayGaInit() {
    try {
      gpbayYmInit();

      if (window.__gpbay_ga4_inited) return;
      if (!document || !document.createElement) return;

      window.__gpbay_ga4_inited = true;
      window[GPBAY_DATA_LAYER] = window[GPBAY_DATA_LAYER] || [];

      gpbayGtag('js', new Date());
      gpbayGtag('config', GPBAY_GA4_ID, {
        send_page_view: false,
        user_id: unic_id || undefined,
        transport_type: 'beacon'
      });

      var hasGaScript = false;
      var scripts = document.scripts || document.getElementsByTagName('script') || [];
      for (var i = 0; i < scripts.length; i++) {
        if ((scripts[i].src || '').indexOf('googletagmanager.com/gtag/js') >= 0 && scripts[i].getAttribute('data-gpbay-ga4') == GPBAY_GA4_ID) {
          hasGaScript = true;
          break;
        }
      }

      if (!hasGaScript) {
        var ga = document.createElement('script');
        ga.async = true;
        ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GPBAY_GA4_ID) + '&l=' + encodeURIComponent(GPBAY_DATA_LAYER);
        ga.setAttribute('data-gpbay-ga4', GPBAY_GA4_ID);
        (document.head || document.documentElement || document.body).appendChild(ga);
      }
    } catch (e) {}
  }

  function gpbayGtag() {
    try {
      window[GPBAY_DATA_LAYER] = window[GPBAY_DATA_LAYER] || [];
      window[GPBAY_DATA_LAYER].push(arguments);
    } catch (e) {}
  }

  function gpbayGaEvent(name, params) {
    try {
      if (!window.__gpbay_ga4_inited) gpbayGaInit();

      params = gpbayAnalyticsParams(params);
      params.send_to = GPBAY_GA4_ID;

      gpbayGtag('event', name, params);

      if (name != 'page_view') {
        gpbayYmEvent(name, params);
      }
    } catch (e) {}
  }

  function gpbayGaPage(title, params) {
    params = params || {};
    if (!params.page_title) params.page_title = title || GPBAY_PAGE_TITLE;
    if (!params.page_path) params.page_path = '/w';
    if (!params.page_location) params.page_location = gpbayGaLocation(params.page_path);

    gpbay_last_page_title = params.page_title || title || GPBAY_PAGE_TITLE;
    gpbayGaEvent('page_view', params);
    gpbayYmPage(gpbay_last_page_title, params);
  }

  function gpbayAnalyticsOpen(movie, method) {
    var params = gpbayMovieParams(movie);
    params.open_method = method || '';
    gpbayGaPage(params.page_title || GPBAY_PAGE_TITLE, params);
    gpbayGaEvent('gpbay_open_online', params);
  }

  function gpbayAnalyticsEvent(name, params) {
    gpbayGaEvent(name, params || {});
  }

    function getAndroidVersion() {
  if (Lampa.Platform.is('android')) {
    try {
      var current = AndroidJS.appVersion().split('-');
      return parseInt(current.pop());
    } catch (e) {
      return 0;
    }
  } else {
    return 0;
  }
}

var hostkey = 'https://gpbx.me'.replace('http://', '').replace('https://', '');

if (!window.rch_nws || !window.rch_nws[hostkey]) {
  if (!window.rch_nws) window.rch_nws = {};

  window.rch_nws[hostkey] = {
    type: Lampa.Platform.is('android') ? 'apk' : Lampa.Platform.is('tizen') ? 'cors' : undefined,
    startTypeInvoke: false,
    rchRegistry: false,
    apkVersion: getAndroidVersion()
  };
}

window.rch_nws[hostkey].typeInvoke = function rchtypeInvoke(host, call) {
  if (!window.rch_nws[hostkey].startTypeInvoke) {
    window.rch_nws[hostkey].startTypeInvoke = true;

    var check = function check(good) {
      window.rch_nws[hostkey].type = Lampa.Platform.is('android') ? 'apk' : good ? 'cors' : 'web';
      call();
    };

    if (Lampa.Platform.is('android') || Lampa.Platform.is('tizen')) check(true);
    else {
      var net = new Lampa.Reguest();
      net.silent('https://gpbx.me'.indexOf(location.host) >= 0 ? 'https://github.com/' : host + '/cors/check', function() {
        check(true);
      }, function() {
        check(false);
      }, false, {
        dataType: 'text'
      });
    }
  } else call();
};

window.rch_nws[hostkey].Registry = function RchRegistry(client, startConnection) {
  window.rch_nws[hostkey].typeInvoke('https://gpbx.me', function() {

    client.invoke("RchRegistry", JSON.stringify({
      version: 151,
      host: location.host,
      rchtype: Lampa.Platform.is('android') ? 'apk' : Lampa.Platform.is('tizen') ? 'cors' : (window.rch_nws[hostkey].type || 'web'),
      apkVersion: window.rch_nws[hostkey].apkVersion,
      player: Lampa.Storage.field('player'),
	  account_email: Lampa.Storage.get('account_email', ''),
	  unic_id: Lampa.Storage.get('lampac_unic_id', ''),
	  profile_id: Lampa.Storage.get('lampac_profile_id', ''),
	  token: 'owcy6fda'
    }));

    if (client._shouldReconnect && window.rch_nws[hostkey].rchRegistry) {
      if (startConnection) startConnection();
      return;
    }

    window.rch_nws[hostkey].rchRegistry = true;

    client.on('RchRegistry', function(clientIp) {
      if (startConnection) startConnection();
    });

    client.on("RchClient", function(rchId, url, data, headers, returnHeaders) {
      var network = new Lampa.Reguest();
	  
	  function sendResult(uri, html) {
	    $.ajax({
	      url: 'https://gpbx.me/rch/' + uri + '?id=' + rchId,
	      type: 'POST',
	      data: html,
	      async: true,
	      cache: false,
	      contentType: false,
	      processData: false,
	      success: function(j) {},
	      error: function() {
	        client.invoke("RchResult", rchId, '');
	      }
	    });
	  }

      function result(html) {
        if (Lampa.Arrays.isObject(html) || Lampa.Arrays.isArray(html)) {
          html = JSON.stringify(html);
        }

        if (typeof CompressionStream !== 'undefined' && html && html.length > 1000) {
          var compressionStream = new CompressionStream('gzip');
          var encoder = new TextEncoder();
          var readable = new ReadableStream({
            start: function(controller) {
              controller.enqueue(encoder.encode(html));
              controller.close();
            }
          });
          var compressedStream = readable.pipeThrough(compressionStream);
          new Response(compressedStream).arrayBuffer()
            .then(function(compressedBuffer) {
              var compressedArray = new Uint8Array(compressedBuffer);
              if (compressedArray.length > html.length) {
                sendResult('result', html);
              } else {
                sendResult('gzresult', compressedArray);
              }
            })
            .catch(function() {
              sendResult('result', html);
            });

        } else {
          sendResult('result', html);
        }
      }

      if (url == 'eval') {
        console.log('RCH', url, data);
        result(eval(data));
      } else if (url == 'evalrun') {
        console.log('RCH', url, data);
        eval(data);
      } else if (url == 'ping') {
        result('pong');
      } else {
        console.log('RCH', url);
        network["native"](url, result, function(e) {
          console.log('RCH', 'result empty, ' + e.status);
          result('');
        }, data, {
          dataType: 'text',
          timeout: 1000 * 8,
          headers: headers,
          returnHeaders: returnHeaders
        });
      }
    });

    client.on('Connected', function(connectionId) {
      console.log('RCH', 'ConnectionId: ' + connectionId);
      window.rch_nws[hostkey].connectionId = connectionId;
    });
    client.on('Closed', function() {
      console.log('RCH', 'Connection closed');
    });
    client.on('Error', function(err) {
      console.log('RCH', 'error:', err);
    });
  });
};
  window.rch_nws[hostkey].typeInvoke('https://gpbx.me', function() {});

  function rchInvoke(json, call) {
    if (window.nwsClient && window.nwsClient[hostkey] && window.nwsClient[hostkey]._shouldReconnect){
      call();
      return;
    }
    if (!window.nwsClient) window.nwsClient = {};
    if (window.nwsClient[hostkey] && window.nwsClient[hostkey].socket)
      window.nwsClient[hostkey].socket.close();
    window.nwsClient[hostkey] = new NativeWsClient(json.nws, {
      autoReconnect: false
    });
    window.nwsClient[hostkey].on('Connected', function(connectionId) {
      window.rch_nws[hostkey].Registry(window.nwsClient[hostkey], function() {
        call();
      });
    });
    window.nwsClient[hostkey].connect();
  }

  function rchRun(json, call) {
    if (typeof NativeWsClient == 'undefined') {
      Lampa.Utils.putScript(["https://gpbx.me/js/nws-client-es5.js?v18112025"], function() {}, false, function() {
        rchInvoke(json, call);
      }, true);
    } else {
      rchInvoke(json, call);
    }
  }

  function account(url) {
    url = url + '';
    if (url.indexOf('account_email=') == -1) {
      var email = Lampa.Storage.get('account_email');
      if (email) url = Lampa.Utils.addUrlComponent(url, 'account_email=' + encodeURIComponent(email));
    }
    if (url.indexOf('uid=') == -1) {
      var uid = gpbayEnsureUid();
      if (uid) url = Lampa.Utils.addUrlComponent(url, 'uid=' + encodeURIComponent(uid));
    }
    if (url.indexOf('token=') == -1) {
      var token = 'owcy6fda';
      if (token != '') url = Lampa.Utils.addUrlComponent(url, 'token=owcy6fda');
    }
    if (url.indexOf('nws_id=') == -1 && window.rch_nws && window.rch_nws[hostkey]) {
      var nws_id = window.rch_nws[hostkey].connectionId || Lampa.Storage.get('lampac_nws_id', '');
      if (nws_id) url = Lampa.Utils.addUrlComponent(url, 'nws_id=' + encodeURIComponent(nws_id));
    }
    return url;
  }
  

  var gpbay_pairing_state = {
    timer: 0,
    refreshTimer: 0,
    active: false,
    locked: false,
    pairingId: '',
    refreshCooldown: 0
  };

  function templateValueOrEmpty(value) {
    var v = (value || '') + '';
    return /^\{[^}]+\}$/.test(v.trim()) ? '' : v;
  }

  function pairingBase() {
    var external = templateValueOrEmpty('{pairing_host}');
    var host = external || Defined.localhost;
    return (host + '').replace(/\/+$/, '');
  }

  function pairingUrl(path) {
    return pairingBase() + '/pair/v1/' + (path || '').replace(/^\/+/, '');
  }

  function getPairingUid() {
    return gpbayEnsureUid();
  }

  function getPairingProfileId() {
    return Lampa.Storage.get('lampac_profile_id', '');
  }

  function getPairingPlatform() {
    if (Lampa.Platform.is('android')) return 'android';
    if (Lampa.Platform.is('tizen')) return 'tizen';
    if (Lampa.Platform.is('webos')) return 'webos';
    if (Lampa.Platform.is('apple')) return 'apple';
    if (Lampa.Platform.is('browser')) return 'browser';
    return 'unknown';
  }

  function getPairingAppVersion() {
    try {
      if (Lampa.Platform.is('android')) return String(getAndroidVersion() || '');
      if (Lampa.Manifest && Lampa.Manifest.app_digital) return String(Lampa.Manifest.app_digital);
    } catch (e) {}
    return '';
  }

  function getPairingRchType() {
    try {
      return ((window.rch_nws && window.rch_nws[hostkey]) ? window.rch_nws[hostkey].type : (window.rch && window.rch[hostkey]) ? window.rch[hostkey].type : '') || '';
    } catch (e) {}
    return '';
  }

  function getPairingDeviceName() {
    var platform = getPairingPlatform();
    switch (platform) {
      case 'android': return 'Android device';
      case 'tizen': return 'Samsung TV';
      case 'webos': return 'LG TV';
      case 'apple': return 'Apple device';
      case 'browser': return 'Browser';
      default: return 'Lampa device';
    }
  }

  function escapePairingHtml(value) {
    return (value == null ? '' : String(value))
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getPairingBotHandle(pairing) {
    if (pairing && pairing.botHandle) return pairing.botHandle;
    var link = pairing && pairing.botLink ? String(pairing.botLink).trim() : '';
    var match = link.match(/t\.me\/([^\/?#]+)/i);
    return match && match[1] ? '@' + match[1] : 'Telegram-бот';
  }

  function getPairingBadgeText(pairing) {
    if (pairing && pairing.badgeText) return pairing.badgeText;
    return 'Telegram · подключение';
  }

  function getPairingQrImage(pairing) {
    if (pairing && pairing.qrDataUri) return pairing.qrDataUri;
    if (pairing && pairing.qrImageUrl) return pairing.qrImageUrl;
    if (pairing && pairing.botLink) {
      return 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(pairing.botLink);
    }
    return '';
  }

  function getPairingBridgeStatusMessage(resp) {
    return resp && resp.message ? resp.message : 'Доступ к плагину недоступен.';
  }

  function stopPairingTimer() {
    if (gpbay_pairing_state.timer) {
      clearTimeout(gpbay_pairing_state.timer);
      gpbay_pairing_state.timer = 0;
    }
  }


  function stopPairingRefreshTimer() {
    if (gpbay_pairing_state.refreshTimer) {
      clearTimeout(gpbay_pairing_state.refreshTimer);
      gpbay_pairing_state.refreshTimer = 0;
    }
  }

  function formatPairingCooldown(seconds) {
    var total = Math.max(0, parseInt(seconds || 0, 10));
    var minutes = Math.floor(total / 60);
    var secs = total % 60;
    return ('0' + minutes).slice(-2) + ':' + ('0' + secs).slice(-2);
  }

  function ensurePairingModalCss() {
    if (document.getElementById('gpbay_pairing_modal_css')) return;
    var style = document.createElement('style');
    style.id = 'gpbay_pairing_modal_css';
    style.type = 'text/css';
    style.textContent = '' +
      '.modal.pairing-modal #gpbayPairingRefresh.is-disabled{opacity:.56 !important;cursor:default !important;pointer-events:none !important;}' +
      '@media screen and (max-width:480px){' +
      '.modal.pairing-modal{display:flex !important;align-items:center !important;justify-content:center !important;padding:.85em !important;}' +
      '.modal.pairing-modal .modal__content{max-width:34em !important;position:relative !important;left:auto !important;right:auto !important;bottom:auto !important;top:auto !important;width:100% !important;border-radius:1.2em !important;max-height:calc(100vh - 1.7em) !important;overflow:visible !important;}' +
      '.modal.pairing-modal #gpbayPairingCard{max-height:calc(100vh - 1.7em) !important;overflow-y:auto !important;-webkit-overflow-scrolling:touch !important;}' +
      '}';
    document.head.appendChild(style);
  }

  function setPairingRefreshCooldown(seconds) {
    stopPairingRefreshTimer();
    gpbay_pairing_state.refreshCooldown = Math.max(0, parseInt(seconds || 0, 10));

    var render = function() {
      var button = $('#gpbayPairingRefresh');
      if (!button.length) {
        stopPairingRefreshTimer();
        return;
      }

      if (gpbay_pairing_state.refreshCooldown > 0) {
        button.addClass('is-disabled').text('Новый код через ' + formatPairingCooldown(gpbay_pairing_state.refreshCooldown));
        gpbay_pairing_state.refreshCooldown--;
        gpbay_pairing_state.refreshTimer = setTimeout(render, 1000);
      } else {
        button.removeClass('is-disabled').text('Получить новый код');
      }
    };

    render();
  }

  function tunePairingModalLayout() {
    ensurePairingModalCss();
    var modal = $('.modal');
    if (!modal.length) return;
    var content = modal.find('.modal__content');
    modal.addClass('pairing-modal');
    modal.css({
      position: 'fixed',
      top: '0',
      right: '0',
      bottom: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: window.innerWidth <= 560 ? '.45em' : '.8em',
      boxSizing: 'border-box'
    });
    if (window.innerWidth <= 560) {
      content.css({
        width: '100%',
        maxWidth: '34em',
        margin: '0 auto',
        alignSelf: 'center',
        maxHeight: 'calc(100vh - 1.2em)',
        overflow: 'visible'
      });
    } else {
      content.css({
        width: '',
        maxWidth: '',
        margin: '0 auto',
        alignSelf: 'center',
        maxHeight: 'calc(100vh - 1.6em)',
        overflowY: 'auto'
      });
    }
  }

  function pairingErrorText(resp, xhr, fallback) {
    var message = '';

    try {
      if (resp) message = resp.detail || resp.message || resp.error || '';
    } catch (e) {}

    if (!message && xhr && xhr.responseText) {
      try {
        message = xhr.responseText;
      } catch (e2) {}
    }

    if (!message) message = fallback || 'Не удалось выполнить запрос.';

    try {
      if (xhr && xhr.status) message += ' HTTP ' + xhr.status + '.';
    } catch (e3) {}

    return message;
  }

  function requestPairingJson(method, url, payload, onSuccess, onError) {
    $.ajax({
      url: url,
      method: method,
      type: method,
      dataType: 'json',
      timeout: 10000,
      cache: false,
      contentType: payload ? 'application/json' : undefined,
      data: payload ? JSON.stringify(payload) : undefined,
      success: function(resp) {
        if (onSuccess) onSuccess(resp || {});
      },
      error: function(xhr) {
        var data = xhr && xhr.responseJSON ? xhr.responseJSON : null;
        if (!data && xhr && xhr.responseText) {
          try {
            data = JSON.parse(xhr.responseText);
          } catch (e) {}
        }
        if (onError) onError(data || {}, xhr);
      }
    });
  }

  var Network = Lampa.Reguest;

  function component(object) {
    var network = new Network();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Explorer(object);
    var filter = new Lampa.Filter(object);
    var sources = {};
    var last;
    var source;
    var balanser;
    var initialized;
    var balanser_timer;
    var images = [];
    var number_of_requests = 0;
    var number_of_requests_timer;
    var life_wait_times = 0;
    var life_wait_timer;
    var filter_sources = {};
    var filter_translate = {
      season: Lampa.Lang.translate('torrent_serial_season'),
      voice: Lampa.Lang.translate('torrent_parser_voice'),
      source: Lampa.Lang.translate('settings_rest_source')
    };
    var filter_find = {
      season: [],
      voice: []
    };
	
    if (balansers_with_search == undefined) {
      network.timeout(10000);
      network.silent(account('https://gpbx.me/lite/withsearch'), function(json) {
        balansers_with_search = json;
      }, function() {
		  balansers_with_search = [];
	  });
    }
	
    function balanserName(j) {
      var bals = j.balanser;
      var name = j.name.split(' ')[0];
      return (bals || name).toLowerCase();
    }


    function arrayFindCompat(list, predicate) {
      if (!list || !predicate) return null;
      for (var i = 0; i < list.length; i++) {
        if (predicate(list[i], i)) return list[i];
      }
      return null;
    }
	
	function clarificationSearchAdd(value){
		var id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
		var all = Lampa.Storage.get('clarification_search','{}');
		
		all[id] = value;
		
		Lampa.Storage.set('clarification_search',all);
	}
	
	function clarificationSearchDelete(){
		var id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
		var all = Lampa.Storage.get('clarification_search','{}');
		
		delete all[id];
		
		Lampa.Storage.set('clarification_search',all);
	}
	
	function clarificationSearchGet(){
		var id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
		var all = Lampa.Storage.get('clarification_search','{}');
		
		return all[id];
	}
	
    this.renderAccessState = function(title, message) {
      var html = Lampa.Template.get('lampac_does_not_answer', {});
      html.find('.online-empty__buttons').remove();
      html.find('.online-empty__title').text(title || 'Нужно подключить устройство');
      html.find('.online-empty__time').text(message || 'Откройте Telegram и завершите подключение устройства.');
      scroll.clear();
      scroll.append(html);
      this.loading(false);
    };
    this.showPairingModal = function(pairing, baseMessage) {
      var _thisAuth = this;
      var uid = getPairingUid();
      var botHandle = getPairingBotHandle(pairing);
      var badgeText = getPairingBadgeText(pairing);
      var qrImage = getPairingQrImage(pairing);
      var statusText = baseMessage || pairing.message || 'Откройте Telegram и подтвердите устройство.';
      var deviceName = pairing && pairing.deviceName ? pairing.deviceName : getPairingDeviceName();
      var ttlText = pairing.expiresIn ? ('Код активен около ' + Math.max(1, Math.round(pairing.expiresIn / 60)) + ' мин.') : 'Код обновляется автоматически.';
      var isMobile = window.innerWidth <= 560;
      var isTiny = window.innerWidth <= 400;
      var cardMaxWidth = isMobile ? '34em' : '42em';
      var cardPadding = isMobile ? '.9em .92em .88em' : '1.05em 1.08em 1em';
      var headerGap = isMobile ? '.55em' : '.75em';
      var titleSize = isMobile ? '1.38em' : '1.72em';
      var noteSize = isMobile ? '.92em' : '1em';
      var noteLine = isMobile ? '1.34' : '1.42';
      var codeLabelAlign = 'center';
      var codeAlign = 'center';
      var bottomAlign = 'center';
      var codeFont = isTiny ? '1.74em' : (isMobile ? '1.96em' : '2.28em');
      var codeLetter = isTiny ? '.08em' : '.12em';
      var qrWrapWidth = isMobile ? '7.1em' : '8.6em';
      var qrImgSize = isMobile ? '6em' : '7.5em';
      var qrColumn = qrImage
        ? ('<div style="flex-shrink:0;width:' + qrWrapWidth + ';text-align:center;align-self:' + (isMobile ? 'center' : 'flex-start') + '">' +
            '<div style="display:inline-block;background:#fff;border-radius:' + (isMobile ? '.88em' : '1em') + ';padding:' + (isMobile ? '.26em' : '.34em') + ';box-shadow:0 10px 28px rgba(0,0,0,.22)">' +
              '<img src="' + escapePairingHtml(qrImage) + '" alt="QR" style="width:' + qrImgSize + ';height:' + qrImgSize + ';display:block">' +
            '</div>' +
            '<div style="margin-top:' + (isMobile ? '.42em' : '.55em') + ';font-size:' + (isMobile ? '.74em' : '.8em') + ';font-weight:600;color:#eef2ff;word-break:break-word">' + escapePairingHtml(botHandle) + '</div>' +
            '<div style="margin-top:.18em;font-size:' + (isMobile ? '.67em' : '.72em') + ';line-height:1.28;opacity:.62">' + escapePairingHtml(ttlText) + '</div>' +
          '</div>')
        : '';

      var modalHtml = '<div style="max-width:' + cardMaxWidth + ';color:#fff">' +
        '<div style="background:linear-gradient(180deg,rgba(16,20,28,.985),rgba(9,12,18,.97));border:1px solid rgba(255,255,255,.06);border-radius:1.22em;padding:' + cardPadding + ';box-shadow:0 20px 54px rgba(0,0,0,.38)">' +
          '<div style="display:flex;align-items:center;justify-content:space-between;gap:' + headerGap + ';margin-bottom:' + (isMobile ? '.7em' : '.9em') + ';flex-wrap:wrap">' +
            '<div style="display:inline-block;padding:.24em .68em;border-radius:999px;background:rgba(104,126,255,.16);color:#d9e1ff;font-size:' + (isMobile ? '.74em' : '.78em') + ';font-weight:600">' + escapePairingHtml(badgeText) + '</div>' +
            '<div style="display:inline-block;padding:.3em .58em;border-radius:.75em;background:rgba(255,255,255,.055);font-size:' + (isMobile ? '.74em' : '.8em') + ';opacity:.92">Устройство: ' + escapePairingHtml(deviceName) + '</div>' +
          '</div>' +
          '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:' + (isMobile ? '.78em' : '1.05em') + '">' +
            '<div style="min-width:0;flex:1;padding-right:' + (isMobile ? '0' : '.1em') + '">' +
              '<div style="font-size:' + titleSize + ';font-weight:800;line-height:1.08;letter-spacing:-.03em;margin-bottom:.28em;text-align:left">Подключите устройство</div>' +
              '<div id="gpbayPairingNote" style="max-width:' + (isMobile ? '100%' : '18em') + ';font-size:' + noteSize + ';line-height:' + noteLine + ';opacity:.84;text-align:left">' + escapePairingHtml(statusText) + '</div>' +
            '</div>' +
            qrColumn +
          '</div>' +
          '<div style="margin-top:' + (isMobile ? '.78em' : '.95em') + ';padding:' + (isMobile ? '.82em .86em' : '.95em 1.02em') + ';border-radius:1.02em;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)">' +
            '<div style="opacity:.56;font-size:' + (isMobile ? '.72em' : '.76em') + ';letter-spacing:.08em;text-transform:uppercase;margin-bottom:.42em;text-align:' + codeLabelAlign + '">Код подтверждения</div>' +
            '<div id="gpbayPairingCode" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:' + codeFont + ';font-weight:800;letter-spacing:' + codeLetter + ';line-height:1.02;color:#fff;text-align:' + codeAlign + '">' + escapePairingHtml(pairing.code || '---- ----') + '</div>' +
          '</div>' +
          '<div style="margin-top:' + (isMobile ? '.62em' : '.72em') + ';font-size:' + (isMobile ? '.84em' : '.9em') + ';line-height:1.45;opacity:.8;text-align:' + bottomAlign + '">' +
            'Откройте <span style="font-weight:700;color:#eef2ff">' + escapePairingHtml(botHandle) + '</span> и отправьте код. После подтверждения экран обновится автоматически.' +
          '</div>' +
          '<div style="margin-top:' + (isMobile ? '.62em' : '.72em') + ';display:flex;justify-content:center">' +
            '<div id="gpbayPairingRefresh" class="selector" style="display:inline-flex;align-items:center;justify-content:center;padding:' + (isMobile ? '.72em 1em' : '.78em 1.16em') + ';border-radius:.92em;background:rgba(104,126,255,.16);border:1px solid rgba(148,167,255,.22);font-size:' + (isMobile ? '.84em' : '.9em') + ';font-weight:700;color:#eef2ff;cursor:pointer">Получить новый код</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      stopPairingTimer();
      gpbay_pairing_state.active = true;
      gpbay_pairing_state.pairingId = pairing && pairing.pairingId ? pairing.pairingId : '';
      if ($('.modal').length) $('.modal').remove();
      Lampa.Modal.open({
        title: '',
        align: 'center',
        zIndex: 300,
        html: $(modalHtml),
        onBack: function() {
          stopPairingTimer();
          stopPairingRefreshTimer();
          gpbay_pairing_state.active = false;
          $('.modal').removeClass('pairing-modal');
          Lampa.Activity.push({component: 'main'});
          window.location.reload();
        }
      });

      tunePairingModalLayout();
      setPairingRefreshCooldown(pairing && pairing.retryAfterSeconds ? pairing.retryAfterSeconds : 0);
      $('#gpbayPairingRefresh').off('hover:enter click').on('hover:enter click', function(e) {
        if (e && e.preventDefault) e.preventDefault();
        if (gpbay_pairing_state.refreshCooldown > 0) return;
        stopPairingTimer();
        stopPairingRefreshTimer();
        _thisAuth.startPairingFlow('Получаем новый код...', true);
      });

      var poll = function() {
        if (!gpbay_pairing_state.active || !$('.modal').length) {
          stopPairingTimer();
          return;
        }
        requestPairingJson('GET', pairingUrl('check?pairingId=' + encodeURIComponent(pairing.pairingId || '') + '&uid=' + encodeURIComponent(uid)), null, function(resp) {
          var note = $('#gpbayPairingNote');
          if (resp && resp.status == 'success' && resp.authorized) {
            stopPairingTimer();
            stopPairingRefreshTimer();
            gpbay_pairing_state.active = false;
            if ($('.modal').length) $('.modal').remove();
            Lampa.Noty.show(resp.message || 'Устройство привязано');
            window.location.reload();
            return;
          }
          if (resp && resp.status == 'expired') {
            stopPairingTimer();
            stopPairingRefreshTimer();
            _thisAuth.startPairingFlow('Код истёк. Получаем новый...', true);
            return;
          }
          if (resp && resp.status == 'success' && !resp.authorized) {
            stopPairingTimer();
            if (note.length) note.text(resp.message || 'Привязка завершена. Дождитесь подтверждения администратора.');
            return;
          }
          if (resp && resp.message && note.length) note.text(resp.message);
          stopPairingTimer();
          gpbay_pairing_state.timer = setTimeout(poll, 6000);
        }, function() {
          stopPairingTimer();
          gpbay_pairing_state.timer = setTimeout(poll, 7000);
        });
      };

      gpbay_pairing_state.timer = setTimeout(poll, 6000);
    };
    this.startPairingFlow = function(message, forceNew) {

      var _thisAuth = this;
      var pairingUid = getPairingUid();
      if (gpbay_pairing_state.locked) return;
      gpbay_pairing_state.locked = true;
      requestPairingJson('POST', pairingUrl('start?uid=' + encodeURIComponent(pairingUid) + '&lampac_uid=' + encodeURIComponent(pairingUid) + '&_=' + Date.now()), {
        uid: pairingUid,
        lampac_uid: pairingUid,
        deviceName: getPairingDeviceName(),
        platform: getPairingPlatform(),
        appVersion: getPairingAppVersion(),
        profileId: getPairingProfileId(),
        rchType: getPairingRchType(),
        forceNew: !!forceNew
      }, function(resp) {
        gpbay_pairing_state.locked = false;

        // Backend may generate/normalize uid if a broken WebView sends an empty body.
        // Do not change the legacy key name; just adopt the server uid when it is returned.
        if (resp && resp.uid) {
          var serverUid = gpbayUidClean(resp.uid);
          if (serverUid) {
            pairingUid = gpbaySaveUid(serverUid);
          }
        }

        if (resp && resp.alreadyAuthorized) {
          requestPairingJson('GET', pairingUrl('access?uid=' + encodeURIComponent(getPairingUid())), null, function(status) {
            if (status && status.authorized) {
              window.location.reload();
              return;
            }
            _thisAuth.renderAccessState('Требуется авторизация', status && status.message ? status.message : 'Доступ к плагину недоступен.');
          }, function() {
            _thisAuth.renderAccessState('Требуется авторизация', 'Не удалось проверить статус доступа.');
          });
          return;
        }
        if (!resp || !resp.pairingId || !resp.code) {
          _thisAuth.renderAccessState('Требуется авторизация', resp && resp.message ? resp.message : 'Не удалось получить код привязки.');
          return;
        }
        _thisAuth.showPairingModal(resp, message || resp.message);
      }, function(resp, xhr) {
        gpbay_pairing_state.locked = false;
        _thisAuth.renderAccessState('Требуется авторизация', pairingErrorText(resp, xhr, 'Не удалось начать привязку устройства.'));
      });
    };
    this.ensureAuthorized = function() {
      var _thisAuth = this;
      return new Promise(function(resolve, reject) {
        requestPairingJson('GET', pairingUrl('access?uid=' + encodeURIComponent(getPairingUid())), null, function(resp) {
          if (resp && resp.authorized) {
            resolve(resp);
            return;
          }
          if (resp && resp.pending) {
            _thisAuth.startPairingFlow(resp.message || 'Устройство не привязано.');
            reject(resp);
            return;
          }
          _thisAuth.renderAccessState('Требуется авторизация', resp && resp.message ? resp.message : 'Нет доступа к плагину.');
          reject(resp);
        }, function() {
          resolve({ authorized: true });
        });
      });
    };
    this.handleAccessProblem = function(er) {
      if (er && er.accsdb) {
        this.ensureAuthorized()["catch"](function() {});
        return true;
      }
      return false;
    };

    this.initialize = function() {
      var _this = this;
      this.loading(true);
      filter.onSearch = function(value) {
		  
		clarificationSearchAdd(value);
		
        Lampa.Activity.replace({
          search: value,
          clarification: true,
          similar: true
        });
      };
      filter.onBack = function() {
        _this.start();
      };
      filter.render().find('.selector').on('hover:enter', function() {
        clearInterval(balanser_timer);
      });
      filter.render().find('.filter--search').appendTo(filter.render().find('.torrent-filter'));
      filter.onSelect = function(type, a, b) {
        if (type == 'filter') {
          if (a.reset) {
			  clarificationSearchDelete();
			  
            _this.replaceChoice({
              season: 0,
              voice: 0,
              voice_url: '',
              voice_name: ''
            });
            setTimeout(function() {
              Lampa.Select.close();
              Lampa.Activity.replace({
				  clarification: 0,
				  similar: 0
			  });
            }, 10);
          } else {
            var url = filter_find[a.stype][b.index].url;
            var choice = _this.getChoice();
            if (a.stype == 'voice') {
              choice.voice_name = filter_find.voice[b.index].title;
              choice.voice_url = url;
            }
            choice[a.stype] = b.index;
            _this.saveChoice(choice);
            _this.reset();
            _this.request(url);
            setTimeout(Lampa.Select.close, 10);
          }
        } else if (type == 'sort') {
          Lampa.Select.close();
          object.lampac_custom_select = a.source;
          _this.changeBalanser(a.source);
        }
      };
      if (filter.addButtonBack) filter.addButtonBack();
      filter.render().find('.filter--sort span').text(Lampa.Lang.translate('lampac_balanser'));
      scroll.body().addClass('torrent-list');
      files.appendFiles(scroll.render());
      files.appendHead(filter.render());
      scroll.minus(files.render().find('.explorer__files-head'));
      scroll.body().append(Lampa.Template.get('lampac_content_loading'));
      Lampa.Controller.enable('content');
      this.loading(false);
      this.ensureAuthorized().then(function() {
		  if(object.balanser){
			  files.render().find('.filter--search').remove();
			  sources = {};
			  sources[object.balanser] = {name: object.balanser};
			  balanser = object.balanser;
			  filter_sources = [];
			  
			  return network["native"](account(object.url.replace('rjson=','nojson=')), _this.parse.bind(_this), function(er){
				  files.render().find('.torrent-filter').remove();
				  if (!_this.handleAccessProblem(er)) _this.empty();
			  }, false, {
	            dataType: 'text',
				headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
			  });
		  }
	      return _this.externalids().then(function() {
	        return _this.createSource();
	      }).then(function(json) {
	        if (!arrayFindCompat(balansers_with_search, function(b) {
	            return balanser.slice(0, b.length) == b;
	          })) {
	          filter.render().find('.filter--search').addClass('hide');
	        }
	        _this.search();
	      });
	      })["catch"](function(e) {
	        if (e && e.authorized === false) return;
	        _this.noConnectToServer(e);
	      });    };
    this.rch = function(json, noreset) {
      var _this2 = this;
	  rchRun(json, function() {
        if (!noreset) _this2.find();
        else noreset();
	  });
    };
    this.externalids = function() {
      return new Promise(function(resolve, reject) {
        if (!object.movie.imdb_id || !object.movie.kinopoisk_id) {
          var query = [];
          query.push('id=' + encodeURIComponent(object.movie.id));
          query.push('serial=' + (object.movie.name ? 1 : 0));
          if (object.movie.imdb_id) query.push('imdb_id=' + (object.movie.imdb_id || ''));
          if (object.movie.kinopoisk_id) query.push('kinopoisk_id=' + (object.movie.kinopoisk_id || ''));
          var url = Defined.localhost + 'externalids?' + query.join('&');
          network.timeout(10000);
          network.silent(account(url), function(json) {
            for (var name in json) {
              object.movie[name] = json[name];
            }
            resolve();
          }, function() {
            resolve();
          }, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  });
        } else resolve();
      });
    };
    this.updateBalanser = function(balanser_name) {
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      last_select_balanser[object.movie.id] = balanser_name;
      Lampa.Storage.set('online_last_balanser', last_select_balanser);
    };
    this.changeBalanser = function(balanser_name) {
      var gaParams = gpbayMovieParams(object.movie);
      gaParams.balancer = balanser_name || '';
      gaParams.previous_balancer = balanser || '';
      gaParams.balancer_name = sources[balanser_name] && sources[balanser_name].name ? sources[balanser_name].name : '';
      gpbayAnalyticsEvent('gpbay_change_balancer', gaParams);

      this.updateBalanser(balanser_name);
      Lampa.Storage.set('online_balanser', balanser_name);
      var to = this.getChoice(balanser_name);
      var from = this.getChoice();
      if (from.voice_name) to.voice_name = from.voice_name;
      this.saveChoice(to, balanser_name);
      Lampa.Activity.replace();
    };
    this.requestParams = function(url) {
      var query = [];
      var card_source = object.movie.source || 'tmdb'; //Lampa.Storage.field('source')
      query.push('id=' + encodeURIComponent(object.movie.id));
      if (object.movie.imdb_id) query.push('imdb_id=' + (object.movie.imdb_id || ''));
      if (object.movie.kinopoisk_id) query.push('kinopoisk_id=' + (object.movie.kinopoisk_id || ''));
	  if (object.movie.tmdb_id) query.push('tmdb_id=' + (object.movie.tmdb_id || ''));
      query.push('title=' + encodeURIComponent(object.clarification ? object.search : object.movie.title || object.movie.name));
      query.push('original_title=' + encodeURIComponent(object.movie.original_title || object.movie.original_name));
      query.push('serial=' + (object.movie.name ? 1 : 0));
      query.push('original_language=' + (object.movie.original_language || ''));
      query.push('year=' + ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4));
      query.push('source=' + card_source);
      query.push('clarification=' + (object.clarification ? 1 : 0));
      query.push('similar=' + (object.similar ? true : false));
      query.push('rchtype=' + (((window.rch_nws && window.rch_nws[hostkey]) ? window.rch_nws[hostkey].type : (window.rch && window.rch[hostkey]) ? window.rch[hostkey].type : '') || ''));
      if (Lampa.Storage.get('account_email', '')) query.push('cub_id=' + Lampa.Utils.hash(Lampa.Storage.get('account_email', '')));
      return url + (url.indexOf('?') >= 0 ? '&' : '?') + query.join('&');
    };
    this.getLastChoiceBalanser = function() {
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      if (last_select_balanser[object.movie.id]) {
        return last_select_balanser[object.movie.id];
      } else {
        return Lampa.Storage.get('online_balanser', filter_sources.length ? filter_sources[0] : '');
      }
    };
    this.startSource = function(json) {
      return new Promise(function(resolve, reject) {
        json.forEach(function(j) {
          var name = balanserName(j);
          sources[name] = {
            url: j.url,
            name: j.name,
            show: typeof j.show == 'undefined' ? true : j.show
          };
        });
        filter_sources = Lampa.Arrays.getKeys(sources);
        if (filter_sources.length) {
          var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
          if (last_select_balanser[object.movie.id]) {
            balanser = last_select_balanser[object.movie.id];
          } else {
            balanser = Lampa.Storage.get('online_balanser', filter_sources[0]);
          }
          if (!sources[balanser]) balanser = filter_sources[0];
          if (!sources[balanser].show && !object.lampac_custom_select) balanser = filter_sources[0];
          source = sources[balanser].url;
          Lampa.Storage.set('active_balanser', balanser);
          resolve(json);
        } else {
          reject();
        }
      });
    };
    this.lifeSource = function() {
      var _this3 = this;
      return new Promise(function(resolve, reject) {
        var url = _this3.requestParams(Defined.localhost + 'lifeevents?memkey=' + (_this3.memkey || ''));
        var red = false;
        var gou = function gou(json, any) {
          if (json.accsdb) return reject(json);
          var last_balanser = _this3.getLastChoiceBalanser();
          if (!red) {
            var _filter = json.online.filter(function(c) {
              return any ? c.show : c.show && c.name.toLowerCase() == last_balanser;
            });
            if (_filter.length) {
              red = true;
              resolve(json.online.filter(function(c) {
                return c.show;
              }));
            } else if (any) {
              reject();
            }
          }
        };
        var fin = function fin(call) {
          network.timeout(3000);
          network.silent(account(url), function(json) {
            life_wait_times++;
            filter_sources = [];
            sources = {};
            json.online.forEach(function(j) {
              var name = balanserName(j);
              sources[name] = {
                url: j.url,
                name: j.name,
                show: typeof j.show == 'undefined' ? true : j.show
              };
            });
            filter_sources = Lampa.Arrays.getKeys(sources);
            filter.set('sort', filter_sources.map(function(e) {
              return {
                title: sources[e].name,
                source: e,
                selected: e == balanser,
                ghost: !sources[e].show
              };
            }));
            filter.chosen('sort', [sources[balanser] ? sources[balanser].name : balanser]);
            gou(json);
            var lastb = _this3.getLastChoiceBalanser();
            if (life_wait_times > 15 || json.ready) {
              filter.render().find('.lampac-balanser-loader').remove();
              gou(json, true);
            } else if (!red && sources[lastb] && sources[lastb].show) {
              gou(json, true);
              life_wait_timer = setTimeout(fin, 1000);
            } else {
              life_wait_timer = setTimeout(fin, 1000);
            }
          }, function() {
            life_wait_times++;
            if (life_wait_times > 15) {
              reject();
            } else {
              life_wait_timer = setTimeout(fin, 1000);
            }
          }, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  });
        };
        fin();
      });
    };
    this.createSource = function() {
      var _this4 = this;
      return new Promise(function(resolve, reject) {
        var url = _this4.requestParams(Defined.localhost + 'lite/events?life=true');
        network.timeout(15000);
        network.silent(account(url), function(json) {
          if (json.accsdb) return reject(json);
          if (json.life) {
			_this4.memkey = json.memkey;
			if (json.title) {
              if (object.movie.name) object.movie.name = json.title;
              if (object.movie.title) object.movie.title = json.title;
			}
            filter.render().find('.filter--sort').append('<span class="lampac-balanser-loader" style="width: 1.2em; height: 1.2em; margin-top: 0; background: url(./img/loader.svg) no-repeat 50% 50%; background-size: contain; margin-left: 0.5em"></span>');
            _this4.lifeSource().then(_this4.startSource).then(resolve)["catch"](reject);
          } else {
            _this4.startSource(json).then(resolve)["catch"](reject);
          }
        }, reject, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  });
      });
    };
    /**
     * Подготовка
     */
    this.create = function() {
      return this.render();
    };
    /**
     * Начать поиск
     */
    this.search = function() { //this.loading(true)
      this.filter({
        source: filter_sources
      }, this.getChoice());
      this.find();
    };
    this.find = function() {
      this.request(this.requestParams(source));
    };
    this.request = function(url) {
      number_of_requests++;
      if (number_of_requests < 10) {
        network["native"](account(url), this.parse.bind(this), this.doesNotAnswer.bind(this), false, {
          dataType: 'text',
		  headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
        });
        clearTimeout(number_of_requests_timer);
        number_of_requests_timer = setTimeout(function() {
          number_of_requests = 0;
        }, 4000);
      } else this.empty();
    };
    this.parseJsonDate = function(str, name) {
      try {
        var html = $('<div>' + str + '</div>');
        var elems = [];
        html.find(name).each(function() {
          var item = $(this);
          var data = JSON.parse(item.attr('data-json'));
          var season = item.attr('s');
          var episode = item.attr('e');
          var text = item.text();
          if (!object.movie.name) {
            if (text.match(/\d+p/i)) {
              if (!data.quality) {
                data.quality = {};
                data.quality[text] = data.url;
              }
              text = object.movie.title;
            }
            if (text == 'По умолчанию') {
              text = object.movie.title;
            }
          }
          if (episode) data.episode = parseInt(episode);
          if (season) data.season = parseInt(season);
          if (text) data.text = text;
          data.active = item.hasClass('active');
          elems.push(data);
        });
        return elems;
      } catch (e) {
        return [];
      }
    };
    this.getFileUrl = function(file, call, waiting_rch) {
	  var _this = this;
	  
      if(Lampa.Storage.field('player') !== 'inner' && file.stream && Lampa.Platform.is('apple')){
		  var newfile = Lampa.Arrays.clone(file);
		  newfile.method = 'play';
		  newfile.url = file.stream;
		  call(newfile, {});
	  }
      else if (file.method == 'play') call(file, {});
      else {
        Lampa.Loading.start(function() {
          Lampa.Loading.stop();
          Lampa.Controller.toggle('content');
          network.clear();
        });
        network["native"](account(file.url), function(json) {
			if(json.rch){
				if(waiting_rch) {
					waiting_rch = false;
					Lampa.Loading.stop();
					call(false, {});
				}
				else {
					_this.rch(json,function(){
						Lampa.Loading.stop();
						
						_this.getFileUrl(file, call, true);
					});
				}
			}
			else{
				Lampa.Loading.stop();
				call(json, json);
			}
        }, function() {
          Lampa.Loading.stop();
          call(false, {});
        }, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  });
      }
    };
    this.toPlayElement = function(file) {
      var play = {
        title: file.title,
        url: file.url,
        quality: file.qualitys,
        timeline: file.timeline,
        subtitles: file.subtitles,
		segments: file.segments,
        callback: file.mark,
		season: file.season,
		episode: file.episode,
		voice_name: file.voice_name,
		thumbnail: file.thumbnail
      };
      return play;
    };
    this.orUrlReserve = function(data) {
      if (data.url && typeof data.url == 'string' && data.url.indexOf(" or ") !== -1) {
        var urls = data.url.split(" or ");
        data.url = urls[0];
        data.url_reserve = urls[1];
      }
    };
    this.shouldForceHlsjs = function(data) {
      if (!data)
        return false;
	
      var forceHlsBalanser = ((balanser || '') + '').toLowerCase();
      if ((forceHlsBalanser == 'kinopub' || forceHlsBalanser == 'phantom') && Lampa.Platform.is('tizen'))
        return true;	

      var urls = [];

      if (data.url && typeof data.url == 'string')
        urls.push(data.url);

      if (data.url_reserve && typeof data.url_reserve == 'string')
        urls.push(data.url_reserve);

      if (data.quality && typeof data.quality == 'object') {
        for (var q in data.quality) {
          if (typeof data.quality[q] == 'string')
            urls.push(data.quality[q]);
        }
      }

      for (var i = 0; i < urls.length; i++) {
        if (/[?&]hm=hlsjs(?:&|$)/i.test(urls[i]))
          return true;
      }

      return false;
    };
    this.applyForcedHlsMode = function(data) {
      if (!this.shouldForceHlsjs(data))
        return;

      data.hls_type = 'hlsjs';

      if (!data.hls_manifest_timeout)
        data.hls_manifest_timeout = 20000;
    };
    this.setDefaultQuality = function(data) {
      if (Lampa.Arrays.getKeys(data.quality).length) {
        for (var q in data.quality) {
          if (parseInt(q) == Lampa.Storage.field('video_quality_default')) {
            data.url = data.quality[q];
            this.orUrlReserve(data);
          }
          if (data.quality[q].indexOf(" or ") !== -1)
            data.quality[q] = data.quality[q].split(" or ")[0];
        }
      }
    };
    this.gpbayVastString = function(value) {
      if (value == null) return '';
      return String(value).trim();
    };

    this.gpbayVastDisabledUrl = function(url) {
      url = this.gpbayVastString(url);
      if (!url) return true;
      if (/^(false|0|null|undefined|about:blank)$/i.test(url)) return true;
      if (/^lampac-vast-disabled:/i.test(url)) return true;
      return false;
    };

    this.gpbayVastRawClientUrl = function(url) {
      url = this.gpbayVastString(url);
      return /\/lite\/[a-z0-9_-]+\/vast-client(?:\?|$|&)/i.test(url);
    };

    this.gpbayVastPreparedUrl = function(url) {
      url = this.gpbayVastString(url);
      if (/^blob:/i.test(url)) return true;
      if (/^data:application\/xml/i.test(url)) return true;
      if (/\/lite\/[a-z0-9_-]+\/vast-stored(?:\?|$|&)/i.test(url)) return true;
      return false;
    };

    this.gpbayVastGold = function() {
      try {
        if (Lampa && Lampa.Account && typeof Lampa.Account.hasPremium == 'function' && Lampa.Account.hasPremium())
          return true;
      } catch (e) {}

      try {
        var direct = window.__gpbay_group != null ? window.__gpbay_group : window.gpbay_group;
        if (Number(direct) > 0) return true;
      } catch (e) {}

      try {
        if (window.gpbay_profile && Number(window.gpbay_profile.group) > 0)
          return true;
      } catch (e) {}

      try {
        var keys = ['gpbay_group', 'lampac_group', 'account_group'];
        for (var i = 0; i < keys.length; i++) {
          var value = Lampa.Storage.get(keys[i], '');
          if (Number(value) > 0) return true;
        }
      } catch (e) {}

      return false;
    };

    this.clearLampacPluginVastLight = function(element) {
      if (!element) return;

      var url = '';
      try { url = this.gpbayVastString(element.vast_url); } catch (e) {}

      try {
        if (/^blob:/i.test(url) && window.URL && URL.revokeObjectURL)
          URL.revokeObjectURL(url);
      } catch (e) {}

      try { delete element.vast_url; } catch (e) { element.vast_url = undefined; }
      try { delete element.vast_msg; } catch (e) { element.vast_msg = undefined; }
      try { delete element.vast_region; } catch (e) { element.vast_region = undefined; }
      try { delete element.vast_platform; } catch (e) { element.vast_platform = undefined; }
      try { delete element.vast_screen; } catch (e) { element.vast_screen = undefined; }

      // Keep online.my.js source-agnostic. Provider-specific cleanup lives in
      // gpbay.vast.my.js after the heavy VAST module is loaded.
      try { delete element.__gpbay_client_vast_provider; } catch (e) { element.__gpbay_client_vast_provider = ''; }
    };

    this.sanitizeLampacPluginVastElement = function(element, beforePlayer) {
      if (this.gpbayVastSanitize) {
        this.gpbayVastSanitize(element, beforePlayer);
        return;
      }

      if (!element) return;

      var url = this.gpbayVastString(element.vast_url);

      if (this.gpbayVastGold() || this.gpbayVastDisabledUrl(url)) {
        this.clearLampacPluginVastLight(element);
        return;
      }

      if (beforePlayer && this.gpbayVastRawClientUrl(url)) {
        this.clearLampacPluginVastLight(element);
        return;
      }
    };

    this.attachLampacVastFromJson = function(element, vast) {
      if (!element) return;

      if (this.gpbayVastAttachFromJson) {
        this.gpbayVastAttachFromJson(element, vast);
        return;
      }

      this.clearLampacPluginVastLight(element);

      var url = vast && vast.url != null ? this.gpbayVastString(vast.url) : '';
      if (this.gpbayVastDisabledUrl(url)) return;
      if (this.gpbayVastGold()) return;

      element.vast_url = url;
      element.vast_msg = vast.msg;
      element.vast_region = vast.region;
      element.vast_platform = vast.platform;
      element.vast_screen = vast.screen;
    };

    this.gpbayVastScriptUrl = function(element) {
      var version = '1970-01-30';
      var raw = '';

      try { raw = this.gpbayVastString(element && element.vast_url); } catch (e) {}

      // Never use window.location / the Lampa shell origin here. In browser Lampa
      // that origin can be a completely unrelated public web shell domain.
      // Load the VAST helper only from the same backend that produced /lite/<source>/vast-client.
      try {
        var m = /^(https?:\/\/[^\/?#]+)\/lite\/[a-z0-9_-]+\/vast-client(?:\?|$|&)/i.exec(raw);
        if (m && m[1]) return m[1].replace(/\/+$/, '') + '/online/gpbay.vast.js?v=' + version;
      } catch (e) {}

      return '';
    };

    this.installGpbayVastIfReady = function() {
      try {
        if (window.GpbayVast && typeof window.GpbayVast.install == 'function') {
          window.GpbayVast.install(this);
          return true;
        }
      } catch (e) {}

      return false;
    };

    this.ensureGpbayVast = function(element, done) {
      var _thisVast = this;

      if (_thisVast.installGpbayVastIfReady()) {
        done();
        return;
      }

      var scriptUrl = _thisVast.gpbayVastScriptUrl(element);
      if (!scriptUrl) {
        try { console.warn('[GPBAY VAST] helper url is empty; raw client VAST will be skipped'); } catch (e) {}
        done();
        return;
      }

      window.__gpbayVastCallbacks = window.__gpbayVastCallbacks || [];
      window.__gpbayVastCallbacks.push(function() {
        _thisVast.installGpbayVastIfReady();
        done();
      });

      if (window.__gpbayVastLoading)
        return;

      window.__gpbayVastLoading = true;

      var script = document.createElement('script');
      script.async = true;
      script.src = scriptUrl;

      script.onload = function() {
        window.__gpbayVastLoading = false;
        var callbacks = window.__gpbayVastCallbacks || [];
        window.__gpbayVastCallbacks = [];
        for (var i = 0; i < callbacks.length; i++) {
          try { callbacks[i](); } catch (e) {}
        }
      };

      script.onerror = function() {
        window.__gpbayVastLoading = false;
        var callbacks = window.__gpbayVastCallbacks || [];
        window.__gpbayVastCallbacks = [];
        for (var i = 0; i < callbacks.length; i++) {
          try { callbacks[i](); } catch (e) {}
        }
      };

      (document.head || document.documentElement).appendChild(script);
    };

    this.needGpbayVastModule = function(element) {
      if (!element) return false;
      if (this.gpbayVastGold()) return false;
      if (this.gpbayVastDisabledUrl(element.vast_url)) return false;
      if (this.gpbayVastPreparedUrl(element.vast_url)) return false;

      // The heavy module is needed for any internal client-side VAST provider
      // (/lite/<source>/vast-client metadata endpoints). Source-specific logic lives
      // in gpbay.vast.my.js, so adding a new provider should not require touching online.my.js.
      // A direct ready VAST URL can be given to Lampa Player without loading gpbay.vast.my.js.
      return this.gpbayVastRawClientUrl(element.vast_url);
    };

    this.prepareClientVast = function(element, done) {
      if (done) done();
    };

    this.startClientVastClick = function(element) {};
    this.display = function(videos) {
      var _this5 = this;
      this.draw(videos, {
        onEnter: function onEnter(item, html) {
          _this5.getFileUrl(item, function(json, json_call) {
            if (json && json.url) {
              var playlist = [];
              var first = _this5.toPlayElement(item);
              first.url = json.url;
              first.headers = json_call.headers || json.headers;
              first.quality = json_call.quality || item.qualitys;
			  first.segments = json_call.segments || item.segments;
              first.hls_manifest_timeout = json_call.hls_manifest_timeout || json.hls_manifest_timeout;
              first.subtitles = json.subtitles;
			  first.subtitles_call = json_call.subtitles_call || json.subtitles_call;
			  _this5.attachLampacVastFromJson(first, json.vast);
              _this5.orUrlReserve(first);
              _this5.setDefaultQuality(first);
              if (item.season) {
                videos.forEach(function(elem) {
                  var cell = _this5.toPlayElement(elem);
                  if (elem == item) cell.url = json.url;
                  else {
                    if (elem.method == 'call') {
                      if (Lampa.Storage.field('player') !== 'inner') {
                        cell.url = elem.stream;
						delete cell.quality;
                      } else {
                        cell.url = function(call) {
                          _this5.getFileUrl(elem, function(stream, stream_json) {
                            if (stream.url) {
                              cell.url = stream.url;
                              cell.quality = stream_json.quality || elem.qualitys;
							  cell.segments = stream_json.segments || elem.segments;
                              cell.subtitles = stream.subtitles;
                              _this5.orUrlReserve(cell);
                              _this5.setDefaultQuality(cell);
                              elem.mark();
                            } else {
                              cell.url = '';
                              Lampa.Noty.show(Lampa.Lang.translate('lampac_nolink'));
                            }
                            call();
                          }, function() {
                            cell.url = '';
                            call();
                          });
                        };
                      }
                    } else {
                      cell.url = elem.url;
                    }
                  }
                  _this5.orUrlReserve(cell);
                  _this5.setDefaultQuality(cell);
                  playlist.push(cell);
                }); //Lampa.Player.playlist(playlist) 
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              _this5.sanitizeLampacPluginVastElement(first, false);
              playlist.forEach(function(cell) {
                _this5.sanitizeLampacPluginVastElement(cell, false);
              });
              _this5.applyForcedHlsMode(first);
              playlist.forEach(function(cell) {
                _this5.applyForcedHlsMode(cell);
              });
              if (first.url) {
                var element = first;
				element.isonline = true;
                var playNow = function() {
                  _this5.sanitizeLampacPluginVastElement(element, true);
                  playlist.forEach(function(cell) {
                    _this5.sanitizeLampacPluginVastElement(cell, true);
                  });
                  _this5.applyForcedHlsMode(element);
                  var gpbayStreamParams = gpbayMovieParams(object.movie);
                  gpbayStreamParams.balancer = balanser || '';
                  gpbayStreamParams.balancer_name = sources[balanser] && sources[balanser].name ? sources[balanser].name : '';
                  gpbayStreamParams.voice_name = element.voice_name || item.voice_name || '';
                  gpbayStreamParams.quality = gpbayQualityValue(element);
                  gpbayStreamParams.season = element.season || item.season || '';
                  gpbayStreamParams.episode = element.episode || item.episode || '';
                  gpbayStreamParams.has_vast = element.vast_url && !_this5.gpbayVastDisabledUrl(element.vast_url) ? 1 : 0;
                  gpbayAnalyticsEvent('gpbay_stream_open', gpbayStreamParams);
                  _this5.startClientVastClick(element);
                  
                  Lampa.Player.play(element);
                  Lampa.Player.playlist(playlist);
				  if(element.subtitles_call) _this5.loadSubtitles(element.subtitles_call)
                  item.mark();
                  _this5.updateBalanser(balanser);
                };

                if (_this5.needGpbayVastModule(element)) {
                  _this5.ensureGpbayVast(element, function() {
                    if (_this5.prepareClientVast && !_this5.gpbayVastDisabledUrl(element.vast_url))
                      _this5.prepareClientVast(element, playNow);
                    else
                      playNow();
                  });
                } else {
                  playNow();
                }
              } else {
                Lampa.Noty.show(Lampa.Lang.translate('lampac_nolink'));
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('lampac_nolink'));
          }, true);
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          _this5.getFileUrl(item, function(stream) {
            call({
              file: stream.url,
              quality: item.qualitys
            });
          }, true);
        }
      });
      this.filter({
        season: filter_find.season.map(function(s) {
          return s.title;
        }),
        voice: filter_find.voice.map(function(b) {
          return b.title;
        })
      }, this.getChoice());
    };
	this.loadSubtitles = function(link){
		network.silent(account(link), function(subs){
			Lampa.Player.subtitles(subs)
		}, function() {},false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  })
	}
    this.parse = function(str) {
      var json = Lampa.Arrays.decodeJson(str, {});
      if (Lampa.Arrays.isObject(str) && str.rch) json = str;
      if (json.rch) return this.rch(json);
      try {
        var items = this.parseJsonDate(str, '.videos__item');
        var buttons = this.parseJsonDate(str, '.videos__button');
        if (items.length == 1 && items[0].method == 'link' && !items[0].similar) {
          filter_find.season = items.map(function(s) {
            return {
              title: s.text,
              url: s.url
            };
          });
          this.replaceChoice({
            season: 0
          });
          this.request(items[0].url);
        } else {
          this.activity.loader(false);
          var videos = items.filter(function(v) {
            return v.method == 'play' || v.method == 'call';
          });
          var similar = items.filter(function(v) {
            return v.similar;
          });
          if (videos.length) {
            if (buttons.length) {
              filter_find.voice = buttons.map(function(b) {
                return {
                  title: b.text,
                  url: b.url
                };
              });
              var select_voice_url = this.getChoice(balanser).voice_url;
              var select_voice_name = this.getChoice(balanser).voice_name;
              var find_voice_url = arrayFindCompat(buttons, function(v) {
                return v.url == select_voice_url;
              });
              var find_voice_name = arrayFindCompat(buttons, function(v) {
                return v.text == select_voice_name;
              });
              var find_voice_active = arrayFindCompat(buttons, function(v) {
                return v.active;
              }); ////console.log('b',buttons)
              ////console.log('u',find_voice_url)
              ////console.log('n',find_voice_name)
              ////console.log('a',find_voice_active)
              if (find_voice_url && !find_voice_url.active) {
                //console.log('Lampac', 'go to voice', find_voice_url);
                this.replaceChoice({
                  voice: buttons.indexOf(find_voice_url),
                  voice_name: find_voice_url.text
                });
                this.request(find_voice_url.url);
              } else if (find_voice_name && !find_voice_name.active) {
                //console.log('Lampac', 'go to voice', find_voice_name);
                this.replaceChoice({
                  voice: buttons.indexOf(find_voice_name),
                  voice_name: find_voice_name.text
                });
                this.request(find_voice_name.url);
              } else {
                if (find_voice_active) {
                  this.replaceChoice({
                    voice: buttons.indexOf(find_voice_active),
                    voice_name: find_voice_active.text
                  });
                }
                this.display(videos);
              }
            } else {
              this.replaceChoice({
                voice: 0,
                voice_url: '',
                voice_name: ''
              });
              this.display(videos);
            }
          } else if (items.length) {
            if (similar.length) {
              this.similars(similar);
              this.activity.loader(false);
            } else { //this.activity.loader(true)
              filter_find.season = items.map(function(s) {
                return {
                  title: s.text,
                  url: s.url
                };
              });
              var select_season = this.getChoice(balanser).season;
              var season = filter_find.season[select_season];
              if (!season) season = filter_find.season[0];
              //console.log('Lampac', 'go to season', season);
              this.request(season.url);
            }
          } else {
            this.doesNotAnswer(json);
          }
        }
      } catch (e) {
        //console.log('Lampac', 'error', e.stack);
        this.doesNotAnswer(e);
      }
    };
    this.similars = function(json) {
      var _this6 = this;
      scroll.clear();
      json.forEach(function(elem) {
        elem.title = elem.text;
        elem.info = '';
        var info = [];
        var year = ((elem.start_date || elem.year || object.movie.release_date || object.movie.first_air_date || '') + '').slice(0, 4);
        if (year) info.push(year);
        if (elem.details) info.push(elem.details);
        var name = elem.title || elem.text;
        elem.title = name;
        elem.time = elem.time || '';
        elem.info = info.join('<span class="online-prestige-split">●</span>');
        var item = Lampa.Template.get('lampac_prestige_folder', elem);
		if (elem.img) {
		  var image = $('<img style="height: 7em; width: 7em; border-radius: 0.3em;"/>');
		  item.find('.online-prestige__folder').empty().append(image);

		  if (elem.img !== undefined) {
		    if (elem.img.charAt(0) === '/')
		      elem.img = Defined.localhost + elem.img.substring(1);
		    if (elem.img.indexOf('/proxyimg') !== -1)
		      elem.img = account(elem.img);
		  }

		  Lampa.Utils.imgLoad(image, elem.img);
		}
        item.on('hover:enter', function() {
          _this6.reset();
          _this6.request(elem.url);
        }).on('hover:focus', function(e) {
          last = e.target;
          scroll.update($(e.target), true);
        });
        scroll.append(item);
      });
	  this.filter({
        season: filter_find.season.map(function(s) {
          return s.title;
        }),
        voice: filter_find.voice.map(function(b) {
          return b.title;
        })
      }, this.getChoice());
      Lampa.Controller.enable('content');
    };
    this.getChoice = function(for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      var save = data[object.movie.id] || {};
      Lampa.Arrays.extend(save, {
        season: 0,
        voice: 0,
        voice_name: '',
        voice_id: 0,
        episodes_view: {},
        movie_view: ''
      });
      return save;
    };
    this.saveChoice = function(choice, for_balanser) {
      var data = Lampa.Storage.cache('online_choice_' + (for_balanser || balanser), 3000, {});
      data[object.movie.id] = choice;
      Lampa.Storage.set('online_choice_' + (for_balanser || balanser), data);
      this.updateBalanser(for_balanser || balanser);
    };
    this.replaceChoice = function(choice, for_balanser) {
      var to = this.getChoice(for_balanser);
      Lampa.Arrays.extend(to, choice, true);
      this.saveChoice(to, for_balanser);
    };
    this.clearImages = function() {
      images.forEach(function(img) {
        img.onerror = function() {};
        img.onload = function() {};
        img.src = '';
      });
      images = [];
    };
    /**
     * Очистить список файлов
     */
    this.reset = function() {
      last = false;
      clearInterval(balanser_timer);
      network.clear();
      this.clearImages();
      scroll.render().find('.empty').remove();
      scroll.clear();
      scroll.reset();
      scroll.body().append(Lampa.Template.get('lampac_content_loading'));
    };
    /**
     * Загрузка
     */
    this.loading = function(status) {
      if (status) this.activity.loader(true);
      else {
        this.activity.loader(false);
        this.activity.toggle();
      }
    };
    /**
     * Построить фильтр
     */
    this.filter = function(filter_items, choice) {
      var _this7 = this;
      var select = [];
      var add = function add(type, title) {
        var need = _this7.getChoice();
        var items = filter_items[type];
        var subitems = [];
        var value = need[type];
        items.forEach(function(name, i) {
          subitems.push({
            title: name,
            selected: value == i,
            index: i
          });
        });
        select.push({
          title: title,
          subtitle: items[value],
          items: subitems,
          stype: type
        });
      };
      filter_items.source = filter_sources;
      select.push({
        title: Lampa.Lang.translate('torrent_parser_reset'),
        reset: true
      });
      this.saveChoice(choice);
      if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
      if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
      filter.set('filter', select);
      filter.set('sort', filter_sources.map(function(e) {
        return {
          title: sources[e].name,
          source: e,
          selected: e == balanser,
          ghost: !sources[e].show
        };
      }));
      this.selected(filter_items);
    };
    /**
     * Показать что выбрано в фильтре
     */
    this.selected = function(filter_items) {
      var need = this.getChoice(),
        select = [];
      for (var i in need) {
        if (filter_items[i] && filter_items[i].length) {
          if (i == 'voice') {
            select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
          } else if (i !== 'source') {
            if (filter_items.season.length >= 1) {
              select.push(filter_translate.season + ': ' + filter_items[i][need[i]]);
            }
          }
        }
      }
      filter.chosen('filter', select);
      filter.chosen('sort', [sources[balanser].name]);
    };
    this.getEpisodes = function(season, call) {
      var episodes = [];
	  var tmdb_id = object.movie.id;
	  if (['cub', 'tmdb'].indexOf(object.movie.source || 'tmdb') == -1) 
        tmdb_id = object.movie.tmdb_id;
      if (typeof tmdb_id == 'number' && object.movie.name) {
		  Lampa.Api.sources.tmdb.get('tv/' + tmdb_id + '/season/' + season, {}, function(data){
			  episodes = data.episodes || [];
			  
			  call(episodes);
		  }, function(){
			  call(episodes);
		  })
      } else call(episodes);
    };
    this.watched = function(set) {
      var file_id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title);
      var watched = Lampa.Storage.cache('online_watched_last', 5000, {});
      if (set) {
        if (!watched[file_id]) watched[file_id] = {};
        Lampa.Arrays.extend(watched[file_id], set, true);
        Lampa.Storage.set('online_watched_last', watched);
        this.updateWatched();
      } else {
        return watched[file_id];
      }
    };
    this.updateWatched = function() {
      var watched = this.watched();
      var body = scroll.body().find('.online-prestige-watched .online-prestige-watched__body').empty();
      if (watched) {
        var line = [];
        if (watched.balanser_name) line.push(watched.balanser_name);
        if (watched.voice_name) line.push(watched.voice_name);
        if (watched.season) line.push(Lampa.Lang.translate('torrent_serial_season') + ' ' + watched.season);
        if (watched.episode) line.push(Lampa.Lang.translate('torrent_serial_episode') + ' ' + watched.episode);
        line.forEach(function(n) {
          body.append('<span>' + n + '</span>');
        });
      } else body.append('<span>' + Lampa.Lang.translate('lampac_no_watch_history') + '</span>');
    };
    /**
     * Отрисовка файлов
     */
    this.draw = function(items) {
      var _this8 = this;
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!items.length) return this.empty();
      scroll.clear();
      if(!object.balanser)scroll.append(Lampa.Template.get('lampac_prestige_watched', {}));
      this.updateWatched();
      this.getEpisodes(items[0].season, function(episodes) {
        var viewed = Lampa.Storage.cache('online_view', 5000, []);
        var serial = object.movie.name ? true : false;
        var choice = _this8.getChoice();
        var fully = window.innerWidth > 480;
        var scroll_to_element = false;
        var scroll_to_mark = false;
        items.forEach(function(element, index) {
          var episode = serial && episodes.length && !params.similars ? arrayFindCompat(episodes, function(e) {
            return e.episode_number == element.episode;
          }) : false;
          var episode_num = element.episode || index + 1;
          var episode_last = choice.episodes_view[element.season];
          var voice_name = choice.voice_name || (filter_find.voice[0] ? filter_find.voice[0].title : false) || element.voice_name || (serial ? 'Неизвестно' : element.text) || 'Неизвестно';
          if (element.quality) {
            element.qualitys = element.quality;
            element.quality = Lampa.Arrays.getKeys(element.quality)[0];
          }
          Lampa.Arrays.extend(element, {
            voice_name: voice_name,
            info: voice_name.length > 60 ? voice_name.substr(0, 60) + '...' : voice_name,
            quality: '',
            time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true)
          });
          var hash_timeline = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title].join('') : object.movie.original_title);
          var hash_behold = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.voice_name].join('') : object.movie.original_title + element.voice_name);
          var data = {
            hash_timeline: hash_timeline,
            hash_behold: hash_behold
          };
          var info = [];
          if (element.season) {
            element.translate_episode_end = _this8.getLastEpisode(items);
            element.translate_voice = element.voice_name;
          }
          if (element.text && !episode) element.title = element.text;
          element.timeline = Lampa.Timeline.view(hash_timeline);
          if (episode) {
            element.title = episode.name;
            if (element.info.length < 30 && episode.vote_average) info.push(Lampa.Template.get('lampac_prestige_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date && fully) info.push(Lampa.Utils.parseTime(episode.air_date).full);
          } else if (object.movie.release_date && fully) {
            info.push(Lampa.Utils.parseTime(object.movie.release_date).full);
          }
          if (!serial && object.movie.tagline && element.info.length < 30) info.push(object.movie.tagline);
          if (element.info) info.push(element.info);
          if (info.length) element.info = info.map(function(i) {
            return '<span>' + i + '</span>';
          }).join('<span class="online-prestige-split">●</span>');
          var html = Lampa.Template.get('lampac_prestige_full', element);
          var loader = html.find('.online-prestige__loader');
          var image = html.find('.online-prestige__img');
		  if(object.balanser) image.hide();
          if (!serial) {
            if (choice.movie_view == hash_behold) scroll_to_element = html;
          } else if (typeof episode_last !== 'undefined' && episode_last == episode_num) {
            scroll_to_element = html;
          }
          if (serial && !episode) {
            image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
            loader.remove();
          }
		  else if (!serial && object.movie.backdrop_path == 'undefined') loader.remove();
          else {
            var img = html.find('img')[0];
            img.onerror = function() {
              img.src = './img/img_broken.svg';
            };
            img.onload = function() {
              image.addClass('online-prestige__img--loaded');
              loader.remove();
              if (serial) image.append('<div class="online-prestige__episode-number">' + ('0' + (element.episode || index + 1)).slice(-2) + '</div>');
            };
            img.src = Lampa.TMDB.image('t/p/w300' + (episode ? episode.still_path : object.movie.backdrop_path));
            images.push(img);
			element.thumbnail = img.src
          }
          html.find('.online-prestige__timeline').append(Lampa.Timeline.render(element.timeline));
          if (viewed.indexOf(hash_behold) !== -1) {
            scroll_to_mark = html;
            html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
          }
          element.mark = function() {
            viewed = Lampa.Storage.cache('online_view', 5000, []);
            if (viewed.indexOf(hash_behold) == -1) {
              viewed.push(hash_behold);
              Lampa.Storage.set('online_view', viewed);
              if (html.find('.online-prestige__viewed').length == 0) {
                html.find('.online-prestige__img').append('<div class="online-prestige__viewed">' + Lampa.Template.get('icon_viewed', {}, true) + '</div>');
              }
            }
            choice = _this8.getChoice();
            if (!serial) {
              choice.movie_view = hash_behold;
            } else {
              choice.episodes_view[element.season] = episode_num;
            }
            _this8.saveChoice(choice);
            var voice_name_text = choice.voice_name || element.voice_name || element.title;
            if (voice_name_text.length > 30) voice_name_text = voice_name_text.slice(0, 30) + '...';
            _this8.watched({
              balanser: balanser,
              balanser_name: Lampa.Utils.capitalizeFirstLetter(sources[balanser] ? sources[balanser].name.split(' ')[0] : balanser),
              voice_id: choice.voice_id,
              voice_name: voice_name_text,
              episode: element.episode,
              season: element.season
            });
          };
          element.unmark = function() {
            viewed = Lampa.Storage.cache('online_view', 5000, []);
            if (viewed.indexOf(hash_behold) !== -1) {
              Lampa.Arrays.remove(viewed, hash_behold);
              Lampa.Storage.set('online_view', viewed);
              Lampa.Storage.remove('online_view', hash_behold);
              html.find('.online-prestige__viewed').remove();
            }
          };
          element.timeclear = function() {
            element.timeline.percent = 0;
            element.timeline.time = 0;
            element.timeline.duration = 0;
            Lampa.Timeline.update(element.timeline);
          };
          html.on('hover:enter', function() {
            if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
            if (params.onEnter) params.onEnter(element, html, data);
          }).on('hover:focus', function(e) {
            last = e.target;
            if (params.onFocus) params.onFocus(element, html, data);
            scroll.update($(e.target), true);
          });
          if (params.onRender) params.onRender(element, html, data);
          _this8.contextMenu({
            html: html,
            element: element,
            onFile: function onFile(call) {
              if (params.onContextMenu) params.onContextMenu(element, html, data, call);
            },
            onClearAllMark: function onClearAllMark() {
              items.forEach(function(elem) {
                elem.unmark();
              });
            },
            onClearAllTime: function onClearAllTime() {
              items.forEach(function(elem) {
                elem.timeclear();
              });
            }
          });
          scroll.append(html);
        });
        if (serial && episodes.length > items.length && !params.similars) {
          var left = episodes.slice(items.length);
          left.forEach(function(episode) {
            var info = [];
            if (episode.vote_average) info.push(Lampa.Template.get('lampac_prestige_rate', {
              rate: parseFloat(episode.vote_average + '').toFixed(1)
            }, true));
            if (episode.air_date) info.push(Lampa.Utils.parseTime(episode.air_date).full);
            var air = new Date((episode.air_date + '').replace(/-/g, '/'));
            var now = Date.now();
            var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
            var txt = Lampa.Lang.translate('full_episode_days_left') + ': ' + day;
            var html = Lampa.Template.get('lampac_prestige_full', {
              time: Lampa.Utils.secondsToTime((episode ? episode.runtime : object.movie.runtime) * 60, true),
              info: info.length ? info.map(function(i) {
                return '<span>' + i + '</span>';
              }).join('<span class="online-prestige-split">●</span>') : '',
              title: episode.name,
              quality: day > 0 ? txt : ''
            });
            var loader = html.find('.online-prestige__loader');
            var image = html.find('.online-prestige__img');
            var season = items[0] ? items[0].season : 1;
            html.find('.online-prestige__timeline').append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([season, episode.episode_number, object.movie.original_title].join('')))));
            var img = html.find('img')[0];
            if (episode.still_path) {
              img.onerror = function() {
                img.src = './img/img_broken.svg';
              };
              img.onload = function() {
                image.addClass('online-prestige__img--loaded');
                loader.remove();
                image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
              };
              img.src = Lampa.TMDB.image('t/p/w300' + episode.still_path);
              images.push(img);
            } else {
              loader.remove();
              image.append('<div class="online-prestige__episode-number">' + ('0' + episode.episode_number).slice(-2) + '</div>');
            }
            html.on('hover:focus', function(e) {
              last = e.target;
              scroll.update($(e.target), true);
            });
            html.css('opacity', '0.5');
            scroll.append(html);
          });
        }
        if (scroll_to_element) {
          last = scroll_to_element[0];
        } else if (scroll_to_mark) {
          last = scroll_to_mark[0];
        }
        Lampa.Controller.enable('content');
      });
    };
    /**
     * Меню
     */
    this.contextMenu = function(params) {
      params.html.on('hover:long', function() {
        function show(extra) {
          var enabled = Lampa.Controller.enabled().name;
          var menu = [];
          if (Lampa.Platform.is('webos')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Webos',
              player: 'webos'
            });
          }
          if (Lampa.Platform.is('android')) {
            menu.push({
              title: Lampa.Lang.translate('player_lauch') + ' - Android',
              player: 'android'
            });
          }
          menu.push({
            title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
            player: 'lampa'
          });
          menu.push({
            title: Lampa.Lang.translate('lampac_video'),
            separator: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_title'),
            mark: true
          });
          menu.push({
            title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
            unmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('time_reset'),
            timeclear: true
          });
          if (extra) {
            menu.push({
              title: Lampa.Lang.translate('copy_link'),
              copylink: true
            });
          }
          if (window.lampac_online_context_menu)
            window.lampac_online_context_menu.push(menu, extra, params);
          menu.push({
            title: Lampa.Lang.translate('more'),
            separator: true
          });
          if (Lampa.Account.logged() && params.element && typeof params.element.season !== 'undefined' && params.element.translate_voice) {
            menu.push({
              title: Lampa.Lang.translate('lampac_voice_subscribe'),
              subscribe: true
            });
          }
          menu.push({
            title: Lampa.Lang.translate('lampac_clear_all_marks'),
            clearallmark: true
          });
          menu.push({
            title: Lampa.Lang.translate('lampac_clear_all_timecodes'),
            timeclearall: true
          });
          Lampa.Select.show({
            title: Lampa.Lang.translate('title_action'),
            items: menu,
            onBack: function onBack() {
              Lampa.Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.mark) params.element.mark();
              if (a.unmark) params.element.unmark();
              if (a.timeclear) params.element.timeclear();
              if (a.clearallmark) params.onClearAllMark();
              if (a.timeclearall) params.onClearAllTime();
              if (window.lampac_online_context_menu)
                window.lampac_online_context_menu.onSelect(a, params);
              Lampa.Controller.toggle(enabled);
              if (a.player) {
                Lampa.Player.runas(a.player);
                params.html.trigger('hover:enter');
              }
              if (a.copylink) {
                if (extra.quality) {
                  var qual = [];
                  for (var i in extra.quality) {
                    qual.push({
                      title: i,
                      file: extra.quality[i]
                    });
                  }
                  Lampa.Select.show({
                    title: Lampa.Lang.translate('settings_server_links'),
                    items: qual,
                    onBack: function onBack() {
                      Lampa.Controller.toggle(enabled);
                    },
                    onSelect: function onSelect(b) {
                      Lampa.Utils.copyTextToClipboard(b.file, function() {
                        Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                      }, function() {
                        Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                      });
                    }
                  });
                } else {
                  Lampa.Utils.copyTextToClipboard(extra.file, function() {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                  }, function() {
                    Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                  });
                }
              }
              if (a.subscribe) {
                Lampa.Account.subscribeToTranslation({
                  card: object.movie,
                  season: params.element.season,
                  episode: params.element.translate_episode_end,
                  voice: params.element.translate_voice
                }, function() {
                  Lampa.Noty.show(Lampa.Lang.translate('lampac_voice_success'));
                }, function() {
                  Lampa.Noty.show(Lampa.Lang.translate('lampac_voice_error'));
                });
              }
            }
          });
        }
        params.onFile(show);
      }).on('hover:focus', function() {
        if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('helper_online_file'), params.html);
      });
    };
    /**
     * Показать пустой результат
     */
    this.empty = function() {
      var html = Lampa.Template.get('lampac_does_not_answer', {});
      html.find('.online-empty__buttons').remove();
      html.find('.online-empty__title').text(Lampa.Lang.translate('empty_title_two'));
      html.find('.online-empty__time').text(Lampa.Lang.translate('empty_text'));
      scroll.clear();
      scroll.append(html);
      this.loading(false);
    };
    this.getCurrentBalanserDisplayName = function() {
      return sources[balanser] && sources[balanser].name ? sources[balanser].name : (object.balanser || balanser || '');
    };
    this.noConnectToServer = function(er) {
      if (this.handleAccessProblem(er)) return;
      var html = Lampa.Template.get('lampac_does_not_answer', {});
      html.find('.online-empty__buttons').remove();
      html.find('.online-empty__title').text(Lampa.Lang.translate('title_error'));
      html.find('.online-empty__time').text(er && er.accsdb ? er.msg : Lampa.Lang.translate('lampac_does_not_answer_text').replace('{balanser}', this.getCurrentBalanserDisplayName()));
      scroll.clear();
      scroll.append(html);
      this.loading(false);
    };
    this.doesNotAnswer = function(er) {
      if (this.handleAccessProblem(er)) return;
      var _this9 = this;
      this.reset();
      var html = Lampa.Template.get('lampac_does_not_answer', {
        balanser: this.getCurrentBalanserDisplayName()
      });
      if(er && er.accsdb) html.find('.online-empty__title').html(er.msg);
	  
      var tic = er && er.accsdb ? 10 : 5;
      html.find('.cancel').on('hover:enter', function() {
        clearInterval(balanser_timer);
      });
      html.find('.change').on('hover:enter', function() {
        clearInterval(balanser_timer);
        filter.render().find('.filter--sort').trigger('hover:enter');
      });
      scroll.clear();
      scroll.append(html);
      this.loading(false);
      balanser_timer = setInterval(function() {
        tic--;
        html.find('.timeout').text(tic);
        if (tic == 0) {
          clearInterval(balanser_timer);
          var keys = Lampa.Arrays.getKeys(sources);
          var indx = keys.indexOf(balanser);
          var next = keys[indx + 1];
          if (!next) next = keys[0];
          balanser = next;
          if (Lampa.Activity.active().activity == _this9.activity) _this9.changeBalanser(balanser);
        }
      }, 1000);
    };
    this.getLastEpisode = function(items) {
      var last_episode = 0;
      items.forEach(function(e) {
        if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
      });
      return last_episode;
    };
    /**
     * Начать навигацию по файлам
     */
    this.start = function() {
      if (Lampa.Activity.active().activity !== this.activity) return;
      if (!initialized) {
        initialized = true;
        this.initialize();
      }
      Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(object.movie));
      Lampa.Controller.add('content', {
        toggle: function toggle() {
          Lampa.Controller.collectionSet(scroll.render(), files.render());
          Lampa.Controller.collectionFocus(last || false, scroll.render());
        },
        gone: function gone() {
          clearTimeout(balanser_timer);
        },
        up: function up() {
          if (Navigator.canmove('up')) {
            Navigator.move('up');
          } else Lampa.Controller.toggle('head');
        },
        down: function down() {
          Navigator.move('down');
        },
        right: function right() {
          if (Navigator.canmove('right')) Navigator.move('right');
          else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');
          else Lampa.Controller.toggle('menu');
        },
        back: this.back.bind(this)
      });
      Lampa.Controller.toggle('content');
    };
    this.render = function() {
      return files.render();
    };
    this.back = function() {
      Lampa.Activity.backward();
    };
    this.pause = function() {};
    this.stop = function() {};
    this.destroy = function() {
      network.clear();
      this.clearImages();
      files.destroy();
      scroll.destroy();
      clearInterval(balanser_timer);
      clearTimeout(life_wait_timer);
    };
  }
  
  function addSourceSearch(spiderName, spiderUri) {
    var network = new Lampa.Reguest();

    var source = {
      title: spiderName,
      search: function(params, oncomplite) {
        function searchComplite(links) {
          var keys = Lampa.Arrays.getKeys(links);

          if (keys.length) {
            var status = new Lampa.Status(keys.length);

            status.onComplite = function(result) {
              var rows = [];

              keys.forEach(function(name) {
                var line = result[name];

                if (line && line.data && line.type == 'similar') {
                  var cards = line.data.map(function(item) {
                    item.title = Lampa.Utils.capitalizeFirstLetter(item.title);
                    item.release_date = item.year || '0000';
                    item.balanser = spiderUri;
                    if (item.img !== undefined) {
                      if (item.img.charAt(0) === '/')
                        item.img = Defined.localhost + item.img.substring(1);
                      if (item.img.indexOf('/proxyimg') !== -1)
                        item.img = account(item.img);
                    }

                    return item;
                  })

                  rows.push({
                    title: name,
                    results: cards
                  })
                }
              })

              oncomplite(rows);
            }

            keys.forEach(function(name) {
              network.silent(account(links[name]), function(data) {
                status.append(name, data);
              }, function() {
                status.error();
              }, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  })
            })
          } else {
            oncomplite([]);
          }
        }

        network.silent(account(Defined.localhost + 'lite/' + spiderUri + '?title=' + params.query), function(json) {
          if (json.rch) {
            rchRun(json, function() {
              network.silent(account(Defined.localhost + 'lite/' + spiderUri + '?title=' + params.query), function(links) {
                searchComplite(links);
              }, function() {
                oncomplite([]);
              }, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  });
            });
          } else {
            searchComplite(json);
          }
        }, function() {
          oncomplite([]);
        }, false, {
			headers: {'X-Kit-AesGcm': Lampa.Storage.get('aesgcmkey', '')}
		  });
      },
      onCancel: function() {
        network.clear()
      },
      params: {
        lazy: true,
        align_left: true,
        card_events: {
          onMenu: function() {}
        }
      },
      onMore: function(params, close) {
        close();
      },
      onSelect: function(params, close) {
        close();

        gpbayAnalyticsOpen(params.element, 'search_source');

        Lampa.Activity.push({
          url: params.element.url,
          title: 'Lampac - ' + params.element.title,
          component: 'gpbay',
          movie: params.element,
          page: 1,
          search: params.element.title,
          clarification: true,
          balanser: params.element.balanser,
          noinfo: true
        });
      }
    }

    Lampa.Search.addSource(source)
  }

  function startPlugin() {
    window.gpbay_plugin = true;
    var manifst = {
      type: 'video',
      version: '',
      name: 'GPBAY',
      description: 'Плагин для просмотра онлайн сериалов и фильмов',
      component: 'gpbay',
      onContextMenu: function onContextMenu(object) {
        return {
          name: Lampa.Lang.translate('lampac_watch'),
          description: ''
        };
      },
      onContextLauch: function onContextLauch(object) {
        resetTemplates();
        Lampa.Component.add('gpbay', component);
		
		var id = Lampa.Utils.hash(object.number_of_seasons ? object.original_name : object.original_title);
		var all = Lampa.Storage.get('clarification_search','{}');
		
        gpbayAnalyticsOpen(object, 'context_menu');

        Lampa.Activity.push({
          url: '',
          title: Lampa.Lang.translate('title_online'),
          component: 'gpbay',
          search: all[id] ? all[id] : object.title,
          search_one: object.title,
          search_two: object.original_title,
          movie: object,
          page: 1,
		  clarification: all[id] ? true : false
        });
      }
    };
	
	
    Lampa.Manifest.plugins = manifst;
    Lampa.Lang.add({
      lampac_watch: { //
        ru: 'Смотреть онлайн',
        en: 'Watch online',
        uk: 'Дивитися онлайн',
        zh: '在线观看'
      },
      lampac_video: { //
        ru: 'Видео',
        en: 'Video',
        uk: 'Відео',
        zh: '视频'
      },
      lampac_no_watch_history: {
        ru: 'Нет истории просмотра',
        en: 'No browsing history',
        ua: 'Немає історії перегляду',
        zh: '没有浏览历史'
      },
      lampac_nolink: {
        ru: 'Не удалось извлечь ссылку',
        uk: 'Неможливо отримати посилання',
        en: 'Failed to fetch link',
        zh: '获取链接失败'
      },
      lampac_balanser: { //
        ru: 'Источник',
        uk: 'Джерело',
        en: 'Source',
        zh: '来源'
      },
      helper_online_file: { //
        ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
        uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
        en: 'Hold the "OK" key to bring up the context menu',
        zh: '按住“确定”键调出上下文菜单'
      },
      title_online: { //
        ru: 'Онлайн',
        uk: 'Онлайн',
        en: 'Online',
        zh: '在线的'
      },
      lampac_voice_subscribe: { //
        ru: 'Подписаться на перевод',
        uk: 'Підписатися на переклад',
        en: 'Subscribe to translation',
        zh: '订阅翻译'
      },
      lampac_voice_success: { //
        ru: 'Вы успешно подписались',
        uk: 'Ви успішно підписалися',
        en: 'You have successfully subscribed',
        zh: '您已成功订阅'
      },
      lampac_voice_error: { //
        ru: 'Возникла ошибка',
        uk: 'Виникла помилка',
        en: 'An error has occurred',
        zh: '发生了错误'
      },
      lampac_clear_all_marks: { //
        ru: 'Очистить все метки',
        uk: 'Очистити всі мітки',
        en: 'Clear all labels',
        zh: '清除所有标签'
      },
      lampac_clear_all_timecodes: { //
        ru: 'Очистить все тайм-коды',
        uk: 'Очистити всі тайм-коди',
        en: 'Clear all timecodes',
        zh: '清除所有时间代码'
      },
      lampac_change_balanser: { //
        ru: 'Изменить балансер',
        uk: 'Змінити балансер',
        en: 'Change balancer',
        zh: '更改平衡器'
      },
      lampac_balanser_dont_work: { //
        ru: 'Поиск на ({balanser}) не дал результатов',
        uk: 'Пошук на ({balanser}) не дав результатів',
        en: 'Search on ({balanser}) did not return any results',
        zh: '搜索 ({balanser}) 未返回任何结果'
      },
      lampac_balanser_timeout: { //
        ru: 'Источник будет переключен автоматически через <span class="timeout">10</span> секунд.',
        uk: 'Джерело буде автоматично переключено через <span class="timeout">10</span> секунд.',
        en: 'The source will be switched automatically after <span class="timeout">10</span> seconds.',
        zh: '平衡器将在<span class="timeout">10</span>秒内自动切换。'
      },
      lampac_does_not_answer_text: {
        ru: 'Поиск на ({balanser}) не дал результатов',
        uk: 'Пошук на ({balanser}) не дав результатів',
        en: 'Search on ({balanser}) did not return any results',
        zh: '搜索 ({balanser}) 未返回任何结果'
      }
    });
    Lampa.Template.add('lampac_css', "\n        <style>\n        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em}\n        </style>\n    ");
    $('body').append(Lampa.Template.get('lampac_css', {}, true));

    function resetTemplates() {
      Lampa.Template.add('lampac_prestige_full', "<div class=\"online-prestige online-prestige--full selector\">\n            <div class=\"online-prestige__img\">\n                <img alt=\"\">\n                <div class=\"online-prestige__loader\"></div>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__timeline\"></div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                    <div class=\"online-prestige__quality\">{quality}</div>\n                </div>\n            </div>\n        </div>");
      Lampa.Template.add('lampac_content_loading', "<div class=\"online-empty\">\n            <div class=\"broadcast__scan\"><div></div></div>\n\t\t\t\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template selector\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
      Lampa.Template.add('lampac_does_not_answer', "<div class=\"online-empty\">\n            <div class=\"online-empty__title\">\n                #{lampac_balanser_dont_work}\n            </div>\n            <div class=\"online-empty__time\">\n                #{lampac_balanser_timeout}\n            </div>\n            <div class=\"online-empty__buttons\">\n                <div class=\"online-empty__button selector cancel\">#{cancel}</div>\n                <div class=\"online-empty__button selector change\">#{lampac_change_balanser}</div>\n            </div>\n            <div class=\"online-empty__templates\">\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n                <div class=\"online-empty-template\">\n                    <div class=\"online-empty-template__ico\"></div>\n                    <div class=\"online-empty-template__body\"></div>\n                </div>\n            </div>\n        </div>");
      Lampa.Template.add('lampac_prestige_rate', "<div class=\"online-prestige-rate\">\n            <svg width=\"17\" height=\"16\" viewBox=\"0 0 17 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z\" fill=\"#fff\"></path>\n            </svg>\n            <span>{rate}</span>\n        </div>");
      Lampa.Template.add('lampac_prestige_folder', "<div class=\"online-prestige online-prestige--folder selector\">\n            <div class=\"online-prestige__folder\">\n                <svg viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"></rect>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"></path>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"></rect>\n                </svg>\n            </div>\n            <div class=\"online-prestige__body\">\n                <div class=\"online-prestige__head\">\n                    <div class=\"online-prestige__title\">{title}</div>\n                    <div class=\"online-prestige__time\">{time}</div>\n                </div>\n\n                <div class=\"online-prestige__footer\">\n                    <div class=\"online-prestige__info\">{info}</div>\n                </div>\n            </div>\n        </div>");
      Lampa.Template.add('lampac_prestige_watched', "<div class=\"online-prestige online-prestige-watched selector\">\n            <div class=\"online-prestige-watched__icon\">\n                <svg width=\"21\" height=\"21\" viewBox=\"0 0 21 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"10.5\" cy=\"10.5\" r=\"9\" stroke=\"currentColor\" stroke-width=\"3\"/>\n                    <path d=\"M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z\" fill=\"currentColor\"/>\n                </svg>\n            </div>\n            <div class=\"online-prestige-watched__body\">\n                \n            </div>\n        </div>");
    }
    var button = '<div class="full-start__button selector view--online" data-subtitle="' + manifst.name + '">' +
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 29" fill="none">' +
			'<g transform="translate(14 14.5) scale(1.14) translate(-14 -14.5)">' +
				'<path d="M22.4 8.55A10.55 10.55 0 1 0 22.4 20.45V14.5H18.55" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"></path>' +
				'<path d="M18.55 13.72C19.22 14.11 19.22 14.89 18.55 15.28L13.25 18.34C12.58 18.73 11.75 18.24 11.75 17.46V11.54C11.75 10.76 12.58 10.27 13.25 10.66L18.55 13.72Z" fill="currentColor"></path>' +
			'</g>' +
		'</svg>' +
        '<span>' + manifst.name +
        '</span>' +
    '</div>'; // нужна заглушка, а то при страте лампы говорит пусто
    Lampa.Component.add('gpbay', component); //то же самое
    resetTemplates();
    function addButton(e) {
      if (!e.render || !e.render.length) return;
      if (e.render.find('.lampac--button').length || e.render.parent().find('.lampac--button').length) return;
      var btn = $(Lampa.Lang.translate(button));
	  // //console.log(btn.clone().removeClass('focus').prop('outerHTML'))
      btn.on('hover:enter', function() {
        resetTemplates();
        Lampa.Component.add('gpbay', component);
		
		var id = Lampa.Utils.hash(e.movie.number_of_seasons ? e.movie.original_name : e.movie.original_title);
		var all = Lampa.Storage.get('clarification_search','{}');
		
        gpbayAnalyticsOpen(e.movie, 'button');

        Lampa.Activity.push({
          url: '',
          title: Lampa.Lang.translate('title_watch'),
          component: 'gpbay',
          search: all[id] ? all[id] : e.movie.title,
          search_one: e.movie.title,
          search_two: e.movie.original_title,
          movie: e.movie,
          page: 1,
		  clarification: all[id] ? true : false
        });
      });
      if (e.render.hasClass('button--play')) e.render.before(btn);
      else e.render.after(btn);
    }
    Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
        var root = e.object.activity.render();
        var target = root.find('.button--play');
        if (!target.length) target = root.find('.view--torrent');
        addButton({
          render: target,
          movie: e.data.movie
        });
      }
    });
    try {
      if (Lampa.Activity.active().component == 'full') {
        var currentRoot = Lampa.Activity.active().activity.render();
        var currentTarget = currentRoot.find('.button--play');
        if (!currentTarget.length) currentTarget = currentRoot.find('.view--torrent');
        addButton({
          render: currentTarget,
          movie: Lampa.Activity.active().card
        });
      }
    } catch (e) {}
    if (Lampa.Manifest.app_digital >= 177) {
      var balansers_sync = ["filmix", 'filmixtv', "fxapi", "rezka", "rhsprem", "lumex", "videodb", "collaps", "collaps-dash", "hdvb", "zetflix", "kodik", "ashdi", "kinoukr", "kinotochka", "remux", "iframevideo", "cdnmovies", "anilibria", "animedia", "animego", "animevost", "animebesst", "redheadsound", "alloha", "animelib", "moonanime", "kinopub", "vibix", "vdbmovies", "fancdn", "cdnvideohub", "vokino", "rc/filmix", "rc/fxapi", "rc/rhs", "vcdn", "videocdn", "mirage", "hydraflix","videasy","vidsrc","movpi","vidlink","twoembed","autoembed","smashystream","autoembed","rgshows", "pidtor", "videoseed", "iptvonline", "veoveo"];
      balansers_sync.forEach(function(name) {
        Lampa.Storage.sync('online_choice_' + name, 'object_object');
      });
      Lampa.Storage.sync('online_watched_last', 'object_object');
    }
  }
  if (!window.gpbay_plugin) startPlugin();

})();