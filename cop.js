(function () {
    'use strict';

    // Ініціалізація плагіна
    function initPlugin() {
        if (window.Lampa && window.Lampa.Player) {
            // Слухаємо подію готовності плеєра
            Lampa.Player.listener.follow('ready', function (e) {
                addCopyButton();
            });
        } else {
            // Якщо Lampa ще не завантажилась, повторюємо спробу через секунду
            setTimeout(initPlugin, 1000);
        }
    }

    // Функція додавання кнопки
    function addCopyButton() {
        // Перевіряємо, чи немає вже кнопки (захист від дублювання)
        if (document.getElementById('lampa-copy-link-btn')) return;

        const btn = document.createElement('div');
        btn.id = 'lampa-copy-link-btn';
        btn.innerHTML = '📋 Скопіювати лінк';
        
        // Стилізація кнопки
        Object.assign(btn.style, {
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 15px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            zIndex: '9999',
            fontFamily: 'sans-serif',
            fontSize: '14px',
            border: '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(5px)' // Додаємо легке розмиття фону для краси
        });

        // Ефекти наведення
        btn.onmouseover = () => btn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        btn.onmouseout = () => btn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';

        // Логіка кліку
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Щоб плеєр не ставився на паузу
            
            let videoUrl = '';
            
            // Отримуємо URL через API Lampa
            if (window.Lampa.Player.network && window.Lampa.Player.network.url) {
                videoUrl = window.Lampa.Player.network.url;
            } else {
                // Або шукаємо безпосередньо в тегу video
                const videoElement = document.querySelector('video');
                if (videoElement && videoElement.src) {
                    videoUrl = videoElement.src;
                }
            }

            if (videoUrl && !videoUrl.startsWith('blob:')) {
                navigator.clipboard.writeText(videoUrl).then(() => {
                    // Використовуємо вбудовані сповіщення Lampa
                    if (window.Lampa.Noty) {
                        Lampa.Noty.show('Посилання успішно скопійовано!');
                    }
                    
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '✅ Скопійовано!';
                    btn.style.backgroundColor = 'rgba(40, 167, 69, 0.8)';
                    
                    setTimeout(() => { 
                        btn.innerHTML = originalText; 
                        btn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                    }, 2000);
                }).catch(err => {
                    console.error('Помилка копіювання: ', err);
                    if (window.Lampa.Noty) Lampa.Noty.show('Помилка копіювання посилання.');
                });
            } else {
                if (window.Lampa.Noty) Lampa.Noty.show('Пряме посилання не знайдено (можливо Blob URL).');
            }
        });

        // Додаємо кнопку безпосередньо в контейнер плеєра
        const playerContainer = document.querySelector('.player');
        if (playerContainer) {
            playerContainer.appendChild(btn);
        }
    }

    // Запускаємо плагін, коли додаток Lampa повністю готовий
    if (window.appready) {
        initPlugin();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                initPlugin();
            }
        });
    }

})();
