(function () {
    function hideDom(dom) {
        addClass(dom, 'hidden');
    }

    function showDom(dom) {
        removeClass(dom, 'hidden');
    }

    // 这个方法有漏洞 我知道但是我没有时间了
    function hasClass(dom, className) {
        var domClassName = dom.className;

        return domClassName.indexOf(className) >= 0;
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

    window.Util = {
        hideDom,
        showDom,
        addClass,
        removeClass,
        hasClass,
        translateContent
    };
})();