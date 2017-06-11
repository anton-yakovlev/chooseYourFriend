const friendApp = (function () {
    function init() {
        require('normalize.css');
        require('../css/styles.scss');
        const Handlebars = require('handlebars');

        const vkHelper = require('./vk');

        const template = `
        <li class="user-list__item">
            <div class="user-list__item-avatar">
                <img src="{{photo_200}}" alt="" class="user-list__item-avatar-image">
            </div>
            <div class="user-list__item-data">
                <div class="user-list__item-name">{{first_name}} {{last_anme}}</div>
            </div>
            <div class="user-list__item-add"></div>
        </li>
        `;

        new Promise(resolve => window.onload = resolve)
            .then(() => vkHelper.init(VK))
            .then(() => vkHelper.api('friends.get', {user_id: 10000, fields: 'photo_200,city,country'}, VK))
            .then(friends => {
                let allFriendsListElement = document.getElementById('allFriendsList');
                let html;
                let templateFn = Handlebars.compile(template);

                friends.items.forEach((friend) => {
                    html += templateFn(friend);
                });

                allFriendsListElement.innerHTML = html;
            })
            .catch(e => console.log('Ошибка: ' + e.message));
    }

    return {
        init: init
    }
})
();

friendApp.init();