/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    if (!Array.isArray(array) || !array.length) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    let result = true;

    array.forEach(item => {
        if (result && !fn(item)) {
            result = false;
        }
    });

    return result;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    if (!Array.isArray(array) || !array.length) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    let result = false;

    array.forEach(item => {
        if (!result && fn(item)) {
            result = true;
        }
    });

    return result;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    let result = [];

    args.forEach(item => {
        try {
            fn(item);
        } catch (e) {
            result.push(item);
        }
    });

    return result;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (!_isNumber(number)) {
        throw new Error('number is not a number');
    }

    const savedNumber = number;

    function _isNumber(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }

    function sum(...args) {
        let sum = 0;

        args.forEach(item => {
            sum += item;
        });

        return sum + savedNumber;
    }

    function dif(...args) {
        let dif = 0;

        args.forEach(item => {
            dif += item;
        });

        return savedNumber - dif;
    }

    function div(...args) {
        let result = savedNumber;

        args.forEach(item => {
            if (!item) {
                throw new Error('division by 0');
            }

            result = result / item;
        });

        return result;
    }

    function mul(...args) {
        let result = savedNumber;

        args.forEach(item => {
            result = result * item;
        });

        return result;
    }

    return {
        sum: sum,
        dif: dif,
        div: div,
        mul: mul
    }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
