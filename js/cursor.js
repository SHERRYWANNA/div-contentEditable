(function() {
    var $container,
        wrap = '<br/>';

    function init(container) {
        $container = container;
    }

    function getSelectContent() {
        var selection = window.getSelection();
        return selection.toString();
    }

    function insertWrap() {
        insertContent(wrap);
    }

    function insertContent(content, notMoveFocusPosition) {
        // console.log(content.length);
        // content = '<br/>';
        var selection = window.getSelection(),
            range = selection.getRangeAt(0);

        // 将要插入的字符串转换成 documentFragment 的子节点
        var el = range.createContextualFragment(content),
            elLastChild = el.lastChild;



        // 删除选中内容
        range.extractContents();
        // 插入代码片段
        range.insertNode(el);

        if (!notMoveFocusPosition) {
            // 将光标移动到插入节点的后面
            range.setStartAfter(elLastChild);
            range.setEndAfter(elLastChild);
        } else {
            range.setStartAfter(elLastChild);
            range.setEndBefore(elLastChild);

        }

        if (content == wrap && elLastChild === $container.childNodes[$container.childNodes.length - 2]) {
            insertContent(' ', true);
        }
    }


    window.Cursor = {
        init,
        insertContent,
        insertWrap,
        getSelectContent
    };
})();