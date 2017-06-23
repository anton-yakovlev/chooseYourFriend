// ----- Click listeners for all elements with delegation ----- //
const storageHelper = require('./storageHelper');
const viewHelper = require('./viewHelper');
const friendItemClassName = 'user-list__item';
const plusClassName = 'user-list__item-action_add';
const removeClassName = 'user-list__item-action_remove';
const reloadAfterErrorId = 'reloadAfterError';
const saveButtonId = 'saveButton';
const STORAGE_ALL = 'allFriends';
const STORAGE_SAVED = 'savedFriends';

class Listeners {
    clickHandler(e) {
        let target = e.target;

        // ----- Click listener for plus button ----- //
        if (target.classList.contains(plusClassName)) {
            let currentFriendId = target.closest('.' + friendItemClassName).dataset.id;
            let allFriendsStorage = storageHelper.getCurrentStorage(STORAGE_ALL) || [];
            let savedFriendsStorage = storageHelper.getCurrentStorage(STORAGE_SAVED) || [];
            let currentFriendIndex;
            let currentFriend = allFriendsStorage.find((item, index) => {
                let isFound = item.id.toString() === currentFriendId;

                if (isFound) {
                    currentFriendIndex = index;
                }

                return isFound;
            });

            allFriendsStorage.splice(currentFriendIndex, 1);
            savedFriendsStorage.push(currentFriend);

            storageHelper.setCurrentStorage(allFriendsStorage, STORAGE_ALL);
            storageHelper.setCurrentStorage(savedFriendsStorage, STORAGE_SAVED);
            storageHelper.getCurrentStorage(STORAGE_SAVED);

            viewHelper.showAllFriends(allFriendsStorage);
            viewHelper.showSavedFriends(savedFriendsStorage);
        }

        // ----- Click listener for remove button ----- //
        if (target.classList.contains(removeClassName)) {
            let currentFriendId = target.closest('.' + friendItemClassName).dataset.id;
            let allFriendsStorage = storageHelper.getCurrentStorage(STORAGE_ALL) || [];
            let savedFriendsStorage = storageHelper.getCurrentStorage(STORAGE_SAVED) || [];
            let currentFriendIndex;

            let currentFriend = savedFriendsStorage.find((item, index) => {
                let isFound = item.id.toString() === currentFriendId;

                if (isFound) {
                    currentFriendIndex = index;
                }

                return isFound;
            });

            savedFriendsStorage.splice(currentFriendIndex, 1);
            allFriendsStorage.push(currentFriend);

            storageHelper.setCurrentStorage(allFriendsStorage, STORAGE_ALL);
            storageHelper.setCurrentStorage(savedFriendsStorage, STORAGE_SAVED);

            viewHelper.showAllFriends(allFriendsStorage);
            viewHelper.showSavedFriends(savedFriendsStorage);
        }

        // ----- Click listener for reload button after error ----- //
        if (target.id === reloadAfterErrorId) {
            location.reload();
        }

        // ----- Click listener for SAVE button ----- //
        if (target.id === saveButtonId) {
            storageHelper.saveLocalStorage();
        }
    }

    dragStartHandler(e) {
        let target = e.target;

        // ----- Drag start listener for friend item ----- //
        if (target.classList.contains(friendItemClassName)) {

        }
    }

    setHandlers() {
        document.body.addEventListener('click', this.clickHandler);
        document.body.addEventListener('dragstart', this.dragStartHandler);
    }
}

module.exports = new Listeners;