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

        // 回车键额外判断
        if (content == wrap) {
            removeEndEmptyTextNode();

            var childs = $container.childNodes,
                childsLength = $container.childNodes.length;

            // 输入框的最后一个子元素是本次添加的换行
            if (elLastChild === childs[childs.length - 1]) {
                insertContent(' ', true);
            }
        }
    }

    // 移除内容中所有空的无用的末尾 #Text 节点
    function removeEndEmptyTextNode() {
        var childs = $container.childNodes,
            childsLength = $container.childNodes.length;

        for (var nodeIndex = childsLength - 1; nodeIndex >= 0; nodeIndex--) {
            var childNode = childs[nodeIndex];

            if (childNode.nodeName === "#text" && !childNode.textContent) {
                $container.removeChild(childNode);
            } else {
                break;
            }
        }
    }


    window.Cursor = {
        init,
        insertContent,
        insertWrap,
        getSelectContent
    };
})();