(function() {
    console.log('Плагін Test (покращена версія): початок роботи');

    // Функція безпечного відкриття URL
    function openUrl(url) {
        console.log('Спроба відкрити URL:', url);

        // Перевіряємо наявність Lampa.Link
        if (typeof Lampa !== 'undefined' && Lampa.Link && typeof Lampa.Link.open === 'function') {
            try {
                Lampa.Link.open(url, '', false);
                console.log('URL відкрито через Lampa.Link.open');
                return;
            } catch (e) {
                console.error('Помилка при виклику Lampa.Link.open:', e);
            }
        } else {
            console.warn('Lampa.Link.open не знайдено, використовуємо fallback');
        }

        // Запасний варіант (може не працювати в середовищі Lampa)
        try {
            if (typeof window !== 'undefined' && window.open) {
                window.open(url, '_blank');
                console.log('Спроба відкрити через window.open');
            } else {
                console.error('Немає жодного методу для відкриття посилання');
            }
        } catch (e) {
            console.error('Помилка fallback методу:', e);
        }
    }

    // Додаємо кнопку з перевіркою наявності Lampa.Menu
    try {
        if (typeof Lampa !== 'undefined' && Lampa.Menu && typeof Lampa.Menu.add === 'function') {
            Lampa.Menu.add({
                alias: 'antutu_test_unique_' + Date.now(), // Унікальний alias
                title: 'Test',
                icon: 'globe',
                component: 'custom',
                action: function() {
                    openUrl('https://www.antutu.com/html5');
                }
            });
            console.log('Плагін Test: кнопку успішно додано до меню');
        } else {
            console.error('Критична помилка: Lampa.Menu.add не доступний. Об'єкт Lampa:', Lampa);
        }
    } catch (e) {
        console.error('Виняток під час додавання кнопки:', e);
    }
})();
