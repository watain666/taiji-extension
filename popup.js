document.addEventListener('DOMContentLoaded', async () => {
    const iframe = document.querySelector('iframe');
    const defaultUrl = 'https://ji.taioan.org/';

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab?.id) {
            iframe.src = defaultUrl;
            return;
        }

        const result = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => window.getSelection().toString()
        });

        const selection = result[0]?.result;

        if (selection && selection.trim()) {
            chrome.storage.sync.get({ defaultTab: 'gisu' }, (items) => {
                iframe.src = `https://ji.taioan.org/chhoe/?x=${encodeURIComponent(selection.trim())}&tab=${items.defaultTab}`;
            });
        } else {
            iframe.src = defaultUrl;
        }
    } catch (e) {
        console.error('Failed to get selection:', e);
        iframe.src = defaultUrl;
    }
});
