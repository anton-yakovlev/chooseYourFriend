/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

function isCreatedCookie(name) {
    return cookiesList.some(item => item.name === name);
}

function addBrowserCookie(name, value) {
    document.cookie = name + '=' + value;
}

function deleteBrowserCookie(name) {
    let date = new Date;

    date.setDate(date.getDate() - 1);
    document.cookie = name + '=' + ';expires=' + date;
}

function deleteCookieFromList(name) {
    let listElement = listTable.querySelector('[data-cookie-name="' + name + '"]');

    if (!listElement) {
        return;
    }

    listElement.remove();
}

function addCookieToList(name, value) {
    let element = document.createElement('tr');

    element.setAttribute('data-cookie-name', name);
    element.innerHTML = '<td>' + name + '</td><td>' + value + '</td><td><button id="' +
        name + '" class="remove-button">Delete</button></td>';

    listTable.appendChild(element);
}

function getBrowserCookies() {
    return document.cookie.split('; ').map((item) => {
        return { name: item.split('=')[0], value: item.split('=')[1] };
    });
}

function createCookie(name, value) {
    addBrowserCookie(name, value);

    if (!isCreatedCookie(name)) {
        let itemObj = { name: name, value: value };
        let searchValue = filterNameInput.value;

        cookiesList.push(itemObj);

        if (hasSubstring(itemObj, searchValue)) {
            addCookieToList(name, value);
        }
    } else {
        updateCookieList(filterNameInput.value);
    }
}

function deleteCookie(name) {
    let itemIndex = cookiesList.findIndex(item => item.name === name);

    deleteBrowserCookie(name);
    deleteCookieFromList(name);
    cookiesList.splice(itemIndex, 1);
}

function hasSubstring(item, searchValue) {
    return item.name.indexOf(searchValue) >= 0 || item.value.indexOf(searchValue) >= 0;
}

function clearList() {
    while (listTable.firstChild) {
        listTable.removeChild(listTable.firstChild);
    }
}

function updateCookieList(searchValue) {
    let browserCookies = getBrowserCookies();
    let addedCookies = browserCookies.filter((item) => {
        return isCreatedCookie(item.name)
    });

    clearList();

    for (let item of addedCookies) {
        if (!hasSubstring(item, searchValue)) {
            deleteCookieFromList(item.name);
        } else {
            addCookieToList(item.name, item.value);
        }
    }
}

const ADD_BUTTON_ID = 'add-button';
const REMOVE_BUTTON_CLASS = 'remove-button';

let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let cookiesList = [];

filterNameInput.addEventListener('keyup', () => {
    updateCookieList(filterNameInput.value);
});

homeworkContainer.addEventListener('click', (e) => {
    let target = e.target;

    if (target.id === ADD_BUTTON_ID) {
        if (typeof addNameInput.value === 'undefined' || addNameInput.value.trim() === '') {
            return;
        }

        createCookie(addNameInput.value, addValueInput.value);
    }

    if (target.classList.contains(REMOVE_BUTTON_CLASS)) {
        let cookieName = target.id;

        deleteCookie(cookieName);
    }
});
