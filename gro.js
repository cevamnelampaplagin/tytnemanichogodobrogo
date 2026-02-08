function initializeSpeedtest() {
// Перевірка, чи вже запущено тест
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
var message = "Вимір швидкості має похибку, з'єднання з " + serviceName;
setTimeout(function() {
$("#cloudspeed").text(message);
}, 300);
Lampa.Template.add("speedtest", message);
}
// Тест завантаження (TutHost)
function runDownloadTest() {
showAccuracyMessage("TutHost");
// Фіксований URL для тесту завантаження з українського сервера
var downloadUrl = "http://91.203.4.157/100mb.bin";
// Запуск тесту в плеєрі Lampa
Lampa.App.start({
'url': downloadUrl,
'login': '',
'password': '',
'onBack': backToMenu
});
}
// Тест вивантаження (Cloudflare)
function runUploadTest() {
showAccuracyMessage("CloudFlare");
// Запуск тесту вивантаження через Cloudflare
Lampa.App.start({
'url': 'https://speed.cloudflare.com/__down?during=upload&bytes=100000000',
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
'title': "TutHost",
'todo': "download"
});
menuItems.push({
'title': "CloudFlare",
'todo': "upload"
});
// Показ меню через компонент Lampa
Lampa.Noty.show({
'title': Lampa.Lang.translate('title_action'),
'items': menuItems,
'onBack': function() {
Lampa.Listener.toggle(currentView);
},
'onSelect': function(item) {
if(item.todo == "download") runDownloadTest();
if(item.todo == "upload") runUploadTest();
}
});
}
// HTML для кнопки тестування
var buttonHtml = '...'; // Скорочений SVG код іконки
// Додавання кнопки в інтерфейс
var buttonElement = '' + buttonHtml + '';
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