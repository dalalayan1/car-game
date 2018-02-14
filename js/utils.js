/**
 * domELementCreator - creates dom element according to input object
 * @param {object} elementObj - object with details of new elements to be created
 * @returns {object} - created dom element(s)
 */
const domELementCreator = function(elementObj) {
    
    const { tag, attrs, children, innerText, innerHTML } = elementObj;
    let newEle = document.createElement(tag);

    if(attrs) {
        for(var key in attrs) {
            newEle.setAttribute(key, attrs[key]);
        }
    }

    if(innerText) {
        newEle.innerText = innerText;
    }

    if(innerHTML) {
        newEle.innerHTML = innerHTML;
    }
    
    if(children && children.length) {
        children.forEach((child) => {
            var childElement = domELementCreator(child);
            newEle.appendChild(childElement);
        })
    }

    return newEle;

}

/**
 * domTraverser - traverses dom with id or class name
 * @param {string} selector - id or class name
 * @param {boolean} isClass - flag to determine id or class
 * @returns {object} - selected dom element
 */
const domTraverser = function(selector, isClass) {
    if (isClass) {
        return document.getElementsByClassName(selector);
    }
    return document.getElementById(selector);
}