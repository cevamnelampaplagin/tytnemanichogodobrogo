(function() {
    'use strict';

    var LAMPAC_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M20.331 14.644l-13.794-13.831 17.55 10.075zM2.938 0c-0.813 0.425-1.356 1.2-1.356 2.206v27.581c0 1.006 0.544 1.781 1.356 2.206l16.038-16zM29.512 14.1l-3.681-2.131-4.106 4.031 4.106 4.031 3.756-2.131c1.125-0.893 1.125-2.906-0.075-3.8zM6.538 31.188l17.55-10.075-3.756-3.756z" fill="currentColor"></path></svg>';

    var EXCLUDED_CLASSES = ['button--play', 'button--edit-order'];

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

    var currentButtons = [];
    var allButtonsCache = [];
    var allButtonsOriginal = [];
    var currentContainer = null;

    Lampa.Lang.add({
        custom_interface_plugin_button_order: {
            uk: 'Порядок кнопок',
            ru: 'Порядок кнопок',
            en: 'Buttons order'
        },
        custom_interface_plugin_button_view: {
            uk: 'Вигляд кнопок',
            ru: 'Вид кнопок',
            en: 'Buttons view'
        },
        custom_interface_plugin_standard: {
            uk: 'Стандартний',
            ru: 'Стандартный',
            en: 'Default'
        },
        custom_interface_plugin_icons_only: {
            uk: 'Тільки іконки',
            ru: 'Только иконки',
            en: 'Icons only'
        },
        custom_interface_plugin_with_text: {
            uk: 'Завжди з текстом',
            ru: 'С текстом',
            en: 'Always text'
        },
        custom_interface_plugin_reset_default: {
            uk: 'Скинути за замовчуванням',
            ru: 'Сбросить по умолчанию',
            en: 'Reset to default'
        },
        custom_interface_plugin_button_editor: {
            uk: 'Показати редактор кнопок',
            ru: 'Показать редактор кнопок',
            en: 'Show buttons editor'
        },
        custom_interface_plugin_button_editor_desc: {
            uk: 'Змінює відображення кнопок і тексту',
            ru: 'Изменяет отображение кнопок и текста',
            en: 'Changes the display of buttons and text'
        },
        custom_interface_plugin_options: {
            uk: 'Опції',
            ru: 'Опции',
            en: 'Options'
        },
        custom_interface_plugin_online: {
            uk: 'Дивитись',
            ru: 'Смотреть',
            en: 'Look'
        },
        custom_interface_plugin_torrent: {
            uk: 'Торенти',
            ru: 'Торренты',
            en: 'Torrents'
        },
        custom_interface_plugin_trailer: {
            uk: 'Трейлери',
            ru: 'Трейлеры',
            en: 'Trailers'
        },
        custom_interface_plugin_favorite: {
            uk: 'Обране',
            ru: 'Избранное',
            en: 'Favorites'
        },
        custom_interface_plugin_subscribe: {
            uk: 'Підписка',
            ru: 'Подписка',
            en: 'Subscriptions'
        },
        custom_interface_plugin_book: {
            uk: 'Закладки',
            ru: 'Закладки',
            en: 'Bookmarks'
        },
        custom_interface_plugin_reaction: {
            uk: 'Реакції',
            ru: 'Реакции',
            en: 'Reactions'
        },
        custom_interface_plugin_button_unknown: {
            uk: 'Кнопка',
            ru: 'Кнопка',
            en: 'Button'
        },
        custom_interface_plugin_create_folder: {
            uk: 'Створити папку',
            ru: 'Создать папку',
            en: 'Create folder'
        },
        custom_interface_plugin_folder: {
            uk: 'Папка',
            ru: 'Папка',
            en: 'Folder'
        },
        custom_interface_plugin_delete_folder: {
            uk: 'Видалити папку',
            ru: 'Удалить папку',
            en: 'Delete folder'
        },
        custom_interface_plugin_enter_folder_name: {
            uk: 'Введіть назву папки',
            ru: 'Введите название папки',
            en: 'Enter folder name'
        },
        custom_interface_plugin_move_to_folder: {
            uk: 'Перемістити в папку',
            ru: 'Переместить в папку',
            en: 'Move to folder'
        },
        custom_interface_plugin_remove_from_folder: {
            uk: 'Видалити з папки',
            ru: 'Удалить из папки',
            en: 'Remove from folder'
        },
        custom_interface_plugin_move_up: {
            uk: 'Перемістити вгору',
            ru: 'Переместить вверх',
            en: 'Move up'
        },
        custom_interface_plugin_move_down: {
            uk: 'Перемістити вниз',
            ru: 'Переместить вниз',
            en: 'Move down'
        },
        custom_interface_plugin_open_folder: {
            uk: 'Відкрити папку',
            ru: 'Открыть папку',
            en: 'Open folder'
        }
    });

    // Структура даних для папок
    function getFolders() {
        return Lampa.Storage.get('button_folders', []);
    }

    function setFolders(folders) {
        Lampa.Storage.set('button_folders', folders);
    }

    function getFolderStructure() {
        return Lampa.Storage.get('button_folder_structure', {
            order: [], // Масив ID: 'folder_X' або buttonId
            folders: {} // { folderId: { name: '', buttons: [] } }
        });
    }

    function setFolderStructure(structure) {
        Lampa.Storage.set('button_folder_structure', structure);
    }

    function generateFolderId() {
        return 'folder_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    }

    function findButton(btnId) {
        var btn = allButtonsOriginal.find(function(b) { return getButtonId(b) === btnId; });
        if (!btn) {
            btn = allButtonsCache.find(function(b) { return getButtonId(b) === btnId; });
        }
        return btn || null;
    }

    function getCustomOrder() {
        return Lampa.Storage.get('button_custom_order', []) || [];
    }

    function setCustomOrder(order) {
        Lampa.Storage.set('button_custom_order', order || []);
    }

    function getHiddenButtons() {
        return Lampa.Storage.get('button_hidden', []) || [];
    }

    function setHiddenButtons(hidden) {
        Lampa.Storage.set('button_hidden', hidden || []);
    }

    function getButtonId(button) {
        if (!button || !button.attr) return 'unknown';
        var classes = button.attr('class') || '';
        var text = button.find('span').text().trim().replace(/\s+/g, '_');
        var subtitle = button.attr('data-subtitle') || '';
        if (classes.indexOf('modss') !== -1 || text.indexOf('MODS') !== -1 || text.indexOf('MOD') !== -1) {
            return 'modss_online_button';
        }
        if (classes.indexOf('showy') !== -1 || text.indexOf('Showy') !== -1) {
            return 'showy_online_button';
        }
        if (classes.indexOf('button--options') !== -1) {
            return 'button--options';
        }
        var viewClasses = classes.split(' ').filter(function(c) { return c.indexOf('view--') === 0 || c.indexOf('button--') === 0; }).join('_');
        if (!viewClasses && !text) {
            return 'button_unknown';
        }
        var id = viewClasses + '_' + text;
        if (subtitle) {
            id = id + '_' + subtitle.replace(/\s+/g, '_').substring(0, 30);
        }
        return id;
    }

    function getButtonType(button) {
        if (!button) return 'other';
        var classes = button.attr('class') || '';
        for (var i = 0; i < DEFAULT_GROUPS.length; i++) {
            var group = DEFAULT_GROUPS[i];
            for (var j = 0; j < group.patterns.length; j++) {
                if (classes.indexOf(group.patterns[j]) !== -1) {
                    return group.name;
                }
            }
        }
        return 'other';
    }

    function isExcluded(button) {
        if (!button) return true;
        var classes = button.attr('class') || '';
        for (var i = 0; i < EXCLUDED_CLASSES.length; i++) {
            if (classes.indexOf(EXCLUDED_CLASSES[i]) !== -1) {
                return true;
            }
        }
        return false;
    }

    function categorizeButtons(container) {
        if (!container || !container.find) return { online: [], torrent: [], trailer: [], favorite: [], subscribe: [], book: [], reaction: [], other: [] };
        var allButtons = container.find('.full-start__button').not('.button--edit-order, .button--play');
        var categories = { online: [], torrent: [], trailer: [], favorite: [], subscribe: [], book: [], reaction: [], other: [] };
        allButtons.each(function() {
            var $btn = $(this);
            if (isExcluded($btn)) return;
            var type = getButtonType($btn);
            var ONLINE_SVG_VIEWBOX = '0 0 392.697 392.697';
            if (
                type === 'online' &&
                $btn.hasClass('lampac--button') &&
                !$btn.hasClass('modss--button') &&
                !$btn.hasClass('showy--button')
            ) {
                var svgElement = $btn.find('svg').first();
                if (
                    svgElement.length &&
                    svgElement.attr('viewBox') === ONLINE_SVG_VIEWBOX &&
                    !svgElement.data('lampacReplaced')
                ) {
                    svgElement.replaceWith(
                        $(LAMPAC_ICON).attr('data-lampac-icon', 'online')
                    );
                }
            }

            if (type === 'online') {
                var span = $btn.find('span');
                if (span.length) {
                    span.text(t('custom_interface_plugin_online'));
                } else {
                    $btn.append('<span>' + t('custom_interface_plugin_online') + '</span>');
                }
            }

            if ($btn.hasClass('button--options') && $btn.find('span').length === 0) {
                $btn.append('<span>' + t('custom_interface_plugin_options') + '</span>');
            }
            if (categories[type]) {
                categories[type].push($btn);
            } else {
                categories.other.push($btn);
            }
        });
        return categories;
    }

    function sortByFolderStructure(buttons) {
        if (!buttons || !Array.isArray(buttons)) return [];
        
        var structure = getFolderStructure();
        var order = structure.order || [];
        var folders = structure.folders || {};
        
        // Створюємо мапу кнопок для швидкого доступу
        var buttonMap = {};
        buttons.forEach(function(btn) {
            if (btn) {
                var id = getButtonId(btn);
                buttonMap[id] = btn;
            }
        });
        
        var result = [];
        
        // Проходимо по порядку зі структури
        order.forEach(function(itemId) {
            if (itemId.startsWith('folder_')) {
                // Це папка
                var folder = folders[itemId];
                if (folder) {
                    // Створюємо елемент папки
                    var folderElement = $('<div class="button-folder" data-folder-id="' + itemId + '"></div>');
                    var folderHeader = $('<div class="button-folder__header selector"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg><span>' + folder.name + '</span></div>');
                    var folderContent = $('<div class="button-folder__content"></div>');
                    
                    // Додаємо кнопки з папки
                    folder.buttons.forEach(function(buttonId) {
                        if (buttonMap[buttonId]) {
                            folderContent.append(buttonMap[buttonId].clone(true));
                        }
                    });
                    
                    folderElement.append(folderHeader).append(folderContent);
                    result.push(folderElement);
                }
            } else {
                // Це звичайна кнопка
                if (buttonMap[itemId]) {
                    // Перевіряємо, чи кнопка вже не додана в папку
                    var isInFolder = false;
                    for (var folderId in folders) {
                        if (folders[folderId].buttons.indexOf(itemId) !== -1) {
                            isInFolder = true;
                            break;
                        }
                    }
                    if (!isInFolder) {
                        result.push(buttonMap[itemId]);
                    }
                }
            }
        });
        
        // Додаємо кнопки, які не в порядку
        buttons.forEach(function(btn) {
            if (btn) {
                var id = getButtonId(btn);
                var isInOrder = order.indexOf(id) !== -1;
                var isInAnyFolder = false;
                
                for (var folderId in folders) {
                    if (folders[folderId].buttons.indexOf(id) !== -1) {
                        isInAnyFolder = true;
                        break;
                    }
                }
                
                if (!isInOrder && !isInAnyFolder) {
                    result.push(btn);
                }
            }
        });
        
        return result;
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
        btn.on('hover:enter', function() {
            openEditDialog();
        });
        var enabled = Lampa.Storage.get('buttons_editor_enabled', true);
        btn.toggle(enabled);
        return btn;
    }

    function saveOrder() {
        // Ця функція тепер зберігає структуру папок
        // Порядок зберігається в applyChanges
    }

    function applyChanges() {
        if (!currentContainer) return;
        
        var categories = categorizeButtons(currentContainer);
        var allButtons = []
            .concat(categories.online || [])
            .concat(categories.torrent || [])
            .concat(categories.trailer || [])
            .concat(categories.favorite || [])
            .concat(categories.subscribe || [])
            .concat(categories.book || [])
            .concat(categories.reaction || [])
            .concat(categories.other || []);
        
        allButtonsCache = allButtons;
        currentButtons = allButtons;
        
        var targetContainer = currentContainer.find('.full-start-new__buttons');
        if (!targetContainer || !targetContainer.length) return;
        
        targetContainer.find('.full-start__button').not('.button--edit-order').detach();
        targetContainer.find('.button-folder').remove();
        
        var sortedElements = sortByFolderStructure(allButtons);
        var visibleButtons = [];
        
        sortedElements.forEach(function(element) {
            targetContainer.append(element);
            if (element.hasClass('button-folder')) {
                // Для папок додаємо кнопки з вмісту
                element.find('.full-start__button').each(function() {
                    if (!$(this).hasClass('hidden')) {
                        visibleButtons.push($(this));
                    }
                });
            } else if (!element.hasClass('hidden')) {
                visibleButtons.push(element);
            }
        });
        
        applyButtonAnimation(visibleButtons);
        var editBtn = targetContainer.find('.button--edit-order');
        if (editBtn.length) {
            editBtn.detach();
            targetContainer.append(editBtn);
        }
        
        applyHiddenButtons(allButtons);
        var viewmode = Lampa.Storage.get('buttons_viewmode', 'default');
        targetContainer.removeClass('icons-only always-text');
        if (viewmode === 'icons') targetContainer.addClass('icons-only');
        if (viewmode === 'always') targetContainer.addClass('always-text');
        
        setTimeout(function() {
            if (currentContainer) {
                setupButtonNavigation(currentContainer);
            }
        }, 100);
    }

    function capitalize(str) {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function getButtonDisplayName(btn, allButtons) {
        if (!btn) return '';
        var text = btn.find('span').text().trim();
        var classes = btn.attr('class') || '';
        var subtitle = btn.attr('data-subtitle') || '';
        if (classes.indexOf('button--options') !== -1) {
            return t('custom_interface_plugin_options');
        }
        if (!text) {
            var viewClass = classes.split(' ').find(function(c) { return c.indexOf('view--') === 0 || c.indexOf('button--') === 0; });
            if (viewClass) {
                text = viewClass.replace('view--', '').replace('button--', '').replace(/_/g, ' ');
                text = capitalize(text);
            } else {
                text = t('custom_interface_plugin_button_unknown');
            }
            return text;
        }
        var sameTextCount = 0;
        if (allButtons) {
            allButtons.forEach(function(otherBtn) {
                if (otherBtn && otherBtn.find('span').text().trim() === text) {
                    sameTextCount++;
                }
            });
        }
        if (sameTextCount > 1) {
            if (subtitle) {
                return text + ' <span style="opacity:0.5">(' + subtitle.substring(0, 30) + ')</span>';
            }
            var viewClass = classes.split(' ').find(function(c) { return c.indexOf('view--') === 0; });
            if (viewClass) {
                var identifier = viewClass.replace('view--', '').replace(/_/g, ' ');
                identifier = capitalize(identifier);
                return text + ' <span style="opacity:0.5">(' + identifier + ')</span>';
            }
        }
        return text;
    }

    function openEditDialog() {
        if (currentContainer) {
            var categories = categorizeButtons(currentContainer);
            var allButtons = []
                .concat(categories.online || [])
                .concat(categories.torrent || [])
                .concat(categories.trailer || [])
                .concat(categories.favorite || [])
                .concat(categories.subscribe || [])
                .concat(categories.book || [])
                .concat(categories.reaction || [])
                .concat(categories.other || []);
            allButtonsCache = allButtons;
            currentButtons = allButtons;
        }
        
        var structure = getFolderStructure();
        var order = structure.order || [];
        var folders = structure.folders || {};
        
        var list = $('<div class="menu-edit-list"></div>');
        var hidden = getHiddenButtons();
        var modes = ['default', 'icons', 'always'];
        var currentMode = Lampa.Storage.get('buttons_viewmode', 'default');

        var modeBtn = $('<div class="selector viewmode-switch">' +
            '<div style="text-align: center; padding: 1em;">' + t('custom_interface_plugin_button_view') + ': ' + 
            (currentMode === 'default' ? t('custom_interface_plugin_standard') :
             currentMode === 'icons' ? t('custom_interface_plugin_icons_only') :
             t('custom_interface_plugin_with_text')) + '</div>' +
            '</div>');
        modeBtn.on('hover:enter', function() {
            var idx = modes.indexOf(currentMode);
            idx = (idx + 1) % modes.length;
            currentMode = modes[idx];
            Lampa.Storage.set('buttons_viewmode', currentMode);
            $(this).find('div').text(t('custom_interface_plugin_button_view') + ': ' + 
                (currentMode === 'default' ? t('custom_interface_plugin_standard') :
                 currentMode === 'icons' ? t('custom_interface_plugin_icons_only') :
                 t('custom_interface_plugin_with_text')));
            if (currentContainer) {
                var target = currentContainer.find('.full-start-new__buttons');
                if (target.length) {
                    target.removeClass('icons-only always-text');
                    if (currentMode === 'icons') target.addClass('icons-only');
                    if (currentMode === 'always') target.addClass('always-text');
                }
            }
        });
        list.append(modeBtn);

        // Функція для створення елемента папки
        function createFolderItem(folderId, folderData) {
            var item = $('<div class="menu-edit-list__item menu-edit-list__item-folder" data-folder-id="' + folderId + '">' +
                '<div class="menu-edit-list__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div>' +
                '<div class="menu-edit-list__title">' + folderData.name + ' (' + (folderData.buttons ? folderData.buttons.length : 0) + ')</div>' +
                '<div class="menu-edit-list__move move-up selector" title="' + t('custom_interface_plugin_move_up') + '">' +
                '<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
                '</svg>' +
                '</div>' +
                '<div class="menu-edit-list__move move-down selector" title="' + t('custom_interface_plugin_move_down') + '">' +
                '<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
                '</svg>' +
                '</div>' +
                '<div class="menu-edit-list__folder-open selector" title="' + t('custom_interface_plugin_open_folder') + '">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
                '</svg>' +
                '</div>' +
                '<div class="menu-edit-list__delete selector" title="' + t('custom_interface_plugin_delete_folder') + '">' +
                '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                '</svg>' +
                '</div>' +
                '</div>');
            
            item.find('.move-up').on('hover:enter', function() {
                var currentIndex = order.indexOf(folderId);
                if (currentIndex > 0) {
                    // Міняємо місцями з попереднім елементом
                    order[currentIndex] = order[currentIndex - 1];
                    order[currentIndex - 1] = folderId;
                    structure.order = order;
                    setFolderStructure(structure);
                    Lampa.Modal.close();
                    setTimeout(openEditDialog, 50);
                }
            });
            
            item.find('.move-down').on('hover:enter', function() {
                var currentIndex = order.indexOf(folderId);
                if (currentIndex < order.length - 1) {
                    // Міняємо місцями з наступним елементом
                    order[currentIndex] = order[currentIndex + 1];
                    order[currentIndex + 1] = folderId;
                    structure.order = order;
                    setFolderStructure(structure);
                    Lampa.Modal.close();
                    setTimeout(openEditDialog, 50);
                }
            });
            
            item.find('.folder-open').on('hover:enter', function() {
                openFolderDialog(folderId, folderData);
            });
            
            item.find('.menu-edit-list__delete').on('hover:enter', function() {
                // Видаляємо папку
                delete folders[folderId];
                // Видаляємо з порядку
                var index = order.indexOf(folderId);
                if (index !== -1) order.splice(index, 1);
                // Кнопки з папки переміщуються в корінь
                if (folderData.buttons && folderData.buttons.length > 0) {
                    folderData.buttons.forEach(function(buttonId) {
                        if (order.indexOf(buttonId) === -1) {
                            order.push(buttonId);
                        }
                    });
                }
                structure.order = order;
                structure.folders = folders;
                setFolderStructure(structure);
                Lampa.Modal.close();
                setTimeout(openEditDialog, 50);
            });
            
            return item;
        }

        // Функція для створення елемента кнопки
        function createButtonItem(btn) {
            if (!btn) return $();
            var displayName = getButtonDisplayName(btn, currentButtons);
            var icon = btn.find('svg').clone();
            var btnId = getButtonId(btn);
            var isHidden = hidden.indexOf(btnId) !== -1;
            
            // Перевіряємо, в якій папці знаходиться кнопка
            var currentFolderId = null;
            for (var folderId in folders) {
                if (folders[folderId].buttons && folders[folderId].buttons.indexOf(btnId) !== -1) {
                    currentFolderId = folderId;
                    break;
                }
            }
            
            var item = $('<div class="menu-edit-list__item" data-button-id="' + btnId + '">' +
                '<div class="menu-edit-list__icon"></div>' +
                '<div class="menu-edit-list__title">' + displayName + '</div>' +
                '<div class="menu-edit-list__move move-up selector" title="' + t('custom_interface_plugin_move_up') + '">' +
                '<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
                '</svg>' +
                '</div>' +
                '<div class="menu-edit-list__move move-down selector" title="' + t('custom_interface_plugin_move_down') + '">' +
                '<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
                '</svg>' +
                '</div>' +
                '<div class="menu-edit-list__toggle toggle selector" title="' + (currentFolderId ? t('custom_interface_plugin_remove_from_folder') : t('custom_interface_plugin_move_to_folder')) + '">' +
                '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>' +
                (currentFolderId ? 
                    '<path d="M7.5 13L11 16.5L18.5 9" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' :
                    '<path d="M13 8V13H18M8 13H13V18" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>') +
                '</svg>' +
                '</div>' +
                '<div class="menu-edit-list__hide selector" title="' + (isHidden ? t('custom_interface_plugin_with_text') : t('custom_interface_plugin_icons_only')) + '">' +
                '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>' +
                '<path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="' + (isHidden ? '0' : '1') + '" stroke-linecap="round"/>' +
                '</svg>' +
                '</div>' +
                '</div>');
            
            item.toggleClass('menu-edit-list__item-hidden', isHidden);
            item.find('.menu-edit-list__icon').append(icon);
            item.data('button', btn);
            item.data('buttonId', btnId);
            
            item.find('.move-up').on('hover:enter', function() {
                var currentIndex = order.indexOf(btnId);
                if (currentIndex > 0) {
                    // Міняємо місцями з попереднім елементом
                    order[currentIndex] = order[currentIndex - 1];
                    order[currentIndex - 1] = btnId;
                    structure.order = order;
                    setFolderStructure(structure);
                    Lampa.Modal.close();
                    setTimeout(openEditDialog, 50);
                }
            });
            
            item.find('.move-down').on('hover:enter', function() {
                var currentIndex = order.indexOf(btnId);
                if (currentIndex < order.length - 1) {
                    // Міняємо місцями з наступним елементом
                    order[currentIndex] = order[currentIndex + 1];
                    order[currentIndex + 1] = btnId;
                    structure.order = order;
                    setFolderStructure(structure);
                    Lampa.Modal.close();
                    setTimeout(openEditDialog, 50);
                }
            });
            
            item.find('.toggle').on('hover:enter', function() {
                if (currentFolderId) {
                    // Видаляємо з папки
                    var folderButtons = folders[currentFolderId].buttons;
                    var buttonIndex = folderButtons.indexOf(btnId);
                    if (buttonIndex !== -1) {
                        folderButtons.splice(buttonIndex, 1);
                        // Додаємо кнопку в порядок після папки
                        var folderIndex = order.indexOf(currentFolderId);
                        if (folderIndex !== -1 && order.indexOf(btnId) === -1) {
                            order.splice(folderIndex + 1, 0, btnId);
                        }
                    }
                } else {
                    // Показуємо меню вибору папки
                    openFolderSelectDialog(btnId);
                }
                structure.order = order;
                structure.folders = folders;
                setFolderStructure(structure);
                Lampa.Modal.close();
                setTimeout(openEditDialog, 50);
            });
            
            item.find('.menu-edit-list__hide').on('hover:enter', function() {
                var isNowHidden = !item.hasClass('menu-edit-list__item-hidden');
                item.toggleClass('menu-edit-list__item-hidden', isNowHidden);
                btn.toggleClass('hidden', isNowHidden);
                item.find('.dot').attr('opacity', isNowHidden ? '0' : '1');
                var hiddenList = getHiddenButtons();
                var index = hiddenList.indexOf(btnId);
                if (isNowHidden && index === -1) {
                    hiddenList.push(btnId);
                } else if (!isNowHidden && index !== -1) {
                    hiddenList.splice(index, 1);
                }
                setHiddenButtons(hiddenList);
            });
            
            return item;
        }

        // Додаємо кнопку створення папки
        var createFolderBtn = $('<div class="selector folder-create-button">' +
            '<div style="text-align: center; padding: 1em;">' + t('custom_interface_plugin_create_folder') + '</div>' +
            '</div>');
        createFolderBtn.on('hover:enter', function() {
            Lampa.Keyboard.open({
                title: t('custom_interface_plugin_enter_folder_name'),
                value: t('custom_interface_plugin_folder'),
                onBack: function() {},
                onEnter: function(name) {
                    if (name && name.trim()) {
                        var folderId = generateFolderId();
                        folders[folderId] = {
                            name: name.trim(),
                            buttons: []
                        };
                        order.push(folderId);
                        structure.order = order;
                        structure.folders = folders;
                        setFolderStructure(structure);
                        Lampa.Modal.close();
                        setTimeout(openEditDialog, 50);
                    }
                }
            });
        });
        list.append(createFolderBtn);

        // Додаємо елементи в порядку
        order.forEach(function(itemId) {
            if (itemId.startsWith('folder_')) {
                if (folders[itemId]) {
                    list.append(createFolderItem(itemId, folders[itemId]));
                }
            } else {
                var btn = findButton(itemId);
                if (btn) {
                    list.append(createButtonItem(btn));
                }
            }
        });

        // Додаємо кнопки, яких немає в порядку
        if (currentButtons) {
            currentButtons.forEach(function(btn) {
                if (btn) {
                    var btnId = getButtonId(btn);
                    if (order.indexOf(btnId) === -1) {
                        // Перевіряємо, чи кнопка не в папці
                        var isInFolder = false;
                        for (var folderId in folders) {
                            if (folders[folderId].buttons && folders[folderId].buttons.indexOf(btnId) !== -1) {
                                isInFolder = true;
                                break;
                            }
                        }
                        if (!isInFolder) {
                            list.append(createButtonItem(btn));
                        }
                    }
                }
            });
        }

        var resetBtn = $('<div class="selector folder-reset-button">' +
            '<div style="text-align: center; padding: 1em;">' + t('custom_interface_plugin_reset_default') + '</div>' +
            '</div>');
        resetBtn.on('hover:enter', function() {
            Lampa.Storage.set('button_custom_order', []);
            Lampa.Storage.set('button_hidden', []);
            Lampa.Storage.set('buttons_viewmode', 'default');
            Lampa.Storage.set('button_folder_structure', {
                order: [],
                folders: {}
            });
            Lampa.Modal.close();
            setTimeout(function() {
                if (currentContainer) {
                    reorderButtons(currentContainer);
                    refreshController();
                }
            }, 100);
        });
        list.append(resetBtn);

        Lampa.Modal.open({
            title: t('custom_interface_plugin_button_order'),
            html: list,
            size: 'small',
            scroll_to_center: true,
            onBack: function() {
                Lampa.Modal.close();
                applyChanges();
                if (Lampa.Controller) Lampa.Controller.toggle('full_start');
            }
        });
    }

    function openFolderDialog(folderId, folderData) {
        var list = $('<div class="menu-edit-list"></div>');
        
        var backBtn = $('<div class="selector folder-back-button">' +
            '<div style="text-align: center; padding: 1em;">← ' + t('custom_interface_plugin_back') + '</div>' +
            '</div>');
        backBtn.on('hover:enter', function() {
            Lampa.Modal.close();
            setTimeout(openEditDialog, 50);
        });
        list.append(backBtn);

        // Додаємо кнопки з папки
        if (folderData.buttons && folderData.buttons.length > 0) {
            folderData.buttons.forEach(function(buttonId, index) {
                var btn = findButton(buttonId);
                if (btn) {
                    var displayName = getButtonDisplayName(btn, currentButtons);
                    var icon = btn.find('svg').clone();
                    var isHidden = getHiddenButtons().indexOf(buttonId) !== -1;
                    
                    var item = $('<div class="menu-edit-list__item" data-button-id="' + buttonId + '">' +
                        '<div class="menu-edit-list__icon"></div>' +
                        '<div class="menu-edit-list__title">' + displayName + '</div>' +
                        '<div class="menu-edit-list__move move-up selector" title="' + t('custom_interface_plugin_move_up') + '">' +
                        '<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M2 12L11 3L20 12" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
                        '</svg>' +
                        '</div>' +
                        '<div class="menu-edit-list__move move-down selector" title="' + t('custom_interface_plugin_move_down') + '">' +
                        '<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M2 2L11 11L20 2" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
                        '</svg>' +
                        '</div>' +
                        '<div class="menu-edit-list__remove selector" title="' + t('custom_interface_plugin_remove_from_folder') + '">' +
                        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
                        '</svg>' +
                        '</div>' +
                        '<div class="menu-edit-list__hide selector">' +
                        '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                        '<rect x="1.89111" y="1.78369" width="21.793" height="21.793" rx="3.5" stroke="currentColor" stroke-width="3"/>' +
                        '<path d="M7.44873 12.9658L10.8179 16.3349L18.1269 9.02588" stroke="currentColor" stroke-width="3" class="dot" opacity="' + (isHidden ? '0' : '1') + '" stroke-linecap="round"/>' +
                        '</svg>' +
                        '</div>' +
                        '</div>');
                    
                    item.toggleClass('menu-edit-list__item-hidden', isHidden);
                    item.find('.menu-edit-list__icon').append(icon);
                    
                    item.find('.move-up').on('hover:enter', function() {
                        if (index > 0) {
                            var temp = folderData.buttons[index];
                            folderData.buttons[index] = folderData.buttons[index - 1];
                            folderData.buttons[index - 1] = temp;
                            var structure = getFolderStructure();
                            structure.folders[folderId] = folderData;
                            setFolderStructure(structure);
                            Lampa.Modal.close();
                            setTimeout(function() { openFolderDialog(folderId, folderData); }, 50);
                        }
                    });
                    
                    item.find('.move-down').on('hover:enter', function() {
                        if (index < folderData.buttons.length - 1) {
                            var temp = folderData.buttons[index];
                            folderData.buttons[index] = folderData.buttons[index + 1];
                            folderData.buttons[index + 1] = temp;
                            var structure = getFolderStructure();
                            structure.folders[folderId] = folderData;
                            setFolderStructure(structure);
                            Lampa.Modal.close();
                            setTimeout(function() { openFolderDialog(folderId, folderData); }, 50);
                        }
                    });
                    
                    item.find('.menu-edit-list__remove').on('hover:enter', function() {
                        // Видаляємо з папки
                        folderData.buttons.splice(index, 1);
                        var structure = getFolderStructure();
                        structure.folders[folderId] = folderData;
                        // Додаємо кнопку в загальний порядок
                        if (structure.order.indexOf(buttonId) === -1) {
                            var folderIndex = structure.order.indexOf(folderId);
                            if (folderIndex !== -1) {
                                structure.order.splice(folderIndex + 1, 0, buttonId);
                            }
                        }
                        setFolderStructure(structure);
                        Lampa.Modal.close();
                        setTimeout(function() { openFolderDialog(folderId, folderData); }, 50);
                    });
                    
                    item.find('.menu-edit-list__hide').on('hover:enter', function() {
                        var isNowHidden = !item.hasClass('menu-edit-list__item-hidden');
                        item.toggleClass('menu-edit-list__item-hidden', isNowHidden);
                        var hiddenList = getHiddenButtons();
                        var hiddenIndex = hiddenList.indexOf(buttonId);
                        if (isNowHidden && hiddenIndex === -1) {
                            hiddenList.push(buttonId);
                        } else if (!isNowHidden && hiddenIndex !== -1) {
                            hiddenList.splice(hiddenIndex, 1);
                        }
                        setHiddenButtons(hiddenList);
                    });
                    
                    list.append(item);
                }
            });
        } else {
            var emptyMsg = $('<div class="menu-edit-list__item" style="text-align: center; opacity: 0.7; padding: 2em;">' +
                t('custom_interface_plugin_no_buttons') + '</div>');
            list.append(emptyMsg);
        }

        Lampa.Modal.open({
            title: folderData.name,
            html: list,
            size: 'small',
            scroll_to_center: true,
            onBack: function() {
                Lampa.Modal.close();
                setTimeout(openEditDialog, 50);
            }
        });
    }

    function openFolderSelectDialog(buttonId) {
        var structure = getFolderStructure();
        var folders = structure.folders || {};
        var list = $('<div class="menu-edit-list"></div>');
        
        var backBtn = $('<div class="selector folder-back-button">' +
            '<div style="text-align: center; padding: 1em;">← ' + t('custom_interface_plugin_back') + '</div>' +
            '</div>');
        backBtn.on('hover:enter', function() {
            Lampa.Modal.close();
            setTimeout(openEditDialog, 50);
        });
        list.append(backBtn);

        // Додаємо список папок
        for (var folderId in folders) {
            var folderItem = $('<div class="selector menu-edit-list__item menu-edit-list__item-folder-select">' +
                '<div class="menu-edit-list__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg></div>' +
                '<div class="menu-edit-list__title">' + folders[folderId].name + '</div>' +
                '</div>');
            
            folderItem.on('hover:enter', function() {
                var selectedFolderId = $(this).closest('.menu-edit-list__item-folder-select').data('folder-id');
                if (folders[selectedFolderId]) {
                    // Додаємо кнопку в папку
                    if (!folders[selectedFolderId].buttons) {
                        folders[selectedFolderId].buttons = [];
                    }
                    if (folders[selectedFolderId].buttons.indexOf(buttonId) === -1) {
                        folders[selectedFolderId].buttons.push(buttonId);
                        // Видаляємо кнопку з загального порядку
                        var orderIndex = structure.order.indexOf(buttonId);
                        if (orderIndex !== -1) {
                            structure.order.splice(orderIndex, 1);
                        }
                        structure.folders = folders;
                        setFolderStructure(structure);
                    }
                    Lampa.Modal.close();
                    setTimeout(openEditDialog, 50);
                }
            }).data('folder-id', folderId);
            
            list.append(folderItem);
        }

        Lampa.Modal.open({
            title: t('custom_interface_plugin_move_to_folder'),
            html: list,
            size: 'small',
            scroll_to_center: true,
            onBack: function() {
                Lampa.Modal.close();
                setTimeout(openEditDialog, 50);
            }
        });
    }

    function reorderButtons(container) {
        if (!container) return false;
        var targetContainer = container.find('.full-start-new__buttons');
        if (!targetContainer.length) return false;
        currentContainer = container;
        container.find('.button--play, .button--edit-order, .button-folder').remove();
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
        allButtonsCache = allButtons;
        if (allButtonsOriginal.length === 0) {
            allButtons.forEach(function(btn) {
                if (btn) allButtonsOriginal.push(btn.clone(true, true));
            });
        }
        currentButtons = allButtons;
        targetContainer.children().detach();
        var visibleButtons = [];
        
        var sortedElements = sortByFolderStructure(allButtons);
        sortedElements.forEach(function(element) {
            targetContainer.append(element);
            if (element.hasClass('button-folder')) {
                element.find('.full-start__button').each(function() {
                    if (!$(this).hasClass('hidden')) {
                        visibleButtons.push($(this));
                    }
                });
            } else if (!element.hasClass('hidden')) {
                visibleButtons.push(element);
            }
        });
        
        var editButton = createEditButton();
        targetContainer.append(editButton);
        visibleButtons.push(editButton);
        
        applyHiddenButtons(allButtons);
        var viewmode = Lampa.Storage.get('buttons_viewmode', 'default');
        targetContainer.removeClass('icons-only always-text');
        if (viewmode === 'icons') targetContainer.addClass('icons-only');
        if (viewmode === 'always') targetContainer.addClass('always-text');
        
        applyButtonAnimation(visibleButtons);
        setTimeout(function() {
            setupButtonNavigation(container);
        }, 100);
        return true;
    }

    function setupButtonNavigation(container) {
        if (Lampa.Controller && typeof Lampa.Controller.toggle === 'function') {
            try {
                Lampa.Controller.toggle('full_start');
            } catch (e) {}
        }
    }

    function refreshController() {
        if (Lampa.Controller && typeof Lampa.Controller.toggle === 'function') {
            setTimeout(function() {
                try {
                    Lampa.Controller.toggle('full_start');
                    if (currentContainer) {
                        setTimeout(function() {
                            setupButtonNavigation(currentContainer);
                        }, 100);
                    }
                } catch (e) {}
            }, 50);
        }
    }

    function init() {
        var style = $('<style>' +
            '@keyframes button-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }' +
            '.full-start-new__buttons .full-start__button { opacity: 0; }' +
            '.full-start__button.hidden { display: none !important; }' +
            '.full-start-new__buttons { display: flex !important; flex-direction: row !important; flex-wrap: wrap !important; gap: 0.5em !important; }' +
            '.full-start-new__buttons.buttons-loading .full-start__button { visibility: hidden !important; }' +
            '.folder-reset-button, .folder-create-button, .folder-back-button { background: rgba(255, 255, 255, 0.3); margin-top: 1em; border-radius: 0.3em; }' +
            '.folder-reset-button.focus, .folder-create-button.focus, .folder-back-button.focus { border: 3px solid rgba(255,255,255,0.8); }' +
            '.menu-edit-list__toggle.focus, .menu-edit-list__hide.focus, .menu-edit-list__delete.focus, .menu-edit-list__folder-open.focus, .menu-edit-list__remove.focus { border: 2px solid rgba(255,255,255,0.8); border-radius: 0.3em; }' +
            '.full-start-new__buttons.icons-only .full-start__button span { display: none; }' +
            '.full-start-new__buttons.always-text .full-start__button span { display: block !important; }' +
            '.viewmode-switch { background: rgba(255, 255, 255, 0.3); margin: 0.5em 0 1em 0; border-radius: 0.3em; }' +
            '.viewmode-switch.focus { border: 3px solid rgba(255,255,255,0.8); }' +
            '.menu-edit-list__item-hidden { opacity: 0.5; }' +
            '.button-folder { margin-bottom: 0.5em; border: 1px solid rgba(255,255,255,0.2); border-radius: 0.5em; overflow: hidden; }' +
            '.button-folder__header { padding: 0.5em 1em; background: rgba(255,255,255,0.1); display: flex; align-items: center; gap: 0.5em; }' +
            '.button-folder__header svg { width: 20px; height: 20px; }' +
            '.button-folder__content { padding: 0.5em; display: flex; flex-wrap: wrap; gap: 0.5em; }' +
            '.menu-edit-list__item-folder .menu-edit-list__icon svg { width: 20px; height: 20px; }' +
            '.menu-edit-list__item-folder .menu-edit-list__title { font-weight: bold; }' +
            '.menu-edit-list__item-folder-select .menu-edit-list__icon svg { width: 20px; height: 20px; }' +
            '</style>');
        $('body').append(style);

        Lampa.Listener.follow('full', function(e) {
            if (e.type !== 'complite') return;
            var container = e.object && e.object.activity ? e.object.activity.render() : null;
            if (!container) return;
            var targetContainer = container.find('.full-start-new__buttons');
            if (targetContainer.length) {
                targetContainer.addClass('buttons-loading');
            }
            setTimeout(function() {
                try {
                    if (!container.data('buttons-processed')) {
                        container.data('buttons-processed', true);
                        if (reorderButtons(container)) {
                            if (targetContainer.length) {
                                targetContainer.removeClass('buttons-loading');
                            }
                            refreshController();
                        }
                    }
                } catch (err) {
                    console.error('Buttons editor plugin error:', err);
                    if (targetContainer.length) {
                        targetContainer.removeClass('buttons-loading');
                    }
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
                        if (currentValue) {
                            $('.button--edit-order').show();
                        } else {
                            $('.button--edit-order').hide();
                        }
                    }, 100);
                },
                onRender: function(element) {
                    setTimeout(function() {
                        var sizeEl = $('div[data-name="interface_size"]');
                        if (sizeEl.length) sizeEl.after(element);
                    }, 0);
                }
            });
        } catch (e) {
            console.error('SettingsApi error:', e);
        }
    }
    
    try {
        init();
    } catch (e) {
        console.error('Plugin init error:', e);
    }
    
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {};
    }
})();