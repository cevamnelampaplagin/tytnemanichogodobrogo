(function () {
    'use strict';

    function initPlugin() {
        if (window.Lampa && window.Lampa.Player) {
            if (Lampa.Player.active) {
                addCopyButton();
            } else {
                Lampa.Player.listener.follow('ready', addCopyButton);
            }
        } else {
            setTimeout(initPlugin, 500);
        }
    }

    function addCopyButton() {
        if (document.getElementById('lampa-copy-button')) return;

        const controls = document.querySelector('.player-controls, .player__controls, .video-controls, .player');
        if (!controls) return;

        const btn = document.createElement('button');
        btn.id = 'lampa-copy-button';
        btn.className = 'player-controls__btn';
        btn.setAttribute('aria-label', 'Копіювати посилання');
        btn.innerHTML = '📋';

        Object.assign(btn.style, {
            background: 'rgba(20, 20, 20, 0.8)',
            border: 'none',
            borderRadius: '4px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '18px',
            lineHeight: '1',
            margin: '0 4px',
            padding: '8px 12px',
            transition: 'background 0.2s',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.1)'
        });

        btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(255, 255, 255, 0.2)');
        btn.addEventListener('mouseleave', () => btn.style.background = 'rgba(20, 20, 20, 0.8)');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            copyVideoLink(btn);
        });

        controls.appendChild(btn);
    }

    // Розширена функція пошуку URL
    function findVideoUrl() {
        // 1. Прямі поля в Lampa.Player
        const possiblePaths = [
            'network.url',
            'currentVideo.url',
            'activeSource.url',
            'source.url',
            'media.url',
            'hls.url',
            'dash.url',
            'playlist[0].file',
            'playlist[0].url',
            'currentMedia.url',
            'currentMedia.file',
            'mediaInfo.url'
        ];

        for (let path of possiblePaths) {
            let parts = path.split('.');
            let obj = Lampa.Player;
            let found = true;
            for (let part of parts) {
                if (obj && typeof obj === 'object' && part in obj) {
                    obj = obj[part];
                } else {
                    found = false;
                    break;
                }
            }
            if (found && obj && typeof obj === 'string' && !obj.startsWith('blob:')) {
                return obj;
            }
        }

        // 2. Пошук в Lampa.Player.mediaList (якщо є плейлист)
        if (Lampa.Player.mediaList && Array.isArray(Lampa.Player.mediaList)) {
            for (let item of Lampa.Player.mediaList) {
                if (item.url && typeof item.url === 'string' && !item.url.startsWith('blob:')) return item.url;
                if (item.file && typeof item.file === 'string' && !item.file.startsWith('blob:')) return item.file;
            }
        }

        // 3. Пошук в об'єкті currentVideo (детальніше)
        if (Lampa.Player.currentVideo) {
            let cv = Lampa.Player.currentVideo;
            if (cv.url && !cv.url.startsWith('blob:')) return cv.url;
            if (cv.file && !cv.file.startsWith('blob:')) return cv.file;
            if (cv.src && !cv.src.startsWith('blob:')) return cv.src;
        }

        // 4. Аналіз відео-елемента та його джерел
        const video = document.querySelector('video');
        if (video) {
            // Прямий src
            if (video.src && !video.src.startsWith('blob:')) return video.src;

            // Всі дочірні source
            const sources = video.querySelectorAll('source');
            for (let source of sources) {
                if (source.src && !source.src.startsWith('blob:')) return source.src;
            }

            // Якщо відео відтворюється через HLS.js, можна спробувати отримати url з hls
            if (video.hls && video.hls.url) return video.hls.url;
        }

        // 5. Якщо використовується HLS.js, заглянути в Lampa.Player.hls
        if (Lampa.Player.hls && Lampa.Player.hls.url) {
            return Lampa.Player.hls.url;
        }

        // 6. Остання спроба: взяти поточний src з network
        if (Lampa.Player.network && Lampa.Player.network.currentRequest) {
            let req = Lampa.Player.network.currentRequest;
            if (req.url && !req.url.startsWith('blob:')) return req.url;
        }

        return null;
    }

    function copyVideoLink(btn) {
        const videoUrl = findVideoUrl();

        if (videoUrl) {
            navigator.clipboard.writeText(videoUrl)
                .then(() => {
                    showNotification('Посилання скопійовано!', 'success');
                    animateButton(btn, '✅', '#28a745');
                })
                .catch(err => {
                    console.error('Помилка копіювання:', err);
                    showNotification('Не вдалося скопіювати', 'error');
                });
        } else {
            showNotification('Пряме посилання не знайдено', 'warning');
        }
    }

    function showNotification(text, type = 'info') {
        if (window.Lampa && Lampa.Noty) {
            Lampa.Noty.show(text);
        } else {
            alert(text);
        }
    }

    function animateButton(btn, symbol, color) {
        const originalHtml = btn.innerHTML;
        const originalBg = btn.style.background;
        btn.innerHTML = symbol;
        btn.style.background = color;
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.background = originalBg;
        }, 1500);
    }

    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', (e) => {
            if (e.type === 'ready') initPlugin();
        });
    }

})();
