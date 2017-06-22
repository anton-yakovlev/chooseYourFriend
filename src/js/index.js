// ----- Put styles to webpack build ----- //
require('normalize.css');
require('../css/styles.scss');

// ----- Get Helpers and required libraries ----- //
const vkHelper = require('./vkHelper');
const viewHelper = require('./viewHelper');
const listenerHelper = require('./listenersHelper');
const storageHelper = require('./storageHelper');

// ----- Start set listeners ----- //
listenerHelper.setHandlers();

// ----- Start App ----- //
try {
    new Promise(resolve => window.onload = resolve)
        .then(() => vkHelper.init(VK)) // eslint-disable-line
        .then(() => {
            return vkHelper.api('friends.get', {
                user_id: 10000,
                fields: 'id,photo_200,city,country'
            }, VK) // eslint-disable-line
        })
        .then(friends => {
            let allFriendsStorage = storageHelper.getAllFriends();
            let savedFriendsStorage = storageHelper.getSavedFriends();

            if (!allFriendsStorage && !savedFriendsStorage) {
                storageHelper.setAllFriends(friends);
            }

            viewHelper.showAllFriends(allFriendsStorage);
            viewHelper.showSavedFriends(savedFriendsStorage);
        })
        .catch(e => {
            viewHelper.showError(e.message);
        });
} catch (e) {
    viewHelper.showError(e.message);
}

