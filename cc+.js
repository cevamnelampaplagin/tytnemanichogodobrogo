(function() {
    setTimeout(function() {
        const clearBtnId = 'CLEARCACHE';

        // Видалення існуючої кнопки
        $('#' + clearBtnId).remove();

        // Додавання CSS
        // url = https://danifilth17.github.io/lampa/cc+.js
        if (!document.getElementById('clearcache-style')) {
            const css = `
                /* Новий стиль для кнопки Стрічка */
                .head__action.selector.open--feed svg path {
                    fill: #2196F3 !important;
                }
                
                /* Решта вашого оригінального CSS */
                #${clearBtnId} svg path {
                    fill: lime !important;
                    transition: fill 0.2s ease;
                }
                #${clearBtnId}.selector:hover,
                #${clearBtnId}.selector:focus,
                #${clearBtnId}.selector:active {
                    background: white !important;
                }
                #${clearBtnId}.selector:hover svg path,
                #${clearBtnId}.selector:focus svg path,
                #${clearBtnId}.selector:active svg path {
                    fill: black !important;
                }

                .full-start__button {
                    transition: transform 0.2s ease !important;
                    position: relative;
                }
                .full-start__button:active {
                    transform: scale(0.98) !important;
                }

                .full-start__button.view--online svg path {
                    fill: #2196f3 !important;
                }
                .full-start__button.view--torrent svg path {
                    fill: lime !important;
                }
                .full-start__button.view--trailer svg path {
                    fill: #f44336 !important;
                }

                .full-start__button.loading::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2px;
                    background: rgba(255,255,255,0.5);
                    animation: loading 1s linear infinite;
                }
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                /* Стилі для модального вікна */
                .cache-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .cache-modal.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .cache-modal__content {
                    background: #1a1a1a;
                    border-radius: 12px;
                    padding: 20px;
                    width: 90%;
                    max-width: 500px;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 5px 25px rgba(0,0,0,0.5);
                }
                
                .cache-modal__title {
                    font-size: 18px;
                    margin-bottom: 15px;
                    color: white;
                    text-align: center;
                }
                
                .cache-modal__group {
                    margin-bottom: 15px;
                }
                
                .cache-modal__checkbox {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    cursor: pointer;
                }
                
                .cache-modal__checkbox input {
                    margin-right: 10px;
                }
                
                .cache-modal__checkbox label {
                    color: white;
                    cursor: pointer;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .cache-modal__description {
                    font-size: 12px;
                    color: #aaa;
                    margin-left: 28px;
                    margin-top: -5px;
                    margin-bottom: 10px;
                    line-height: 1.3;
                }
                
                .cache-modal__select-all {
                    background: rgba(255,255,255,0.1);
                    padding: 8px 12px;
                    border-radius: 6px;
                    margin-bottom: 15px;
                    cursor: pointer;
                    text-align: center;
                    color: #2196F3;
                    font-weight: bold;
                }
                
                .cache-modal__buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 20px;
                }
                
                .cache-modal__btn {
                    padding: 10px 20px;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                    transition: background 0.2s ease;
                }
                
                .cache-modal__btn--confirm {
                    background: #2196F3;
                    color: white;
                }
                
                .cache-modal__btn--confirm:hover {
                    background: #1976D2;
                }
                
                .cache-modal__btn--cancel {
                    background: rgba(255,255,255,0.1);
                    color: white;
                }
                
                .cache-modal__btn--cancel:hover {
                    background: rgba(255,255,255,0.2);
                }

                @media (max-width: 767px) {
                    .full-start__button {
                        min-height: 44px !important;
                        padding: 10px !important;
                    }
                    
                    .cache-modal__content {
                        width: 95%;
                        padding: 15px;
                    }
                    
                    .cache-modal__buttons {
                        flex-direction: column;
                        gap: 10px;
                    }
                    
                    .cache-modal__btn {
                        width: 100%;
                    }
                    
                    .cache-modal__checkbox label {
                        font-size: 13px;
                    }
                    
                    .cache-modal__description {
                        font-size: 11px;
                    }
                }
            `;
            const style = document.createElement('style');
            style.id = 'clearcache-style';
            style.textContent = css;
            document.head.appendChild(style);
        }

        // Додавання кнопки очищення кешу
        $('.head__actions').append(`
            <div id="${clearBtnId}" class="head__action selector m-clear-cache">
                <svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3.1l1.4 2.2-1.6 1.1 1.3 0.3 2.8 0.6 0.6-2.7 0.4-1.4-1.8 1.1-2-3.3h-2.2l-2.6 4.3 1.7 1z"/>
                    <path d="M16 12l-2.7-4.3-1.7 1 2 3.3h-2.6v-2l-3 3 3 3v-2h3.7z"/>
                    <path d="M2.4 12v0l1.4-2.3 1.7 1.1-0.9-4.2-2.8 0.7-1.3 0.3 1.6 1-2.1 3.4 1.3 2h5.7v-2z"/>
                </svg>
            </div>
        `);

        // Створення модального вікна з детальними описами
        const modalHtml = `
            <div class="cache-modal">
                <div class="cache-modal__content">
                    <div class="cache-modal__title">Оберіть дані для очищення</div>
                    
                    <div class="cache-modal__select-all" id="selectAllCache">Обрати все</div>
                    
                    <div class="cache-modal__group">
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheCards" checked>
                            <label for="cacheCards">Мініатюри контенту</label>
                        </div>
                        <div class="cache-modal__description">Картки фільмів/серіалів (попередній перегляд, назви, рік випуску)</div>
                        
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheFullCards" checked>
                            <label for="cacheFullCards">Повна інформація про контент</label>
                        </div>
                        <div class="cache-modal__description">Детальна інформація про фільми/серіали (описи, актори, рейтинги)</div>
                        
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheLiteCards" checked>
                            <label for="cacheLiteCards">Спрощені картки</label>
                        </div>
                        <div class="cache-modal__description">Спрощена інформація для швидкого завантаження</div>
                    </div>
                    
                    <div class="cache-modal__group">
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheViewed" checked>
                            <label for="cacheViewed">Історія переглядів</label>
                        </div>
                        <div class="cache-modal__description">Інформація про переглянуті серії/фільми та час зупинки</div>
                        
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheParsers" checked>
                            <label for="cacheParsers">Дані парсерів</label>
                        </div>
                        <div class="cache-modal__description">Кешовані результати пошуку та інформація з джерел</div>
                        
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheCub" checked>
                            <label for="cacheCub">Налаштування відтворення</label>
                        </div>
                        <div class="cache-modal__description">Налаштування плеєра та параметри відтворення</div>
                    </div>
                    
                    <div class="cache-modal__group">
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheStartTime" checked>
                            <label for="cacheStartTime">Тимчасові мітки</label>
                        </div>
                        <div class="cache-modal__description">Час запуску відео для продовження перегляду</div>
                        
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheOther" checked>
                            <label for="cacheOther">Інший тимчасовий кеш</label>
                        </div>
                        <div class="cache-modal__description">Різні тимчасові дані та проміжні результати</div>
                        
                        <div class="cache-modal__checkbox">
                            <input type="checkbox" id="cacheAll">
                            <label for="cacheAll">ВЕСЬ КЕШ (скинути все)</label>
                        </div>
                        <div class="cache-modal__description">Повне очищення всіх даних (включаючи налаштування)</div>
                    </div>
                    
                    <div class="cache-modal__buttons">
                        <button class="cache-modal__btn cache-modal__btn--cancel">Скасувати</button>
                        <button class="cache-modal__btn cache-modal__btn--confirm">Очистити</button>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHtml);
        const $modal = $('.cache-modal');
        const $selectAllBtn = $('#selectAllCache');
        let isAllSelected = true;

        // Функція для перемикання вибору всіх чекбоксів
        function toggleAllCheckboxes(select) {
            $('#cacheCards, #cacheFullCards, #cacheLiteCards, #cacheViewed, #cacheParsers, #cacheCub, #cacheStartTime, #cacheOther').prop('checked', select);
            $('#cacheAll').prop('checked', select);
            isAllSelected = select;
            $selectAllBtn.text(select ? 'Скасувати вибір' : 'Обрати все');
        }

        // Обробник для кнопки "Обрати все/Скасувати вибір"
        $selectAllBtn.on('click', function() {
            toggleAllCheckboxes(!isAllSelected);
        });

        // Обробник для чекбокса "Весь кеш"
        $('#cacheAll').on('change', function() {
            toggleAllCheckboxes($(this).is(':checked'));
        });

        // Обробник для кнопки скасування
        $modal.find('.cache-modal__btn--cancel').on('click', function() {
            $modal.removeClass('active');
            $('#' + clearBtnId).removeClass('loading');
        });

        // Обробник для кнопки очищення
        $modal.find('.cache-modal__btn--confirm').on('click', function() {
            const cacheTypes = {
                cards: $('#cacheCards').is(':checked'),
                fullCards: $('#cacheFullCards').is(':checked'),
                liteCards: $('#cacheLiteCards').is(':checked'),
                viewed: $('#cacheViewed').is(':checked'),
                parsers: $('#cacheParsers').is(':checked'),
                cub: $('#cacheCub').is(':checked'),
                startTime: $('#cacheStartTime').is(':checked'),
                other: $('#cacheOther').is(':checked'),
                all: $('#cacheAll').is(':checked')
            };

            clearSelectedCache(cacheTypes);
            $modal.removeClass('active');
        });

        // Функція для очищення обраного кешу
        function clearSelectedCache(cacheTypes) {
            try {
                $('#' + clearBtnId).addClass('loading');
                
                if (Lampa && Lampa.Cache && typeof Lampa.Cache.clear === 'function' && cacheTypes.all) {
                    Lampa.Cache.clear();
                    setTimeout(() => {
                        alert('🗑 Весь кеш Lampa очищено');
                        $('#' + clearBtnId).removeClass('loading');
                        setTimeout(() => location.reload(), 300);
                    }, 800);
                } else {
                    setTimeout(() => {
                        let removed = 0;
                        const keysToRemove = [];
                        
                        for (let i = 0; i < localStorage.length; i++) {
                            const key = localStorage.key(i);
                            let shouldRemove = cacheTypes.all;
                            
                            if (!shouldRemove) {
                                if (cacheTypes.cards && key.startsWith('card_')) shouldRemove = true;
                                else if (cacheTypes.fullCards && key.startsWith('full_card_')) shouldRemove = true;
                                else if (cacheTypes.liteCards && key.startsWith('lite_card_')) shouldRemove = true;
                                else if (cacheTypes.viewed && (key.startsWith('viewed_card_') || key.startsWith('viewed_continue_'))) shouldRemove = true;
                                else if (cacheTypes.parsers && key.startsWith('parser_')) shouldRemove = true;
                                else if (cacheTypes.cub && key.startsWith('cub_')) shouldRemove = true;
                                else if (cacheTypes.startTime && key.startsWith('start_time_')) shouldRemove = true;
                                else if (cacheTypes.other && key.startsWith('cache_')) shouldRemove = true;
                            }
                            
                            if (shouldRemove) {
                                keysToRemove.push(key);
                            }
                        }
                        
                        keysToRemove.forEach(key => {
                            localStorage.removeItem(key);
                            removed++;
                        });
                        
                        let message = '🗑 Очищено: ';
                        const parts = [];
                        if (cacheTypes.cards) parts.push('мініатюри');
                        if (cacheTypes.fullCards) parts.push('детальна інформація');
                        if (cacheTypes.liteCards) parts.push('спрощені картки');
                        if (cacheTypes.viewed) parts.push('історія переглядів');
                        if (cacheTypes.parsers) parts.push('дані парсерів');
                        if (cacheTypes.cub) parts.push('налаштування відтворення');
                        if (cacheTypes.startTime) parts.push('тимчасові мітки');
                        if (cacheTypes.other) parts.push('тимчасовий кеш');
                        
                        message += parts.join(', ') + ` (${removed} ключів)`;
                        
                        alert(message);
                        $('#' + clearBtnId).removeClass('loading');
                        setTimeout(() => location.reload(), 300);
                    }, 800);
                }
            } catch (e) {
                console.error('Помилка очищення кешу:', e);
                $('#' + clearBtnId).removeClass('loading');
            }
        }

        // Оригінальний обробник для TV (відкриваємо модальне вікно)
        $('#' + clearBtnId).on('hover:enter hover:click hover:touch', function() {
            $(this).addClass('loading');
            $modal.addClass('active');
        });

        // Оновлення кнопок
        function updateButtons() {
            $('.full-start__button.view--torrent svg').replaceWith(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px">
                    <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2zM40.5,30.963c-3.1,0-4.9-2.4-4.9-2.4S34.1,35,27,35c-1.4,0-3.6-0.837-3.6-0.837l4.17,9.643C26.727,43.92,25.874,44,25,44c-2.157,0-4.222-0.377-6.155-1.039L9.237,16.851c0,0-0.7-1.2,0.4-1.5c1.1-0.3,5.4-1.2,5.4-1.2s1.475-0.494,1.8,0.5c0.5,1.3,4.063,11.112,4.063,11.112S22.6,29,27.4,29c4.7,0,5.9-3.437,5.7-3.937c-1.2-3-4.993-11.862-4.993-11.862s-0.6-1.1,0.8-1.4c1.4-0.3,3.8-0.7,3.8-0.7s1.105-0.163,1.6,0.8c0.738,1.437,5.193,11.262,5.193,11.262s1.1,2.9,3.3,2.9c0.464,0,0.834-0.046,1.152-0.104c-0.082,1.635-0.348,3.221-0.817,4.722C42.541,30.867,41.756,30.963,40.5,30.963z"/>
                </svg>
            `);

            $('.full-start__button.view--online svg').replaceWith(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z"/>
                </svg>
            `);

            $('.full-start__button.view--trailer svg').replaceWith(`
                <svg height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M71.2555 2.08955C74.6975 3.2397 77.4083 6.62804 78.3283 10.9306C80 18.7291 80 35 80 35C80 35 80 51.2709 78.3283 59.0694C77.4083 63.372 74.6975 66.7603 71.2555 67.9104C65.0167 70 40 70 40 70C40 70 14.9833 70 8.74453 67.9104C5.3025 66.7603 2.59172 63.372 1.67172 59.0694C0 51.2709 0 35 0 35C0 35 0 18.7291 1.67172 10.9306C2.59172 6.62804 5.3025 3.2395 8.74453 2.08955C14.9833 0 40 0 40 0C40 0 65.0167 0 71.2555 2.08955ZM55.5909 35.0004L29.9773 49.5714V20.4286L55.5909 35.0004Z"/>
                </svg>
            `);
        }

        // Ініціалізація
        updateButtons();
        if (Lampa && Lampa.Listener) {
            Lampa.Listener.follow('full', updateButtons);
        }

        // Видалено реєстрацію плагіна, щоб уникнути помилки
        // window.plugin is not a function

    }, 1000);
})();
