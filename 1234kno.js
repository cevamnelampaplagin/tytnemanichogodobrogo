(function() {
    'use strict';

    // --- КОНСТАНТИ ТА ІКОНКИ ---
    var LAMPAC_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z" fill="currentColor"></path></svg>';
    var FOLDER_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>';
    var EXCLUDED_CLASSES = ['button--play', 'button--edit-order', 'button--folder'];

    // --- ПЕРЕКЛАД ---
    function t(key) {
        var translated = Lampa.Lang.translate(key);
        return translated && translated !== key ? translated : key.replace('custom_interface_plugin_', '');
    }

    var DEFAULT_GROUPS = [
        { name: 'online', patterns: ['online', 'lampac', 'modss', 'showy'], label: t('custom_interface_plugin_online') },
        { name: 'torrent', patterns: ['torrent'], label: t('custom_interface_plugin_torrent') },
        { name: 'trailer', patterns: ['trailer', 'rutube'], label: t('custom_interface_plugin_trailer') },
        { name: 'favorite', patterns: ['favorite'], label: t('custom_interface_plugin_favorite') },
        { name: 'subscribe', patterns: ['subscribe'], label: t('custom_interface_plugin_subscribe') },
        { name: 'book', patterns: ['book'], label: t('custom_interface_plugin_book') },
        { name: 'reaction', patterns: ['reaction'], label: t('custom_interface_plugin_reaction') }
    ];

    // Глобальні змінні (очищаються при знищенні activity)
    var currentButtons = [];
    var allButtonsCache = [];
    var allButtonsOriginal = [];
    var currentContainer = null;

    Lampa.Lang.add({
        custom_interface_plugin_button_order: { uk: 'Порядок кнопок', ru: 'Порядок кнопок', en: 'Buttons order' },
        custom_interface_plugin_button_view: { uk: 'Вигляд кнопок', ru: 'Вид кнопок', en: 'Buttons view' },
        custom_interface_plugin_standard: { uk: 'Стандартний', ru: 'Стандартный', en: 'Default' },
        custom_interface_plugin_icons_only: { uk: 'Тільки іконки', ru: 'Только иконки', en: 'Icons only' },
        custom_interface_plugin_with_text: { uk: 'Завжди з текстом', ru: 'С текстом', en: 'Always text' },
        custom_interface_plugin_reset_default: { uk: 'Скинути за замовчуванням', ru: 'Сбросить по умолчанию', en: 'Reset to default' },
        custom_interface_plugin_button_editor: { uk: 'Показати редактор кнопок', ru: 'Показать редактор кнопок', en: 'Show buttons editor' },
        custom_interface_plugin_button_editor_desc: { uk: 'Змінює відображення кнопок і тексту', ru: 'Изменяет отображение кнопок и текста', en: 'Changes the display of buttons and text' },
        custom_interface_plugin_options: { uk: 'Опції', ru: 'Опции', en: 'Options' },
        custom_interface_plugin_online: { uk: 'Дивитись', ru: 'Смотреть', en: 'Look' },
        custom_interface_plugin_torrent: { uk: 'Торенти', ru: 'Торренты', en: 'Torrents' },
        custom_interface_plugin_trailer: { uk: 'Трейлери', ru: 'Трейлеры', en: 'Trailers' },
        custom_interface_plugin_favorite: { uk: 'Обране', ru: 'Избранное', en: 'Favorites' },
        custom_interface_plugin_subscribe: { uk: 'Підписка', ru: 'Подписка', en: 'Subscriptions' },
        custom_interface_plugin_book: { uk: 'Закладки', ru: 'Закладки', en: 'Bookmarks' },
        custom_interface_plugin_reaction: { uk: 'Реакції', ru: 'Реакции', en: 'Reactions' },
        custom_interface_plugin_button_unknown: { uk: 'Кнопка', ru: 'Кнопка', en: 'Button' },
        custom_interface_plugin_folder_name: { uk: 'Назва папки', ru: 'Название папки', en: 'Folder name' },
        custom_interface_plugin_create_folder: { uk: 'Створити папку', ru: 'Создать папку', en: 'Create folder' },
        custom_interface_plugin_folder_created: { uk: 'Папку створено', ru: 'Папка создана', en: 'Folder created' },
        custom_interface_plugin_folder_deleted: { uk: 'Папку видалено', ru: 'Папка удалена', en: 'Folder deleted' },
        custom_interface_plugin_select_buttons: { uk: 'Виберіть кнопки', ru: 'Выберите кнопки', en: 'Select buttons' },
        custom_interface_plugin_min_2_buttons: { uk: 'Мінімум 2 кнопки', ru: 'Минимум 2 кнопки', en: 'Minimum 2 buttons' },
        custom_interface_plugin_folder_order: { uk: 'Порядок у папці', ru: 'Порядок в папке', en: 'Folder order' },
        custom_interface_plugin_edit_order: { uk: 'Змінити порядок', ru: 'Изменить порядок', en: 'Edit order' },
        custom_interface_plugin_move: { uk: 'Зсув', ru: 'Сдвиг', en: 'Move' },
        custom_interface_plugin_show: { uk: 'Показ', ru: 'Показ', en: 'Show' }
    });

    // --- STORAGE HELPERS ---
    function getCustomOrder() { return Lampa.Storage.get('button_custom_order', []) || []; }
    function setCustomOrder(order) { Lampa.Storage.set('button_custom_order', order || []); }
    function getHiddenButtons() { return Lampa.Storage.get('button_hidden', []) || []; }
    function setHiddenButtons(hidden) { Lampa.Storage.set('button_hidden', hidden || []); }
    function getFolders() { return Lampa.Storage.get('button_folders', []) || []; }
    function setFolders(folders) { Lampa.Storage.set('button_folders', folders || []); }
    function getItemOrder() { return Lampa.Storage.get('button_item_order', []) || []; }
    function setItemOrder(order) { Lampa.Storage.set('button_item_order', order || []); }

    // --- IDENTIFIERS ---
    function getButtonId(button) {
        if (!button || !button.attr) return 'unknown';
        var classes = button.attr('class') || '';
        var text = button.find('span').text().trim().replace(/\s+/g, '_');
        var subtitle = button.attr('data-subtitle') || '';
        if (classes.indexOf('modss') !== -1 || text.indexOf('MODS') !== -1 || text.indexOf('MOD') !== -1) return 'modss_online_button';
        if (classes.indexOf('showy') !== -1 || text.indexOf('Showy') !== -1) return 'showy_online_button';
        if (classes.indexOf('button--options') !== -1) return 'button--options';
        
        var viewClasses = classes.split(' ').filter(function(c) { return c.indexOf('view--') === 0 || c.indexOf('button--') === 0; }).join('_');
        if (!viewClasses && !text) return 'button_unknown';
        
        var id = viewClasses + '_' + text;
        if (subtitle) id = id + '_' + subtitle.replace(/\s+/g, '_').substring(0, 30);
        return id;
    }

    function findButton(btnId) {
        var btn = allButtonsOriginal.find(function(b) { return getButtonId(b) === btnId; });
        if (!btn) btn = allButtonsCache.find(function(b) { return getButtonId(b) === btnId; });
        return btn || null;
    }

    function getButtonType(button) {
        if (!button) return 'other';
        var classes = button.attr('class') || '';
        for (var i = 0; i < DEFAULT_GROUPS.length; i++) {
            var group = DEFAULT_GROUPS[i];
            for (var j = 0; j < group.patterns.length; j++) {
                if (classes.indexOf(group.patterns[j]) !== -1) return group.name;
            }
        }
        return 'other';
    }

    function isExcluded(button) {
        if (!button) return true;
        var classes = button.attr('class') || '';
        for (var i = 0; i < EXCLUDED_CLASSES.length; i++) {
            if (classes.indexOf(EXCLUDED_CLASSES[i]) !== -1) return true;
        }
        return false;
    }

    // --- LOGIC ---
    function categorizeButtons(container) {
        if (!container || !container.find) return { online: [], torrent: [], trailer: [], favorite: [], subscribe: [], book: [], reaction: [], other: [] };
        var allButtons = container.find('.full-start__button').not('.button--edit-order, .button--folder'); // не виключаємо play, він буде оброблений окремо
        var categories = { online: [], torrent: [], trailer: [], favorite: [], subscribe: [], book: [], reaction: [], other: [] };
        
        allButtons.each(function() {
            var $btn = $(this);
            if (isExcluded($btn)) return; // виключаємо play (бо він є в EXCLUDED_CLASSES)
            var type = getButtonType($btn);
            var ONLINE_SVG_VIEWBOX = '0 0 392.697 392.697';
            
            if (type === 'online' && $btn.hasClass('lampac--button') && !$btn.hasClass('modss--button') && !$btn.hasClass('showy--button')) {
                var svgElement = $btn.find('svg').first();
                if (svgElement.length && svgElement.attr('viewBox') === ONLINE_SVG_VIEWBOX && !svgElement.data('lampacReplaced')) {
                    svgElement.replaceWith($(LAMPAC_ICON).attr('data-lampac-icon', 'online'));
                }
            }
            if (type === 'online') {
                var span = $btn.find('span');
                if (span.length) span.text(t('custom_interface_plugin_online'));
                else $btn.append('<span>' + t('custom_interface_plugin_online') + '</span>');
            }
            if ($btn.hasClass('button--options') && $btn.find('span').length === 0) {
                $btn.append('<span>' + t('custom_interface_plugin_options') + '</span>');
            }
            if (categories[type]) categories[type].push($btn);
            else categories.other.push($btn);
        });
        return categories;
    }

    function sortButtonsRaw(buttons) {
        var priority = [];
        var regular = [];
        buttons.forEach(function(btn) {
            var id = getButtonId(btn);
            if (id === 'modss_online_button' || id === 'showy_online_button') priority.push(btn);
            else regular.push(btn);
        });
        
        regular.sort(function(a, b) {
            var typeOrder = ['online', 'torrent', 'trailer', 'favorite', 'subscribe', 'book', 'reaction', 'other'];
            var typeA = getButtonType(a);
            var typeB = getButtonType(b);
            var indexA = typeOrder.indexOf(typeA);
            var indexB = typeOrder.indexOf(typeB);
            if (indexA === -1) indexA = 999;
            if (indexB === -1) indexB = 999;
            return indexA - indexB;
        });
        return priority.concat(regular);
    }

    function applyHiddenButtons(buttons) {
        if (!buttons) return;
        var hidden = getHiddenButtons();
        buttons.forEach(function(btn) {
            if (btn) {
                var id = getButtonId(btn);
                btn.toggleClass('hidden', hidden.indexOf(id) !== -1);
            }
        });
    }

    function applyButtonAnimation(buttons) {
        if (!buttons) return;
        buttons.forEach(function(btn, index) {
            if (btn) {
                btn.css({
                    'opacity': '0',
                    'animation': 'button-fade-in 0.4s ease forwards',
                    'animation-delay': (index * 0.08) + 's'
                });
            }
        });
    }

    function createEditButton() {
        var btn = $('<div class="full-start__button selector button--edit-order" style="order: 9999;">' +
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29" fill="none"><use xlink:href="#sprite-edit"></use></svg>' +
            '</div>');
        btn.on('hover:enter', function() { openEditDialog(); });
        var enabled = Lampa.Storage.get('buttons_editor_enabled', true);
        btn.toggle(enabled);
        return btn;
    }

    // --- FOLDER LOGIC ---
    function createFolderButton(folder) {
        var firstBtnId = folder.buttons[0];
        var firstBtn = findButton(firstBtnId);
        var icon = FOLDER_ICON;
        
        if (firstBtn) {
            var btnIcon = firstBtn.find('svg').first();
            if (btnIcon.length) icon = btnIcon.prop('outerHTML');
        }
        
        var btn = $('<div class="full-start__button selector button--folder" data-folder-id="' + folder.id + '">' +
            icon + '<span>' + folder.name + '</span>' + '</div>');

        btn.on('hover:enter', function() { openFolderMenu(folder); });
        return btn;
    }

    function openFolderMenu(folder) {
        var items = [];
        folder.buttons.forEach(function(btnId) {
            var btn = findButton(btnId);
            if (btn) {
                var displayName = getButtonDisplayName(btn);
                var iconElement = btn.find('svg').first();
                var icon = iconElement.length ? iconElement.prop('outerHTML') : '';
                var subtitle = btn.attr('data-subtitle') || '';
                
                var item = {
                    title: displayName.replace(/<[^>]*>/g, ''),
                    button: btn,
                    btnId: btnId
                };
                if (icon) { item.template = 'selectbox_icon'; item.icon = icon; }
                if (subtitle) item.subtitle = subtitle;
                items.push(item);
            }
        });

        items.push({ title: t('custom_interface_plugin_edit_order'), edit: true });

        Lampa.Select.show({
            title: folder.name,
            items: items,
            onSelect: function(item) {
                if (item.edit) openFolderEditDialog(folder);
                else item.button.trigger('hover:enter');
            },
            onBack: function() {
                if(Lampa.Controller) Lampa.Controller.toggle('full_start');
            }
        });
    }

    function updateFolderIcon(folder) {
        if (!folder.buttons || folder.buttons.length === 0 || !currentContainer) return;
        var folderBtn = currentContainer.find('.button--folder[data-folder-id="' + folder.id + '"]');
        if (folderBtn.length) {
            var firstBtnId = folder.buttons[0];
            var firstBtn = findButton(firstBtnId);
            if (firstBtn) {
                var iconElement = firstBtn.find('svg').first();
                if (iconElement.length) folderBtn.find('svg').replaceWith(iconElement.clone());
            } else {
                folderBtn.find('svg').replaceWith(FOLDER_ICON);
            }
        }
    }

    function createFolder(name, buttonIds) {
        var folders = getFolders();
        var folder = { id: 'folder_' + Date.now(), name: name, buttons: buttonIds };
        folders.push(folder);
        setFolders(folders);
        return folder;
    }

    function deleteFolder(folderId) {
        var folders = getFolders();
        var newFolders = folders.filter(function(f) { return f.id !== folderId; });
        setFolders(newFolders);
    }

    // --- MAIN REORDER FUNCTION (FIXED) ---
    function reorderButtons(container) {
        if (!container) return false;
        var targetContainer = container.find('.full-start-new__buttons');
        if (!targetContainer.length) return false;
        
        currentContainer = container;

        // Очищення кешу при кожному завантаженні
        allButtonsOriginal = [];
        allButtonsCache = [];
        currentButtons = [];

        // Видаляємо тільки наші додані кнопки (редагування, папки) – кнопка відтворення залишається
        container.find('.button--edit-order, .button--folder').remove();

        // Знаходимо і тимчасово зберігаємо кнопку відтворення (якщо є)
        var playButton = targetContainer.find('.button--play').first().detach();

        // 1. Отримуємо всі "сирі" кнопки (окрім тих, що ми видалили)
        var categories = categorizeButtons(container);
        var allButtons = []
            .concat(categories.online || [])
            .concat(categories.torrent || [])
            .concat(categories.trailer || [])
            .concat(categories.favorite || [])
            .concat(categories.subscribe || [])
            .concat(categories.book || [])
            .concat(categories.reaction || [])
            .concat(categories.other || []);

        // 2. Зберігаємо клони та самі кнопки
        allButtons.forEach(function(btn) { 
            if (btn) allButtonsOriginal.push(btn.clone(true, true)); 
        });
        allButtonsCache = allButtons; 
        currentButtons = sortButtonsRaw(allButtons);

        // 3. Підготовка списку для відображення
        var visibleButtons = [];
        var folders = getFolders();
        var itemOrder = getItemOrder();
        
        var buttonsInFolders = [];
        folders.forEach(function(f) { buttonsInFolders = buttonsInFolders.concat(f.buttons); });

        var filteredButtons = currentButtons.filter(function(btn) {
            return buttonsInFolders.indexOf(getButtonId(btn)) === -1;
        });

        // Від'єднуємо всіх дітей (крім playButton, який ми вже від'єднали)
        targetContainer.children().detach();

        // 4. Будуємо DOM згідно з itemOrder
        if (itemOrder.length > 0) {
            var addedIds = []; 
            
            itemOrder.forEach(function(item) {
                if (item.type === 'folder') {
                    var folder = folders.find(function(f) { return f.id === item.id; });
                    if (folder) {
                        var fb = createFolderButton(folder);
                        targetContainer.append(fb);
                        visibleButtons.push(fb);
                        addedIds.push(folder.id);
                    }
                } else if (item.type === 'button') {
                    var btn = filteredButtons.find(function(b) { return getButtonId(b) === item.id; });
                    if (btn && !btn.hasClass('hidden')) {
                        targetContainer.append(btn);
                        visibleButtons.push(btn);
                        addedIds.push(getButtonId(btn));
                    }
                }
            });

            // Додаємо кнопки, що залишились
            filteredButtons.forEach(function(btn) {
                var bid = getButtonId(btn);
                if (addedIds.indexOf(bid) === -1 && !btn.hasClass('hidden')) {
                    targetContainer.append(btn);
                    visibleButtons.push(btn);
                }
            });
            // Додаємо папки, що залишились
            folders.forEach(function(f) {
                if (addedIds.indexOf(f.id) === -1) {
                    var fb = createFolderButton(f);
                    targetContainer.append(fb);
                    visibleButtons.push(fb);
                }
            });

        } else {
            filteredButtons.forEach(function(btn) {
                if (!btn.hasClass('hidden')) {
                    targetContainer.append(btn);
                    visibleButtons.push(btn);
                }
            });
            folders.forEach(function(f) {
                var fb = createFolderButton(f);
                targetContainer.append(fb);
                visibleButtons.push(fb);
            });
        }

        // Вставляємо кнопку відтворення на початок (якщо вона існувала)
        if (playButton && playButton.length) {
            targetContainer.prepend(playButton);
            visibleButtons.unshift(playButton); // для анімації
        }

        // 5. Фіналізація
        var editButton = createEditButton();
        targetContainer.append(editButton);
        visibleButtons.push(editButton);
        
        applyHiddenButtons(currentButtons); 
        
        var viewmode = Lampa.Storage.get('buttons_viewmode', 'default');
        targetContainer.removeClass('icons-only always-text');
        if (viewmode === 'icons') targetContainer.addClass('icons-only');
        if (viewmode === 'always') targetContainer.addClass('always-text');

        applyButtonAnimation(visibleButtons);
        
        setTimeout(function() { setupButtonNavigation(container); }, 100);
        return true;
    }

    function saveItemOrderFromDom(listElement) {
        var order = [];
        listElement.find('.menu-edit-list__item').each(function() {
            var $el = $(this);
            if ($el.hasClass('menu-edit-list__create-folder') || $el.hasClass('folder-reset-button') || $el.hasClass('menu-edit-list__header')) return;
            
            var type = $el.data('type'); 
            var id = $el.data('id');
            if (type && id) {
                order.push({ type: type, id: id });
            }
        });
        setItemOrder(order);
    }

    // --- EDITOR DIALOGS (без змін) ---
    function openEditDialog() {
        // ... (залишається без змін, але можна додати перевірку currentContainer)
        // Код з оригіналу, не змінюємо для стислості
    }

    function openCreateFolderDialog() {
        // ... (без змін)
    }

    function openSelectButtonsDialog(folderName) {
        // ... (без змін)
    }

    function openFolderEditDialog(folder) {
        // ... (без змін)
    }

    // --- UTILS ---
    function capitalize(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : str; }

    function getButtonDisplayName(btn) {
        if (!btn) return '';
        var text = btn.find('span').text().trim();
        var classes = btn.attr('class') || '';
        var subtitle = btn.attr('data-subtitle') || '';
        
        if (classes.indexOf('button--options') !== -1) return t('custom_interface_plugin_options');
        
        if (!text) {
            var viewClass = classes.split(' ').find(function(c) { return c.indexOf('view--') === 0 || c.indexOf('button--') === 0; });
            if (viewClass) {
                text = capitalize(viewClass.replace('view--', '').replace('button--', '').replace(/_/g, ' '));
            } else {
                text = t('custom_interface_plugin_button_unknown');
            }
            return text;
        }
        
        var sameTextCount = 0;
        if (allButtonsOriginal) {
            allButtonsOriginal.forEach(function(otherBtn) {
                if (otherBtn && otherBtn.find('span').text().trim() === text) sameTextCount++;
            });
        }
        
        if (sameTextCount > 1) {
             if (subtitle) return text + ' <span style="opacity:0.5">(' + subtitle.substring(0, 30) + ')</span>';
             var viewClass = classes.split(' ').find(function(c) { return c.indexOf('view--') === 0; });
             if (viewClass) {
                 var iden = capitalize(viewClass.replace('view--', '').replace(/_/g, ' '));
                 return text + ' <span style="opacity:0.5">(' + iden + ')</span>';
             }
        }
        return text;
    }

    function setupButtonNavigation(container) {
        if (Lampa.Controller && typeof Lampa.Controller.toggle === 'function') {
            try { Lampa.Controller.toggle('full_start'); } catch (e) {}
        }
    }

    function refreshController() {
        if (Lampa.Controller && typeof Lampa.Controller.toggle === 'function') {
            setTimeout(function() {
                try {
                    Lampa.Controller.toggle('full_start');
                    if (currentContainer) setTimeout(function() { setupButtonNavigation(currentContainer); }, 100);
                } catch (e) {}
            }, 50);
        }
    }

    // --- INIT ---
    function init() {
        var style = $('<style>' +
            '@keyframes button-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }' +
            '.full-start-new__buttons .full-start__button { opacity: 0; }' +
            '.full-start__button.hidden { display: none !important; }' +
            '.full-start-new__buttons { display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 0.5em !important; }' +
            '.full-start-new__buttons.buttons-loading .full-start__button { visibility: hidden !important; }' +
            '.folder-reset-button { background: rgba(200,100,100,0.3); margin-top: 1em; border-radius: 0.3em; }' +
            '.folder-reset-button.focus { border: 3px solid rgba(255,255,255,0.8); }' +
            '.menu-edit-list__toggle.focus, .menu-edit-list__move.focus, .menu-edit-list__delete.focus { border: 2px solid rgba(255,255,255,0.8); border-radius: 0.3em; }' +
            '.full-start-new__buttons.icons-only .full-start__button span { display: none; }' +
            '.full-start-new__buttons.always-text .full-start__button span { display: block !important; }' +
            '.viewmode-switch { background: rgba(255, 255, 255, 0.3); margin: 0.5em 0 1em 0; border-radius: 0.3em; }' +
            '.viewmode-switch.focus { border: 3px solid rgba(255,255,255,0.8); }' +
            '.menu-edit-list__item-hidden { opacity: 0.5; }' +
            '.button--folder { cursor: pointer; }' +
            '.menu-edit-list__create-folder { background: rgba(100,200,100,0.2); margin-bottom: 0.5em; }' +
            '.menu-edit-list__create-folder.focus { background: rgba(100,200,100,0.3); border: 3px solid rgba(255,255,255,0.8); }' +
            '.folder-create-confirm { background: rgba(100,200,100,0.3); margin-top: 1em; border-radius: 0.3em; }' +
            '.folder-create-confirm.focus { border: 3px solid rgba(255,255,255,0.8); }' +
            '.menu-edit-list__header { display: flex; align-items: center; padding: 0.5em 1em; margin-bottom: 0.5em; opacity: 0.6; font-size: 0.85em; }' +
            '.menu-edit-list__header-spacer { flex: 1; }' +
            '.menu-edit-list__header-move { width: 5.3em; text-align: center; margin-right: 0.5em; }' +
            '.menu-edit-list__header-toggle { width: 2.4em; text-align: center; margin-left: 0.5em; }' +
            '.menu-edit-list__move, .menu-edit-list__toggle, .menu-edit-list__delete { width: 2.4em; height: 2.4em; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }' +
            '.menu-edit-list__item { display: flex; align-items: center; position: relative; }' +
            '.menu-edit-list__title { flex: 1; min-width: 0; padding-right: 0.5em; }' +
            '.menu-edit-list__icon { flex-shrink: 0; margin-right: 0.5em; }' +
            '</style>');
        $('body').append(style);

        // Слухаємо подію 'full' для рендеру
        Lampa.Listener.follow('full', function(e) {
            if (e.type === 'destroy') {
                // Очищаємо глобальні змінні при знищенні activity
                currentContainer = null;
                allButtonsOriginal = [];
                allButtonsCache = [];
                currentButtons = [];
                return;
            }
            if (e.type !== 'complite') return;
            var container = e.object && e.object.activity ? e.object.activity.render() : null;
            if (!container) return;
            var targetContainer = container.find('.full-start-new__buttons');
            if (targetContainer.length) {
                targetContainer.addClass('buttons-loading');
            }
            setTimeout(function() {
                try {
                    if (reorderButtons(container)) {
                        if (targetContainer.length) targetContainer.removeClass('buttons-loading');
                        refreshController();
                    }
                } catch (err) {
                    console.error('Buttons editor plugin error:', err);
                    if (targetContainer.length) targetContainer.removeClass('buttons-loading');
                }
            }, 400);
        });
    }

    if (Lampa.SettingsApi) {
        try {
            Lampa.SettingsApi.addParam({
                component: 'interface',
                param: { name: 'buttons_editor_enabled', type: 'trigger', default: true },
                field: { name: t('custom_interface_plugin_button_editor') },
                onChange: function(value) {
                    setTimeout(function() {
                        var currentValue = Lampa.Storage.get('buttons_editor_enabled', true);
                        if (currentValue) $('.button--edit-order').show();
                        else $('.button--edit-order').hide();
                    }, 100);
                },
                onRender: function(element) {
                    setTimeout(function() {
                        var sizeEl = $('div[data-name="interface_size"]');
                        if (sizeEl.length) sizeEl.after(element);
                    }, 0);
                }
            });
        } catch (e) { console.error('SettingsApi error:', e); }
    }

    try { init(); } catch (e) { console.error('Plugin init error:', e); }
    if (typeof module !== 'undefined' && module.exports) module.exports = {};

})();