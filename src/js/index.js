const friendApp = (function () {
    function _init() {
        // ----- Put styles to webpack build ----- //
        require('normalize.css');
        require('../css/styles.scss');

        // ----- Get Helpers and required libraries and init variables ----- //
        const vkHelper = require('./vkHelper');
        const dndHelper = require('./dndHelper');
        const storageHelper = require('./storageHelper');
        const viewHelper = require('./viewHelper');

        return {
            vkHelper: vkHelper,
            dndHelper: dndHelper,
            storageHelper: storageHelper,
            viewHelper: viewHelper
        };
    }

    // ----- Click listeners for all elements with delegation ----- //
    function clickListeners(helpers) {
        const friendItemClassName = 'user-list__item';
        const plusClassName = 'user-list__item-add';
        const removeClassName = 'user-list__item-remove';
        const reloadAfterErrorId = 'reloadAfterError';

        function clickHandler(e) {
            let target = e.target;

            // ----- Click listener for plus button ----- //
            if (target.classList.contains(plusClassName)) {
                let currentFriendId = target.closest(friendItemClassName).dataset.id;

                helpers.setToSavedFriends(currentFriendId);
            }

            // ----- Click listener for remove button ----- //
            if (target.classList.contains(removeClassName)) {
                let currentFriendId = target.closest(friendItemClassName).dataset.id;

                helpers.setToAllFriends(currentFriendId);
            }

            // ----- Click listener for reload button after error ----- //
            if (target.id === reloadAfterErrorId) {
                location.reload();
            }
        }

        document.body.addEventListener('click', clickHandler);
    }

    // ----- General entry for application ----- //
    function start() {
        // ----- Get all helpers and services ----- //
        const helpers = _init();

        // ----- Start all listeners ----- //
        clickListeners();

        // ----- Load VK friends and generate DOM elements ----- //
        new Promise(resolve => window.onload = resolve)
            .then(() => helpers.vkHelper.init(VK))
            .then(() => {
                return helpers.vkHelper.api('friends.get', {user_id: 10000, fields: 'id,photo_200,city,country'}, VK)
            })
            .then(friends => helpers.viewHelper.showFriends(friends))
            .catch(e => errorShow(e.message));
    }

    function errorShow(message) {
        const helpers = _init();

        helpers.viewHelper.showError(message);
    }

    return {
        start: start,
        errorShow: errorShow
    }
})();

try {
    friendApp.start();
} catch (e) {
    friendApp.errorShow(e.message);
}