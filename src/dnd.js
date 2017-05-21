/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    const CLASS_NAME = 'draggable-div';
    const INIT_VALUE = '100px';
    const PROPERTIES = {
        width: INIT_VALUE,
        height: INIT_VALUE,
        top: INIT_VALUE,
        left: INIT_VALUE,
        backgroundColor: '#00ffff'
    };
    let element = document.createElement('div');

    element.classList.add(CLASS_NAME);
    Object.assign(element.style, PROPERTIES);

    return element;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    if (!target) {
        return;
    }

    let isMouseDown = false;

    function _mouseMove(e) {
        let eventTop = e.clientX + 'px';
        let eventLeft = e.clientY + 'px';

        if (isMouseDown) {
            console.log('isMouseMove', eventTop, eventLeft);
            target.style.top = eventTop;
            target.style.left = eventLeft;
        }
    }

    function _mouseDown() {
        isMouseDown = true;
        console.log('isMouseDown : ' + isMouseDown);
    }

    function _mouseUp() {
        isMouseDown = false;
        console.log('isMouseUp : ' + isMouseDown);
    }

    target.addEventListener('mousedown', _mouseDown);
    target.addEventListener('mouseup', _mouseUp);
    target.addEventListener('mousemove', _mouseMove);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
