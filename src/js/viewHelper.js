// ----- All view methods ----- //
const friendItem = require('./../hbs/friendItem.hbs');
const errorTemplate = require('./../hbs/error.hbs');
const ACTIONS_ADD = 'add';
const ACTIONS_REMOVE = 'remove';
const STORAGE_ALL = 'allFriends';
const STORAGE_SAVED = 'savedFriends';
const allFriendsListElement = document.querySelector('#allFriendsList .user-list');
const savedFriendsListElement = document.querySelector('#savedFriendsList .user-list');
const friendAppElement = document.getElementById('friendAppContainer');
const DEFAULT_ERROR_TEXT = 'Что-то пошло не так, пожалуйста, попробуйте перезагрузить страницу';
const listElements = {
    [STORAGE_ALL]: {
        element: allFriendsListElement,
        action: ACTIONS_ADD
    },
    [STORAGE_SAVED]: {
        element: savedFriendsListElement,
        action: ACTIONS_REMOVE
    }
};

class ViewHelper {
    // ----- Show all friends in left panel----- //
    renderFriends(friends, storageName) {
        let html = '';

        listElements[storageName].element.innerHTML = '';

        friends.forEach((friend) => {
            friend.action = listElements[storageName].action;
            html += friendItem(friend);
        });

        listElements[storageName].element.innerHTML = html;
    }

    // ----- Show error ----- //
    showError(message) {
        friendAppElement.innerHTML = errorTemplate({
            message: 'Ошибка: ' + message || DEFAULT_ERROR_TEXT
        });
    }
}

module.exports = new ViewHelper;