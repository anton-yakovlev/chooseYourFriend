/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    let element = document.createElement('div');

    element.innerHTML = text;

    return element;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    let element = document.createElement('a');

    element.setAttribute('href', hrefValue);

    return element;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    if (!what || !where) {
        return;
    }

    where.prepend(what);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    if (!where) {
        return;
    }

    const allChilds = where.children;
    const SIBLING_TAG_NAME = 'P';
    let result = [];

    for (let i = 0; i < allChilds.length; i++) {
        if (allChilds[i].nextElementSibling && allChilds[i].nextElementSibling.tagName === SIBLING_TAG_NAME) {
            result.push(allChilds[i]);
        }
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    if (!where) {
        return;
    }

    const allChilds = where.children;
    let result = [];

    for (let i = 0; i < allChilds.length; i++) {
        result.push(allChilds[i].innerHTML);
    }

    return result;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    if (!where) {
        return;
    }

    const children = where.childNodes;
    const TEXT_NODE_TYPE = 3;
    const COMMENT_NODE_TYPE = 8;

    for (let i = 0; i < children.length; i++) {
        let child = children[i];

        if (child.nodeType === TEXT_NODE_TYPE || child.nodeType === COMMENT_NODE_TYPE) {
            child.remove();
        }
    }
}

/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    if (!where) {
        return;
    }

    const TEXT_NODE_TYPE = 3;
    const COMMENT_NODE_TYPE = 8;
    const ELEMENT_NODE_TYPE = 1;

    function _clean(node) {
        let children = node.childNodes;

        for (let i = 0; i < children.length; i++) {
            let child = children[i];

            if (child.nodeType === TEXT_NODE_TYPE || child.nodeType === COMMENT_NODE_TYPE) {
                node.removeChild(child);
                i--;

            } else if (child.nodeType === ELEMENT_NODE_TYPE) {
                _clean(child);
            }
        }
    }

    _clean(where);
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */
function collectDOMStat(root) {
    if (!root) {
        return;
    }

    let tagResult = {};
    let classResult = {};
    let textResult = 0;

    const TEXT_NODE_TYPE = 3;
    const ELEMENT_NODE_TYPE = 1;

    function _includeTag(obj, tag) {
        return tag in obj;
    }

    function _normalizeClassList(sourceArray) {
        let result = [];

        for (let i = 0; i < sourceArray.length; i++) {
            let item = sourceArray[i];

            if (result.indexOf(item) < 0) {
                result.push(item);
            }
        }

        return result;
    }

    function _updateTagResult(tag) {
        tagResult[tag] = _includeTag(tagResult, tag) ? tagResult[tag] + 1 : 1;
    }

    function _updateClassResult(classes) {
        for (let i = 0; i < classes.length; i++) {
            let classItem = classes[i];

            classResult[classItem.toString()] = _includeTag(classResult, classItem) ? classResult[classItem] + 1 : 1;
        }
    }

    function _analizeElement(element) {
        let children = element.childNodes;
        let tag = element.tagName;
        let classes = _normalizeClassList(element.classList);

        _updateTagResult(tag);
        _updateClassResult(classes);

        for (let i = 0; i < children.length; i++) {
            let child = children[i];

            if (child.nodeType === TEXT_NODE_TYPE) {
                textResult += 1;

            } else if (child.nodeType === ELEMENT_NODE_TYPE) {
                _analizeElement(child);
            }
        }
    }

    _analizeElement(root.children[0]);

    return {
        tags: tagResult,
        classes: classResult,
        texts: textResult
    }
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элемента,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объек с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {
    if (!where || typeof fn !== 'function') {
        return;
    }

    const OPERATION_TYPES = {
        INSERT: 'insert',
        REMOVE: 'remove'
    };

    function _mutationProcessing(mutation) {
        let params = {};

        if (mutation.addedNodes.length) {
            params = {
                type: OPERATION_TYPES.INSERT,
                nodes: Array.prototype.slice.call(mutation.addedNodes)
            };
        }

        if (mutation.removedNodes.length) {
            params = {
                type: OPERATION_TYPES.REMOVE,
                nodes: Array.prototype.slice.call(mutation.removedNodes)
            };
        }

        fn(params);
    }

    let observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            _mutationProcessing(mutation);
        });
    });

    let config = {
        attributes: false,
        childList: true,
        characterData: false
    };

    observer.observe(where, config);
}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
