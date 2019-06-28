(function() {
    setLayout();
    
    var $editBox = document.querySelector('#local-message-container'),
        $showMsgBox = document.querySelector('.msg_boxes'),
        $sendBtn = document.querySelector('#send-message-btn'),
        $emojiBtn = document.querySelector('#input_fun_emoji');

    Cursor.init($editBox);

    // 发送按钮
    $sendBtn.addEventListener('click', function() {
        sendMsg();
    }, false);

    // 功能表上的
    $emojiBtn.addEventListener('click', function() {
        Emoji.toggle();
    }, false);

    // 添加表情
    Emoji.addEvent(function(e) {
        // 使用 range 插入
        var emoji = '<img class="emoji_img" src="./img/spacer.gif" style="' + this.getAttribute('style') + '"/>';
        $editBox.focus();
        Cursor.insertContent(emoji);

        setPlaceHolder();
    });

    // 粘贴事件
    $editBox.addEventListener('paste', function(e) {
        var content = e.clipboardData.getData('Text');
        Cursor.insertContent(content);
        setPlaceHolder();
        e.preventDefault();
        return;
    }, false);

    // 监听复制事件，将复制的东西后面加上小尾巴
    document.addEventListener('copy', function(e) {
        var clipboardData = e.clipboardData,
            // 获取选中内容
            content = Cursor.getSelectContent();

        clipboardData.setData('text/plain', content + ', 我的小尾巴~~~~');

        e.preventDefault();
        return;
    });

    // 添加按钮复制事件
    document.querySelector('#input_fun_copy').addEventListener('click', function() {
        navigator.clipboard.writeText(Cursor.getSelectContent());
    }, false);

    // 监听鼠标点击整个页面的事件
    document.documentElement.addEventListener('click', function(e) {
        var target = e.target;
        
        // 点击非表情弹框区域使表情弹框消失
        if (!Util.isClick(e, document.querySelector('.dialog-emoji'))) {
            Emoji.hide();
        }
    }, true);

    // 设置placeholder
    $editBox.addEventListener('input', function(e) {
        setPlaceHolder();
    }, false);

    // 监听快捷键
    $editBox.addEventListener('keydown', function(e) {
        var enterKey = 13;

        // 换行
        if (e.ctrlKey && e.keyCode == enterKey) {
            e.preventDefault();
            Cursor.insertWrap();
        } else if (e.keyCode == enterKey) {
            e.preventDefault();

            // 防止点击换行
            var timer = setTimeout(sendMsg, 1e2);

            this.addEventListener('keydown', function clearTimer(e) {
                this.removeEventListener('keydown', clearTimer);
                clearTimeout(timer);
                if (e.ctrlKey) {
                    e.preventDefault();
                    Cursor.insertWrap();
                }
            });
        }
        setPlaceHolder();
    }, false);

    function setPlaceHolder() {
        var className = 'placeholder';

        if (Util.hasClass($editBox, className) && $editBox.innerHTML) {
            Util.removeClass($editBox, className);
        } else if (!Util.hasClass($editBox, className) && !$editBox.innerHTML) {
            Util.addClass($editBox, className);
        }
    }

    function sendMsg() {
        var msg = $editBox.innerHTML.replace(/<br>/g, '\n').trim(),
            msgDom;

        if (!msg) {
            return;
        }

        msgDom = document.createElement('div');
        msgDom.className = 'msg_box';
        msgDom.innerHTML = msg;

        $showMsgBox.appendChild(msgDom);

        $editBox.innerHTML = '';
        setPlaceHolder();
    }

    // 设置内容框的高度
    function setLayout() {
        setContentHeight();
        window.onresize = function() {
            setContentHeight();
        };

        function setContentHeight() {
            document.getElementsByClassName('msg_content')[0].style.height = document.documentElement.clientHeight - document.getElementById('local-dialog').clientHeight + 'px';
        }
    }
    

})();