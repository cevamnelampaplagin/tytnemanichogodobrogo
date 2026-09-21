(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function init() {
      if (window.weather_plugin) {
        return;
      }
      window.weather_plugin = true;
      function WeatherWidget() {
        var $html;
        var request = new Lampa.Reguest();
        var timer = null;
        var self = this;
        var retryCount = 0;
        var maxRetries = 3;
        this.create = function () {
          $html = $("<div class=\"weather-widget\" style=\"display:flex;align-items:center;font-size:1em;\"><div class=\"weather-temp\" id=\"weather-temp\" style=\"font-size:2em;margin-right:0.3em;display:flex;align-items:center;\"> </div><div class=\"weather-condition\" id=\"weather-condition\" style=\"display:flex;align-items:center;justify-content:center;\"></div></div>");
        };
        this.getWeatherData = function (city) {
          console.log("Погода", "Запит: " + city);
          var key = "46a5d8546cc340f69d9123207242801";
          var url = "http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + encodeURIComponent(city) + "&lang=uk&aqi=no";
          request.clear();
          request.timeout(5000);
          request.silent(url, onWeatherData, onError);
        };
        this.getForecastData = function (city) {
          console.log("Погода", "Запит прогнозу: " + city);
          var key = "46a5d8546cc340f69d9123207242801";
          var url = "http://api.weatherapi.com/v1/forecast.json?key=" + key + "&q=" + encodeURIComponent(city) + "&lang=uk&days=3&aqi=no";
          request.clear();
          request.timeout(5000);
          request.silent(url, onForecastData, onError);
        };
        this.weatherIcons = {
          "Сонячно": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"12\" cy=\"12\" r=\"5\" fill=\"#FFD700\"/><g stroke=\"#FFD700\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"4\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"23\"/><line x1=\"1\" y1=\"12\" x2=\"4\" y2=\"12\"/><line x1=\"20\" y1=\"12\" x2=\"23\" y2=\"12\"/><line x1=\"4.5\" y1=\"4.5\" x2=\"6.5\" y2=\"6.5\"/><line x1=\"17.5\" y1=\"17.5\" x2=\"19.5\" y2=\"19.5\"/><line x1=\"19.5\" y1=\"4.5\" x2=\"17.5\" y2=\"6.5\"/><line x1=\"6.5\" y1=\"17.5\" x2=\"4.5\" y2=\"19.5\"/></g></svg>",
          "Ясно": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"12\" cy=\"12\" r=\"5\" fill=\"#FFD700\"/><g stroke=\"#FFD700\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"4\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"23\"/><line x1=\"1\" y1=\"12\" x2=\"4\" y2=\"12\"/><line x1=\"20\" y1=\"12\" x2=\"23\" y2=\"12\"/></g></svg>",
          "Мінлива хмарність": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"8\" cy=\"8\" r=\"4\" fill=\"#FFD700\"/><g stroke=\"#FFD700\" stroke-width=\"1.5\" stroke-linecap=\"round\"><line x1=\"8\" y1=\"1\" x2=\"8\" y2=\"3\"/><line x1=\"8\" y1=\"13\" x2=\"8\" y2=\"15\"/><line x1=\"1\" y1=\"8\" x2=\"3\" y2=\"8\"/><line x1=\"13\" y1=\"8\" x2=\"15\" y2=\"8\"/></g><path d=\"M7 17 q0 -4 5 -4 q5 0 5 4 q4 1 4 5 q0 4 -4 4 l-10 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#B0C4DE\"/></svg>",
          "Хмарно": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 14 q0 -4 5 -4 q5 0 5 4 q4 1 4 6 q0 5 -4 5 l-10 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#B0C4DE\"/><path d=\"M10 12 q0 -3 4 -3 q4 0 4 3 q3 1 3 4 q0 3 -3 3 l-8 0 q-2 0 -2 -3 q0 -3 2 -4z\" fill=\"#87CEEB\"/></svg>",
          "Похмуро": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 12 q0 -5 6 -5 q6 0 6 5 q5 1 5 7 q0 6 -5 6 l-12 0 q-4 0 -4 -6 q0 -6 4 -7z\" fill=\"#A9A9A9\"/><path d=\"M9 10 q0 -4 5 -4 q5 0 5 4 q4 1 4 5 q0 4 -4 4 l-10 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#808080\"/></svg>",
          "Серпанок": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"4\" y1=\"5\" x2=\"20\" y2=\"5\" stroke=\"#B0C4DE\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"5\" y1=\"10\" x2=\"19\" y2=\"10\" stroke=\"#B0C4DE\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\" stroke=\"#B0C4DE\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"5\" y1=\"20\" x2=\"19\" y2=\"20\" stroke=\"#B0C4DE\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Задимлення": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"4\" y1=\"5\" x2=\"20\" y2=\"5\" stroke=\"#A9A9A9\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"5\" y1=\"10\" x2=\"19\" y2=\"10\" stroke=\"#A9A9A9\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"4\" y1=\"15\" x2=\"20\" y2=\"15\" stroke=\"#A9A9A9\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"6\" y1=\"20\" x2=\"18\" y2=\"20\" stroke=\"#A9A9A9\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Туман": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2 7 Q5 5 8 7 Q11 9 14 7 Q17 5 20 7 Q22 8 22 7\" fill=\"none\" stroke=\"#D3D3D3\" stroke-width=\"2.5\" stroke-linecap=\"round\" opacity=\"0.7\"/><path d=\"M2 11 Q5 9 8 11 Q11 13 14 11 Q17 9 20 11 Q22 12 22 11\" fill=\"none\" stroke=\"#D3D3D3\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M2 15 Q5 13 8 15 Q11 17 14 15 Q17 13 20 15 Q22 16 22 15\" fill=\"none\" stroke=\"#D3D3D3\" stroke-width=\"2.5\" stroke-linecap=\"round\" opacity=\"0.7\"/><path d=\"M2 19 Q5 17 8 19 Q11 21 14 19 Q17 17 20 19 Q22 20 22 19\" fill=\"none\" stroke=\"#D3D3D3\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Крижаний туман": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"4\" y1=\"6\" x2=\"20\" y2=\"6\" stroke=\"#B0E0E6\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\" stroke=\"#B0E0E6\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"6\" y1=\"18\" x2=\"18\" y2=\"18\" stroke=\"#B0E0E6\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Слабка мряка": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 11 q0 -4 5 -4 q5 0 5 4 q4 1 4 6 q0 5 -4 5 l-10 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#87CEEB\"/><line x1=\"10\" y1=\"16\" x2=\"9\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"16\" x2=\"13\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"18\" y1=\"16\" x2=\"17\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/></svg>",
          "Невелика мряка": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 11 q0 -4 5 -4 q5 0 5 4 q4 1 4 6 q0 5 -4 5 l-10 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#87CEEB\"/><line x1=\"9\" y1=\"16\" x2=\"8\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"13\" y1=\"16\" x2=\"12\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"17\" y1=\"16\" x2=\"16\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/></svg>",
          "Місцями слабка мряка": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"5\" r=\"4\" fill=\"#FFD700\"/><path d=\"M7 11 q0 -4 5 -4 q5 0 5 4 q4 1 4 6 q0 5 -4 5 l-10 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#87CEEB\"/><line x1=\"9\" y1=\"16\" x2=\"8\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"13\" y1=\"16\" x2=\"12\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"17\" y1=\"16\" x2=\"16\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/></svg>",
          "Слабкий дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 11 q0 -4 5 -4 q5 0 5 4 q4 1 4 6 q0 5 -4 5 l-10 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#87CEEB\"/><line x1=\"10\" y1=\"16\" x2=\"9\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"16\" x2=\"13\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"18\" y1=\"16\" x2=\"17\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/></svg>",
          "Легка злива": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#6A5ACD\"/><line x1=\"8\" y1=\"19\" x2=\"7\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"12\" y1=\"19\" x2=\"11\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"16\" y1=\"19\" x2=\"15\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>",
          "Невеликий дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#6A5ACD\"/><line x1=\"8\" y1=\"19\" x2=\"7\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"12\" y1=\"19\" x2=\"11\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"16\" y1=\"19\" x2=\"15\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>",
          "Місцями дощ поблизу": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M9 15 q0 -3 4 -3 q4 0 4 3 q3 1 3 4 q0 3 -3 3 l-8 0 q-2 0 -2 -3 q0 -3 2 -4z\" fill=\"#87CEEB\"/><line x1=\"9\" y1=\"22\" x2=\"8\" y2=\"25\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"13\" y1=\"22\" x2=\"12\" y2=\"25\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"17\" y1=\"22\" x2=\"16\" y2=\"25\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>",
          "Помірний дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 9 q0 -6 6 -6 q6 0 6 6 q5 1 5 6 q0 5 -5 5 l-12 0 q-4 0 -4 -5 q0 -5 4 -6z\" fill=\"#483D8B\"/><line x1=\"7\" y1=\"20\" x2=\"6\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"11\" y1=\"20\" x2=\"10\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"15\" y1=\"20\" x2=\"14\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"19\" y1=\"20\" x2=\"18\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Сильний дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8 q0 -7 7 -7 q7 0 7 7 q6 1 6 7 q0 6 -6 6 l-14 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#2F4F4F\"/><line x1=\"6\" y1=\"21\" x2=\"5\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"10\" y1=\"21\" x2=\"9\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"21\" x2=\"13\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"18\" y1=\"21\" x2=\"17\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Часом помірний дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M5 9 q0 -6 6 -6 q6 0 6 6 q5 1 5 6 q0 5 -5 5 l-12 0 q-4 0 -4 -5 q0 -5 4 -6z\" fill=\"#483D8B\"/><line x1=\"7\" y1=\"20\" x2=\"6\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"11\" y1=\"20\" x2=\"10\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"15\" y1=\"20\" x2=\"14\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Часом сильний дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M4 8 q0 -7 7 -7 q7 0 7 7 q6 1 6 7 q0 6 -6 6 l-14 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#2F4F4F\"/><line x1=\"6\" y1=\"21\" x2=\"5\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"10\" y1=\"21\" x2=\"9\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"21\" x2=\"13\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Зливовий дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#6A5ACD\"/><line x1=\"8\" y1=\"19\" x2=\"6\" y2=\"25\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"12\" y1=\"19\" x2=\"10\" y2=\"25\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"16\" y1=\"19\" x2=\"14\" y2=\"25\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Проливний дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8 q0 -7 7 -7 q7 0 7 7 q6 1 6 7 q0 6 -6 6 l-14 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#1a1a2e\"/><line x1=\"6\" y1=\"21\" x2=\"4\" y2=\"27\" stroke=\"#1E90FF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"10\" y1=\"21\" x2=\"8\" y2=\"27\" stroke=\"#1E90FF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"21\" x2=\"12\" y2=\"27\" stroke=\"#1E90FF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"18\" y1=\"21\" x2=\"16\" y2=\"27\" stroke=\"#1E90FF\" stroke-width=\"2.5\" stroke-linecap=\"round\"/></svg>",
          "Гроза": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 9 q0 -6 6 -6 q6 0 6 6 q4 1 4 6 q0 5 -5 5 l-12 0 q-3 0 -3 -5 q0 -5 4 -6z\" fill=\"#4A4A4A\"/><polygon points=\"12,10 10,14 11.5,14 10,19 15,13 13,13 14,10\" fill=\"#FFD700\"/><polygon points=\"16,12 14,16 15,16 14,20 18,15 16.5,15 17.5,12\" fill=\"#FFA500\"/></svg>",
          "Місцями грім і блискавки": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M5 9 q0 -6 6 -6 q6 0 6 6 q4 1 4 6 q0 5 -5 5 l-12 0 q-3 0 -3 -5 q0 -5 4 -6z\" fill=\"#4A4A4A\"/><polygon points=\"12,10 10,14 11.5,14 10,19 15,13 13,13 14,10\" fill=\"#FFD700\"/></svg>",
          "Помірний або сильний дощ із грозою": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 8 q0 -7 7 -7 q7 0 7 7 q6 1 6 7 q0 6 -6 6 l-14 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#2F4F4F\"/><polygon points=\"12,9 10,13 11.5,13 10,18 15,12 13,12 14,9\" fill=\"#FFD700\"/><line x1=\"6\" y1=\"21\" x2=\"5\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"10\" y1=\"21\" x2=\"9\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"21\" x2=\"13\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Місцями помірний або сильний дощ із грозою": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M4 8 q0 -7 7 -7 q7 0 7 7 q6 1 6 7 q0 6 -6 6 l-14 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#2F4F4F\"/><polygon points=\"12,9 10,13 11.5,13 10,18 15,12 13,12 14,9\" fill=\"#FFD700\"/><line x1=\"6\" y1=\"21\" x2=\"5\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"10\" y1=\"21\" x2=\"9\" y2=\"25\" stroke=\"#1E90FF\" stroke-width=\"2\" stroke-linecap=\"round\"/></svg>",
          "Невеликий дощ із грозою": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#4A4A4A\"/><polygon points=\"12,10 10,14 11.5,14 10,19 15,13 13,13 14,10\" fill=\"#FFD700\"/></svg>",
          "Місцями невеликий дощ із грозою": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#4A4A4A\"/><polygon points=\"12,10 10,14 11.5,14 10,19 15,13 13,13 14,10\" fill=\"#FFD700\"/></svg>",
          "Місцями слабкий дощ із грозою": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"5\" r=\"4\" fill=\"#FFD700\"/><path d=\"M7 11 q0 -4 5 -4 q5 0 5 4 q4 1 4 6 q0 5 -4 5 l-10 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#4A4A4A\"/><line x1=\"10\" y1=\"17\" x2=\"9\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"17\" x2=\"13\" y2=\"22\" stroke=\"#4169E1\" stroke-width=\"1\" stroke-linecap=\"round\"/><polygon points=\"12,9 10,13 11.5,13 10,18 15,12 13,12 14,9\" fill=\"#FFD700\"/></svg>",
          "Невеликий сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8 q0 -5 6 -5 q6 0 6 5 q4 1 4 6 q0 5 -4 5 l-12 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#B0C4DE\"/><circle cx=\"8\" cy=\"19\" r=\"1\" fill=\"white\"/><circle cx=\"12\" cy=\"20\" r=\"1\" fill=\"white\"/><circle cx=\"16\" cy=\"19\" r=\"1\" fill=\"white\"/></svg>",
          "Помірний сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 10 q0 -6 7 -6 q7 0 7 6 q5 1 5 6 q0 5 -5 5 l-14 0 q-4 0 -4 -5 q0 -5 4 -6z\" fill=\"#B0C4DE\"/><circle cx=\"7\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"12\" cy=\"22\" r=\"1.5\" fill=\"white\"/><circle cx=\"17\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"9\" cy=\"24\" r=\"1.5\" fill=\"white\"/><circle cx=\"14\" cy=\"24\" r=\"1.5\" fill=\"white\"/></svg>",
          "Сильний сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 9 q0 -7 8 -7 q8 0 8 7 q6 1 6 7 q0 6 -6 6 l-16 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#A9A9A9\"/><circle cx=\"6\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"11\" cy=\"22\" r=\"1.5\" fill=\"white\"/><circle cx=\"16\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"8\" cy=\"24\" r=\"1.5\" fill=\"white\"/><circle cx=\"13\" cy=\"24\" r=\"1.5\" fill=\"white\"/><circle cx=\"18\" cy=\"23\" r=\"1.5\" fill=\"white\"/></svg>",
          "Часом невеликий сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"6\" r=\"4\" fill=\"#FFD700\"/><path d=\"M5 12 q0 -5 6 -5 q6 0 6 5 q4 1 4 6 q0 5 -4 5 l-12 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#B0C4DE\"/><circle cx=\"8\" cy=\"20\" r=\"1\" fill=\"white\"/><circle cx=\"12\" cy=\"21\" r=\"1\" fill=\"white\"/></svg>",
          "Часом помірний сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"6\" r=\"4\" fill=\"#FFD700\"/><path d=\"M4 11 q0 -6 7 -6 q7 0 7 6 q5 1 5 6 q0 5 -5 5 l-14 0 q-4 0 -4 -5 q0 -5 4 -6z\" fill=\"#B0C4DE\"/><circle cx=\"7\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"12\" cy=\"22\" r=\"1.5\" fill=\"white\"/></svg>",
          "Часом сильний сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"6\" r=\"4\" fill=\"#FFD700\"/><path d=\"M3 10 q0 -7 8 -7 q8 0 8 7 q6 1 6 7 q0 6 -6 6 l-16 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#A9A9A9\"/><circle cx=\"6\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"11\" cy=\"22\" r=\"1.5\" fill=\"white\"/></svg>",
          "Низова хуртовина": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8 q0 -5 6 -5 q6 0 6 5 q4 1 4 6 q0 5 -4 5 l-12 0 q-3 0 -3 -5 q0 -5 3 -6z\" fill=\"#B0C4DE\"/><line x1=\"4\" y1=\"19\" x2=\"20\" y2=\"19\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/><line x1=\"6\" y1=\"21\" x2=\"18\" y2=\"21\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>",
          "Хуртовина": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 10 q0 -6 7 -6 q7 0 7 6 q5 1 5 6 q0 5 -5 5 l-14 0 q-4 0 -4 -5 q0 -5 4 -6z\" fill=\"#A9A9A9\"/><circle cx=\"6\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"10\" cy=\"22\" r=\"1.5\" fill=\"white\"/><circle cx=\"14\" cy=\"20\" r=\"1.5\" fill=\"white\"/><circle cx=\"18\" cy=\"22\" r=\"1.5\" fill=\"white\"/><line x1=\"4\" y1=\"16\" x2=\"20\" y2=\"16\" stroke=\"white\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>",
          "Снігопад": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 9 q0 -7 8 -7 q8 0 8 7 q6 1 6 7 q0 6 -6 6 l-16 0 q-5 0 -5 -6 q0 -6 5 -7z\" fill=\"#A9A9A9\"/><circle cx=\"5\" cy=\"20\" r=\"2\" fill=\"white\"/><circle cx=\"10\" cy=\"22\" r=\"2\" fill=\"white\"/><circle cx=\"15\" cy=\"20\" r=\"2\" fill=\"white\"/><circle cx=\"8\" cy=\"24\" r=\"2\" fill=\"white\"/><circle cx=\"13\" cy=\"24\" r=\"2\" fill=\"white\"/><circle cx=\"18\" cy=\"22\" r=\"2\" fill=\"white\"/></svg>",
          "Дощ зі снігом": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#6A5ACD\"/><line x1=\"8\" y1=\"19\" x2=\"7\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><circle cx=\"13\" cy=\"21\" r=\"1\" fill=\"white\"/><circle cx=\"16\" cy=\"20\" r=\"1\" fill=\"white\"/></svg>",
          "Невеликий дощ зі снігом": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#87CEEB\"/><line x1=\"8\" y1=\"19\" x2=\"7\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><circle cx=\"13\" cy=\"21\" r=\"1\" fill=\"white\"/></svg>",
          "Помірний або сильний дощ зі снігом": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 9 q0 -6 6 -6 q6 0 6 6 q5 1 5 6 q0 5 -5 5 l-12 0 q-4 0 -4 -5 q0 -5 4 -6z\" fill=\"#483D8B\"/><line x1=\"7\" y1=\"20\" x2=\"6\" y2=\"24\" stroke=\"#4169E1\" stroke-width=\"2\" stroke-linecap=\"round\"/><circle cx=\"12\" cy=\"22\" r=\"1.5\" fill=\"white\"/><circle cx=\"16\" cy=\"20\" r=\"1.5\" fill=\"white\"/></svg>",
          "Часом невеликий дощ зі снігом": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"7\" r=\"4\" fill=\"#FFD700\"/><path d=\"M5 10 q0 -5 6 -5 q6 0 6 5 q4 1 4 5 q0 4 -4 4 l-12 0 q-3 0 -3 -4 q0 -4 3 -5z\" fill=\"#87CEEB\"/><line x1=\"8\" y1=\"19\" x2=\"7\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><circle cx=\"13\" cy=\"21\" r=\"1\" fill=\"white\"/></svg>",
          "Град": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 9 q0 -6 6 -6 q6 0 6 6 q4 1 4 6 q0 5 -5 5 l-12 0 q-3 0 -3 -5 q0 -5 4 -6z\" fill=\"#483D8B\"/><circle cx=\"7\" cy=\"20\" r=\"1.5\" fill=\"white\" stroke=\"#87CEEB\" stroke-width=\"0.5\"/><circle cx=\"12\" cy=\"22\" r=\"1.5\" fill=\"white\" stroke=\"#87CEEB\" stroke-width=\"0.5\"/><circle cx=\"17\" cy=\"20\" r=\"1.5\" fill=\"white\" stroke=\"#87CEEB\" stroke-width=\"0.5\"/></svg>",
          "Можливий дощ": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"6\" r=\"4\" fill=\"#FFD700\"/><path d=\"M9 13 q0 -3 4 -3 q4 0 4 3 q3 1 3 4 q0 3 -3 3 l-8 0 q-2 0 -2 -3 q0 -3 2 -4z\" fill=\"#87CEEB\"/><line x1=\"11\" y1=\"20\" x2=\"10.5\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><line x1=\"14\" y1=\"20\" x2=\"13.5\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>",
          "Можливий сніг": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"6\" r=\"4\" fill=\"#FFD700\"/><path d=\"M9 13 q0 -3 4 -3 q4 0 4 3 q3 1 3 4 q0 3 -3 3 l-8 0 q-2 0 -2 -3 q0 -3 2 -4z\" fill=\"#B0C4DE\"/><circle cx=\"11\" cy=\"22\" r=\"1\" fill=\"white\"/><circle cx=\"14\" cy=\"22\" r=\"1\" fill=\"white\"/></svg>",
          "Можливий дощ зі снігом": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"7\" cy=\"6\" r=\"4\" fill=\"#FFD700\"/><path d=\"M9 13 q0 -3 4 -3 q4 0 4 3 q3 1 3 4 q0 3 -3 3 l-8 0 q-2 0 -2 -3 q0 -3 2 -4z\" fill=\"#6A5ACD\"/><line x1=\"11\" y1=\"20\" x2=\"10.5\" y2=\"23\" stroke=\"#4169E1\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><circle cx=\"14\" cy=\"22\" r=\"1\" fill=\"white\"/></svg>",
          "Сильна піщана буря": "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M3 6 Q7 4 11 6 Q15 8 19 6 Q22 5 22 6\" fill=\"none\" stroke=\"#D2B48C\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M2 10 Q6 8 10 10 Q14 12 18 10 Q21 9 22 10\" fill=\"none\" stroke=\"#D2B48C\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M3 14 Q7 12 11 14 Q15 16 19 14 Q22 13 22 14\" fill=\"none\" stroke=\"#D2B48C\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M4 18 Q8 16 12 18 Q16 20 20 18\" fill=\"none\" stroke=\"#D2B48C\" stroke-width=\"2\" stroke-linecap=\"round\" opacity=\"0.8\"/></svg>"
        };
        // Іконка підбирається за кодом умов WeatherAPI (він не залежить від мови),
        // а якщо коду немає в списку - за текстом умов
        this.weatherCodeIcons = {
          1003: "Мінлива хмарність",
          1006: "Хмарно",
          1009: "Похмуро",
          1012: "Серпанок",
          1015: "Сильна піщана буря",
          1018: "Сильна піщана буря",
          1021: "Сильна піщана буря",
          1024: "Сильна піщана буря",
          1027: "Сильна піщана буря",
          1030: "Туман",
          1033: "Задимлення",
          1036: "Задимлення",
          1039: "Задимлення",
          1042: "Задимлення",
          1045: "Сильна піщана буря",
          1048: "Сильна піщана буря",
          1063: "Місцями дощ поблизу",
          1066: "Можливий сніг",
          1069: "Можливий дощ зі снігом",
          1072: "Місцями слабка мряка",
          1087: "Місцями грім і блискавки",
          1114: "Низова хуртовина",
          1117: "Хуртовина",
          1135: "Туман",
          1147: "Крижаний туман",
          1150: "Місцями слабка мряка",
          1153: "Слабка мряка",
          1168: "Невелика мряка",
          1171: "Невелика мряка",
          1180: "Невеликий дощ",
          1183: "Слабкий дощ",
          1186: "Часом помірний дощ",
          1189: "Помірний дощ",
          1192: "Часом сильний дощ",
          1195: "Сильний дощ",
          1198: "Невеликий дощ зі снігом",
          1201: "Помірний або сильний дощ зі снігом",
          1204: "Невеликий дощ зі снігом",
          1207: "Помірний або сильний дощ зі снігом",
          1210: "Часом невеликий сніг",
          1213: "Невеликий сніг",
          1216: "Часом помірний сніг",
          1219: "Помірний сніг",
          1222: "Часом сильний сніг",
          1225: "Сильний сніг",
          1237: "Град",
          1240: "Легка злива",
          1243: "Зливовий дощ",
          1246: "Проливний дощ",
          1249: "Невеликий дощ зі снігом",
          1252: "Помірний або сильний дощ зі снігом",
          1255: "Невеликий сніг",
          1258: "Снігопад",
          1261: "Град",
          1264: "Град",
          1273: "Місцями невеликий дощ із грозою",
          1276: "Помірний або сильний дощ із грозою",
          1279: "Гроза",
          1282: "Гроза"
        };
        this.getIcon = function (condition, isDay) {
          if (!condition) {
            return "";
          }
          var key;
          if (condition.code === 1000) {
            key = isDay === 0 ? "Ясно" : "Сонячно";
          } else {
            key = this.weatherCodeIcons[condition.code];
          }
          return this.weatherIcons[key] || this.weatherIcons[condition.text] || "";
        };
        function onWeatherData(data) {
          retryCount = 0;
          var loc = data.location;
          var current = data.current;
          var temp = Math.floor(current.temp_c);
          currentData = data;
          console.log("Погода", "Місто: " + loc.name);
          console.log("Погода", "Широта: " + loc.lat + ", Довгота: " + loc.lon);
          console.log("Погода", "Температура: " + temp + "°");
          console.log("Погода", "Умови: " + current.condition.text);
          $("#weather-temp").text(temp + "°").css({
            "font-size": "2em",
            "font-weight": "600"
          });
          var icon = self.getIcon(current.condition, current.is_day) || "<svg width=\"2em\" height=\"2em\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"12\" cy=\"12\" r=\"8\" fill=\"#808080\"/><text x=\"12\" y=\"16\" text-anchor=\"middle\" fill=\"white\" font-size=\"12\">?</text></svg>";
          $("#weather-condition").html(icon);
          $("#weather-condition svg").css({
            display: "inline-block",
            width: "2em",
            height: "2em",
            "max-width": "2em",
            "max-height": "2em"
          });
        }
        function onForecastData(data) {
          forecastData = data;
          showWeatherDetails();
        }
        function onError() {
          console.log("Error retrieving weather data");
          if (retryCount < maxRetries) {
            retryCount++;
            console.log("Погода", "Повторна спроба " + retryCount + " з " + maxRetries);
            setTimeout(function () {
              self.getWeather();
            }, 3000);
          } else {
            console.log("Погода", "Перевищено кількість спроб");
            retryCount = 0;
          }
        }
        this.getWeather = function () {
          var manual = Lampa.Storage.get("weather_manual", false);
          var city = Lampa.Storage.get("weather_city", "");
          console.log("Погода", "Режим: " + (manual ? "ручний" : "авто"));
          if (manual && city) {
            console.log("Погода", "Шукаємо за містом: " + city);
            this.getWeatherData(city);
          } else {
            console.log("Погода", "Визначаємо за IP...");
            this.getWeatherByIP();
          }
        };
        this.getWeatherByIP = function () {
          $.get("http://ip-api.com/json", function (data) {
            console.log("Погода", "IP визначено: " + data.city);
            console.log("Погода", "Широта: " + data.lat + ", Довгота: " + data.lon);
            this.getWeatherData(data.city);
          }.bind(this)).fail(function () {
            console.log("Погода", "Помилка визначення IP");
          });
        };
        this.startUpdateTimer = function () {
          this.stopUpdateTimer();
          var interval = parseInt(Lampa.Storage.get("weather_interval", "0"), 10);
          if (interval === 0) {
            return;
          }
          var ms = interval * 60 * 1000;
          var self = this;
          function tick() {
            console.log("Погода", "Автооновлення...");
            self.getWeather();
            timer = setTimeout(tick, ms);
          }
          console.log("Погода", "Запускаємо автооновлення кожні " + interval + " хв");
          timer = setTimeout(tick, ms);
        };
        this.stopUpdateTimer = function () {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
        };
        this.restartUpdateTimer = function () {
          this.stopUpdateTimer();
          this.startUpdateTimer();
        };
        this.render = function () {
          return $html;
        };
        this.destroy = function () {
          this.stopUpdateTimer();
          if ($html) {
            $html.remove();
            $html = null;
          }
        };
      }
      var weather = new WeatherWidget();
      var currentData = null;
      var forecastData = null;
      var defaultIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" viewBox=\"0 0 24 24\"><path d=\"M0 0h24v24H0z\" fill=\"none\" /><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 2v2m0 4a4 4 0 0 0-1.645 7.647M2 12h2m16 2.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0zM4.93 4.93l1.41 1.41m0 11.32l-1.41 1.41\" /></svg>";
      function getDetailIcon(name) {
        var icons = {
          location: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#FF6B6B\" d=\"M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5\"/></svg>",
          wind: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#87CEEB\" d=\"M4 10a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2zm5 4a1 1 0 1 0 0 2h7a1 1 0 0 0 0-2zm-3 4a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z\"/></svg>",
          humidity: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#4FC3F7\" d=\"M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8m0 18c-3.35 0-6-2.57-6-6.2c0-2.34 1.95-5.44 6-9.14c4.05 3.7 6 6.79 6 9.14c0 3.63-2.65 6.2-6 6.2\"/></svg>",
          cloud: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#B0BEC5\" d=\"M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96\"/></svg>",
          pressure: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#FF9800\" d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 13l-3.5-3.5l1.42-1.42L12 12.17l2.08-2.09l1.42 1.42z\"/></svg>",
          visibility: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#66BB6A\" d=\"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3\"/></svg>",
          uv: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"12\" cy=\"12\" r=\"5\" fill=\"#FFD700\"/><g stroke=\"#FFD700\" stroke-width=\"2\" stroke-linecap=\"round\"><line x1=\"12\" y1=\"1\" x2=\"12\" y2=\"4\"/><line x1=\"12\" y1=\"20\" x2=\"12\" y2=\"23\"/><line x1=\"1\" y1=\"12\" x2=\"4\" y2=\"12\"/><line x1=\"20\" y1=\"12\" x2=\"23\" y2=\"12\"/></g></svg>",
          gust: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#AB47BC\" d=\"M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m0 18a8 8 0 1 1 8-8a8 8 0 0 1-8 8m0-13v5l4 2.5l-.75 1.23L10 12V7z\"/></svg>",
          calendar: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#FFA726\" d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14c1.11 0 2-.89 2-2V5a2 2 0 0 0-2-2m0 16H5V8h14zM9 10H7v2h2zm4 0h-2v2h2zm4 0h-2v2h2z\"/></svg>",
          details: "<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#FFD700\" d=\"M11 17h2v-6h-2v6zm1-8q.2 0 .35-.15t.15-.35q0-.2-.15-.35T12 8q-.2 0-.35.15t-.15.35q0 .2.15.35T12 10zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 23z\"/></svg>"
        };
        return icons[name] || "";
      }
      function addDetailButton() {
        if ($("#WEATHER_DETAIL").length > 0) {
          return;
        }
        var html = "<div id=\"WEATHER_DETAIL\" class=\"head__action selector\">" + defaultIcon + "</div>";
        $("div[class=\"head__action selector open--search\"]").after(html);
        var showButton = Lampa.Storage.get("weather_button", true);
        if (showButton === false || showButton === "false") {
          $("#WEATHER_DETAIL").hide();
        }
        $("#WEATHER_DETAIL").on("hover:enter hover:click hover:touch", function () {
          if (!currentData) {
            Lampa.Noty.show("Дані погоди ще не завантажено");
            return;
          }
          weather.getForecastData(currentData.location.name);
        });
      }
      function showWeatherDetails() {
        if (!currentData) {
          Lampa.Noty.show("Дані погоди ще не завантажено");
          return;
        }
        var data = currentData;
        var $content = $("<div style=\"padding: 0.5em;\">");
        $content.append("<div style=\"display: flex; align-items: center; font-size: 1.6em; margin-bottom: 0.8em; font-weight: bold;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("location") + "</span> Місцезнаходження</div><div style=\"margin-bottom: 2em; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5em; padding: 0.8em;\"><div style=\"font-size: 1.3em; margin-bottom: 0.5em;\">" + data.location.name + ", " + data.location.country + "</div><div style=\"display: flex; justify-content: space-between; align-items: center;\"><div style=\"font-size: 2.5em;\">" + Math.floor(data.current.temp_c) + "°C</div><div style=\"text-align: right; font-size: 1.1em;\"><div style=\"margin-bottom: 0.3em;\">Відчувається як " + Math.floor(data.current.feelslike_c) + "°C</div><div>" + data.current.condition.text + "</div></div></div></div>");
        $content.append("<div style=\"display: flex; align-items: center; font-size: 1.6em; margin: 2em 0 0.8em; font-weight: bold;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("details") + "</span> Подробиці</div><div style=\"margin-bottom: 2em; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5em; overflow: hidden;\"><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("wind") + "</span>Вітер</span><span style=\"margin-left: auto;\">" + data.current.wind_kph + " км/год " + data.current.wind_dir + "</span></div><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("humidity") + "</span>Вологість</span><span style=\"margin-left: auto;\">" + data.current.humidity + "%</span></div><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("cloud") + "</span>Хмарність</span><span style=\"margin-left: auto;\">" + data.current.cloud + "%</span></div><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("pressure") + "</span>Тиск</span><span style=\"margin-left: auto;\">" + data.current.pressure_mb + " мбар</span></div><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("visibility") + "</span>Видимість</span><span style=\"margin-left: auto;\">" + data.current.vis_km + " км</span></div><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("uv") + "</span>УФ-індекс</span><span style=\"margin-left: auto;\">" + data.current.uv + "</span></div><div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em; font-size: 1.1em;\"><span style=\"display: flex; align-items: center;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("gust") + "</span>Пориви вітру</span><span style=\"margin-left: auto;\">" + data.current.gust_kph + " км/год</span></div></div>");
        if (forecastData && forecastData.forecast) {
          var forecastHtml = "<div style=\"display: flex; align-items: center; font-size: 1.6em; margin: 2em 0 0.8em; font-weight: bold;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.5em;\">" + getDetailIcon("calendar") + "</span> Прогноз на 3 дні</div><div style=\"margin-bottom: 1em; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5em; overflow: hidden;\">";
          var days = forecastData.forecast.forecastday;
          for (var i = 0; i < days.length; i++) {
            var day = days[i];
            var date = new Date(day.date);
            var dayNames = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
            var dayName = i === 0 ? "Сьогодні" : i === 1 ? "Завтра" : dayNames[date.getDay()];
            var icon = weather.getIcon(day.day.condition, 1) || "";
            console.log("Погода", "Прогноз, день " + i + ": " + day.day.condition.text);
            var isLast = i === days.length - 1;
            forecastHtml += "<div style=\"display: flex; justify-content: space-between; align-items: center; height: 2.8em; padding: 0 0.8em;" + (isLast ? "" : " border-bottom: 1px solid rgba(255,255,255,0.1);") + " font-size: 1.1em;\"><div style=\"font-size: 1.1em; display: flex; align-items: center; flex-shrink: 0;\">" + dayName + " " + date.getDate() + "." + (date.getMonth() + 1) + "</div><div style=\"display: flex; align-items: center; margin-left: auto;\"><span style=\"color: #FF8A80; display: flex; align-items: center; justify-content: center; font-size: 1.1em; width: 1.8em;\">" + Math.floor(day.day.maxtemp_c) + "°</span><div style=\"border-left: 1px solid rgba(255,255,255,0.2); height: 1.3em; margin: 0 0.2em;\"></div><span style=\"color: #82B1FF; display: flex; align-items: center; justify-content: center; font-size: 1.1em; width: 1.8em;\">" + Math.floor(day.day.mintemp_c) + "°</span><div style=\"border-left: 1px solid rgba(255,255,255,0.2); height: 1.3em; margin: 0 0.2em;\"></div><span class=\"forecast-day-icon\" style=\"display: flex; align-items: center; justify-content: center; width: 2em; height: 1.8em;\">" + icon + "</span><div style=\"border-left: 1px solid rgba(255,255,255,0.2); height: 1.3em; margin: 0 0.2em;\"></div><span style=\"display: flex; align-items: center; justify-content: center; width: 3.8em;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.15em; display: flex; align-items: center;\">" + getDetailIcon("humidity") + "</span>" + day.day.avghumidity + "%</span><div style=\"border-left: 1px solid rgba(255,255,255,0.2); height: 1.3em; margin: 0 0.2em;\"></div><span style=\"display: flex; align-items: center; justify-content: center; width: 4.5em;\"><span class=\"weather-detail-icon\" style=\"margin-right: 0.15em; display: flex; align-items: center;\">" + getDetailIcon("wind") + "</span>" + day.day.maxwind_kph + " км/год</span></div></div>";
          }
          forecastHtml += "</div>";
          $content.append(forecastHtml);
        }
        Lampa.Modal.open({
          title: "Детальна погода",
          html: $content,
          size: "medium",
          mask: true,
          onBack: function () {
            $(".modal").remove();
            Lampa.Controller.toggle("head");
          },
          onSelect: function () {}
        });
        setTimeout(function () {
          $(".weather-detail-icon svg").css({
            width: "1.5em",
            height: "1.5em",
            "vertical-align": "middle"
          });
          $(".forecast-day-icon svg").css({
            width: "1.8em",
            height: "1.8em",
            "max-width": "1.8em",
            "max-height": "1.8em"
          });
        }, 0);
      }
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          if (Lampa.Settings.main().render().find("[data-component=\"weather_settings\"]").length == 0) {
            Lampa.SettingsApi.addComponent({
              component: "weather_settings",
              name: "Погода"
            });
          }
          Lampa.Settings.main().update();
          Lampa.Settings.main().render().find("[data-component=\"weather_settings\"]").addClass("hide");
        }
      });
      Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
          name: "weather_settings",
          type: "static",
          default: true
        },
        field: {
          name: "Погода",
          description: "Налаштування міста, автооновлення та кнопки додаткової інформації"
        },
        onRender: function (el) {
          setTimeout(function () {
            $(".settings-param > div:contains(\"Погода\")").parent().insertAfter($("div[data-name=\"interface_size\"]"));
          }, 0);
          el.on("hover:enter", function () {
            Lampa.Settings.create("weather_settings");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("interface");
            };
          });
        }
      });
      Lampa.SettingsApi.addParam({
        component: "weather_settings",
        param: {
          name: "weather_manual",
          type: "trigger",
          default: false
        },
        field: {
          name: "Ручний вибір міста",
          description: "Увімкніть, щоб ввести місто вручну"
        },
        onChange: function (value) {
          console.log("Погода", "Тригер ручного режиму: " + value);
          if (value) {
            var city = Lampa.Storage.get("weather_city", "");
            if (city) {
              console.log("Погода", "Запускаємо пошук за містом: " + city);
              weather.getWeather();
            }
          } else {
            console.log("Погода", "Перемкнулися на автовизначення");
            weather.getWeather();
          }
        }
      });
      Lampa.SettingsApi.addParam({
        component: "weather_settings",
        param: {
          name: "weather_city",
          type: "input",
          values: "",
          placeholder: "Наприклад: Київ",
          default: ""
        },
        field: {
          name: "Назва міста",
          description: "Введіть назву"
        },
        onChange: function (value) {
          console.log("Погода", "Введено місто: " + value);
          if (value) {
            var manual = Lampa.Storage.get("weather_manual", false);
            if (manual) {
              console.log("Погода", "Ручний режим увімкнено, шукаємо: " + value);
              weather.getWeather();
            }
          }
        },
        onRender: function (el) {
          setTimeout(function () {
            if (!Lampa.Storage.get("weather_manual", false)) {
              el.hide();
            } else {
              el.show();
            }
          }, 20);
        }
      });
      Lampa.SettingsApi.addParam({
        component: "weather_settings",
        param: {
          name: "weather_interval",
          type: "select",
          values: {
            "0": "Не оновлювати",
            "15": "15 хвилин",
            "30": "30 хвилин",
            "60": "1 година",
            "120": "2 години"
          },
          default: "0"
        },
        field: {
          name: "Автооновлення",
          description: "Оберіть інтервал оновлення погоди"
        },
        onChange: function (value) {
          console.log("Погода", "Інтервал оновлення: " + value + " хв");
          weather.restartUpdateTimer();
        }
      });
      Lampa.SettingsApi.addParam({
        component: "weather_settings",
        param: {
          name: "weather_button",
          type: "trigger",
          default: true
        },
        field: {
          name: "Кнопка додаткової інформації",
          description: "Показувати кнопку детальної погоди на головній сторінці"
        },
        onChange: function (value) {
          var show = value === true || value === "true";
          if (show) {
            $("#WEATHER_DETAIL").show();
          } else {
            $("#WEATHER_DETAIL").hide();
          }
        }
      });
      Lampa.Storage.listener.follow("change", function (e) {
        if (e.name == "weather_manual") {
          setTimeout(function () {
            if (Lampa.Storage.get("weather_manual", false)) {
              $("div[data-name=\"weather_city\"]").show();
            } else {
              $("div[data-name=\"weather_city\"]").hide();
            }
          }, 50);
        }
      });
      function start() {
        weather.create();
        var $widget = weather.render();
        $(".head__time").after($widget);
        var fontSize = $(".head__time").css("font-size");
        $(".weather-widget").css("font-size", fontSize);
        if (window.innerWidth > 585) {
          $(".weather-widget").css("margin-left", "0.8em");
          $(".weather-widget").css("border-left", "1px solid rgba(255,255,255,0.3)");
          $(".weather-widget").css("padding-left", "0.8em");
        }
        $(".weather-widget").show();
        weather.getWeather();
        weather.startUpdateTimer();
        setTimeout(addDetailButton, 1000);
      }
      if (window.appready) {
        start();
      } else {
        Lampa.Listener.follow("app", function (e) {
          if (e.type == "ready") {
            start();
          }
        });
      }
    }
    init();
  })();
})();