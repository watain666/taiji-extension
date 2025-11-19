// Initialize context menus
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.removeAll(() => {
        // Original action
        chrome.contextMenus.create({
            id: 'taijichhan',
            title: '開台字田佇新頁面',
            contexts: ['action']
        });

        // Selection context menus
        chrome.contextMenus.create({
            id: 'gisu',
            title: 'Gí-sû 語詞',
            contexts: ['selection']
        });

        chrome.contextMenus.create({
            id: 'ji',
            title: 'Jī 字',
            contexts: ['selection']
        });

        // Action context menus (same functionality as selection)
        chrome.contextMenus.create({
            id: 'gisu_action',
            title: 'Gí-sû 語詞',
            contexts: ['action']
        });

        chrome.contextMenus.create({
            id: 'ji_action',
            title: 'Jī 字',
            contexts: ['action']
        });
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    let menuItemId = info.menuItemId;
    let selection = info.selectionText;

    // Handle action context clicks (try to get selection from active tab)
    if (menuItemId.endsWith('_action')) {
        menuItemId = menuItemId.replace('_action', '');

        if (!selection && tab?.id) {
            try {
                const results = await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => window.getSelection().toString()
                });
                selection = results[0]?.result;
            } catch (e) {
                console.warn('Failed to get selection from active tab:', e);
            }
        }
    }

    let url;
    if (selection && selection.trim()) {
        url = `https://ji.taioan.org/chhoe/?x=${encodeURIComponent(selection.trim())}&tab=${menuItemId}`;
    } else {
        url = 'https://ji.taioan.org/';
    }

    chrome.tabs.create({ url });
});
