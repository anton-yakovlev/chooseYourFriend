/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
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

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0 && !!chunk;
}

function showFilteredCities(cities, chunk) {
    let resultHtml = '';

    for (let city of cities) {
        if (isMatching(city.name, chunk)) {
            resultHtml += '<span>' + city.name + '</span>';
        }
    }

    filterResult.innerHTML = resultHtml;
}

/* function loading() {
    const loadingTitle = 'Загрузка...';

    loadingBlock.textContent(loadingTitle);
}*/

/* function loadingSucceed() {
    loadingBlock.remove();
}*/

function loadingFailed() {
    // const errorMsg = 'Не удалось загрузить города';
    const repeatText = 'Повторить';
    const button = document.createElement('button');

    button.innerText = repeatText;

}

// let loadingBlock = homeworkContainer.querySelector('#loading-block');
// let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');

loadTowns().then(
    (cities) => {
        // loadingSucceed();

        filterInput.addEventListener('keyup', () => {
            let inputValue = filterInput.value;

            showFilteredCities(cities, inputValue);
        });
    },
    () => {
        loadingFailed();
    }
);

export {
    loadTowns,
    isMatching
};
