(function () {
    'use strict';

    let observer = null;
    let buttonAdded = false;

    function initPlugin() {
        if (typeof Lampa === 'undefined') {
            setTimeout(initPlugin, 300);
            return;
        }

        console.log('[CopyLink] Плагін запущено');

        // Основні події плеєра
        Lampa.Listener.follow('player', (e) => {
            if (e.type === 'start' || e.type === 'ready') {
                setTimeout(addCopyButton, 700); // даємо час на рендер панелі
            }
            if (e.type === 'destroy') destroyObserver();
        });

        // Fallback для старих версій
        if (Lampa.Player && Lampa.Player.listener) {
            Lampa.Player.listener.follow('ready', () => setTimeout(addCopyButton, 500));
        }

        // Запускаємо observer на випадок динамічного оновлення панелі
        startMutationObserver();
    }

    function destroyObserver() {
        if (observer) {
            observer.disconnect();
            observer = null;
        }
    }

    function startMutationObserver() {
        if (observer) return;

        observer = new MutationObserver(() => {
            if (!buttonAdded) addCopyButton();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    function addCopyButton() {
        if (buttonAdded || document.getElementById('lampa-copy-link-btn')) return;

        // Актуальні селектори 2025-2026 років (працює в більшості білдів)
        const selectors = [
            '.player-bottom__right',
            '.player-panel__right',
            '.player__bottom .right',
            '.player-controls__right',
            '.player-bottom',
            '.player__bottom',
            '.controls'
        ];

        let container = null;
        for (let sel of selectors) {
            container = document.querySelector(sel);
            if (container) break;
        }

        if (!container) return; // ще не з’явилася панель

        const btn = document.createElement('button');
        btn.id = 'lampa-copy-link-btn';
        btn.className = 'button button--player button--simple player__button selector';
        btn.innerHTML = `<span style="font-size:22px;line-height:1">📋</span>`;
        btn.title = 'Копіювати пряме посилання';

        // Нативний вигляд Lampa
        Object.assign(btn.style, {
            margin: '0 4px',
            minWidth: '42px',
            height: '42px',
            padding: '0',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)'
        });

        btn.addEventListener('click', (e) => {
            e.stopImmediatePropagation();
            copyVideoLink(btn);
        });

        container.appendChild(btn);
        buttonAdded = true;

        console.log('[CopyLink] Кнопка успішно додана в плеєр');
    }

    // =============================================
    // ПОКРАЩЕНИЙ ПОШУК ПОСИЛАННЯ (дуже потужний)
    // =============================================
    function findVideoUrl() {
        const player = Lampa.Player || {};
        const candidates = [];

        // Прямі поля
        ['video.src', 'video.currentSrc', 'hls.url', 'dash.url', 'network.url',
         'network.lastUrl', 'manifestUrl', 'active.url', 'active.file',
         'currentVideo.url', 'currentVideo.file', 'source.url', 'media.url'].forEach(path => {
            try {
                let obj = player;
                path.split('.').forEach(p => obj = obj ? obj[p] : null);
                if (obj && typeof obj === 'string') candidates.push(obj);
            } catch (e) {}
        });

        // Video елемент
        const video = document.querySelector('video');
        if (video) {
            if (video.src) candidates.push(video.src);
            if (video.currentSrc) candidates.push(video.currentSrc);
            if (video.hls && video.hls.url) candidates.push(video.hls.url);
        }

        // Глибокий пошук по всьому об’єкту Player
        function deepSearch(obj, depth = 0) {
            if (depth > 6 || !obj || typeof obj !== 'object') return null;
            for (let key in obj) {
                const val = obj[key];
                if (typeof val === 'string' &&
                    val.length > 15 &&
                    (val.includes('.m3u8') || val.includes('.mp4') || val.startsWith('http')) &&
                    !val.startsWith('blob:') && !val.startsWith('data:')) {
                    return val;
                }
                const found = deepSearch(val, depth + 1);
                if (found) return found;
            }
            return null;
        }

        const deep = deepSearch(player);
        if (deep) candidates.push(deep);

        // Беремо перше валідне
        for (let url of candidates) {
            if (url && url.startsWith('http')) return url;
        }
        return null;
    }

    function copyVideoLink(btn) {
        let url = findVideoUrl();

        if (url) {
            // Додаємо таймстамп (корисно для серіалів)
            const video = document.querySelector('video');
            if (video && video.currentTime > 3) {
                url += `#t=${Math.floor(video.currentTime)}`;
            }

            navigator.clipboard.writeText(url).then(() => {
                showToast('✅ Посилання скопійовано!', 'success');
                pulseButton(btn);
            }).catch(() => {
                showToast('❌ Не вдалося скопіювати (потрібен HTTPS)', 'error');
            });
        } else {
            showToast('⚠️ Пряме посилання не знайдено', 'warning');
            console.log('[CopyLink] Повний стан плеєра:', Lampa.Player);
        }
    }

    function showToast(text, type = 'info') {
        if (Lampa && Lampa.Noty) {
            Lampa.Noty.show(text, type === 'success' ? 2500 : 5000);
        } else {
            alert(text);
        }
    }

    function pulseButton(btn) {
        const origHTML = btn.innerHTML;
        btn.style.transition = 'all .2s';
        btn.style.transform = 'scale(1.3)';
        btn.style.backgroundColor = '#28a745';

        setTimeout(() => btn.innerHTML = '✓', 120);
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.backgroundColor = '';
            btn.innerHTML = origHTML;
        }, 1600);
    }

    // =============================================
    // ЗАПУСК
    // =============================================
    if (window.appready || document.readyState === 'complete') {
        initPlugin();
    } else {
        window.addEventListener('load', initPlugin);
        Lampa.Listener.follow('app', (e) => {
            if (e.type === 'ready') initPlugin();
        });
    }
})();
