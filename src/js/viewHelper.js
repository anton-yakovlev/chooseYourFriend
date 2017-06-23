// ----- All view methods ----- //
const friendItem = require('./../hbs/friendItem.hbs');
const errorTemplate = require('./../hbs/error.hbs');
const ACTIONS_ADD = 'add';
const ACTIONS_REMOVE = 'remove';
const allFriendsListElement = document.getElementById('allFriendsList');
const savedFriendsListElement = document.getElementById('savedFriendsList');
const friendAppElement = document.getElementById('friendAppContainer');
const DEFAULT_ERROR_TEXT = 'Что-то пошло не так, пожалуйста, попробуйте перезагрузить страницу';

class viewHelper {
    // ----- Show all friends in left panel----- //
    showAllFriends(friends) {
        let html = '';

        allFriendsListElement.innerHTML = '';

        friends.forEach((friend) => {
            friend.action = ACTIONS_ADD;
            html += friendItem(friend);
        });

        allFriendsListElement.innerHTML = html;
    }

    // ----- Show saved friends in right panel----- //
    showSavedFriends(friends) {
        let html = '';

        savedFriendsListElement.innerHTML = '';

        friends.forEach((friend) => {
            friend.action = ACTIONS_REMOVE;
            html += friendItem(friend);
        });

        savedFriendsListElement.innerHTML = html;
    }

    // ----- Show error ----- //
    showError(message) {
        friendAppElement.innerHTML = errorTemplate({
            message: 'Ошибка: ' + message || DEFAULT_ERROR_TEXT
        });
    }
}

module.exports = new viewHelper;