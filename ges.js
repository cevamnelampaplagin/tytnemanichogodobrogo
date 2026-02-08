// Головна функція ініціалізації скрипта
function initializeSpeedtest() {
    // Перевірка, чи вже запущений тест
    if(window.spdtst) return;
    window.spdtst = true;
    
    // Створення контролера в інтерфейсі Lampa
    var controller = new Lampa.Controller("speedtest");
    
    // Функція для повернення до головного меню
    function backToMenu() {
        Lampa.Controller.remove("speedtest");
        Lampa.Listener.toggle("head");
    }
    
    // Показ повідомлення про похибку вимірювань
    function showAccuracyMessage(serviceName) {
        var message = "Замір швидкості має похибку, з'єднання з " + serviceName;
        setTimeout(function() {
            // Оновлення тексту в інтерфейсі, якщо елемент існує
            if($("#cloudspeed").length) $("#cloudspeed").text(message);
        }, 300);
        // Додавання шаблону (якщо передбачено плагіном)
        Lampa.Template.add("speedtest", message);
    }
    
    // Тест завантаження (Використовуємо Cloudflare як найнадійніший варіант в Україні)
    function runDownloadTest() {
        showAccuracyMessage("Cloudflare (Київ/Європа)");
        
        // Використовуємо офіційний тестовий файл Cloudflare (50MB)
        var downloadUrl = 'https://speed.cloudflare.com/__down?bytes=50000000';
        
        try {
            // Запуск тесту в плеєрі Lampa (імітація перегляду для заміру швидкості)
            Lampa.App.start({
                'url': downloadUrl,
                'login': '',
                'password': '',
                'onBack': backToMenu
            });
        } catch(err) {
            Lampa.Noty.show("Помилка запуску тесту");
        }
    }
    
    // Тест відвантаження або альтернативний вузол (наприклад, CacheFly)
    function runAltTest() {
        showAccuracyMessage("Global CDN");
        
        Lampa.App.start({
            'url': 'https://cachefly.cachefly.net/50mb.test',
            'login': '',
            'password': '',
            'onBack': backToMenu
        });
    }
    
    // Показ меню вибору тесту
    function showTestMenu() {
        var currentView = Lampa.Listener.get().name;
        var menuItems = [];
        
        menuItems.push({
            'title': "Cloudflare Speedtest",
            'todo': "download"
        });
        
        menuItems.push({
            'title': "Альтернативний вузол",
            'todo': "alt"
        });
        
        // Показ меню через компонент Lampa
        Lampa.Noty.show({
            'title': 'Оберіть сервер тестування',
            'items': menuItems,
            'onBack': function() {
                Lampa.Listener.toggle(currentView);
            },
            'onSelect': function(item) {
                if(item.todo == "download") runDownloadTest();
                if(item.todo == "alt") runAltTest();
            }
        });
    }
    
    // HTML для кнопки тестування (іконка спідометра)
    var buttonHtml = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C7.58172 4 4 7.58172 4 12C4 13.3911 4.3551 14.7013 4.98305 15.8427L6.42857 14.3972C6.15556 13.6556 6 12.8549 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 12.8549 17.8444 13.6556 17.5714 14.3972L19.0169 15.8427C19.6449 14.7013 20 13.3911 20 12C20 7.58172 16.4183 4 12 4Z" fill="white"/><path d="M12 8C11.4477 8 11 8.44772 11 9V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.2929 14.7071C13.6834 15.0976 14.3166 15.0976 14.7071 14.7071C15.0976 14.3117 15.0976 13.6834 14.7071 13.2929L13 11.5858V9C13 8.44772 12.5523 8 12 8Z" fill="white"/></svg>';
    
    // Додавання кнопки в панель інструментів (head__actions)
    var buttonElement = '<div id="speedtest_ukr" class="head__action selector speedtest-btn">' + buttonHtml + '</div>';
    $("#app > div.head > div > div.head__actions").append(buttonElement);
    
    // Обробник натискання
    $("#speedtest_ukr").on("hover:enter hover:click hover:touch", function() {
        showTestMenu();
    });
}

// Запуск скрипта після завантаження додатка
if(window.appready) {
    initializeSpeedtest();
} else {
    Lampa.Listener.follow("app", function(event) {
        if(event.type == "ready") initializeSpeedtest();
    });
}
