/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    if (!array || !array.length || typeof fn !== 'function') {
        return;
    }

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    if (!array || typeof fn !== 'function') {
        return;
    }

    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }

    return result;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    if (!array || !array.length || typeof fn !== 'function') {
        return;
    }

    const firstStepValue = initial ? initial : array[0];
    const initIndex = initial ? 0 : 1;
    let result = 0;

    for (let i = initIndex; i < array.length; i++) {
        let previousValue = i === initIndex ? firstStepValue : result;

        result = +fn(previousValue, array[i], i, array);
    }

    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    if (!obj || !prop) {
        return;
    }

    return prop in obj;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    if (!obj) {
        return;
    }

    let result = [];

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            result.push(prop);
        }
    }

    return result;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    if (!obj) {
        return;
    }

    let result = [];

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            result.push(prop.toUpperCase());
        }
    }

    return result;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, begin = 0, end = array.length) {
    if (!array || !array.length) {
        return;
    }

    function _normalizeIndexes(begin, end, length) {
        let normalizedBegin = begin;
        let normalizedEnd = end;

        if (normalizedBegin < 0) {
            let sum = length + normalizedBegin;

            normalizedBegin = sum > 0 ? sum : 0;
        }

        if (normalizedEnd < 0) {
            normalizedEnd = length + normalizedEnd;
        } else if (normalizedEnd > length) {
            normalizedEnd = length;
        }

        return {
            begin: normalizedBegin,
            end: normalizedEnd
        }
    }

    const normalizedValues = _normalizeIndexes(begin, end, array.length);
    let result = [];

    for (let i = normalizedValues.begin; i < normalizedValues.end; i++) {
        result.push(array[i]);
    }

    return result;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set: function (target, name, value) {
            return target[name] = value ** 2;
        }
    });
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
