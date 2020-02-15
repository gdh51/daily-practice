var whitespaceRE = /\s+/;

export function initClass(renderClass) {
    normalizeClass(renderClass);
}

/**
 * 将用户传入的Class标准化为完整的字符串形式
 * @param {Object} renderClass 初始配置中配置的Cls
 */
function normalizeClass(renderClass = {}) {

    let keys = Object.keys(renderClass);

    if (!keys.length) return {};

    keys.forEach(key => {

        // 标准化数组形式
        if (Array.isArray(renderClass[key])) {
            renderClass[key] = normalizeArray(renderClass[key]);
        }
    });
}

function normalizeArray(classArray) {
    return classArray.join(' ');
}

// 为元素添加class
export function addClass(el, cls) {
    if (!cls || !(cls = cls.trim())) {
        return
    }

    if (el.classList) {
        if (cls.indexOf(' ') > -1) {
            cls.split(whitespaceRE).forEach(function (c) {
                return el.classList.add(c);
            });
        } else {
            el.classList.add(cls);
        }
    } else {
        var cur = " " + (el.getAttribute('class') || '') + " ";
        if (cur.indexOf(' ' + cls + ' ') < 0) {
            el.setAttribute('class', (cur + cls).trim());
        }
    }
}