(function () {
    'use strict';
    if (window.lampa_games_plugin) return;
    window.lampa_games_plugin = true;

    var GAMES_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="currentColor"><path d="M21 6c-1.7 0-3.2.7-4.3 1.7L16 8.3l-.7-.6C14.2 6.7 12.7 6 11 6 7.1 6 4 9.1 4 13c0 5.5 8.7 11.5 11.4 13.2.4.2.8.2 1.2 0C19.3 24.5 28 18.5 28 13c0-3.9-3.1-7-7-7zm-9 9H9v3H7v-3H4v-2h3v-3h2v3h3v2zm6 1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm3-3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm0 6c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm3-3c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/></svg>';

    var GAMES_LIST = [
        { id: 'snake',    title: 'Змійка',           desc: 'Класична змійка' },
        { id: 'tetris',   title: 'Тетрис',           desc: 'Збирайте лінії з падаючих фігурок' },
        { id: 'pacman',   title: 'Pac-Man',          desc: 'Збирай очки, тікай від привидів' },
        { id: 'tron',     title: 'Трон',             desc: 'Двоє на одному полі, не врізайтеся в стежку' },
        { id: 'seabattle',title: 'Морський бій',      desc: 'Битва проти компютера ' },
        { id: 'tictac',   title: 'Хрестики-нолики',  desc: 'Класика 3х3' },
        { id: 'flappy',   title: 'Flappy Bird',      desc: 'Літай і не влучай у труби' },
        { id: 'doodle',   title: 'Doodle Jump',      desc: 'Стрибайте на платформи' },
        { id: 'arkanoid', title: 'Арканоїд',         desc: 'Розбий всі блоки мячем' },
        { id: 'tanks',    title: 'Танчики',          desc: 'Захищати штаб, знищувати ворогів' },
        { id: 'memory',   title: 'Memory',           desc: 'Знайдіть усі пари карт' },
        { id: 'invaders', title: 'Space Invaders',   desc: 'Збити прибульців із космосу' },
        { id: 'crossy',   title: 'Crossy Road',      desc: 'Біжи вперед, не потрапляй під машини' },
        { id: 'minesweeper', title: 'MineSweeper',   desc: 'Знайди всі міни, не будучи підірваними' },
        { id: 'checkers', title: 'Шашки',            desc: 'Класика проти компютера' },
        { id: 'match3',   title: 'Три в ряд',         desc: 'Міняйте камені, збирайте лінії' },
        { id: 'platformer', title: 'Ленаріо',         desc: 'Біжи, стрибай, перемагай ворогів' },
        { id: 'asteroids',title: 'Asteroids',        desc: 'Знищуй астероїди' },
        { id: 'sudoku',   title: 'Судоку',           desc: 'Класична головоломка' },
        { id: 'maze',     title: 'Лабіринт',         desc: 'Знайди вихід з лабіринту' },
        { id: 'simon',    title: 'Simon Says',       desc: 'Повторюй кольорову послідовність' },
        { id: 'solitaire',title: 'Косинка',          desc: 'Класичний пасьянс' },
        { id: 'bowling',  title: 'Боулінг',          desc: 'Збий всі кеглі' },
        { id: 'minigolf', title: 'Міні-гольф',       desc: 'Закоти м\'яч у лунку' },
        { id: 'darts',    title: 'Дартс',            desc: 'Потрап у мішень' }
    ];

    var GAME_ICONS = {
        snake: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#1a1a2e"/><rect x="10" y="10" width="8" height="8" fill="#66bb6a"/><rect x="18" y="10" width="8" height="8" fill="#43a047"/><rect x="26" y="10" width="8" height="8" fill="#43a047"/><rect x="26" y="18" width="8" height="8" fill="#43a047"/><rect x="26" y="26" width="8" height="8" fill="#43a047"/><rect x="34" y="26" width="8" height="8" fill="#43a047"/><rect x="42" y="26" width="8" height="8" fill="#43a047"/><circle cx="46" cy="46" r="5" fill="#e53935"/><rect x="11" y="12" width="2" height="2" fill="#000"/><rect x="15" y="12" width="2" height="2" fill="#000"/></svg>',
        tetris: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#1a1a2e"/><rect x="6"  y="22" width="10" height="10" fill="#00bcd4"/><rect x="16" y="22" width="10" height="10" fill="#00bcd4"/><rect x="26" y="22" width="10" height="10" fill="#00bcd4"/><rect x="36" y="22" width="10" height="10" fill="#00bcd4"/><rect x="6"  y="42" width="10" height="10" fill="#ffeb3b"/><rect x="16" y="42" width="10" height="10" fill="#ffeb3b"/><rect x="6"  y="32" width="10" height="10" fill="#ffeb3b"/><rect x="16" y="32" width="10" height="10" fill="#ffeb3b"/><rect x="36" y="42" width="10" height="10" fill="#9c27b0"/><rect x="46" y="42" width="10" height="10" fill="#9c27b0"/><rect x="36" y="32" width="10" height="10" fill="#f44336"/><rect x="46" y="22" width="10" height="10" fill="#4caf50"/></svg>',
        pacman: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#000"/><path d="M 30 30 L 50 18 A 16 16 0 1 0 50 42 Z" fill="#ffeb3b"/><circle cx="36" cy="22" r="2" fill="#000"/><circle cx="12" cy="30" r="2" fill="#fff"/><circle cx="6"  cy="30" r="1.5" fill="#fff"/><path d="M 50 42 q 0 -10 5 -10 q 5 0 5 10 l -2 -2 l -2 2 l -2 -2 l -2 2 l -2 -2 z" fill="#f44336"/><circle cx="53" cy="36" r="1.5" fill="#fff"/><circle cx="58" cy="36" r="1.5" fill="#fff"/></svg>',
        tron: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#000"/><rect x="6"  y="20" width="20" height="3" fill="#00e5ff"/><rect x="23" y="20" width="3"  height="15" fill="#00e5ff"/><rect x="23" y="32" width="12" height="3" fill="#00e5ff"/><rect x="32" y="32" width="3"  height="10" fill="#00e5ff"/><rect x="32" y="40" width="2" height="2" fill="#fff"/><rect x="50" y="10" width="3"  height="20" fill="#ff5252"/><rect x="38" y="27" width="15" height="3" fill="#ff5252"/><rect x="38" y="27" width="3"  height="15" fill="#ff5252"/><rect x="38" y="40" width="2" height="2" fill="#fff"/></svg>',
        seabattle: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#0d47a1"/><g stroke="rgba(255,255,255,0.15)" stroke-width="0.5"><line x1="0" y1="10" x2="60" y2="10"/><line x1="0" y1="20" x2="60" y2="20"/><line x1="0" y1="30" x2="60" y2="30"/><line x1="0" y1="40" x2="60" y2="40"/><line x1="0" y1="50" x2="60" y2="50"/><line x1="10" y1="0" x2="10" y2="60"/><line x1="20" y1="0" x2="20" y2="60"/><line x1="30" y1="0" x2="30" y2="60"/><line x1="40" y1="0" x2="40" y2="60"/><line x1="50" y1="0" x2="50" y2="60"/></g><rect x="10" y="11" width="30" height="8" fill="#9e9e9e"/><rect x="40" y="31" width="10" height="8" fill="#9e9e9e"/><rect x="14" y="13" width="6" height="4" fill="#e53935"/><text x="15.5" y="17" font-size="6" fill="#fff" font-weight="bold">X</text><text x="35.5" y="47" font-size="8" fill="#fff" font-weight="bold">·</text><text x="22.5" y="34" font-size="8" fill="#fff" font-weight="bold">·</text></svg>',
        tictac: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#1a1a2e"/><g stroke="#fff" stroke-width="2"><line x1="20" y1="6"  x2="20" y2="54"/><line x1="40" y1="6"  x2="40" y2="54"/><line x1="6"  y1="20" x2="54" y2="20"/><line x1="6"  y1="40" x2="54" y2="40"/></g><g stroke="#42a5f5" stroke-width="3" stroke-linecap="round"><line x1="9"  y1="9"  x2="17" y2="17"/><line x1="17" y1="9"  x2="9"  y2="17"/><line x1="49" y1="29" x2="57" y2="37"/><line x1="57" y1="29" x2="49" y2="37"/></g><g stroke="#ef5350" stroke-width="3" fill="none"><circle cx="30" cy="30" r="6"/><circle cx="13" cy="50" r="6"/></g></svg>',
        flappy: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#4fc3f7"/><rect x="0"  y="50" width="60" height="10" fill="#8d6e63"/><rect x="42" y="0"  width="12" height="20" fill="#43a047"/><rect x="40" y="18" width="16" height="4"  fill="#2e7d32"/><rect x="42" y="38" width="12" height="22" fill="#43a047"/><rect x="40" y="35" width="16" height="4"  fill="#2e7d32"/><circle cx="22" cy="30" r="9" fill="#ffeb3b"/><circle cx="22" cy="30" r="9" fill="none" stroke="#000" stroke-width="0.5"/><circle cx="26" cy="27" r="2" fill="#fff"/><circle cx="27" cy="27" r="1" fill="#000"/><polygon points="29,30 35,28 35,32" fill="#ff5722"/><path d="M 16 32 q 2 4 6 2" fill="#fbc02d"/></svg>',
        doodle: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#e1f5fe"/><rect x="4"  y="50" width="20" height="4" fill="#4caf50"/><rect x="32" y="40" width="20" height="4" fill="#4caf50"/><rect x="8"  y="28" width="20" height="4" fill="#4caf50"/><rect x="34" y="14" width="20" height="4" fill="#4caf50"/><rect x="20" y="20" width="14" height="14" fill="#ff6f00"/><rect x="23" y="24" width="3" height="3" fill="#fff"/><rect x="29" y="24" width="3" height="3" fill="#fff"/><rect x="24" y="25" width="1.5" height="1.5" fill="#000"/><rect x="30" y="25" width="1.5" height="1.5" fill="#000"/></svg>',
        arkanoid: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#0d1b2a"/><rect x="2"  y="6"  width="11" height="5" fill="#f44336"/><rect x="14" y="6"  width="11" height="5" fill="#ff9800"/><rect x="26" y="6"  width="11" height="5" fill="#ffeb3b"/><rect x="38" y="6"  width="11" height="5" fill="#4caf50"/><rect x="50" y="6"  width="8"  height="5" fill="#2196f3"/><rect x="2"  y="12" width="11" height="5" fill="#ff9800"/><rect x="14" y="12" width="11" height="5" fill="#ffeb3b"/><rect x="26" y="12" width="11" height="5" fill="#4caf50"/><rect x="38" y="12" width="11" height="5" fill="#2196f3"/><rect x="50" y="12" width="8"  height="5" fill="#9c27b0"/><circle cx="35" cy="35" r="3" fill="#fff"/><rect x="20" y="50" width="22" height="5" fill="#42a5f5" rx="2"/></svg>',
        tanks: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#000"/><g fill="#8d4e2f"><rect x="2"  y="2"  width="14" height="10"/><rect x="44" y="2"  width="14" height="10"/><rect x="2"  y="48" width="14" height="10"/><rect x="44" y="48" width="14" height="10"/></g><g stroke="#5d2d15" stroke-width="0.5"><line x1="2" y1="7" x2="16" y2="7"/><line x1="9" y1="2" x2="9" y2="7"/><line x1="44" y1="7" x2="58" y2="7"/><line x1="51" y1="2" x2="51" y2="7"/></g><g transform="translate(20,36)"><rect width="20" height="20" fill="#f57c00"/><rect x="2"  y="2"  width="4"  height="16" fill="#ffd54f"/><rect x="14" y="2"  width="4"  height="16" fill="#ffd54f"/><rect x="7"  y="7"  width="6"  height="6"  fill="#ffd54f"/><rect x="9"  y="0"  width="2"  height="10" fill="#fff"/></g><g transform="translate(20,4)"><rect width="20" height="20" fill="#616161"/><rect x="2"  y="2"  width="4"  height="16" fill="#bdbdbd"/><rect x="14" y="2"  width="4"  height="16" fill="#bdbdbd"/><rect x="7"  y="7"  width="6"  height="6"  fill="#bdbdbd"/><rect x="9"  y="10" width="2"  height="10" fill="#fff"/></g><rect x="29" y="29" width="2" height="2" fill="#fff"/></svg>',
        memory: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#1a1a2e"/><rect x="6"  y="6"  width="22" height="22" fill="#42a5f5" rx="2"/><text x="17" y="23" font-size="14" fill="#fff" text-anchor="middle" font-weight="bold">?</text><rect x="32" y="6"  width="22" height="22" fill="#ef5350" rx="2"/><circle cx="43" cy="17" r="6" fill="#fff"/><rect x="6"  y="32" width="22" height="22" fill="#ef5350" rx="2"/><circle cx="17" cy="43" r="6" fill="#fff"/><rect x="32" y="32" width="22" height="22" fill="#42a5f5" rx="2"/><text x="43" y="49" font-size="14" fill="#fff" text-anchor="middle" font-weight="bold">?</text></svg>',
        invaders: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#000"/><rect x="8"  y="8"  width="1" height="1" fill="#fff"/><rect x="50" y="14" width="1" height="1" fill="#fff"/><rect x="22" y="3"  width="1" height="1" fill="#fff"/><g fill="#4caf50"><rect x="10" y="14" width="3" height="3"/><rect x="16" y="14" width="3" height="3"/><rect x="7"  y="17" width="15" height="3"/><rect x="4"  y="20" width="3" height="3"/><rect x="22" y="20" width="3" height="3"/></g><g fill="#ff5722"><rect x="34" y="14" width="3" height="3"/><rect x="40" y="14" width="3" height="3"/><rect x="31" y="17" width="15" height="3"/><rect x="28" y="20" width="3" height="3"/><rect x="46" y="20" width="3" height="3"/></g><rect x="13" y="30" width="2" height="5" fill="#fff"/><rect x="40" y="35" width="2" height="5" fill="#fff"/><g fill="#42a5f5"><rect x="26" y="48" width="10" height="6"/><rect x="29" y="44" width="4"  height="4"/><rect x="22" y="52" width="18" height="3"/></g><rect x="30" y="38" width="2" height="6" fill="#fff"/></svg>',
        crossy: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect y="0"  width="60" height="8" fill="#43a047"/><rect y="8"  width="60" height="9" fill="#424242"/><rect y="17" width="60" height="9" fill="#424242"/><rect y="26" width="60" height="6" fill="#43a047"/><rect y="32" width="60" height="9" fill="#1565c0"/><rect y="41" width="60" height="9" fill="#424242"/><rect y="50" width="60" height="10" fill="#43a047"/><g stroke="#fff200" stroke-width="0.5" stroke-dasharray="3 2"><line x1="0" y1="12.5" x2="60" y2="12.5"/><line x1="0" y1="21.5" x2="60" y2="21.5"/><line x1="0" y1="45.5" x2="60" y2="45.5"/></g><rect x="8"  y="9.5"  width="13" height="6" fill="#f44336" rx="1"/><rect x="38" y="18.5" width="13" height="6" fill="#ffc107" rx="1"/><rect x="20" y="42.5" width="13" height="6" fill="#9c27b0" rx="1"/><rect x="14" y="33.5" width="22" height="6" fill="#6d4c41" rx="1"/><g fill="#fff"><rect x="27" y="52" width="6" height="6"/><rect x="28" y="49" width="4" height="3"/></g><rect x="29" y="50" width="2" height="1" fill="#000"/><polygon points="32,51 35,50 35,52" fill="#ff9800"/></svg>',
        minesweeper: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#1a1a2e"/><g stroke="#37474f" stroke-width="1" fill="#cfd8dc"><rect x="2"  y="2"  width="13" height="13"/><rect x="16" y="2"  width="13" height="13"/><rect x="30" y="2"  width="13" height="13"/><rect x="44" y="2"  width="13" height="13"/><rect x="2"  y="16" width="13" height="13"/><rect x="44" y="16" width="13" height="13"/><rect x="2"  y="30" width="13" height="13"/><rect x="30" y="30" width="13" height="13"/><rect x="44" y="30" width="13" height="13"/><rect x="16" y="44" width="13" height="13"/><rect x="30" y="44" width="13" height="13"/><rect x="44" y="44" width="13" height="13"/></g><g fill="#90a4ae"><rect x="16" y="16" width="13" height="13"/><rect x="30" y="16" width="13" height="13"/><rect x="16" y="30" width="13" height="13"/><rect x="2"  y="44" width="13" height="13"/></g><text x="22.5" y="27" font-size="10" fill="#1976d2" text-anchor="middle" font-weight="bold">1</text><text x="36.5" y="27" font-size="10" fill="#388e3c" text-anchor="middle" font-weight="bold">2</text><text x="22.5" y="41" font-size="10" fill="#d32f2f" text-anchor="middle" font-weight="bold">3</text><text x="8.5"  y="55" font-size="10" fill="#1976d2" text-anchor="middle" font-weight="bold">1</text><g transform="translate(46,4)"><rect x="3" y="0" width="1" height="9" fill="#000"/><polygon points="4,0 9,2 4,4" fill="#f44336"/></g><g transform="translate(36,46)"><circle cx="3" cy="6" r="3.5" fill="#000"/><rect x="2.5" y="1" width="1" height="2" fill="#000"/><rect x="2" y="5" width="2" height="0.8" fill="#fff"/></g></svg>',
        checkers: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#8d6e63"/><g fill="#3e2723"><rect x="0"  y="0"  width="15" height="15"/><rect x="30" y="0"  width="15" height="15"/><rect x="15" y="15" width="15" height="15"/><rect x="45" y="15" width="15" height="15"/><rect x="0"  y="30" width="15" height="15"/><rect x="30" y="30" width="15" height="15"/><rect x="15" y="45" width="15" height="15"/><rect x="45" y="45" width="15" height="15"/></g><g fill="#fafafa" stroke="#bdbdbd" stroke-width="0.5"><circle cx="7.5"  cy="7.5"  r="5"/><circle cx="37.5" cy="7.5"  r="5"/><circle cx="22.5" cy="22.5" r="5"/></g><g fill="#212121" stroke="#000" stroke-width="0.5"><circle cx="22.5" cy="52.5" r="5"/><circle cx="52.5" cy="52.5" r="5"/><circle cx="37.5" cy="37.5" r="5"/></g><rect x="35" y="35" width="5" height="1.5" fill="#ffd700"/><polygon points="35,35 36,32 38,33 40,32 41,35" fill="#ffd700"/></svg>',
        match3: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#1a1a2e"/><g fill="#3a3a5e"><rect x="2"  y="2"  width="13" height="13"/><rect x="16" y="2"  width="13" height="13"/><rect x="30" y="2"  width="13" height="13"/><rect x="44" y="2"  width="13" height="13"/><rect x="2"  y="16" width="13" height="13"/><rect x="16" y="16" width="13" height="13"/><rect x="30" y="16" width="13" height="13"/><rect x="44" y="16" width="13" height="13"/><rect x="2"  y="30" width="13" height="13"/><rect x="16" y="30" width="13" height="13"/><rect x="30" y="30" width="13" height="13"/><rect x="44" y="30" width="13" height="13"/><rect x="2"  y="44" width="13" height="13"/><rect x="16" y="44" width="13" height="13"/><rect x="30" y="44" width="13" height="13"/><rect x="44" y="44" width="13" height="13"/></g><circle cx="8.5"  cy="8.5"  r="5" fill="#f44336"/><circle cx="22.5" cy="8.5"  r="5" fill="#f44336"/><circle cx="36.5" cy="8.5"  r="5" fill="#f44336"/><rect x="3" y="3" width="40" height="11" fill="none" stroke="#fff" stroke-width="0.6" rx="2"/><circle cx="50.5" cy="8.5"  r="5" fill="#9c27b0"/><rect x="4"  y="18" width="9" height="9" fill="#4caf50" rx="1"/><polygon points="22.5,17 27.5,22 22.5,27 17.5,22" fill="#ffc107"/><circle cx="36.5" cy="22.5" r="5" fill="#2196f3"/><rect x="46"  y="18" width="9" height="9" fill="#f44336" rx="1"/><polygon points="8.5,31 13.5,36 8.5,41 3.5,36" fill="#9c27b0"/><circle cx="22.5" cy="36.5" r="5" fill="#4caf50"/><rect x="32"  y="32" width="9" height="9" fill="#ffc107" rx="1"/><polygon points="50.5,31 55.5,36 50.5,41 45.5,36" fill="#2196f3"/><circle cx="8.5" cy="50.5" r="5" fill="#ffc107"/><rect x="18"  y="46" width="9" height="9" fill="#2196f3" rx="1"/><polygon points="36.5,45 41.5,50 36.5,55 31.5,50" fill="#f44336"/><circle cx="50.5" cy="50.5" r="5" fill="#4caf50"/><circle cx="7"   cy="7"   r="1.2" fill="#fff" opacity="0.7"/><circle cx="21"  cy="7"   r="1.2" fill="#fff" opacity="0.7"/><circle cx="35"  cy="7"   r="1.2" fill="#fff" opacity="0.7"/></svg>',
        platformer: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#5c94fc"/><circle cx="12" cy="14" r="4" fill="#fff"/><circle cx="17" cy="13" r="4" fill="#fff"/><rect x="0" y="46" width="60" height="14" fill="#c84c0c"/><rect x="0" y="46" width="60" height="3" fill="#43a047"/><rect x="26" y="26" width="8" height="6" fill="#fed7aa"/><rect x="25" y="24" width="10" height="5" fill="#1f1410"/><rect x="26" y="32" width="8" height="6" fill="#a855f7"/><rect x="26" y="38" width="8" height="6" fill="#2563eb"/><rect x="26" y="44" width="3" height="2" fill="#312e81"/><rect x="31" y="44" width="3" height="2" fill="#312e81"/><rect x="28" y="29" width="1" height="1" fill="#15803d"/><rect x="31" y="29" width="1" height="1" fill="#15803d"/><rect x="44" y="38" width="12" height="8" fill="#22c55e"/><rect x="42" y="36" width="16" height="4" fill="#22c55e"/><rect x="42" y="36" width="16" height="1" fill="#000"/><rect x="44" y="40" width="12" height="1" fill="#86efac"/><rect x="6" y="20" width="10" height="10" fill="#fbbf24"/><rect x="6" y="20" width="10" height="1" fill="#000"/><rect x="6" y="29" width="10" height="1" fill="#000"/><rect x="10" y="23" width="2" height="4" fill="#fff"/><rect x="10" y="28" width="2" height="1" fill="#fff"/></svg>',
        asteroids: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#111"/><polygon points="30,15 45,45 30,35 15,45" fill="#fff"/><circle cx="10" cy="15" r="5" fill="#888"/><circle cx="50" cy="20" r="7" fill="#888"/></svg>',
        sudoku: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#fff"/><g stroke="#000" stroke-width="2"><line x1="20" y1="0" x2="20" y2="60"/><line x1="40" y1="0" x2="40" y2="60"/><line x1="0" y1="20" x2="60" y2="20"/><line x1="0" y1="40" x2="60" y2="40"/></g><text x="10" y="15" font-size="12" fill="#000">1</text><text x="30" y="35" font-size="12" fill="#000">5</text><text x="50" y="55" font-size="12" fill="#000">9</text></svg>',
        maze: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#222"/><path d="M10,10 L50,10 L50,50 L30,50 L30,30 L10,30 Z" stroke="#4caf50" stroke-width="4" fill="none"/><circle cx="20" cy="20" r="4" fill="#ffeb3b"/></svg>',
        simon: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#111"/><rect x="5" y="5" width="23" height="23" fill="#4caf50" rx="2"/><rect x="32" y="5" width="23" height="23" fill="#f44336" rx="2"/><rect x="5" y="32" width="23" height="23" fill="#ffeb3b" rx="2"/><rect x="32" y="32" width="23" height="23" fill="#2196f3" rx="2"/></svg>',
        solitaire: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#2e7d32"/><rect x="10" y="10" width="15" height="25" fill="#fff" rx="2"/><text x="13" y="22" fill="#f00" font-size="10">♥</text><rect x="20" y="20" width="15" height="25" fill="#fff" rx="2" stroke="#ccc"/><text x="23" y="32" fill="#000" font-size="10">♠</text></svg>',
        bowling: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#d7ccc8"/><path d="M25,10 L35,10 L32,30 L28,30 Z" fill="#fff"/><circle cx="30" cy="45" r="10" fill="#212121"/><circle cx="27" cy="42" r="1.5" fill="#fff"/><circle cx="33" cy="42" r="1.5" fill="#fff"/><circle cx="30" cy="47" r="1.5" fill="#fff"/></svg>',
        minigolf: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#4caf50"/><circle cx="45" cy="45" r="6" fill="#000"/><line x1="45" y1="45" x2="45" y2="15" stroke="#fff" stroke-width="2"/><polygon points="45,15 30,20 45,25" fill="#f44336"/><circle cx="15" cy="45" r="4" fill="#fff"/></svg>',
        darts: '<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect width="60" height="60" fill="#3e2723"/><circle cx="30" cy="30" r="25" fill="#e0e0e0"/><circle cx="30" cy="30" r="18" fill="#f44336"/><circle cx="30" cy="30" r="10" fill="#e0e0e0"/><circle cx="30" cy="30" r="4" fill="#000"/><line x1="40" y1="40" x2="30" y2="30" stroke="#fff" stroke-width="2"/></svg>'
    };

    var PLATFORMER_URL = 'https://cevamnelampaplagin.github.io/sharewithothers/lenuk.js';
    function loadPlatformerPlugin() {
        if (window.lampa_mario_plugin) {
            Lampa.Activity.push({ url: '', title: 'Ленаріо', component: 'mario_game', page: 1 });
            return;
        }
        var s = document.createElement('script');
        s.src = PLATFORMER_URL + '?t=' + Date.now();
        s.onload = function () {
            setTimeout(function () {
                if (window.lampa_mario_plugin) {
                    Lampa.Activity.push({ url: '', title: 'Ленаріо', component: 'mario_game', page: 1 });
                } else {
                    Lampa.Noty && Lampa.Noty.show && Lampa.Noty.show('Не вдалося запустити Ленаріо');
                }
            }, 200);
        };
        document.head.appendChild(s);
    }

    function getRecord(id) { return Lampa.Storage.get('games_record_' + id, 0); }
    function setRecord(id, value) { if (value > getRecord(id)) Lampa.Storage.set('games_record_' + id, value); }

    function GamesMenuComponent(object) {
        var html, items, self = this;
        this.create = function () {
            html = $('<div class="games-menu"><div class="games-menu__title">Виберіть гру</div><div class="games-menu__list"></div></div>');
            var list = html.find('.games-menu__list');
            GAMES_LIST.forEach(function (g) {
                var rec = getRecord(g.id);
                var noRecord = (g.id === 'tictac' || g.id === 'seabattle' || g.id === 'tron' || g.id === 'platformer' || g.id === 'sudoku' || g.id === 'maze' || g.id === 'solitaire');
                var recText = noRecord ? '' : '<div class="games-menu__rec">Рекорд: ' + rec + '</div>';
                var icon = GAME_ICONS[g.id] || '';
                var item = $('<div class="games-menu__item selector" data-id="' + g.id + '"><div class="games-menu__icon">' + icon + '</div><div class="games-menu__body"><div class="games-menu__name">' + g.title + '</div><div class="games-menu__desc">' + g.desc + '</div>' + recText + '</div></div>');
                item.on('hover:enter', function () {
                    var id = $(this).data('id');
                    if (id === 'platformer') { loadPlatformerPlugin(); return; }
                    Lampa.Activity.push({ url: '', title: GAMES_LIST.filter(function(x){return x.id===id;})[0].title, component: 'games_play', game_id: id, page: 1 });
                });
                list.append(item);
            });
            items = html.find('.games-menu__item').toArray();
            return this.render();
        };
        this.start = function () {
            function scrollToFocus() { setTimeout(function(){ var f = html.find('.games-menu__item.focus')[0]; if (f && f.scrollIntoView) f.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 30); }
            Lampa.Controller.add('content', {
                toggle: function () { Lampa.Controller.collectionSet(self.render()); Lampa.Controller.collectionFocus(false, self.render()); },
                left: function () { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); scrollToFocus(); },
                right: function () { Navigator.move('right'); scrollToFocus(); },
                up:    function () { Navigator.move('up');    scrollToFocus(); },
                down:  function () { Navigator.move('down');  scrollToFocus(); },
                back:  function () { Lampa.Activity.backward(); }
            });
            Lampa.Controller.toggle('content');
        };
        this.pause = function () {}; this.stop = function () {};
        this.render = function () { return html; };
        this.destroy = function () { if (html) html.remove(); html = null; };
    }

    function GamesPlayComponent(object) {
        var game = null, html, self = this;
        this.create = function () {
            html = $('<div class="games-play"></div>');
            var GameClass = GAMES[object.game_id];
            if (!GameClass) { html.text('Гра не знайдена'); return html; }
            game = new GameClass(html, self);
            game.create();
            return this.render();
        };
        this.start = function () { if (game) game.start(); };
        this.pause = function () { if (game && game.pause) game.pause(); };
        this.stop  = function () { if (game && game.stop) game.stop(); };
        this.render = function () { return html; };
        this.destroy = function () { if (game && game.destroy) game.destroy(); game = null; if (html) html.remove(); html = null; };
    }

    window._lampa_games_temp = window._lampa_games_temp || {};
    window._lampa_games_temp.GAMES = {};
    var GAMES = window._lampa_games_temp.GAMES;

    function setupController(handlers) {
        Lampa.Controller.add('content', $.extend({
            toggle: function () {}, update: function () {}, left:  function () {}, right: function () {}, up:    function () {}, down:  function () {}, enter: function () {}, back:  function () { Lampa.Activity.backward(); }
        }, handlers || {}));
        Lampa.Controller.toggle('content');
    }

    function attachTouch(rootEl, callbacks) {
        callbacks = callbacks || {};
        var startX=0, startY=0, startTime=0, dragging=false, THRESHOLD=25, TAP_TIME=300, lastTouchEnd=0;
        function onStart(e, isTouch) {
            if (!isTouch && Date.now() - lastTouchEnd < 500) return;
            var t = e.originalEvent.touches ? e.originalEvent.touches[0] : e.originalEvent;
            var rect = rootEl[0].getBoundingClientRect();
            startX = t.clientX; startY = t.clientY; startTime = Date.now(); dragging = true;
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
                if (e.originalEvent && e.originalEvent.cancelable) { try { e.originalEvent.preventDefault(); } catch (_) {} }
            }
            var t = (e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) || e.originalEvent;
            var rect = rootEl[0].getBoundingClientRect();
            var dx = t.clientX - startX, dy = t.clientY - startY, adx = Math.abs(dx), ady = Math.abs(dy), elapsed = Date.now() - startTime;
            if (adx < THRESHOLD && ady < THRESHOLD) { if (elapsed < TAP_TIME && callbacks.onTap) callbacks.onTap(t.clientX - rect.left, t.clientY - rect.top); }
            else if (callbacks.onSwipe) { var dir; if (adx > ady) dir = dx > 0 ? 'right' : 'left'; else dir = dy > 0 ? 'down' : 'up'; callbacks.onSwipe(dir); }
            if (callbacks.onTouchEnd) callbacks.onTouchEnd();
        }
        rootEl.on('touchstart.gametouch', function(e){ onStart(e, true); });
        rootEl.on('mousedown.gametouch',  function(e){ onStart(e, false); });
        rootEl.on('touchmove.gametouch mousemove.gametouch', onMove);
        rootEl.on('touchend.gametouch', function(e){ onEnd(e, true); });
        rootEl.on('mouseup.gametouch mouseleave.gametouch', function(e){ onEnd(e, false); });
        return function detach() { rootEl.off('.gametouch'); };
    }

    // ============================================================
    //                         ASTEROIDS
    // ============================================================
    GAMES.asteroids = function (root) {
        var canvas, ctx, overlay, timer, W, H;
        var ship, rocks, bullets, score;
        var keys = {left:false, right:false, up:false};
        var paused = false, gameOver = false, destroyed = false;

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info">' +
                    '<span>Рахунок: <b class="g-score">0</b></span>' +
                    '<span>Рекорд: <b class="g-record">' + getRecord('asteroids') + '</b></span>' +
                    '<span class="g-hint">← → - поворот, ↑ - газ, OK - постріл</span>' +
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
            if(W < 300) W = 600; if(H < 300) H = 600;
            canvas.width = W; canvas.height = H;
        };

        this.reset = function () {
            this.resize();
            ship = {x: W/2, y: H/2, a: -Math.PI/2, vx: 0, vy: 0, r: 12, cooldown: 0};
            rocks = []; bullets = []; score = 0;
            for(var i=0; i<5; i++) this.spawnRock(Math.random()*W, Math.random()*H, 30);
            gameOver = false;
            root.find('.g-score').text(0);
            overlay.removeClass('show').text('');
            this.startLoop();
        };

        this.spawnRock = function(x, y, r) {
            var a = Math.random() * Math.PI * 2;
            var s = (40 - r) / 10;
            rocks.push({x:x, y:y, vx:Math.cos(a)*s, vy:Math.sin(a)*s, r:r, a:0, va:Math.random()*0.1-0.05});
        };

        this.shoot = function() {
            if (ship.cooldown > 0 || gameOver) return;
            bullets.push({x: ship.x + Math.cos(ship.a)*ship.r, y: ship.y + Math.sin(ship.a)*ship.r, vx: Math.cos(ship.a)*6, vy: Math.sin(ship.a)*6, life: 60});
            ship.cooldown = 15;
        };

        this.startLoop = function(){this.stopLoop(); var s=this; timer=setInterval(function(){s.tick();}, 1000/60);};
        this.stopLoop = function(){if(timer) clearInterval(timer); timer=null;};

        this.tick = function () {
            if (gameOver || destroyed) return;
            if (keys.left) ship.a -= 0.1;
            if (keys.right) ship.a += 0.1;
            if (keys.up) { ship.vx += Math.cos(ship.a)*0.2; ship.vy += Math.sin(ship.a)*0.2; }
            ship.vx *= 0.99; ship.vy *= 0.99;
            ship.x += ship.vx; ship.y += ship.vy;
            if (ship.x < 0) ship.x += W; if (ship.x > W) ship.x -= W;
            if (ship.y < 0) ship.y += H; if (ship.y > H) ship.y -= H;
            if (ship.cooldown > 0) ship.cooldown--;

            for (var i=bullets.length-1; i>=0; i--) {
                var b = bullets[i]; b.x += b.vx; b.y += b.vy; b.life--;
                if (b.x < 0) b.x += W; if (b.x > W) b.x -= W;
                if (b.y < 0) b.y += H; if (b.y > H) b.y -= H;
                if (b.life <= 0) bullets.splice(i,1);
            }

            for (var i=rocks.length-1; i>=0; i--) {
                var r = rocks[i]; r.x += r.vx; r.y += r.vy; r.a += r.va;
                if (r.x < -r.r) r.x += W+r.r*2; if (r.x > W+r.r) r.x -= W+r.r*2;
                if (r.y < -r.r) r.y += H+r.r*2; if (r.y > H+r.r) r.y -= H+r.r*2;
                var dist = Math.hypot(ship.x - r.x, ship.y - r.y);
                if (dist < ship.r + r.r) {
                    gameOver = true; this.stopLoop();
                    overlay.html('Гра закінчена<br><span class="g-sub">OK — заново</span>').addClass('show');
                }
                for (var j=bullets.length-1; j>=0; j--) {
                    var b = bullets[j];
                    if (Math.hypot(b.x - r.x, b.y - r.y) < r.r) {
                        bullets.splice(j,1);
                        score += Math.floor(500/r.r);
                        root.find('.g-score').text(score);
                        setRecord('asteroids', score);
                        rocks.splice(i,1);
                        if (r.r > 15) { this.spawnRock(r.x, r.y, r.r/2); this.spawnRock(r.x, r.y, r.r/2); }
                        if (rocks.length === 0) { for(var k=0; k<7; k++) this.spawnRock(Math.random()*W, Math.random()*H, 30); }
                        break;
                    }
                }
            }
            this.draw();
        };

        this.draw = function () {
            ctx.fillStyle = '#000'; ctx.fillRect(0,0,W,H);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
            // корабель
            ctx.save(); ctx.translate(ship.x, ship.y); ctx.rotate(ship.a);
            ctx.beginPath(); ctx.moveTo(ship.r, 0); ctx.lineTo(-ship.r, ship.r*0.7); ctx.lineTo(-ship.r*0.5, 0); ctx.lineTo(-ship.r, -ship.r*0.7); ctx.closePath(); ctx.stroke();
            if (keys.up && Math.random()>0.2) { ctx.beginPath(); ctx.moveTo(-ship.r*0.6, 0); ctx.lineTo(-ship.r*1.5, Math.random()*4-2); ctx.stroke(); }
            ctx.restore();
            // астероїди
            for (var i=0; i<rocks.length; i++) {
                var r = rocks[i];
                ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.a);
                ctx.beginPath();
                for (var j=0; j<6; j++) { var a = j*Math.PI/3; var d = r.r * (0.8 + (j%2)*0.4); if (j===0) ctx.moveTo(d,0); else ctx.lineTo(Math.cos(a)*d, Math.sin(a)*d); }
                ctx.closePath(); ctx.stroke(); ctx.restore();
            }
            // снаряди
            ctx.fillStyle = '#ff0';
            for (var i=0; i<bullets.length; i++) { ctx.fillRect(bullets[i].x-2, bullets[i].y-2, 4, 4); }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){keys.left=true; setTimeout(function(){keys.left=false;},150);},
                right: function(){keys.right=true; setTimeout(function(){keys.right=false;},150);},
                up: function(){keys.up=true; setTimeout(function(){keys.up=false;},200);},
                enter: function(){ if (gameOver) s.reset(); else s.shoot(); }
            });
            this._detachTouch = attachTouch(root, {
                onTouchStart: function(x,y) { if(gameOver) s.reset(); else if (x < W/3) keys.left=true; else if (x > W*2/3) keys.right=true; else keys.up=true; },
                onTouchEnd: function() { keys.left = false; keys.right = false; keys.up = false; },
                onTap: function() { s.shoot(); }
            });
            this._r = function(){s.resize();s.draw();}; $(window).on('resize', this._r);
            setTimeout(function(){if(!destroyed) s.reset();}, 50);
        };
        this.pause = function(){}; this.destroy = function(){destroyed=true; this.stopLoop(); if(this._detachTouch) this._detachTouch(); $(window).off('resize', this._r);};
    };

    // ============================================================
    //                         SUDOKU (Спрощений)
    // ============================================================
    GAMES.sudoku = function (root) {
        var grid = [], orig = [], cursor = {x:0, y:0}, selecting = false;
        var info, overlay;
        // Фіксована проста дошка для прикладу (0 = пусто)
        var BOARD = [
            [5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],
            [8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],
            [0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]
        ];

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span class="g-hint">Стрілки - вибір клітини/цифри, OK - підтвердити</span></div>' +
                  '<div class="sudoku-board" style="display:grid; grid-template-columns:repeat(9, min(8vmin, 40px)); gap:2px; background:#000; padding:4px; margin-top:20px;"></div>' +
                  '<div class="game-overlay"></div>' +
                '</div>'
            );
            overlay = root.find('.game-overlay');
            this.reset();
        };

        this.reset = function () {
            grid = []; orig = []; cursor = {x:0, y:0}; selecting = false;
            for(var y=0; y<9; y++) {
                grid[y] = []; orig[y] = [];
                for(var x=0; x<9; x++) { grid[y][x] = BOARD[y][x]; orig[y][x] = BOARD[y][x]; }
            }
            this.draw(); overlay.removeClass('show').text('');
        };

        this.draw = function () {
            var html = '';
            for(var y=0; y<9; y++) {
                for(var x=0; x<9; x++) {
                    var v = grid[y][x] || '';
                    var bg = (cursor.x===x && cursor.y===y && !selecting) ? '#ffeb3b' : '#fff';
                    var col = orig[y][x] ? '#000' : '#1976d2';
                    var border = '';
                    if (x%3===2 && x!==8) border += 'border-right:3px solid #000;';
                    if (y%3===2 && y!==8) border += 'border-bottom:3px solid #000;';
                    html += '<div style="background:'+bg+';color:'+col+';display:flex;align-items:center;justify-content:center;font-size:1.5em;aspect-ratio:1;font-weight:bold;cursor:pointer;'+border+'">' + v + '</div>';
                }
            }
            root.find('.sudoku-board').html(html);
        };

        this.showSelector = function () {
            if (orig[cursor.y][cursor.x]) return; // не можна міняти оригінал
            selecting = true;
            var html = '<div style="background:#fff;color:#000;display:grid;grid-template-columns:repeat(3,50px);gap:4px;padding:10px;border-radius:10px;text-align:center;">';
            for(var i=1; i<=9; i++) html += '<div class="sudo-num" style="background:#e0e0e0;padding:10px;font-size:1.5em;border-radius:5px;">'+i+'</div>';
            html += '<div class="sudo-num" style="background:#f44336;color:#fff;grid-column:1/4;padding:5px;margin-top:4px;border-radius:5px;">Очистити</div></div>';
            overlay.html(html).addClass('show');
            var s = this;
            root.find('.sudo-num').on('click', function(){
                var t = $(this).text();
                grid[cursor.y][cursor.x] = t==='Очистити' ? 0 : parseInt(t,10);
                selecting = false; overlay.removeClass('show').text(''); s.draw(); s.checkWin();
            });
        };

        this.checkWin = function() {
            var complete = true;
            for(var y=0; y<9; y++) for(var x=0; x<9; x++) if(!grid[y][x]) complete = false;
            if (complete) { overlay.html('Вирішено!<br><span class="g-sub">OK — заново</span>').addClass('show'); }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){if(!selecting && cursor.x>0) cursor.x--; s.draw();},
                right: function(){if(!selecting && cursor.x<8) cursor.x++; s.draw();},
                up: function(){if(!selecting && cursor.y>0) cursor.y--; s.draw();},
                down: function(){if(!selecting && cursor.y<8) cursor.y++; s.draw();},
                enter: function(){ if(!selecting) s.showSelector(); }
            });
        };
        this.pause = function(){}; this.destroy = function(){};
    };

    // ============================================================
    //                         MAZE
    // ============================================================
    GAMES.maze = function (root) {
        var canvas, ctx, overlay, W, H, TILE;
        var map = [
            "##########",
            "#S #   # #",
            "#  # # # #",
            "## # #   #",
            "#  # ### #",
            "# ##     #",
            "#  #######",
            "## #   # #",
            "#    #   E",
            "##########"
        ];
        var px, py, gameOver = false, destroyed = false;

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span class="g-hint">Стрілки - рух</span></div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0]; ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.resize = function () {
            var wrap = root.find('.game-canvas-wrap')[0];
            var rect = wrap.getBoundingClientRect();
            var size = Math.min(rect.width, rect.height);
            if (size < 200) size = 500;
            TILE = Math.floor(size / 10);
            canvas.width = TILE*10; canvas.height = TILE*10;
        };

        this.reset = function () {
            this.resize();
            px = 1; py = 1; gameOver = false;
            overlay.removeClass('show').text('');
            this.draw();
        };

        this.move = function (dx, dy) {
            if (gameOver) return;
            var nx = px+dx, ny = py+dy;
            if (map[ny][nx] !== '#') { px = nx; py = ny; this.draw(); }
            if (map[py][px] === 'E') { gameOver = true; overlay.html('Вихід знайдено!<br><span class="g-sub">OK — заново</span>').addClass('show'); }
        };

        this.draw = function () {
            ctx.fillStyle = '#222'; ctx.fillRect(0,0,canvas.width,canvas.height);
            for(var y=0; y<10; y++) {
                for(var x=0; x<10; x++) {
                    if (map[y][x] === '#') { ctx.fillStyle = '#4caf50'; ctx.fillRect(x*TILE, y*TILE, TILE, TILE); }
                    if (map[y][x] === 'E') { ctx.fillStyle = '#f44336'; ctx.fillRect(x*TILE, y*TILE, TILE, TILE); }
                }
            }
            ctx.fillStyle = '#ffeb3b'; ctx.beginPath(); ctx.arc(px*TILE+TILE/2, py*TILE+TILE/2, TILE*0.3, 0, Math.PI*2); ctx.fill();
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){s.move(-1,0);}, right: function(){s.move(1,0);}, up: function(){s.move(0,-1);}, down: function(){s.move(0,1);},
                enter: function(){ if(gameOver) s.reset(); }
            });
            this._detachTouch = attachTouch(root, { onSwipe: function(dir){ if(dir==='left') s.move(-1,0); if(dir==='right') s.move(1,0); if(dir==='up') s.move(0,-1); if(dir==='down') s.move(0,1); }, onTap: function(){ if(gameOver) s.reset(); } });
            this._r = function(){s.resize();s.draw();}; $(window).on('resize', this._r);
            setTimeout(function(){if(!destroyed) s.reset();}, 50);
        };
        this.pause = function(){}; this.destroy = function(){destroyed=true; if(this._detachTouch) this._detachTouch(); $(window).off('resize', this._r);};
    };

    // ============================================================
    //                         SIMON SAYS
    // ============================================================
    GAMES.simon = function (root) {
        var overlay, seq = [], step = 0, phase = 'show', score = 0, lit = -1;
        var colors = ['#4caf50', '#f44336', '#ffeb3b', '#2196f3']; // ліво, право, низ, верх
        
        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span>Рахунок: <b class="g-score">0</b></span><span class="g-hint">← Зелений, → Червоний, ↓ Жовтий, ↑ Синій</span></div>' +
                  '<div class="simon-board" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; width:min(60vmin, 300px); margin-top:30px;">' +
                    '<div class="simon-btn" data-id="0" style="background:#1b5e20; aspect-ratio:1; border-radius:10px;"></div>' +
                    '<div class="simon-btn" data-id="1" style="background:#b71c1c; aspect-ratio:1; border-radius:10px;"></div>' +
                    '<div class="simon-btn" data-id="2" style="background:#f57f17; aspect-ratio:1; border-radius:10px;"></div>' +
                    '<div class="simon-btn" data-id="3" style="background:#0d47a1; aspect-ratio:1; border-radius:10px;"></div>' +
                  '</div>' +
                  '<div class="game-overlay"></div>' +
                '</div>'
            );
            overlay = root.find('.game-overlay');
        };

        this.reset = function () {
            seq = []; score = 0; root.find('.g-score').text(0); overlay.removeClass('show').text('');
            this.nextRound();
        };

        this.nextRound = function () {
            seq.push(Math.floor(Math.random()*4)); step = 0; phase = 'show';
            var s = this; setTimeout(function(){ s.playSeq(); }, 800);
        };

        this.playSeq = function () {
            var i = 0, s = this;
            var iv = setInterval(function(){
                if (i >= seq.length) { clearInterval(iv); phase = 'input'; return; }
                s.light(seq[i]); i++;
            }, 600);
        };

        this.light = function (id) {
            root.find('.simon-btn[data-id="'+id+'"]').css('background', colors[id]);
            setTimeout(function(){
                var dark = ['#1b5e20', '#b71c1c', '#f57f17', '#0d47a1'];
                root.find('.simon-btn[data-id="'+id+'"]').css('background', dark[id]);
            }, 300);
        };

        this.press = function (id) {
            if (phase !== 'input') return;
            this.light(id);
            if (id === seq[step]) {
                step++;
                if (step === seq.length) { score++; root.find('.g-score').text(score); phase = 'wait'; this.nextRound(); }
            } else {
                phase = 'gameover'; overlay.html('Помилка!<br>Рахунок: '+score+'<br><span class="g-sub">OK — заново</span>').addClass('show');
            }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){s.press(0);}, right: function(){s.press(1);}, down: function(){s.press(2);}, up: function(){s.press(3);},
                enter: function(){ if(phase === 'gameover') s.reset(); }
            });
            setTimeout(function(){ s.reset(); }, 50);
        };
        this.pause = function(){}; this.destroy = function(){};
    };
    // ============================================================
    //                         SOLITAIRE (Спрощений)
    // ============================================================
    GAMES.solitaire = function (root) {
        var info, overlay, W, H, ctx, canvas, timer, destroyed = false;
        var cols = [], deck = [], cursor = {x:0, y:0}, selected = null;

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span class="g-hint">Стрілки - вибір, OK - взяти/покласти. (Спрощена версія)</span></div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0]; ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.resize = function () {
            var wrap = root.find('.game-canvas-wrap')[0];
            var rect = wrap.getBoundingClientRect();
            W = Math.floor(rect.width); H = Math.floor(rect.height);
            canvas.width = W; canvas.height = H;
        };

        this.reset = function () {
            this.resize(); cols = []; deck = []; cursor = {x:0, y:0}; selected = null;
            var suits = ['♥','♦','♣','♠']; var ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
            for(var s=0; s<4; s++) for(var r=0; r<13; r++) deck.push({s:suits[s], r:ranks[r], c:s<2?'#f00':'#000'});
            deck.sort(function(){return Math.random()-0.5;});
            for(var i=0; i<7; i++) { cols[i] = []; for(var j=0; j<=i; j++) cols[i].push(deck.pop()); }
            this.draw(); overlay.removeClass('show').text('');
        };

        this.draw = function () {
            ctx.fillStyle = '#2e7d32'; ctx.fillRect(0,0,W,H);
            var cw = Math.min(60, W/8), ch = cw*1.5, gap = cw*1.1;
            for(var i=0; i<7; i++) {
                var cx = 10 + i*gap;
                ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.strokeRect(cx, 10, cw, ch);
                for(var j=0; j<cols[i].length; j++) {
                    var card = cols[i][j]; var cy = 10 + j*20;
                    ctx.fillStyle = '#fff'; ctx.fillRect(cx, cy, cw, ch);
                    ctx.strokeStyle = '#000'; ctx.strokeRect(cx, cy, cw, ch);
                    ctx.fillStyle = card.c; ctx.font = '14px sans-serif'; ctx.fillText(card.r+card.s, cx+4, cy+16);
                }
                if (cursor.x === i) {
                    var curY = 10 + Math.max(0, cols[i].length-1)*20;
                    ctx.strokeStyle = '#ffeb3b'; ctx.lineWidth = 3; ctx.strokeRect(cx, curY, cw, ch); ctx.lineWidth = 1;
                }
                if (selected !== null && selected === i) {
                    var selY = 10 + Math.max(0, cols[i].length-1)*20;
                    ctx.fillStyle = 'rgba(255,235,59,0.3)'; ctx.fillRect(cx, selY, cw, ch);
                }
            }
        };

        this.action = function () {
            if (selected === null) {
                if (cols[cursor.x].length > 0) selected = cursor.x;
            } else {
                if (selected !== cursor.x) {
                    cols[cursor.x].push(cols[selected].pop());
                }
                selected = null;
            }
            this.draw();
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){if(cursor.x>0) cursor.x--; s.draw();},
                right: function(){if(cursor.x<6) cursor.x++; s.draw();},
                enter: function(){ s.action(); }
            });
            setTimeout(function(){if(!destroyed) s.reset();}, 50);
            this._r = function(){s.resize();s.draw();}; $(window).on('resize', this._r);
        };
        this.pause = function(){}; this.destroy = function(){destroyed=true; $(window).off('resize', this._r);};
    };

    // ============================================================
    //                         BOWLING
    // ============================================================
    GAMES.bowling = function (root) {
        var canvas, ctx, overlay, timer, W, H;
        var ball, pins = [], state = 'aim', power = 0, pDir = 1, score = 0, frame = 1;
        var keys = {left:false, right:false};

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span>Фрейм: <b class="g-frame">1</b>/10</span><span>Рахунок: <b class="g-score">0</b></span><span class="g-hint">← → - позиція/напрямок, OK - кидок</span></div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0]; ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.resize = function () { W = canvas.width = 400; H = canvas.height = 600; };

        this.reset = function () {
            this.resize(); ball = {x:W/2, y:H-50, vx:0, vy:0, r:15}; pins = []; state = 'aim'; power = 0; pDir = 1; score = 0; frame = 1;
            this.setupPins(); root.find('.g-score').text(score); root.find('.g-frame').text(frame); overlay.removeClass('show').text('');
            this.startLoop();
        };

        this.setupPins = function () {
            pins = [];
            var startY = 100, gap = 30;
            for(var row=0; row<4; row++) {
                for(var i=0; i<=row; i++) {
                    pins.push({x: W/2 - row*gap/2 + i*gap, y: startY + row*gap, r: 10, alive: true});
                }
            }
            ball.x = W/2; ball.y = H-50; ball.vx = 0; ball.vy = 0; state = 'aim'; power = 0;
        };

        this.action = function () {
            if (state === 'gameover') { this.reset(); return; }
            if (state === 'aim') { state = 'power'; }
            else if (state === 'power') { ball.vy = -10 - (power/100)*10; ball.vx = (ball.x - W/2)/20; state = 'roll'; }
        };

        this.startLoop = function(){this.stopLoop(); var s=this; timer=setInterval(function(){s.tick();}, 1000/60);};
        this.stopLoop = function(){if(timer) clearInterval(timer); timer=null;};

        this.tick = function () {
            if (state === 'aim') {
                if (keys.left) ball.x -= 2; if (keys.right) ball.x += 2;
                if (ball.x < 50) ball.x = 50; if (ball.x > W-50) ball.x = W-50;
            } else if (state === 'power') {
                power += pDir * 4; if (power > 100) { power = 100; pDir = -1; } else if (power < 0) { power = 0; pDir = 1; }
            } else if (state === 'roll') {
                ball.x += ball.vx; ball.y += ball.vy;
                for(var i=0; i<pins.length; i++) {
                    var p = pins[i];
                    if (p.alive && Math.hypot(ball.x-p.x, ball.y-p.y) < ball.r+p.r) {
                        p.alive = false; score++; ball.vx *= 0.8; ball.vy *= 0.8;
                    }
                }
                if (ball.y < -50) {
                    frame++; root.find('.g-score').text(score); root.find('.g-frame').text(frame);
                    if (frame > 10) { state = 'gameover'; overlay.html('Гру завершено<br>Рахунок: '+score+'<br><span class="g-sub">OK — заново</span>').addClass('show'); }
                    else { setTimeout(this.setupPins.bind(this), 1000); state = 'wait'; }
                }
            }
            this.draw();
        };

        this.draw = function () {
            ctx.fillStyle = '#d7ccc8'; ctx.fillRect(0,0,W,H);
            ctx.fillStyle = '#bcaaa4'; ctx.fillRect(50, 0, W-100, H); // доріжка
            for(var i=0; i<pins.length; i++) {
                if(pins[i].alive) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(pins[i].x, pins[i].y, pins[i].r, 0, Math.PI*2); ctx.fill(); ctx.fillStyle = '#f00'; ctx.fillRect(pins[i].x-8, pins[i].y-2, 16, 4); }
            }
            ctx.fillStyle = '#212121'; ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
            if (state === 'power') {
                ctx.fillStyle = '#000'; ctx.fillRect(W-40, H-150, 20, 100);
                ctx.fillStyle = '#f44336'; ctx.fillRect(W-40, H-50 - power, 20, power);
            }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){keys.left=true; setTimeout(function(){keys.left=false;},150);},
                right: function(){keys.right=true; setTimeout(function(){keys.right=false;},150);},
                enter: function(){ s.action(); }
            });
            setTimeout(function(){s.reset();}, 50);
        };
        this.pause = function(){}; this.destroy = function(){this.stopLoop();};
    };

    // ============================================================
    //                         MINI GOLF
    // ============================================================
    GAMES.minigolf = function (root) {
        var canvas, ctx, overlay, timer, W, H;
        var ball, hole, walls = [], state = 'aim', angle = -Math.PI/2, power = 0, pDir = 1, strokes = 0;
        var keys = {left:false, right:false};

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span>Удари: <b class="g-strokes">0</b></span><span class="g-hint">← → - кут, OK - сила/удар</span></div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0]; ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.reset = function () {
            W = canvas.width = 400; H = canvas.height = 600;
            ball = {x:W/2, y:H-50, vx:0, vy:0, r:6}; hole = {x:W/2, y:50, r:10};
            walls = [ {x:0, y:0, w:W, h:10}, {x:0, y:0, w:10, h:H}, {x:W-10, y:0, w:10, h:H}, {x:0, y:H-10, w:W, h:10}, {x:0, y:H/2, w:W-100, h:20} ];
            state = 'aim'; angle = -Math.PI/2; power = 0; pDir = 1; strokes = 0; root.find('.g-strokes').text(0);
            overlay.removeClass('show').text('');
            if(!timer) { var s=this; timer=setInterval(function(){s.tick();}, 1000/60); }
        };

        this.action = function () {
            if (state === 'win') { this.reset(); return; }
            if (state === 'aim') { state = 'power'; }
            else if (state === 'power') { ball.vx = Math.cos(angle)*(power/5); ball.vy = Math.sin(angle)*(power/5); state = 'roll'; strokes++; root.find('.g-strokes').text(strokes); }
        };

        this.tick = function () {
            if (state === 'aim') {
                if (keys.left) angle -= 0.05; if (keys.right) angle += 0.05;
            } else if (state === 'power') {
                power += pDir * 3; if (power > 100) { power = 100; pDir = -1; } else if (power < 0) { power = 0; pDir = 1; }
            } else if (state === 'roll') {
                ball.x += ball.vx; ball.y += ball.vy;
                ball.vx *= 0.98; ball.vy *= 0.98;
                for(var i=0; i<walls.length; i++) {
                    var w = walls[i];
                    if (ball.x+ball.r > w.x && ball.x-ball.r < w.x+w.w && ball.y+ball.r > w.y && ball.y-ball.r < w.y+w.h) {
                        // simple bounce
                        var px = ball.x - ball.vx, py = ball.y - ball.vy;
                        if (px+ball.r <= w.x || px-ball.r >= w.x+w.w) ball.vx *= -1; else ball.vy *= -1;
                        ball.x += ball.vx; ball.y += ball.vy;
                    }
                }
                if (Math.hypot(ball.x-hole.x, ball.y-hole.y) < hole.r) { state = 'win'; overlay.html('Лунка!<br>Удари: '+strokes+'<br><span class="g-sub">OK — заново</span>').addClass('show'); }
                else if (Math.abs(ball.vx)<0.1 && Math.abs(ball.vy)<0.1) { ball.vx=0; ball.vy=0; state = 'aim'; power=0; }
            }
            this.draw();
        };

        this.draw = function () {
            ctx.fillStyle = '#4caf50'; ctx.fillRect(0,0,W,H);
            ctx.fillStyle = '#795548'; for(var i=0; i<walls.length; i++) ctx.fillRect(walls[i].x, walls[i].y, walls[i].w, walls[i].h);
            ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(hole.x, hole.y, hole.r, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2); ctx.fill();
            if (state === 'aim') { ctx.strokeStyle = '#fff'; ctx.beginPath(); ctx.moveTo(ball.x, ball.y); ctx.lineTo(ball.x + Math.cos(angle)*50, ball.y + Math.sin(angle)*50); ctx.stroke(); }
            if (state === 'power') { ctx.fillStyle = '#000'; ctx.fillRect(W-30, H-150, 15, 100); ctx.fillStyle = '#ffeb3b'; ctx.fillRect(W-30, H-50 - power, 15, power); }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                left: function(){keys.left=true; setTimeout(function(){keys.left=false;},100);},
                right: function(){keys.right=true; setTimeout(function(){keys.right=false;},100);},
                enter: function(){ s.action(); }
            });
            setTimeout(function(){s.reset();}, 50);
        };
        this.pause = function(){}; this.destroy = function(){if(timer) clearInterval(timer);};
    };

    // ============================================================
    //                         DARTS
    // ============================================================
    GAMES.darts = function (root) {
        var canvas, ctx, overlay, timer, W, H;
        var cx, cy, t = 0, state = 'aim', score = 0, throws = 3;

        this.create = function () {
            root.html(
                '<div class="game-wrap">' +
                  '<div class="game-info"><span>Кидки: <b class="g-throws">3</b></span><span>Рахунок: <b class="g-score">0</b></span><span class="g-hint">OK - кидок</span></div>' +
                  '<div class="game-canvas-wrap"><canvas></canvas><div class="game-overlay"></div></div>' +
                '</div>'
            );
            canvas = root.find('canvas')[0]; ctx = canvas.getContext('2d');
            overlay = root.find('.game-overlay');
        };

        this.reset = function () {
            W = canvas.width = 400; H = canvas.height = 400;
            state = 'aim'; score = 0; throws = 3; root.find('.g-score').text(0); root.find('.g-throws').text(throws);
            overlay.removeClass('show').text('');
            if(!timer) { var s=this; timer=setInterval(function(){s.tick();}, 1000/60); }
        };

        this.action = function () {
            if (state === 'gameover') { this.reset(); return; }
            if (state === 'aim') {
                var dist = Math.hypot(cx - W/2, cy - H/2);
                var pts = 0;
                if (dist < 10) pts = 50; else if (dist < 30) pts = 25; else if (dist < 80) pts = 10; else if (dist < 150) pts = 5;
                score += pts; throws--; root.find('.g-score').text(score); root.find('.g-throws').text(throws);
                if (throws <= 0) { state = 'gameover'; overlay.html('Кінець гри<br>Рахунок: '+score+'<br><span class="g-sub">OK — заново</span>').addClass('show'); }
            }
        };

        this.tick = function () {
            if (state === 'aim') {
                t += 0.05;
                cx = W/2 + Math.sin(t*1.3)*120 + Math.cos(t*0.7)*50;
                cy = H/2 + Math.cos(t*1.1)*120 + Math.sin(t*0.9)*50;
            }
            this.draw();
        };

        this.draw = function () {
            ctx.fillStyle = '#3e2723'; ctx.fillRect(0,0,W,H);
            ctx.fillStyle = '#e0e0e0'; ctx.beginPath(); ctx.arc(W/2, H/2, 150, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(W/2, H/2, 100, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#f44336'; ctx.beginPath(); ctx.arc(W/2, H/2, 30, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(W/2, H/2, 10, 0, Math.PI*2); ctx.fill();
            // crosshair
            if (state === 'aim') {
                ctx.strokeStyle = '#0f0'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(cx-15, cy); ctx.lineTo(cx+15, cy); ctx.moveTo(cx, cy-15); ctx.lineTo(cx, cy+15); ctx.stroke();
                ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI*2); ctx.stroke();
            }
        };

        this.start = function () {
            var s = this;
            setupController({
                toggle: function(){Lampa.Controller.collectionSet(root);Lampa.Controller.collectionFocus(false,root);},
                enter: function(){ s.action(); }
            });
            setTimeout(function(){s.reset();}, 50);
        };
        this.pause = function(){}; this.destroy = function(){if(timer) clearInterval(timer);};
    };

    function injectCSS() {
        var css = '<style>' +
        '.games-menu{padding:2em;color:#fff;height:100%;max-height:100vh;overflow-y:auto;box-sizing:border-box;}' +
        '.games-menu__title{font-size:1.6em;margin-bottom:1em;opacity:.8;}' +
        '.games-menu__list{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1em;}' +
        '.games-menu__item{display:flex;align-items:center;gap:1em;padding:1em;background:rgba(255,255,255,0.05);border-radius:.6em;cursor:pointer;border:2px solid transparent;transition:all .2s;}' +
        '.games-menu__item.focus{border-color:#ffeb3b;background:rgba(255,235,59,0.12);transform:scale(1.03);}' +
        '.games-menu__icon{flex-shrink:0;width:64px;height:64px;border-radius:.5em;background:#1a1a2e;display:flex;align-items:center;justify-content:center;overflow:hidden;}' +
        '.games-menu__icon svg{width:60px;height:60px;}' +
        '.games-menu__body{flex:1;min-width:0;}' +
        '.games-menu__name{font-size:1.2em;font-weight:600;margin-bottom:.2em;}' +
        '.games-menu__desc{opacity:.6;font-size:.85em;}' +
        '.games-play{padding:0.2em;height:100%;box-sizing:border-box;}' +
        '.game-wrap{display:flex;flex-direction:column;align-items:center;color:#fff;height:100%;}' +
        '.game-info{display:flex;gap:0.6em;margin-bottom:0.3em;font-size:0.85em;flex-wrap:wrap;justify-content:center;line-height:1;}' +
        '.game-info span{padding:0.25em 0.5em;background:rgba(255,255,255,0.05);border-radius:.3em;}' +
        '.g-hint{opacity:.5;font-size:.9em;}' +
        '.game-canvas-wrap{position:relative;width:96vmin;height:calc(100vh - 60px);max-width:99vw;max-height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;touch-action:none;user-select:none;}' +
        '.game-canvas-wrap canvas{display:block;background:#111;border-radius:.5em;box-shadow:0 0 20px rgba(0,0,0,.5);touch-action:none;}' +
        '.game-overlay{position:absolute;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;background:rgba(0,0,0,.7);font-size:2em;text-align:center;border-radius:.5em;z-index:10;}' +
        '.game-overlay.show{display:flex;}' +
        '.g-sub{font-size:.5em;opacity:.7;display:block;margin-top:.5em;}' +
        '</style>';
        $('body').append(css);
    }

    function startPlugin() {
        injectCSS();
        Lampa.Component.add('games_menu', GamesMenuComponent);
        Lampa.Component.add('games_play', GamesPlayComponent);
        function addMenuItem() {
            var item = $('<li class="menu__item selector games-menu-item"><div class="menu__ico">' + GAMES_ICON + '</div><div class="menu__text">Ігри</div></li>');
            item.on('hover:enter', function () { Lampa.Activity.push({ url: '', title: 'Ігри', component: 'games_menu', page: 1 }); });
            $('.menu .menu__list').eq(0).append(item);
        }
        if (window.appready) addMenuItem();
        else Lampa.Listener.follow('app', function (e) { if (e.type === 'ready') addMenuItem(); });
    }

    if (window.Lampa && window.Lampa.Component) startPlugin();
    else { var iv = setInterval(function () { if (window.Lampa && window.Lampa.Component) { clearInterval(iv); startPlugin(); } }, 200); }

})();
