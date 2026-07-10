(function () {
    'use strict';

    if (window.lampa_new_games_plugin) return;
    window.lampa_new_games_plugin = true;

    var GAMES_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentColor"><path d="M21 6c-1.7 0-3.2.7-4.3 1.7L16 8.3l-.7-.6C14.2 6.7 12.7 6 11 6 7.1 6 4 9.1 4 13c0 5.5 8.7 11.5 11.4 13.2.4.2.8.2 1.2 0C19.3 24.5 28 18.5 28 13c0-3.9-3.1-7-7-7zm-9 9H9v3H7v-3H4v-2h3v-3h2v3h3v2zm6 1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm3-3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm0 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm3-3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/></svg>';

    // ============================================================
    //                     ЗАГАЛЬНА ІНФРАСТРУКТУРА
    // ============================================================

    var GAMES_LIST = [
        { id: 'pong',      title: 'Понг',       desc: 'Класичний теніс проти компютера' },
        { id: 'game2048',  title: '2048',       desc: 'Збирай плитки, щоб отримати 2048' },
        { id: 'asteroids', title: 'Астероїди',  desc: 'Керуй кораблем і знищуй космічні камені' },
        { id: 'sokoban',   title: 'Сокобан',    desc: 'Штовхай ящики на потрібні місця (головоломка)' }
    ];

    var GAME_ICONS = {
        pong:
            '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
                '<rect width="60" height="60" fill="#111"/>' +
                '<line x1="30" y1="0" x2="30" y2="60" stroke="#555" stroke-width="2" stroke-dasharray="4 4"/>' +
                '<rect x="4" y="20" width="4" height="20" fill="#fff"/>' +
                '<rect x="52" y="10" width="4" height="20" fill="#fff"/>' +
                '<circle cx="20" cy="35" r="3" fill="#fff"/>' +
            '</svg>',
        game2048:
            '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
                '<rect width="60" height="60" fill="#bbada0" rx="4"/>' +
                '<rect x="4" y="4" width="24" height="24" fill="#eee4da" rx="2"/>' +
                '<text x="16" y="22" font-size="14" fill="#776e65" font-family="sans-serif" font-weight="bold" text-anchor="middle">2</text>' +
                '<rect x="32" y="4" width="24" height="24" fill="#f2b179" rx="2"/>' +
                '<text x="44" y="22" font-size="14" fill="#f9f6f2" font-family="sans-serif" font-weight="bold" text-anchor="middle">8</text>' +
                '<rect x="4" y="32" width="24" height="24" fill="#ede0c8" rx="2"/>' +
                '<text x="16" y="50" font-size="14" fill="#776e65" font-family="sans-serif" font-weight="bold" text-anchor="middle">4</text>' +
                '<rect x="32" y="32" width="24" height="24" fill="#edc22e" rx="2"/>' +
                '<text x="44" y="50" font-size="10" fill="#f9f6f2" font-family="sans-serif" font-weight="bold" text-anchor="middle">2048</text>' +
            '</svg>',
        asteroids:
            '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
                '<rect width="60" height="60" fill="#000"/>' +
                '<polygon points="30,15 40,40 30,35 20,40" fill="none" stroke="#fff" stroke-width="2"/>' +
                '<circle cx="30" cy="8" r="1.5" fill="#fff"/>' +
                '<polygon points="10,10 16,14 12,20 6,18 4,12" fill="none" stroke="#aaa" stroke-width="1.5"/>' +
                '<polygon points="45,45 52,43 55,50 48,55 42,50" fill="none" stroke="#aaa" stroke-width="1.5"/>' +
                '<polygon points="30,40 28,45 32,45" fill="#f44336"/>' +
            '</svg>',
        sokoban:
            '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">' +
                '<rect width="60" height="60" fill="#1a1a2e"/>' +
                '<rect x="10" y="10" width="12" height="12" fill="#795548"/>' +
                '<rect x="22" y="10" width="12" height="12" fill="#795548"/>' +
                '<rect x="34" y="10" width="12" height="12" fill="#795548"/>' +
                '<rect x="10" y="22" width="12" height="12" fill="#795548"/>' +
                '<rect x="10" y="34" width="12" height="12" fill="#795548"/>' +
                '<circle cx="28" cy="28" r="4" fill="#f44336"/>' + // Target
                '<rect x="36" y="24" width="10" height="10" fill="#ffc107" rx="1"/>' + // Box
                '<line x1="36" y1="24" x2="46" y2="34" stroke="#ff9800" stroke-width="1"/>' +
                '<line x1="46" y1="24" x2="36" y2="34" stroke="#ff9800" stroke-width="1"/>' +
                '<circle cx="28" cy="40" r="5" fill="#42a5f5"/>' + // Player
            '</svg>'
    };

    function getRecord(id) {
        return Lampa.Storage.get('games_record_new_' + id, 0);
    }
    function setRecord(id, value) {
        if (value > getRecord(id)) Lampa.Storage.set('games_record_new_' + id, value);
    }

    function GamesMenuComponent(object) {
        var html;
        var items;
        var self = this;

        this.create = function () {
            html = $('<div class="games-menu"><div class="games-menu__title">Виберіть гру (Нові)</div><div class="games-menu__list"></div></div>');
            var list = html.find('.games-menu__list');

            GAMES_LIST.forEach(function (g) {
                var recText = '<div class="games-menu__rec">Рекорд: ' + getRecord(g.id) + '</div>';
                if (g.id === 'sokoban') recText = '<div class="games-menu__rec">Пройдено рівнів: ' + getRecord(g.id) + '</div>';
                
                var icon = GAME_ICONS[g.id] || '';
                var item = $(
                    '<div class="games-menu__item selector" data-id="' + g.id + '">' +
                        '<div class="games-menu__icon">' + icon + '</div>' +
                        '<div class="games-menu__body">' +
                            '<div class="games-menu__name">' + g.title + '</div>' +
                            '<div class="games-menu__desc">' + g.desc + '</div>' +
                            recText +
                        '</div>' +
                    '</div>'
                );
                item.on('hover:enter', function () {
                    Lampa.Activity.push({
                        url: '',
                        title: GAMES_LIST.filter(function(x){return x.id===g.id;})[0].title,
                        component: 'games_play_new',
                        game_id: g.id,
                        page: 1
                    });
                });
                list.append(item);
            });

            items = html.find('.games-menu__item').toArray();
            return this.render();
        };

        this.start = function () {
            function scrollToFocus() {
                setTimeout(function(){
                    var focused = html.find('.games-menu__item.focus')[0];
                    if (focused && focused.scrollIntoView) {
                        focused.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                }, 30);
            }
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(self.render());
                    Lampa.Controller.collectionFocus(false, self.render());
                },
                left: function () {
                    if (Navigator.canmove('left')) Navigator.move('left');
                    else Lampa.Controller.toggle('menu');
                    scrollToFocus();
                },
                right: function () { Navigator.move('right'); scrollToFocus(); },
                up:    function () { Navigator.move('up');    scrollToFocus(); },
                down:  function () { Navigator.move('down');  scrollToFocus(); },
                back:  function () { Lampa.Activity.backward(); }
            });
            Lampa.Controller.toggle('content');
        };

        this.pause = function () {};
        this.stop = function () {};
        this.render = function () { return html; };
        this.destroy = function () { if (html) html.remove(); html = null; };
    }

    function GamesPlayComponent(object) {
        var game = null;
        var html;
        var self = this;

        this.create = function () {
            html = $('<div class="games-play"></div>');
            var GameClass = GAMES[object.game_id];
            if (!GameClass) {
                html.text('Гра не знайдена');
                return html;
            }
            game = new GameClass(html, self);
            game.create();
            return this.render();
        };

        this.start = function () { if (game) game.start(); };
        this.pause = function () { if (game && game.pause) game.pause(); };
        this.stop  = function () { if (game && game.stop) game.stop(); };
        this.render = function () { return html; };
        this.destroy = function () {
            if (game && game.destroy) game.destroy();
            game = null;
            if (html) html.remove();
            html = null;
        };
    }

    // ============================================================
    //                            ХЕЛПЕРИ
    // ============================================================
    var GAMES = {};

    function setupController(handlers) {
        Lampa.Controller.add('content', $.extend({
            toggle: function () {},
            update: function () {},
            left:  function () {},
            right: function () {},
            up:    function () {},
            down:  function () {},
            enter: function () {},
            back:  function () { Lampa.Activity.backward(); }
        }, handlers || {}));
        Lampa.Controller.toggle('content');
    }

    function attachTouch(rootEl, callbacks) {
        callbacks = callbacks || {};
        var startX = 0, startY = 0, startTime = 0, dragging = false;
        var THRESHOLD = 25;
        var TAP_TIME = 300;
        var lastTouchEnd = 0;

        function onStart(e, isTouch) {
            if (!isTouch && Date.now() - lastTouchEnd < 500) return;
            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            var rect = rootEl[0].getBoundingClientRect();
            startX = t.clientX; startY = t.clientY;
            startTime = Date.now(); dragging = true;
            if (callbacks.onTouchStart) callbacks.onTouchStart(t.clientX - rect.left, t.clientY - rect.top);
        }
        function onMove(e) {
            if (!dragging) return;
            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            var rect = rootEl[0].getBoundingClientRect();
            if (callbacks.onDrag) callbacks.onDrag(t.clientX - rect.left, t.clientY - rect.top);
        }
        function onEnd(e, isTouch) {
            if (!dragging) return;
            dragging = false;
            if (isTouch) {
                lastTouchEnd = Date.now();
                if (e.originalEvent && e.originalEvent.cancelable) {
                    try { e.originalEvent.preventDefault(); } catch (_) {}
                }
            }
            var t = (e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) || e.originalEvent;
            var rect = rootEl[0].getBoundingClientRect();
            var dx = t.clientX - startX; var dy = t.clientY - startY;
            var adx = Math.abs(dx), ady = Math.abs(dy);
            var elapsed = Date.now() - startTime;

            if (adx < THRESHOLD && ady < THRESHOLD) {
                if (elapsed < TAP_TIME && callbacks.onTap) callbacks.onTap(t.clientX - rect.left, t.clientY - rect.top);
            } else if (callbacks.onSwipe) {
                var dir;
                if (adx > ady) dir = dx > 0 ? 'right' : 'left';
                else           dir = dy > 0 ? 'down' : 'up';
                callbacks.onSwipe(dir);
            }
            if (callbacks.onTouchEnd) callbacks.onTouchEnd();
        }

        rootEl.on('touchstart.gametouch', function(e){ onStart(e, true); });
        rootEl.on('mousedown.gametouch',  function(e){ onStart(e, false); });
        rootEl.on('touchmove.gametouch mousemove.gametouch', onMove);
        rootEl.on('touchend.gametouch',   function(e){ onEnd(e, true); });
        rootEl.on('mouseup.gametouch mouseleave.gametouch', function(e){ onEnd(e, false); });

        return function detach() { rootEl.off('.gametouch'); };
    }

    // ============================================================
    //                            ІГРИ
    // ============================================================

    // ------------------------------------------------------------
    // 1. ПОНГ (Pong)
    // ------------------------------------------------------------
    GAMES.pong = function (root) {
        var canvas, ctx, overlay;
        var W, H;
        var player, bot, ball;
        var score, timer;
        var paused = false, gameOver = false, destroyed = false;

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info">' +
                    '<span>Відбито: <b class="g-score">0</b></span>' +
                    '<span>Рекорд: <b class="g-record">' + getRecord('pong') + '</b></span>' +
                    '<span class="g-hint">Вгору/Вниз — рух (утримуй або тапай)</span>' +
                  '</div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0];
            ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.resize = function () {
            var wrap = root.find('.game-canvas-wrap')[0];
            var rect = wrap.getBoundingClientRect();
            W = Math.floor(rect.width);
            H = Math.floor(rect.height);
            canvas.width = W; canvas.height = H;
        };

        this.reset = function () {
            this.resize();
            var ph = Math.max(80, H / 6);
            var pw = 15;
            player = { x: 20, y: H/2 - ph/2, w: pw, h: ph, dy: 0, speed: H/30 };
            bot    = { x: W - 20 - pw, y: H/2 - ph/2, w: pw, h: ph, speed: H/35 };
            ball   = { x: W/2, y: H/2, r: 8, vx: -W/100, vy: (Math.random()-0.5)*10 };
            score = 0; paused = false; gameOver = false;
            root.find('.g-score').text(0);
            this.draw();
            this.startLoop();
            overlay.removeClass('show').text('');
        };

        this.tick = function () {
            if (paused || gameOver || destroyed) return;

            // Player
            player.y += player.dy;
            player.dy *= 0.8; // тертя
            if (player.y < 0) player.y = 0;
            if (player.y + player.h > H) player.y = H - player.h;

            // Bot AI
            if (ball.y < bot.y + bot.h/2 - 10) bot.y -= bot.speed;
            if (ball.y > bot.y + bot.h/2 + 10) bot.y += bot.speed;
            if (bot.y < 0) bot.y = 0;
            if (bot.y + bot.h > H) bot.y = H - bot.h;

            // Ball
            ball.x += ball.vx;
            ball.y += ball.vy;

            // Wall bounce
            if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -1; }
            if (ball.y + ball.r > H) { ball.y = H - ball.r; ball.vy *= -1; }

            // Paddle bounce
            if (ball.vx < 0 && ball.x - ball.r < player.x + player.w && ball.x + ball.r > player.x && ball.y > player.y && ball.y < player.y + player.h) {
                ball.vx *= -1.05; // speed up slightly
                ball.vy += (ball.y - (player.y + player.h/2)) * 0.1;
                score++;
                root.find('.g-score').text(score);
                setRecord('pong', score);
                root.find('.g-record').text(getRecord('pong'));
            }
            if (ball.vx > 0 && ball.x + ball.r > bot.x && ball.x - ball.r < bot.x + bot.w && ball.y > bot.y && ball.y < bot.y + bot.h) {
                ball.vx *= -1.05;
                ball.vy += (ball.y - (bot.y + bot.h/2)) * 0.1;
            }

            // Game over
            if (ball.x < -20) {
                gameOver = true;
                this.stopLoop();
                overlay.html('Ви пропустили мяч!<br>Рахунок: ' + score + '<br><span class="g-sub">OK — заново</span>').addClass('show');
            } else if (ball.x > W + 20) {
                // Бот пропустив - бонусні очки та рестарт мяча
                score += 5;
                root.find('.g-score').text(score);
                setRecord('pong', score);
                root.find('.g-record').text(getRecord('pong'));
                ball.x = W/2; ball.y = H/2; ball.vx = -W/100; ball.vy = (Math.random()-0.5)*10;
            }

            this.draw();
        };

        this.draw = function () {
            ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
            
            // Center line
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 4;
            ctx.setLineDash([10, 15]);
            ctx.beginPath(); ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H); ctx.stroke();
            ctx.setLineDash([]);

            // Paddles & Ball
            ctx.fillStyle = '#42a5f5';
            ctx.fillRect(player.x, player.y, player.w, player.h);
            ctx.fillStyle = '#ef5350';
            ctx.fillRect(bot.x, bot.y, bot.w, bot.h);
            
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
        };

        this.startLoop = function(){ this.stopLoop(); var s=this; timer=setInterval(function(){ s.tick(); }, 1000/60); };
        this.stopLoop  = function(){ if(timer){ clearInterval(timer); timer=null; } };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                up:   function(){ if(!gameOver) player.dy = -player.speed*2; },
                down: function(){ if(!gameOver) player.dy = player.speed*2; },
                enter: function(){ if(gameOver) s.reset(); }
            });

            var didDrag = false;
            this._detachTouch = attachTouch(root, {
                onTouchStart: function(){ didDrag = false; },
                onDrag: function(x, y){
                    if (gameOver) return;
                    didDrag = true;
                    var canvasRect = canvas.getBoundingClientRect();
                    var rootRect = root[0].getBoundingClientRect();
                    var cy = y - (canvasRect.top - rootRect.top);
                    player.y = cy - player.h/2;
                    if (player.y < 0) player.y = 0;
                    if (player.y + player.h > H) player.y = H - player.h;
                },
                onTap: function(){
                    if (gameOver) s.reset();
                }
            });

            this._r = function(){ s.resize(); s.draw(); };
            $(window).on('resize', this._r);
            setTimeout(function(){ if(!destroyed) s.reset(); }, 50);
        };

        this.pause = function(){};
        this.destroy = function(){ destroyed=true; this.stopLoop(); if(this._detachTouch)this._detachTouch(); $(window).off('resize',this._r); };
    };

    // ------------------------------------------------------------
    // 2. 2048 (DOM Grid)
    // ------------------------------------------------------------
    GAMES.game2048 = function (root) {
        var grid = [];
        var score = 0;
        var SIZE = 4;
        var gameOver = false, won = false, destroyed = false;
        var overlay;

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info">' +
                    '<span>Рахунок: <b class="g-score">0</b></span>' +
                    '<span>Рекорд: <b class="g-record">' + getRecord('game2048') + '</b></span>' +
                    '<span class="g-hint">Стрілки/Свайпи — зсув плиток</span>' +
                  '</div>' +
                  '<div class="g2048-board"></div>' +
                  '<div class="game-overlay"></div>' +
                '</div>'
            );
            overlay = root.find('.game-overlay');
        };

        this.reset = function () {
            grid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
            score = 0; gameOver = false; won = false;
            this.addRandom();
            this.addRandom();
            this.updateUI();
            this.draw();
            overlay.removeClass('show').text('');
        };

        this.addRandom = function () {
            var empty = [];
            for (var r=0; r<SIZE; r++) for (var c=0; c<SIZE; c++) {
                if (grid[r][c] === 0) empty.push({r:r, c:c});
            }
            if (empty.length > 0) {
                var spot = empty[Math.floor(Math.random() * empty.length)];
                grid[spot.r][spot.c] = Math.random() < 0.9 ? 2 : 4;
            }
        };

        this.updateUI = function () {
            root.find('.g-score').text(score);
            setRecord('game2048', score);
            root.find('.g-record').text(getRecord('game2048'));
        };

        this.draw = function () {
            var html = '';
            for (var r=0; r<SIZE; r++) {
                for (var c=0; c<SIZE; c++) {
                    var val = grid[r][c];
                    var txt = val > 0 ? val : '';
                    var cls = 'g2048-tile ' + (val > 0 ? 'g2048-v' + val : 'g2048-empty');
                    html += '<div class="' + cls + '">' + txt + '</div>';
                }
            }
            root.find('.g2048-board').html(html);
        };

        // Логіка зсуву (завжди вліво, інші напрямки через поворот матриці)
        this.slideLeft = function (board) {
            var changed = false;
            var addScore = 0;
            for (var r=0; r<SIZE; r++) {
                var row = board[r].filter(function(v){ return v > 0; });
                for (var i=0; i<row.length-1; i++) {
                    if (row[i] === row[i+1]) {
                        row[i] *= 2;
                        addScore += row[i];
                        row.splice(i+1, 1);
                    }
                }
                while (row.length < SIZE) row.push(0);
                for (var c=0; c<SIZE; c++) {
                    if (board[r][c] !== row[c]) changed = true;
                    board[r][c] = row[c];
                }
            }
            return { changed: changed, score: addScore };
        };

        this.rotateRight = function (board) {
            var newBoard = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
            for (var r=0; r<SIZE; r++) for (var c=0; c<SIZE; c++) {
                newBoard[c][SIZE-1-r] = board[r][c];
            }
            return newBoard;
        };

        this.move = function (dir) {
            if (gameOver || won) return;
            var rotations = { 'left':0, 'down':1, 'right':2, 'up':3 }[dir];
            
            // копіюємо
            var temp = JSON.parse(JSON.stringify(grid));
            // обертаємо щоб зсувати завжди вліво
            for (var i=0; i<rotations; i++) temp = this.rotateRight(temp);
            
            var res = this.slideLeft(temp);
            
            // повертаємо назад
            for (var j=0; j<(4-rotations)%4; j++) temp = this.rotateRight(temp);
            
            if (res.changed) {
                grid = temp;
                score += res.score;
                this.addRandom();
                this.updateUI();
                this.draw();
                this.checkState();
            }
        };

        this.checkState = function () {
            var hasZero = false, hasMerge = false, has2048 = false;
            for (var r=0; r<SIZE; r++) for (var c=0; c<SIZE; c++) {
                if (grid[r][c] === 2048) has2048 = true;
                if (grid[r][c] === 0) hasZero = true;
                if (c < SIZE-1 && grid[r][c] === grid[r][c+1]) hasMerge = true;
                if (r < SIZE-1 && grid[r][c] === grid[r+1][c]) hasMerge = true;
            }
            if (has2048 && !won) {
                won = true;
                overlay.html('Ви зібрали 2048!<br><span class="g-sub">OK — грати далі або заново</span>').addClass('show');
            } else if (!hasZero && !hasMerge) {
                gameOver = true;
                overlay.html('Гра закінчена<br>Рахунок: ' + score + '<br><span class="g-sub">OK — заново</span>').addClass('show');
            }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left:  function(){ s.move('left'); },
                right: function(){ s.move('right'); },
                up:    function(){ s.move('up'); },
                down:  function(){ s.move('down'); },
                enter: function(){
                    if (gameOver) s.reset();
                    if (won) { won = false; overlay.removeClass('show'); } // продовжувати грати
                }
            });

            this._detachTouch = attachTouch(root, {
                onSwipe: function(dir) { s.move(dir); },
                onTap: function() {
                    if (gameOver) s.reset();
                    if (won) { won = false; overlay.removeClass('show'); }
                }
            });

            setTimeout(function(){ if(!destroyed) s.reset(); }, 50);
        };

        this.pause = function(){};
        this.destroy = function(){ destroyed=true; if(this._detachTouch)this._detachTouch(); };
    };

    // ------------------------------------------------------------
    // 3. АСТЕРОЇДИ (Asteroids)
    // ------------------------------------------------------------
    GAMES.asteroids = function (root) {
        var canvas, ctx, overlay;
        var W, H;
        var ship, asteroids, bullets, particles;
        var score, level, timer;
        var paused = false, gameOver = false, destroyed = false;
        var keys = { left:false, right:false, up:false, shoot:false };

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info">' +
                    '<span>Рахунок: <b class="g-score">0</b></span>' +
                    '<span>Рівень: <b class="g-level">1</b></span>' +
                    '<span>Рекорд: <b class="g-record">' + getRecord('asteroids') + '</b></span>' +
                    '<span class="g-hint">← → обертання, ↑ газ, OK постріл</span>' +
                  '</div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0];
            ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.resize = function () {
            var wrap = root.find('.game-canvas-wrap')[0];
            var rect = wrap.getBoundingClientRect();
            W = Math.floor(rect.width); H = Math.floor(rect.height);
            canvas.width = W; canvas.height = H;
        };

        this.reset = function () {
            this.resize();
            ship = { x: W/2, y: H/2, a: -Math.PI/2, vx: 0, vy: 0, cooldown: 0, invuln: 100 };
            bullets = [];
            particles = [];
            asteroids = [];
            score = 0; level = 1;
            this.spawnAsteroids(4);
            gameOver = false;
            root.find('.g-score').text(0);
            root.find('.g-level').text(1);
            this.draw();
            this.startLoop();
            overlay.removeClass('show').text('');
        };

        this.spawnAsteroids = function(count) {
            for(var i=0; i<count; i++) {
                var ax, ay;
                do { ax = Math.random()*W; ay = Math.random()*H; } 
                while(Math.hypot(ax-ship.x, ay-ship.y) < 100);
                
                var pts = [];
                var numPts = 6 + Math.floor(Math.random()*4);
                for(var p=0; p<numPts; p++){
                    pts.push( 0.7 + Math.random()*0.3 );
                }
                asteroids.push({
                    x: ax, y: ay,
                    vx: (Math.random()-0.5)*(level+1), vy: (Math.random()-0.5)*(level+1),
                    r: 40, size: 3, pts: pts, a: 0, va: (Math.random()-0.5)*0.1
                });
            }
        };

        this.tick = function () {
            if (paused || gameOver || destroyed) return;

            // Ship
            if(keys.left) ship.a -= 0.1;
            if(keys.right) ship.a += 0.1;
            if(keys.up) {
                ship.vx += Math.cos(ship.a) * 0.2;
                ship.vy += Math.sin(ship.a) * 0.2;
                particles.push({x: ship.x - Math.cos(ship.a)*10, y: ship.y - Math.sin(ship.a)*10, vx: -ship.vx + (Math.random()-0.5)*2, vy: -ship.vy + (Math.random()-0.5)*2, life: 20});
            }
            ship.vx *= 0.99; ship.vy *= 0.99;
            ship.x += ship.vx; ship.y += ship.vy;
            if(ship.x < 0) ship.x += W; if(ship.x > W) ship.x -= W;
            if(ship.y < 0) ship.y += H; if(ship.y > H) ship.y -= H;
            if(ship.cooldown > 0) ship.cooldown--;
            if(ship.invuln > 0) ship.invuln--;

            if(keys.shoot && ship.cooldown === 0) {
                bullets.push({ x: ship.x + Math.cos(ship.a)*15, y: ship.y + Math.sin(ship.a)*15, vx: Math.cos(ship.a)*8, vy: Math.sin(ship.a)*8, life: 60 });
                ship.cooldown = 15;
            }

            // Bullets
            for(var i=bullets.length-1; i>=0; i--) {
                var b = bullets[i];
                b.x += b.vx; b.y += b.vy; b.life--;
                if(b.x < 0) b.x += W; if(b.x > W) b.x -= W;
                if(b.y < 0) b.y += H; if(b.y > H) b.y -= H;
                if(b.life <= 0) bullets.splice(i, 1);
            }

            // Particles
            for(var p=particles.length-1; p>=0; p--) {
                var part = particles[p];
                part.x += part.vx; part.y += part.vy; part.life--;
                if(part.life <= 0) particles.splice(p, 1);
            }

            // Asteroids
            for(var a=asteroids.length-1; a>=0; a--) {
                var ast = asteroids[a];
                ast.x += ast.vx; ast.y += ast.vy; ast.a += ast.va;
                if(ast.x < -ast.r) ast.x += W + ast.r*2; if(ast.x > W + ast.r) ast.x -= W + ast.r*2;
                if(ast.y < -ast.r) ast.y += H + ast.r*2; if(ast.y > H + ast.r) ast.y -= H + ast.r*2;

                // Collisions with bullets
                for(var j=bullets.length-1; j>=0; j--) {
                    var bl = bullets[j];
                    if(Math.hypot(bl.x - ast.x, bl.y - ast.y) < ast.r) {
                        bullets.splice(j, 1);
                        this.destroyAsteroid(a, ast);
                        break;
                    }
                }
                
                // Collision with ship
                if(!gameOver && ship.invuln <= 0 && Math.hypot(ship.x - ast.x, ship.y - ast.y) < ast.r + 10) {
                    gameOver = true;
                    this.stopLoop();
                    overlay.html('Корабель знищено!<br>Рахунок: ' + score + '<br><span class="g-sub">OK — заново</span>').addClass('show');
                }
            }

            if(asteroids.length === 0) {
                level++;
                root.find('.g-level').text(level);
                ship.invuln = 100;
                this.spawnAsteroids(4 + level);
            }

            this.draw();
        };

        this.destroyAsteroid = function(index, ast) {
            asteroids.splice(index, 1);
            score += (4 - ast.size) * 100;
            root.find('.g-score').text(score);
            setRecord('asteroids', score);
            root.find('.g-record').text(getRecord('asteroids'));

            for(var i=0; i<10; i++) particles.push({x: ast.x, y: ast.y, vx: (Math.random()-0.5)*5, vy: (Math.random()-0.5)*5, life: 30});

            if(ast.size > 1) {
                for(var j=0; j<2; j++) {
                    var pts = [];
                    for(var p=0; p<ast.pts.length; p++) pts.push(0.7 + Math.random()*0.3);
                    asteroids.push({
                        x: ast.x, y: ast.y,
                        vx: ast.vx + (Math.random()-0.5)*3, vy: ast.vy + (Math.random()-0.5)*3,
                        r: ast.r * 0.6, size: ast.size - 1, pts: pts, a: Math.random()*Math.PI, va: (Math.random()-0.5)*0.2
                    });
                }
            }
        };

        this.draw = function () {
            ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

            // Particles
            ctx.fillStyle = '#ff9800';
            for(var p=0; p<particles.length; p++) {
                ctx.fillRect(particles[p].x, particles[p].y, 2, 2);
            }

            // Bullets
            ctx.fillStyle = '#fff';
            for(var b=0; b<bullets.length; b++) {
                ctx.beginPath(); ctx.arc(bullets[b].x, bullets[b].y, 2, 0, Math.PI*2); ctx.fill();
            }

            // Asteroids
            ctx.strokeStyle = '#aaa'; ctx.lineWidth = 2;
            for(var a=0; a<asteroids.length; a++) {
                var ast = asteroids[a];
                ctx.save(); ctx.translate(ast.x, ast.y); ctx.rotate(ast.a);
                ctx.beginPath();
                for(var i=0; i<ast.pts.length; i++) {
                    var ang = (i / ast.pts.length) * Math.PI * 2;
                    var rad = ast.r * ast.pts[i];
                    if(i===0) ctx.moveTo(Math.cos(ang)*rad, Math.sin(ang)*rad);
                    else ctx.lineTo(Math.cos(ang)*rad, Math.sin(ang)*rad);
                }
                ctx.closePath(); ctx.stroke(); ctx.restore();
            }

            // Ship
            if(ship.invuln <= 0 || Math.floor(Date.now()/100)%2 === 0) {
                ctx.save(); ctx.translate(ship.x, ship.y); ctx.rotate(ship.a);
                ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(15, 0); ctx.lineTo(-10, 10); ctx.lineTo(-5, 0); ctx.lineTo(-10, -10); ctx.closePath(); ctx.stroke();
                if(keys.up) {
                    ctx.strokeStyle = '#f44336';
                    ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(-15, 4); ctx.lineTo(-18, 0); ctx.lineTo(-15, -4); ctx.closePath(); ctx.stroke();
                }
                ctx.restore();
            }
        };

        this.startLoop = function(){ this.stopLoop(); var s=this; timer=setInterval(function(){ s.tick(); }, 1000/60); };
        this.stopLoop  = function(){ if(timer){ clearInterval(timer); timer=null; } };

        this.start = function () {
            var s = this;
            // У Lampa немає keyup, тому симулюємо імпульси для обертання та тяги
            function setKey(k) {
                keys[k] = true;
                setTimeout(function(){ keys[k] = false; }, 150); // скидаємо стан через 150мс
            }

            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left:  function(){ if(!gameOver) setKey('left'); },
                right: function(){ if(!gameOver) setKey('right'); },
                up:    function(){ if(!gameOver) setKey('up'); },
                enter: function(){
                    if (gameOver) s.reset();
                    else { keys.shoot = true; setTimeout(function(){keys.shoot=false;}, 50); }
                }
            });

            this._detachTouch = attachTouch(root, {
                onTouchStart: function(x, y) {
                    if (gameOver) return;
                    var rect = root[0].getBoundingClientRect();
                    if (y < rect.height / 2) keys.up = true;
                    else if (x < rect.width / 2) keys.left = true;
                    else keys.right = true;
                },
                onTouchEnd: function() { keys.up=false; keys.left=false; keys.right=false; },
                onTap: function(x, y) {
                    if (gameOver) { s.reset(); return; }
                    keys.shoot = true; setTimeout(function(){keys.shoot=false;}, 50);
                }
            });

            this._r = function(){ s.resize(); s.draw(); };
            $(window).on('resize', this._r);
            setTimeout(function(){ if(!destroyed) s.reset(); }, 50);
        };

        this.pause = function(){};
        this.destroy = function(){ destroyed=true; this.stopLoop(); if(this._detachTouch)this._detachTouch(); $(window).off('resize',this._r); };
    };

    // ------------------------------------------------------------
    // 4. СОКОБАН (Sokoban)
    // ------------------------------------------------------------
    GAMES.sokoban = function (root) {
        var canvas, ctx, overlay;
        var TILE = 40;
        var mapData, grid, W, H;
        var player = {x:0, y:0};
        var currentLevel = 0;
        var levelsWonEver = getRecord('sokoban');
        var gameOver = false, destroyed = false;
        
        // # = стіна, . = ціль, $ = ящик, @ = гравець, * = ящик на цілі, + = гравець на цілі, ' ' = пусто
        var LEVELS = [
            [
                "  ###  ",
                "  #.#  ",
                "  #.#  ",
                "###$###",
                "#.@.$.#",
                "###$###",
                "  #.#  ",
                "  #.#  ",
                "  ###  "
            ],
            [
                "#####",
                "#   #",
                "#$$.#",
                "# @.#",
                "#####"
            ],
            [
                "######",
                "#    #",
                "# #. #",
                "# $  #",
                "# @. #",
                "######"
            ]
        ];

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info">' +
                    '<span>Рівень: <b class="g-level">1</b>/' + LEVELS.length + '</span>' +
                    '<span>Пройдено рівнів (Рекорд): <b class="g-record">' + levelsWonEver + '</b></span>' +
                    '<span class="g-hint">Стрілки/Свайпи — рух, OK — перезапустити рівень</span>' +
                  '</div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0];
            ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.loadLevel = function(idx) {
            if(idx >= LEVELS.length) {
                gameOver = true;
                overlay.html('Ви пройшли всі рівні!<br><span class="g-sub">OK — почати спочатку</span>').addClass('show');
                return;
            }
            mapData = LEVELS[idx];
            grid = [];
            var cols = 0;
            for(var y=0; y<mapData.length; y++) {
                var row = [];
                cols = Math.max(cols, mapData[y].length);
                for(var x=0; x<mapData[y].length; x++) {
                    var c = mapData[y].charAt(x);
                    if(c === '@' || c === '+') {
                        player.x = x; player.y = y;
                        row.push(c === '+' ? '.' : ' ');
                    } else if(c === '$' || c === '*') {
                        row.push(c);
                    } else {
                        row.push(c);
                    }
                }
                grid.push(row);
            }
            // Нормалізація довжини рядків
            for(var r=0; r<grid.length; r++) {
                while(grid[r].length < cols) grid[r].push(' ');
            }
            
            var wrap = root.find('.game-canvas-wrap')[0];
            var rect = wrap.getBoundingClientRect();
            TILE = Math.min(Math.floor(rect.width / cols), Math.floor(rect.height / grid.length));
            if(TILE < 20) TILE = 20;
            W = TILE * cols; H = TILE * grid.length;
            canvas.width = W; canvas.height = H;
            
            gameOver = false;
            root.find('.g-level').text((idx + 1));
            this.draw();
            overlay.removeClass('show');
        };

        this.reset = function () {
            currentLevel = 0;
            this.loadLevel(currentLevel);
        };

        this.move = function(dx, dy) {
            if(gameOver) return;
            var nx = player.x + dx, ny = player.y + dy;
            if(ny < 0 || ny >= grid.length || nx < 0 || nx >= grid[0].length) return;
            
            var target = grid[ny][nx];
            if(target === '#') return; // Стіна
            
            if(target === '$' || target === '*') {
                // Штовхаємо ящик
                var nnx = nx + dx, nny = ny + dy;
                if(nny < 0 || nny >= grid.length || nnx < 0 || nnx >= grid[0].length) return;
                var ntarget = grid[nny][nnx];
                if(ntarget === '#' || ntarget === '$' || ntarget === '*') return; // Не можна штовхати
                
                // Переміщаємо ящик
                grid[ny][nx] = (target === '*') ? '.' : ' ';
                grid[nny][nnx] = (ntarget === '.') ? '*' : '$';
            }
            
            player.x = nx; player.y = ny;
            this.draw();
            this.checkWin();
        };

        this.checkWin = function() {
            var won = true;
            for(var y=0; y<grid.length; y++) {
                for(var x=0; x<grid[y].length; x++) {
                    if(grid[y][x] === '$') won = false; // Є ящик не на цілі
                }
            }
            if(won) {
                if(currentLevel >= levelsWonEver) {
                    levelsWonEver = currentLevel + 1;
                    setRecord('sokoban', levelsWonEver);
                    root.find('.g-record').text(levelsWonEver);
                }
                currentLevel++;
                setTimeout(function(){ this.loadLevel(currentLevel); }.bind(this), 500);
            }
        };

        this.draw = function () {
            ctx.fillStyle = '#1a1a2e'; ctx.fillRect(0, 0, W, H);
            
            for(var y=0; y<grid.length; y++) {
                for(var x=0; x<grid[y].length; x++) {
                    var px = x * TILE, py = y * TILE;
                    var c = grid[y][x];
                    
                    if(c === '#') {
                        ctx.fillStyle = '#795548'; ctx.fillRect(px, py, TILE, TILE);
                        ctx.strokeStyle = '#5d4037'; ctx.strokeRect(px, py, TILE, TILE);
                    } else if(c === '.') {
                        ctx.fillStyle = '#f44336';
                        ctx.beginPath(); ctx.arc(px+TILE/2, py+TILE/2, TILE/6, 0, Math.PI*2); ctx.fill();
                    } else if(c === '$' || c === '*') {
                        if(c === '*') { // Ящик на цілі
                            ctx.fillStyle = '#4caf50'; ctx.fillRect(px+2, py+2, TILE-4, TILE-4);
                        } else {
                            ctx.fillStyle = '#ffc107'; ctx.fillRect(px+2, py+2, TILE-4, TILE-4);
                        }
                        ctx.strokeStyle = '#ff9800';
                        ctx.beginPath(); ctx.moveTo(px+2, py+2); ctx.lineTo(px+TILE-2, py+TILE-2); ctx.stroke();
                        ctx.beginPath(); ctx.moveTo(px+TILE-2, py+2); ctx.lineTo(px+2, py+TILE-2); ctx.stroke();
                    }
                }
            }
            
            // Гравець
            var px = player.x * TILE, py = player.y * TILE;
            ctx.fillStyle = '#42a5f5';
            ctx.beginPath(); ctx.arc(px+TILE/2, py+TILE/2, TILE/3, 0, Math.PI*2); ctx.fill();
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left:  function(){ s.move(-1, 0); },
                right: function(){ s.move(1, 0); },
                up:    function(){ s.move(0, -1); },
                down:  function(){ s.move(0, 1); },
                enter: function(){
                    if (gameOver) s.reset();
                    else s.loadLevel(currentLevel); // Рестарт рівня
                }
            });

            this._detachTouch = attachTouch(root, {
                onSwipe: function(dir) {
                    if (dir === 'left') s.move(-1, 0);
                    if (dir === 'right') s.move(1, 0);
                    if (dir === 'up') s.move(0, -1);
                    if (dir === 'down') s.move(0, 1);
                },
                onTap: function() {
                    if (gameOver) s.reset();
                }
            });

            this._r = function(){ if(grid) s.loadLevel(currentLevel); };
            $(window).on('resize', this._r);
            setTimeout(function(){ if(!destroyed) s.reset(); }, 50);
        };

        this.pause = function(){};
        this.destroy = function(){ destroyed=true; if(this._detachTouch)this._detachTouch(); $(window).off('resize',this._r); };
    };

    // ============================================================
    //                          СТИЛІ
    // ============================================================
    function injectCSS() {
        var css =
        '<style>' +
        '.games-menu{padding:2em;color:#fff;height:100%;max-height:100vh;overflow-y:auto;-webkit-overflow-scrolling:touch;box-sizing:border-box;}' +
        '.games-menu__title{font-size:1.6em;margin-bottom:1em;opacity:.8;}' +
        '.games-menu__list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1em;}' +
        '.games-menu__item{display:flex;align-items:center;gap:1em;padding:1em;background:rgba(255,255,255,0.05);border-radius:.6em;cursor:pointer;border:2px solid transparent;transition:all .2s;}' +
        '.games-menu__item.focus{border-color:#ffeb3b;background:rgba(255,235,59,0.12);transform:scale(1.03);}' +
        '.games-menu__icon{flex-shrink:0;width:64px;height:64px;border-radius:.5em;background:#1a1a2e;display:flex;align-items:center;justify-content:center;overflow:hidden;}' +
        '.games-menu__icon svg{width:60px;height:60px;}' +
        '.games-menu__body{flex:1;min-width:0;}' +
        '.games-menu__name{font-size:1.2em;font-weight:600;margin-bottom:.2em;}' +
        '.games-menu__desc{opacity:.6;font-size:.85em;}' +
        '.games-menu__rec{margin-top:.4em;font-size:.8em;color:#ffeb3b;}' +
        '.games-play{padding:0.2em;height:100%;box-sizing:border-box;}' +
        '.game-wrap{display:flex;flex-direction:column;align-items:center;color:#fff;height:100%;}' +
        '.game-info{display:flex;gap:0.6em;margin-bottom:0.3em;font-size:0.85em;flex-wrap:wrap;justify-content:center;line-height:1;}' +
        '.game-info span{padding:0.25em 0.5em;background:rgba(255,255,255,0.05);border-radius:.3em;}' +
        '.g-hint{opacity:.5;font-size:.9em;}' +
        '@media (max-height: 700px){.g-hint{display:none;}}' +
        '.game-canvas-wrap{position:relative;width:96vmin;height:calc(100vh - 60px);max-width:99vw;max-height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;touch-action:none;user-select:none;-webkit-user-select:none;}' +
        '.game-canvas-wrap canvas{display:block;background:#111;border-radius:.5em;box-shadow:0 0 20px rgba(0,0,0,.5);touch-action:none;}' +
        '.game-overlay{position:absolute;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;background:rgba(0,0,0,.7);font-size:2em;text-align:center;border-radius:.5em;z-index:10;}' +
        '.game-overlay.show{display:flex;}' +
        '.g-sub{font-size:.5em;opacity:.7;display:block;margin-top:.5em;}' +
        
        /* 2048 specific styles */
        '.g2048-board{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;background:#bbada0;padding:8px;border-radius:6px;width:min(80vmin,500px);aspect-ratio:1;margin:1em 0;}' +
        '.g2048-tile{background:#cdc1b4;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:min(8vmin, 2.5em);font-weight:bold;color:#776e65; font-family:sans-serif; transition: background-color 0.15s ease;}' +
        '.g2048-v2{background:#eee4da;}' +
        '.g2048-v4{background:#ede0c8;}' +
        '.g2048-v8{background:#f2b179; color:#f9f6f2;}' +
        '.g2048-v16{background:#f59563; color:#f9f6f2;}' +
        '.g2048-v32{background:#f67c5f; color:#f9f6f2;}' +
        '.g2048-v64{background:#f65e3b; color:#f9f6f2;}' +
        '.g2048-v128{background:#edcf72; color:#f9f6f2; font-size:min(6vmin, 2em);}' +
        '.g2048-v256{background:#edcc61; color:#f9f6f2; font-size:min(6vmin, 2em);}' +
        '.g2048-v512{background:#edc850; color:#f9f6f2; font-size:min(6vmin, 2em);}' +
        '.g2048-v1024{background:#edc53f; color:#f9f6f2; font-size:min(5vmin, 1.5em);}' +
        '.g2048-v2048{background:#edc22e; color:#f9f6f2; font-size:min(5vmin, 1.5em); box-shadow: 0 0 10px rgba(243, 215, 116, 0.5);}' +
        '</style>';
        $('body').append(css);
    }

    // ============================================================
    //                       ІНІЦІАЛІЗАЦІЯ
    // ============================================================
    function startPlugin() {
        injectCSS();

        // Заміна оригінального games_menu на новий
        Lampa.Component.add('games_menu_new', GamesMenuComponent);
        Lampa.Component.add('games_play_new', GamesPlayComponent);

        function addMenuItem() {
            var item = $(
                '<li class="menu__item selector games-menu-item">' +
                    '<div class="menu__ico">' + GAMES_ICON + '</div>' +
                    '<div class="menu__text">Нові Ігри</div>' +
                '</li>'
            );
            item.on('hover:enter', function () {
                Lampa.Activity.push({
                    url: '',
                    title: 'Нові Ігри',
                    component: 'games_menu_new',
                    page: 1
                });
            });
            $('.menu .menu__list').eq(0).append(item);
        }

        if (window.appready) addMenuItem();
        else Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') addMenuItem();
        });
    }

    if (window.Lampa && window.Lampa.Component) startPlugin();
    else {
        var iv = setInterval(function () {
            if (window.Lampa && window.Lampa.Component) {
                clearInterval(iv);
                startPlugin();
            }
        }, 200);
    }

})();