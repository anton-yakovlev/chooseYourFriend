function vkHelper() {
    function init(VK) {
        return new Promise((resolve, reject) => {
            VK.init({
                apiId: 6069515
            });

            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    }

    function api(method, options, VK) {
        if (!options.v) {
            options.v = '5.64';
        }

        return new Promise((resolve, reject) => {
            VK.api(method, options, data => {
                if (data.error) {
                    reject(new Error(data.error.error_msg));
                } else {
                    resolve(data.response);
                }
            });
        });
    }

    return {
        init: init,
        api: api
    }
}

module.exports = vkHelper();