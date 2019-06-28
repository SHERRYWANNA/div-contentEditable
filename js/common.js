(function () {
    let hiddenClassName = 'hidden';

    function hideDom(dom) {
        if (!hasClass(dom, hiddenClassName)) {
            addClass(dom, hiddenClassName);
        }
    }

    function showDom(dom) {
        if (hasClass(dom, hiddenClassName)) {
            removeClass(dom, hiddenClassName);
        }
    }

    function hasClass(dom, className) {
        return dom.className.split(' ').indexOf(className) >= 0;
    }

    function addClass(dom, className) {
        dom.className += (' ' + className);
    }

    function removeClass(dom, className) {
        var domClassName = dom.className,
            reg = new RegExp('(\\s)?' + className, 'g');

        dom.className = domClassName.replace(reg, '');
    }

    function translateContent(content) {
        return content.trim().replace(/&/g, '&amp;').replace(/ /g, '&nbsp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\/g, '&#92;');
    }

    function isClick(event, dom) {
        for (var path of event.path) {
            if (path === dom) {
                return true;
            }
        }
        return false;
    }

    window.Util = {
        hideDom,
        showDom,
        addClass,
        removeClass,
        hasClass,
        translateContent,
        isClick
    };
})();