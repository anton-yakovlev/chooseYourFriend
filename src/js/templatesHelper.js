function templatesHelper() {
    // ----- Handlebars template for friend item ----- //
    function getFriendTemplate() {
        return `
        <li class="user-list__item" data-id="{{id}}">
            <div class="user-list__item-avatar">
                <img src="{{photo_200}}" alt="" class="user-list__item-avatar-image">
            </div>
            <div class="user-list__item-data">
                <div class="user-list__item-name">{{first_name}} {{last_anme}}</div>
            </div>
            <div class="user-list__item-action user-list__item_{{action}}"></div>
        </li>
        `;
    }

    // ----- Handlebars template for error message ----- //
    function getErrorTemplate() {
        return `
        <div class="friend-app__error-container">
            <div class="friend-app__error-message">{{message}}</div>
            
            <button class="btn" id="reloadAfterError">Перезагрузить страницу</button>
        </div>            
        `;
    }

    return {
        getFriendTemplate: getFriendTemplate,
        getErrorTemplate: getErrorTemplate
    }
}

module.exports = templatesHelper();