function viewHelper() {
    const ACTIONS = {
        ADD: 'add',
        REMOVE: 'remove'
    };

    function _init() {
        const handlebars = require('handlebars');
        const templatesHelper = require('./templatesHelper');

        return {
            handlebars: handlebars,
            templatesHelper: templatesHelper
        }
    }

    function _generateFriend(friend, action) {
        let helpers = _init();
        let templateFn = helpers.handlebars.compile(helpers.templatesHelper.getFriendTemplate());

        friend.action = action;

        return templateFn(friend);
    }

    // ----- Show all friends in left panel----- //
    function showAllFriends(friends) {
        const allFriendsListElement = document.getElementById('allFriendsList');
        let html;

        friends.items.forEach((friend) => {
            html += _generateFriend(friend, ACTIONS.ADD);
        });

        allFriendsListElement.innerHTML = html;
    }

    // ----- Show saved friends in right panel----- //
    function showAllSavedFriends(friends) {
        const savedFriendsListElement = document.getElementById('savedFriendsList');
        let html;

        friends.items.forEach((friend) => {
            html += _generateFriend(friend, ACTIONS.REMOVE);
        });

        savedFriendsListElement.innerHTML = html;
    }

    function addToAllFriends(friend) {
        const allFriendsListElement = document.getElementById('allFriendsList');
        let htmlElement = _generateFriend(friend, ACTIONS.ADD);

        _removeSavedAllFriends(friend);
        allFriendsListElement.append(htmlElement);
    }

    function _removeFromAllFriends(friend) {
        const allFriendsListElement = document.getElementById('allFriendsList');
        const querySelector = '[data-id="' + friend.id + '"]';
        const friendElement = allFriendsListElement.querySelector(querySelector);

        if (friendElement) {
            friendElement.remove();
        }
    }

    function addToSavedFriends(friend) {
        const savedFriendsListElement = document.getElementById('savedFriendsList');
        let htmlElement = _generateFriend(friend, ACTIONS.ADD);

        _removeFromAllFriends(friend);
        savedFriendsListElement.append(htmlElement);
    }

    function _removeSavedAllFriends(friend) {
        const savedFriendsListElement = document.getElementById('savedFriendsList');
        const querySelector = '[data-id="' + friend.id + '"]';
        const friendElement = savedFriendsListElement.querySelector(querySelector);

        if (friendElement) {
            friendElement.remove();
        }
    }

    function showError(message) {
        const helpers = _init();
        const friendAppElement = document.getElementById('friendAppContainer');
        const defaultErrorText = 'Что-то пошло не так, пожалуйста, попробуйте перезагрузить страницу';
        const errorTemplate = helpers.templatesHelper.getErrorTemplate();
        const htmlFn = helpers.handlebars.compile(errorTemplate);

        friendAppElement.innerHTML = htmlFn({
            message: 'Ошибка: ' + message || defaultErrorText
        });
    }

    return {
        showAllFriends: showAllFriends,
        showAllSavedFriends: showAllSavedFriends,
        addToAllFriends: addToAllFriends,
        addToSavedFriends: addToSavedFriends,
        showError: showError
    }
}

module.exports = viewHelper();