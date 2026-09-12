(function () {
    'use strict';

    if (!window.Lampa) return;

    // ===================== Alive Cards v6.1 =====================
    // Whole-Screen Sensor Parallax + IntersectionObserver + rAF 120926
    // ============================================================

    var STYLE_ID        = 'alive-cards-style-v6';
    var CARD_SELECTOR   = '.card, .card--collection, .card--wide';
    var PERSPECTIVE     = 1000;
    var MAX_TILT        = 12;
    var SCALE           = 1.04;
    var MAX_GLARE       = 0.28;
    var RETURN_SPEED    = 450;
    var SENSOR_SMOOTH   = 0.16;
    var SENSOR_DEADZONE = 0.05;

    var isTV = (function () {
        return (Lampa.Platform && Lampa.Platform.tv && Lampa.Platform.tv()) ||
               navigator.userAgent.indexOf('Tizen') !== -1 ||
               navigator.userAgent.indexOf('Web0S') !== -1 ||
               navigator.userAgent.indexOf('Large Screen') !== -1;
    })();

    var state = {
        enabled:   true,
        intensity: MAX_TILT,
        glare:     true,
        parallax:  true
    };

    var currentFocused = null;
    var attachedCards  = (typeof WeakSet !== 'undefined') ? new WeakSet() : null;
    var attachedList   = [];
    var visibleCards   = []; // Dynamic cache of cards on screen

    function isAttached(c) { return attachedCards ? attachedCards.has(c) : attachedList.indexOf(c) !== -1; }
    function markAttached(c) { if (attachedCards) attachedCards.add(c); else attachedList.push(c); }

    // ---------- Styles & 3D Layering ----------
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var s = document.createElement('style');
        s.id = STYLE_ID;
        s.textContent =
            /* Core 3D Container */
            '.alive-card-view{' +
                'position:relative !important;' +
                'transform-style:preserve-3d !important;' +
                '-webkit-transform-style:preserve-3d !important;' +
                'will-change:transform;' +
                'border-radius:inherit;' +
            '}' +
            /* Multi-layer Parallax (floating elements on tilt) */
            '.alive-parallax .card__age,' +
            '.alive-parallax .card__type,' +
            '.alive-parallax .card__quality,' +
            '.alive-parallax .card__vote{' +
                'transform:translateZ(22px) !important;' +
                '-webkit-transform:translateZ(22px) !important;' +
                'transition:transform .25s ease;' +
            '}' +
            '.alive-parallax .card__title{' +
                'transform:translateZ(14px) !important;' +
                '-webkit-transform:translateZ(14px) !important;' +
            '}' +
            /* Glare highlight */
            '.tilt-glare{' +
                'position:absolute;inset:0;pointer-events:none;overflow:hidden;' +
                'border-radius:inherit;opacity:0;transition:opacity .25s ease;z-index:10;' +
            '}' +
            '.tilt-glare-inner{' +
                'position:absolute;top:50%;left:50%;pointer-events:none;' +
                'background:radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%);' +
                'transform:translate(-50%,-50%);' +
                'opacity:0;width:160%;height:160%;' +
            '}' +
            /* TV D-Pad Focus Wobble */
            '@keyframes alive-focus-wobble {' +
                '0%   { transform: perspective(' + PERSPECTIVE + 'px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1); }' +
                '25%  { transform: perspective(' + PERSPECTIVE + 'px) rotateX(-5deg) rotateY(6deg) scale3d(' + SCALE + ',' + SCALE + ',1); }' +
                '50%  { transform: perspective(' + PERSPECTIVE + 'px) rotateX(4deg) rotateY(-4deg) scale3d(' + SCALE + ',' + SCALE + ',1); }' +
                '75%  { transform: perspective(' + PERSPECTIVE + 'px) rotateX(-2deg) rotateY(2deg) scale3d(' + SCALE + ',' + SCALE + ',1); }' +
                '100% { transform: perspective(' + PERSPECTIVE + 'px) rotateX(0deg) rotateY(0deg) scale3d(' + SCALE + ',' + SCALE + ',1); }' +
            '}' +
            '.alive-focused-rock {' +
                'animation: alive-focus-wobble .65s cubic-bezier(.25,1,.5,1) forwards !important;' +
            '}';
        document.head.appendChild(s);
    }

    function ensureGlare(view) {
        if (!state.glare) return null;
        var glare = view.querySelector('.tilt-glare');
        if (!glare) {
            glare = document.createElement('div');
            glare.className = 'tilt-glare';
            var inner = document.createElement('div');
            inner.className = 'tilt-glare-inner';
            glare.appendChild(inner);
            view.appendChild(glare);
        }
        return glare;
    }

    // ---------- High-Performance Transforms ----------
    function setTransform(card, rx, ry, scale, immediate) {
        var t = 'perspective(' + PERSPECTIVE + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale3d(' + scale + ',' + scale + ',1)';
        card.style.transition = immediate ? 'none' : 'transform ' + (RETURN_SPEED / 1000) + 's cubic-bezier(.23,1,.32,1)';
        card.style.transform = t;
        card.style.webkitTransform = t;
    }

    function applyTilt(card, px, py, immediate) {
        if (!card || !state.enabled) return;

        if (card.classList.contains('alive-focused-rock')) {
            card.classList.remove('alive-focused-rock');
        }

        var max = state.intensity;
        var rx  = (py * max).toFixed(2);
        var ry  = (px * -max).toFixed(2);

        setTransform(card, rx, ry, SCALE, immediate);

        var glare = card._aliveGlare;
        if (glare && state.glare) {
            var inner = glare.querySelector('.tilt-glare-inner');
            if (inner) {
                var angle = Math.atan2(py, px) * (180 / Math.PI) + 90;
                var strength = Math.min(Math.sqrt(px * px + py * py), 1) * MAX_GLARE;
                inner.style.transform = 'translate(-50%,-50%) rotate(' + angle.toFixed(1) + 'deg)';
                inner.style.opacity = strength.toFixed(3);
                glare.style.opacity = '1';
            }
        }
    }

    function resetCard(card) {
        if (!card) return;
        card.classList.remove('alive-focused-rock');
        setTransform(card, 0, 0, 1, false);

        var glare = card._aliveGlare;
        if (glare) {
            glare.style.opacity = '0';
            var inner = glare.querySelector('.tilt-glare-inner');
            if (inner) inner.style.opacity = '0';
        }
    }

    // ---------- Viewport Tracking (IntersectionObserver) ----------
    var observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                var card = entry.target;
                var idx = visibleCards.indexOf(card);

                if (entry.isIntersecting) {
                    if (idx === -1) visibleCards.push(card);
                } else {
                    if (idx !== -1) {
                        visibleCards.splice(idx, 1);
                        resetCard(card);
                    }
                }
            }
        }, { rootMargin: '50px' });
    }

    // ---------- Card Preparation ----------
    function prepareCard(card) {
        if (!card || isAttached(card)) return;
        markAttached(card);

        var view = card.querySelector('.card__view') || card;
        view.classList.add('alive-card-view');

        if (state.parallax) card.classList.add('alive-parallax');
        card._aliveGlare = ensureGlare(view);

        // Track visibility for sensor loops
        if (observer) {
            observer.observe(card);
        } else {
            visibleCards.push(card); // Fallback if no IntersectionObserver
        }

        // Mouse hover
        var rafId = null;
        card.addEventListener('mousemove', function (e) {
            if (!state.enabled) return;
            var r = card.getBoundingClientRect();
            var px = ((e.clientX - r.left) / r.width) * 2 - 1;
            var py = ((e.clientY - r.top) / r.height) * 2 - 1;

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(function () {
                applyTilt(card, px, py, true);
            });
        });

        card.addEventListener('mouseleave', function () {
            if (rafId) cancelAnimationFrame(rafId);
            resetCard(card);
        });

        // Touch drag
        card.addEventListener('touchmove', function (e) {
            if (!state.enabled || !e.touches || !e.touches.length) return;
            var t = e.touches[0];
            var r = card.getBoundingClientRect();
            var px = ((t.clientX - r.left) / r.width) * 2 - 1;
            var py = ((t.clientY - r.top) / r.height) * 2 - 1;

            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(function () {
                applyTilt(card, px, py, true);
            });
        }, { passive: true });

        card.addEventListener('touchend', function () {
            if (rafId) cancelAnimationFrame(rafId);
            resetCard(card);
        });
    }

    function scanCards(root) {
        var scope = root || document;
        if (!scope.querySelectorAll) return;
        var list = scope.querySelectorAll(CARD_SELECTOR);
        for (var i = 0; i < list.length; i++) prepareCard(list[i]);
    }

    // ---------- Whole-Screen Sensors (Gyro / Accelerometer) ----------
    function setupSensors() {
        if (isTV) return; // Ignore on TV platforms

        var rawX = 0, rawY = 0;
        var smoothX = 0, smoothY = 0;
        var sensorRunning = false;

        function renderFrame() {
            if (!state.enabled) {
                sensorRunning = false;
                return;
            }

            // Low-pass filter for smooth motion
            smoothX += (rawX - smoothX) * SENSOR_SMOOTH;
            smoothY += (rawY - smoothY) * SENSOR_SMOOTH;

            // Tilt all visible cards currently in the viewport
            for (var i = 0; i < visibleCards.length; i++) {
                applyTilt(visibleCards[i], smoothX, smoothY, true);
            }

            // Keep RAF running while movement continues
            if (Math.abs(rawX - smoothX) > 0.005 || Math.abs(rawY - smoothY) > 0.005) {
                requestAnimationFrame(renderFrame);
            } else {
                sensorRunning = false;
            }
        }

        function triggerSensorTick(px, py) {
            if (Math.abs(px) < SENSOR_DEADZONE) px = 0;
            if (Math.abs(py) < SENSOR_DEADZONE) py = 0;

            rawX = px;
            rawY = py;

            if (!sensorRunning) {
                sensorRunning = true;
                requestAnimationFrame(renderFrame);
            }
        }

        // Orientation API (Primary)
        window.addEventListener('deviceorientation', function (e) {
            if (e.beta === null || e.gamma === null) return;
            // Calibrated for natural handheld angle (~45° viewing angle)
            var py = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
            var px = Math.max(-1, Math.min(1, e.gamma / 35));
            triggerSensorTick(px, py);
        }, true);

        // Motion API (Fallback)
        window.addEventListener('devicemotion', function (e) {
            if (!e.accelerationIncludingGravity) return;
            var ax = e.accelerationIncludingGravity.x || 0;
            var ay = e.accelerationIncludingGravity.y || 0;
            var px = Math.max(-1, Math.min(1, ax / 7));
            var py = Math.max(-1, Math.min(1, (ay - 5) / 8));
            triggerSensorTick(px, py);
        }, true);

        // iOS Permission prompt
        function reqPerm() {
            if (typeof DeviceOrientationEvent !== 'undefined' &&
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().catch(function () {});
            }
        }
        document.addEventListener('click', reqPerm, { once: true });
        document.addEventListener('touchend', reqPerm, { once: true });
    }

    // ---------- Native Lampa Controller Navigation ----------
    function setupControllerFocus() {
        if (!Lampa.Controller || !Lampa.Controller.listener) return;

        Lampa.Controller.listener.follow('focus', function (e) {
            if (!state.enabled) return;

            var target = e.target;
            if (!target) return;

            var card = (target.matches && target.matches(CARD_SELECTOR))
                ? target
                : (target.closest ? target.closest(CARD_SELECTOR) : null);

            if (currentFocused && currentFocused !== card) {
                resetCard(currentFocused);
            }

            if (card) {
                prepareCard(card);
                currentFocused = card;

                // Fire clean CSS wobble
                card.classList.remove('alive-focused-rock');
                void card.offsetWidth;
                card.classList.add('alive-focused-rock');
            } else {
                currentFocused = null;
            }
        });
    }

    function watchCardAdditions() {
        if (typeof MutationObserver === 'undefined') {
            setInterval(scanCards, 2000);
            return;
        }

        var obs = new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
                var nodes = muts[i].addedNodes;
                for (var j = 0; j < nodes.length; j++) {
                    var n = nodes[j];
                    if (n.nodeType !== 1) continue;
                    if (n.matches && n.matches(CARD_SELECTOR)) {
                        prepareCard(n);
                    } else if (n.querySelectorAll) {
                        scanCards(n);
                    }
                }
            }
        });

        var app = document.querySelector('.wrap__content') || document.body;
        obs.observe(app, { childList: true, subtree: true });
    }

    // ---------- Settings ----------
    function normalize(v) {
        return (v && typeof v === 'object' && 'value' in v) ? v.value : v;
    }

    function setupSettings() {
        if (!Lampa.SettingsApi || !Lampa.SettingsApi.addParam) return;

        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: { name: 'alive_cards_enabled', type: 'trigger', default: true },
            field: {
                name: 'Живі постери',
                description: '3D нахил, відблиск та паралакс карток'
            },
            onChange: function (v) {
                state.enabled = !!normalize(v);
                if (!state.enabled) {
                    for (var i = 0; i < visibleCards.length; i++) resetCard(visibleCards[i]);
                }
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: {
                name: 'alive_cards_intensity',
                type: 'select',
                values: { '6': 'М\'яко', '12': 'Стандарт', '18': 'Динамічно' },
                default: '12'
            },
            field: { name: 'Сила нахилу постерів' },
            onChange: function (v) {
                state.intensity = parseInt(normalize(v), 10) || MAX_TILT;
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: { name: 'alive_cards_glare', type: 'trigger', default: true },
            field: { name: 'Світловий відблиск' },
            onChange: function (v) {
                state.glare = !!normalize(v);
            }
        });

        Lampa.SettingsApi.addParam({
            component: 'interface',
            param: { name: 'alive_cards_parallax', type: 'trigger', default: true },
            field: {
                name: '3D Паралакс шарів',
                description: 'Виштовхує бейджі та назви вперед у просторі'
            },
            onChange: function (v) {
                state.parallax = !!normalize(v);
                var cards = document.querySelectorAll(CARD_SELECTOR);
                for (var i = 0; i < cards.length; i++) {
                    cards[i].classList.toggle('alive-parallax', state.parallax);
                }
            }
        });
    }

    function readSettings() {
        var en  = Lampa.Storage.field('alive_cards_enabled');
        var int = Lampa.Storage.field('alive_cards_intensity');
        var gl  = Lampa.Storage.field('alive_cards_glare');
        var px  = Lampa.Storage.field('alive_cards_parallax');

        state.enabled   = (en === undefined) ? true : !!en;
        state.intensity = parseInt(int, 10) || MAX_TILT;
        state.glare     = (gl === undefined) ? true : !!gl;
        state.parallax  = (px === undefined) ? true : !!px;
    }

    // ---------- Boot ----------
    function start() {
        injectStyles();
        readSettings();
        setupSettings();

        scanCards();
        watchCardAdditions();
        setupControllerFocus();
        setupSensors();

        console.log('[AliveCards] v6.1 loaded (Multi-Poster Gyro Parallax)');
    }

    if (window.appready) {
        start();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();