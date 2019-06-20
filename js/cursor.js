(function() {
    var $container;

    function init(container) {
        $container = container;
    }

    function insertContent(content) {
        var selection = window.getSelection(),
            range = selection.getRangeAt(0);

        if (content === '\r\n' && !$container.innerHTML.substr(-1).match(/[\r|\n]/)) {
            content += content;
        }

        // 将要插入的字符串转换成 documentFragment 的子节点
        var el = range.createContextualFragment(content),
            elLastChild = el.lastChild;

        // 删除选中内容
        range.extractContents();
        // 插入代码片段
        range.insertNode(el);
        
        // 将光标移动到插入节点的后面
        range.setStartAfter(elLastChild);
        range.setEndAfter(elLastChild);

        selection.removeAllRanges();
        selection.addRange(range)
    }



    window.Cursor = {
        init,
        insertContent
    };
})();