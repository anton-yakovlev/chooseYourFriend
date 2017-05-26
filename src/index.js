/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    const URL = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    let xhr = new XMLHttpRequest();

    xhr.open('GET', URL, false);
    xhr.send();

    return new Promise((resolve, reject) => {
        if (xhr.status < 400) {
            let responseText = JSON.parse(xhr.responseText);
            let citiesArray = [];

            for (let item of responseText) {
                citiesArray.push(item);
            }

            citiesArray.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
            });

            resolve(citiesArray);
        } else {
            reject();
        }
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
