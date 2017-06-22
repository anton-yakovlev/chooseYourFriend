// ----- Click listeners for all elements with delegation ----- //
const storageHelper = require('./storageHelper');
const viewHelper = require('./viewHelper');
const friendItemClassName = 'user-list__item';
const plusClassName = 'user-list__item-action_add';
const removeClassName = 'user-list__item-action_remove';
const reloadAfterErrorId = 'reloadAfterError';

class clickListeners {
    clickHandler(e) {
        let target = e.target;

        // ----- Click listener for plus button ----- //
        if (target.classList.contains(plusClassName)) {
            let currentFriendId = target.closest('.' + friendItemClassName).dataset.id;

            storageHelper.update(currentFriendId);
        }

        // ----- Click listener for remove button ----- //
        if (target.classList.contains(removeClassName)) {
            let currentFriendId = target.closest('.' + friendItemClassName).dataset.id;

            storageHelper.setToAllFriends(currentFriendId);
            viewHelper.addToSavedFriends();
        }

        // ----- Click listener for reload button after error ----- //
        if (target.id === reloadAfterErrorId) {
            location.reload();
        }
    }

    setHandlers() {
        document.body.addEventListener('click', this.clickHandler);
    }
}

module.exports = new clickListeners;