(function () {
    'use strict';

    // Чекаємо повного завантаження Lampa та плеєра
    function initPlugin() {
        if (window.Lampa && window.Lampa.Player) {
            // Якщо плеєр вже готовий – додаємо кнопку
            if (Lampa.Player.active) {
                addCopyButton();
            } else {
                // Інакше чекаємо події ready від плеєра
                Lampa.Player.listener.follow('ready', addCopyButton);
            }
        } else {
            setTimeout(initPlugin, 500);
        }
    }

    function addCopyButton() {
        // Запобігаємо дублюванню
        if (document.getElementById('lampa-copy-button')) return;

        // Шукаємо контейнер для кнопок керування плеєра
        const controls = document.querySelector('.player-controls, .player__controls, .video-controls, .player');
        if (!controls) return;

        // Створюємо кнопку
        const btn = document.createElement('button');
        btn.id = 'lampa-copy-button';
        btn.className = 'player-controls__btn'; // намагаємось наслідувати класи Lampa
        btn.setAttribute('aria-label', 'Копіювати посилання');
        btn.innerHTML = '📋'; // Іконка, можна замінити на текст

        // Стилі – адаптовані під тему Lampa (темний напівпрозорий фон, білий текст)
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

        // Додаємо кнопку в правий кінець панелі керування (або в кінець контейнера)
        controls.appendChild(btn);
    }

    function copyVideoLink(btn) {
        let videoUrl = '';

        // 1. Спроба отримати URL через API Lampa (різні варіанти)
        if (Lampa.Player.network && Lampa.Player.network.url) {
            videoUrl = Lampa.Player.network.url;
        } else if (Lampa.Player.currentVideo && Lampa.Player.currentVideo.url) {
            videoUrl = Lampa.Player.currentVideo.url;
        } else if (Lampa.Player.activeSource && Lampa.Player.activeSource.url) {
            videoUrl = Lampa.Player.activeSource.url;
        } else if (Lampa.Player.source && Lampa.Player.source.url) {
            videoUrl = Lampa.Player.source.url;
        } else if (Lampa.Player.media && Lampa.Player.media.url) {
            videoUrl = Lampa.Player.media.url;
        } else {
            // 2. Якщо не знайшли – пробуємо взяти з video-елемента
            const video = document.querySelector('video');
            if (video && video.src && !video.src.startsWith('blob:')) {
                videoUrl = video.src;
            }
        }

        if (videoUrl && !videoUrl.startsWith('blob:')) {
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
            alert(text); // fallback
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

    // Запускаємо скрипт після готовності додатка
    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', (e) => {
            if (e.type === 'ready') initPlugin();
        });
    }

})();