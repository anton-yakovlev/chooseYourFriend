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
    /*_generateFriend(friend, action) {
        if (!friend) {
            return;
        }

        let templateFn = handlebars.compile(helpers.templatesHelper.getFriendTemplate());

        friend.action = action;

        return templateFn(friend);
    }*/

    // ----- Show all friends in left panel----- //
    showAllFriends(friends) {
        let html;

        friends.items.forEach((friend) => {
            friend.action = ACTIONS_ADD;
            html += friendItem(friend);
        });

        allFriendsListElement.innerHTML = html;
    }

    // ----- Show saved friends in right panel----- //
    showAllSavedFriends(friends) {
        let html;

        friends.items.forEach((friend) => {
            friend.action = ACTIONS_REMOVE;
            html += friendItem(friend);
        });

        savedFriendsListElement.innerHTML = html;
    }

   /* addToAllFriends(friend) {
        const allFriendsListElement = document.getElementById('allFriendsList');
        let htmlElement = _generateFriend(friend, ACTIONS.ADD);

        _removeSavedAllFriends(friend);
        allFriendsListElement.append(htmlElement);
    }

    static removeFromAllFriends(friend) {
        const allFriendsListElement = document.getElementById('allFriendsList');
        const querySelector = '[data-id="' + friend.id + '"]';
        const friendElement = allFriendsListElement.querySelector(querySelector);

        if (friendElement) {
            friendElement.remove();
        }
    }

    addToSavedFriends(friend) {
        const savedFriendsListElement = document.getElementById('savedFriendsList');
        let htmlElement = _generateFriend(friend, ACTIONS.ADD);

        removeFromAllFriends(friend);
        savedFriendsListElement.append(htmlElement);
    }

    static removeSavedAllFriends(friend) {
        const savedFriendsListElement = document.getElementById('savedFriendsList');
        const querySelector = '[data-id="' + friend.id + '"]';
        const friendElement = savedFriendsListElement.querySelector(querySelector);

        if (friendElement) {
            friendElement.remove();
        }
    }*/

    showError(message) {
        friendAppElement.innerHTML = errorTemplate({
            message: 'Ошибка: ' + message || DEFAULT_ERROR_TEXT
        });
    }
}

module.exports = new viewHelper;