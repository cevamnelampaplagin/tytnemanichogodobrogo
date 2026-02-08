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
        var message = "Вимірювання швидкості має похибку, з'єднання з " + serviceName;
        setTimeout(function() {
            $("#cloudspeed").text(message);
        }, 300);
        Lampa.Template.add("speedtest", message);
    }
    
    // Тест завантаження (Український сервер)
    function runDownloadTest() {
        showAccuracyMessage("Українським сервером");
        
        // Вибір українського сервера для тестування
        // Список українських серверів для тесту швидкості
        var ukrainianServers = [
            "https://speedtest.kyivstar.ua/files/100MB.zip",
            "https://speedtest.datagroup.ua/files/100MB.zip",
            "https://speedtest.ukrtelecom.ua/files/100MB.zip"
        ];
        
        // Вибираємо випадковий сервер для балансування навантаження
        var downloadUrl = ukrainianServers[Math.floor(Math.random() * ukrainianServers.length)];
        
        // Запуск тесту в плеєрі Lampa
        Lampa.App.start({
            'url': downloadUrl,
            'login': '',
            'password': '',
            'onBack': backToMenu
        });
    }
    
    // Тест відвантаження (Український сервер)
    function runUploadTest() {
        showAccuracyMessage("Українським сервером");
        
        // Використання українських серверів для тесту відвантаження
        // УВАГА: Для реального тесту відвантаження потрібен сервер з підтримкою завантаження файлів
        // Це тестовий варіант - можна використати спеціальні сервіси
        Lampa.App.start({
            'url': 'https://speedtest.kyivstar.ua/upload.php',
            'login': '',
            'password': '',
            'onBack': backToMenu
        });
    }
    
    // Альтернативний тест через Speedtest.net API (з українськими серверами)
    function runAdvancedTest() {
        showAccuracyMessage("Speedtest.net");
        
        // Отримання списку українських серверів через Speedtest.net API
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://www.speedtest.net/api/js/servers?search=Ukraine", true);
        xhr.timeout = 3000;
        
        xhr.onload = function() {
            try {
                var servers = JSON.parse(this.responseText);
                if (servers && servers.length > 0) {
                    // Вибираємо найкращий сервер за пінгом
                    var bestServer = servers.sort(function(a, b) {
                        return a.latency - b.latency;
                    })[0];
                    
                    // Запускаємо тест через обраний сервер
                    var testUrl = "https://" + bestServer.host + "/speedtest/upload.php";
                    Lampa.App.start({
                        'url': testUrl,
                        'login': '',
                        'password': '',
                        'onBack': backToMenu
                    });
                } else {
                    // Якщо не вдалося отримати сервери, використовуємо резервний варіант
                    runDownloadTest();
                }
            } catch(err) {
                Lampa.Noty.show("Помилка отримання серверів");
                runDownloadTest();
            }
        };
        
        xhr.onerror = function() {
            Lampa.Noty.show("Помилка з'єднання");
            runDownloadTest();
        };
        
        xhr.ontimeout = function() {
            Lampa.Noty.show("Час очікування вийшов");
            runDownloadTest();
        };
        
        xhr.send();
    }
    
    // Показ меню вибору тесту
    function showTestMenu() {
        var currentView = Lampa.Listener.get().name;
        var menuItems = [];
        
        // Українські сервіси тестування
        menuItems.push({
            'title': "📥 Тест завантаження (Україна)",
            'todo': "download"
        });
        
        menuItems.push({
            'title': "📤 Тест відвантаження (Україна)",
            'todo': "upload"
        });
        
        menuItems.push({
            'title': "⚡ Розширений тест (Speedtest.net)",
            'todo': "advanced"
        });
        
        // Показ меню через компонент Lampa
        Lampa.Noty.show({
            'title': "Тест швидкості інтернету",
            'items': menuItems,
            'onBack': function() {
                Lampa.Listener.toggle(currentView);
            },
            'onSelect': function(item) {
                if(item.todo == "download") runDownloadTest();
                if(item.todo == "upload") runUploadTest();
                if(item.todo == "advanced") runAdvancedTest();
            }
        });
    }
    
    // HTML для кнопки тестування з українською підписью
    var buttonHtml = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg><span style="margin-left:5px">Швидкість</span>';
    
    // Додавання кнопки в інтерфейс
    var buttonElement = '<div id="speedtest54" class="head__action selector speedtest54-screen" title="Перевірити швидкість інтернету">' + buttonHtml + '</div>';
    $("#app > div.head > div > div.head__actions").append(buttonElement);
    
    // Обробник натискання кнопки
    $("#speedtest54").on("hover:enter hover:click hover:touch", function() {
        showTestMenu();
    });
}

// Запуск скрипта при готовності додатка
if(window.appready) {
    initializeSpeedtest();
} else {
    Lampa.Listener.follow("app", function(event) {
        if(event.type == "ready") initializeSpeedtest();
    });
}