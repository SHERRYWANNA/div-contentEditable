(function() {
    
    setContentHeight();
    window.onresize = function() {
        setContentHeight();
    };
    
    var $editBox = document.querySelector('#local-message-container'),
        $showMsgBox = document.querySelector('.msg_boxes'),
        $sendBtn = document.querySelector('#send-message-btn'),
        $emojiBtn = document.querySelector('#input_fun_emoji');

    Cursor.init($editBox);

    // 添加事件
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

        // 平常我们插入元素
        // var $emoji = document.createElement('img');
        // $emoji.className = 'emoji_img';
        // $emoji.setAttribute('style', this.getAttribute('style'));
        // $emoji.src = './img/spacer.gif'

        // $editBox.appendChild($emoji);
        // $editBox.focus();

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

    document.querySelector('#input_fun_copy').addEventListener('click', function() {
        navigator.clipboard.writeText(Cursor.getSelectContent());
    }, false);

        // 设置placeholder
    $editBox.addEventListener('input', function(e) {
        setPlaceHolder();
    }, false);

        // 监听快捷键
    $editBox.addEventListener('keydown', function(e) {
        var lineFeeds = '\r\n';
        // 换行
        if (e.ctrlKey && e.keyCode == 13) {
            e.preventDefault();
            Cursor.insertContent(lineFeeds);
        } else if (e.keyCode == 13) {
            e.preventDefault();

            // 防止点击换行
            var timer = setTimeout(sendMsg, 1e2);

            this.addEventListener('keydown', function clearTimer(e) {
                this.removeEventListener(clearTimer);
                clearTimeout(timer);
                if (e.ctrlKey) {
                    e.preventDefault();
                    Cursor.insertContent(lineFeeds);
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
        var msg = $editBox.innerHTML,
            msgDom = document.createElement('div');

        msgDom.className = 'msg_box';
        msgDom.innerHTML = msg;

        $showMsgBox.appendChild(msgDom);

        $editBox.innerHTML = '';
        setPlaceHolder();
    }

    // 设置内容框的高度
    function setContentHeight() {
        document.getElementsByClassName('msg_content')[0].style.height = document.documentElement.clientHeight - document.getElementById('local-dialog').clientHeight + 'px';
    }

})();