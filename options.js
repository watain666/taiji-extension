// Saves options to chrome.storage
const saveOptions = () => {
    const defaultTab = document.querySelector('input[name="defaultTab"]:checked').value;

    chrome.storage.sync.set(
        { defaultTab: defaultTab },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved';
            status.classList.remove('opacity-0');
            status.classList.add('opacity-100');

            setTimeout(() => {
                status.classList.remove('opacity-100');
                status.classList.add('opacity-0');
            }, 2000);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { defaultTab: 'gisu' }, // default value
        (items) => {
            document.querySelector(`input[name="defaultTab"][value="${items.defaultTab}"]`).checked = true;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
