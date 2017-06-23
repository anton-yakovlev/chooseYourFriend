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
const userListClassName = 'friend-app__columns-item-body-inner';
const dndUserListEnterClassName = 'friend-app__columns-item-body-inner_dnd-enter';
const dndProcessClassName = 'user-list__item_dnd';
const listNormalize = {
    allFriendsList: STORAGE_ALL,
    savedFriendsList: STORAGE_SAVED
};

class Listeners {
    moveFriend(targetElement, source, destination) {
        let currentFriendId = targetElement.closest('.' + friendItemClassName).dataset.id;
        let sourceItems = storageHelper.getCurrentStorage(source) || [];
        let destinationItems = storageHelper.getCurrentStorage(destination) || [];
        let currentFriendIndex;
        let currentFriend = sourceItems.find((item, index) => {
            let isFound = item.id.toString() === currentFriendId;

            if (isFound) {
                currentFriendIndex = index;
            }

            return isFound;
        });

        sourceItems.splice(currentFriendIndex, 1);
        destinationItems.push(currentFriend);

        storageHelper.setCurrentStorage(sourceItems, source);
        storageHelper.setCurrentStorage(destinationItems, destination);

        viewHelper.renderFriends(sourceItems, source);
        viewHelper.renderFriends(destinationItems, destination);
    }

    clickHandler(e) {
        let target = e.target;

        // ----- Click listener for plus button ----- //
        if (target.classList.contains(plusClassName)) {
            this.moveFriend(target, STORAGE_ALL, STORAGE_SAVED);
        }

        // ----- Click listener for remove button ----- //
        if (target.classList.contains(removeClassName)) {
            this.moveFriend(target, STORAGE_SAVED, STORAGE_ALL);
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
            target.classList.add(dndProcessClassName);
            e.dataTransfer.setData('text', target.dataset.id);
        }
    }

    dragOverHandler(e) {
        let target = e.target;
        let isPositionInsideList = !!target.closest('.' + userListClassName);

        if (isPositionInsideList) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }
    }

    dragEnterHandler(e) {
        let target = e.target;
        let isPositionInsideList = !!target.closest('.' + userListClassName);

        // ----- Drag enter listener for friend item ----- //
        if (isPositionInsideList) {
            target.classList.add(dndUserListEnterClassName);
        }
    }

    dragEndHandler() {
        let allFriends = document.body.querySelectorAll('.' + dndProcessClassName);
        let allInners = document.body.querySelectorAll('.' + dndUserListEnterClassName);

        if (allFriends) {
            allFriends.forEach(item => {
                item.classList.remove(dndProcessClassName);
            })
        }

        if (allInners) {
            allInners.forEach(item => {
                item.classList.remove(dndUserListEnterClassName);
            })
        }
    }

    dropHandler(e) {
        let friendId = e.dataTransfer.getData('text');
        let friendElement = document.querySelector('[data-id="'+ friendId + '"]');
        let sourceId = friendElement.closest('.' + userListClassName).id;
        let destinationId = e.target.closest('.' + userListClassName).id;

        if (sourceId === destinationId) {
            return;
        }

        this.moveFriend(friendElement, listNormalize[sourceId], listNormalize[destinationId]);
        this.dragEndHandler();
    }

    setHandlers() {
        document.body.addEventListener('click', (e) => this.clickHandler(e));
        document.body.addEventListener('dragstart', (e) => this.dragStartHandler(e));
        document.body.addEventListener('dragover', (e) => this.dragOverHandler(e));
        document.body.addEventListener('dragenter', (e) => this.dragEnterHandler(e));
        document.body.addEventListener('dragend', (e) => this.dragEndHandler(e));
        document.body.addEventListener('drop', (e) => this.dropHandler(e));
    }
}

module.exports = new Listeners;