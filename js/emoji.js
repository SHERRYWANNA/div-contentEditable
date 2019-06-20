(function() {
    var emoji = ['0x1f3e0','0x1f4a3','0x1f4aa','0x1f4f1','0x1f31f','0x1f33b','0x1f37a','0x1f44a','0x1f44c','0x1f44d','0x1f44e','0x1f44f','0x1f47b','0x1f47f','0x1f48e','0x1f50d','0x1f60a','0x1f60c','0x1f60d','0x1f60f','0x1f61a','0x1f61c','0x1f61d','0x1f61e','0x1f62a','0x1f62d','0x1f64f','0x1f319','0x1f339','0x1f341','0x1f343','0x1f380','0x1f381','0x1f382','0x1f385','0x1f431','0x1f436','0x1f444','0x1f446','0x1f447','0x1f448','0x1f449','0x1f457','0x1f466','0x1f467','0x1f468','0x1f469','0x2764','0x1f494','0x1f559','0x1f601','0x1f602','0x1f603','0x1f604','0x1f609','0x1f612','0x1f613','0x1f614','0x1f616','0x1f618','0x1f620','0x1f621','0x1f622','0x1f623','0x1f625','0x1f628','0x1f630','0x1f631','0x1f632','0x1f633','0x1f637','0x1f697','0x26a1','0x26bd','0x270a','0x270c','0x2600','0x2601','0x2614','0x2615'],
        $emojiContent = document.querySelector('.dialog-emoji__content'),
        $emojiContainer = document.querySelector('.dialog-emoji'),
        isContainerShow = false;

    function init() {
        renderEmojiBox();
    }

    function renderEmojiBox() {
        var _html = '',
            iconPositionOffset = 34,
            iconLineNum = 16;

        for (i = 0; i < emoji.length; i++) {
            _html += '<a class="emoji" data-unicode="' + emoji[i] + '" href="javascript:;" style="background-position: -' + (parseInt(i/iconLineNum) * iconPositionOffset) + 'px -' + (i%iconLineNum) * iconPositionOffset + 'px;"></a>';
        }

        $emojiContent.innerHTML = _html;
    }    

    function addEvent(callback) {
        var $emojis = [].slice.call(document.querySelectorAll('.emoji'));

        for (var $emoji of $emojis) {
            $emoji.addEventListener('click', function() {
                var unicode = this.getAttribute('data-unicode');
                callback.call(this, unicode);
            }, false);
        }
    }

    function show() {
        isContainerShow = true;
        Util.showDom($emojiContainer);
    }

    function hide() {
        isContainerShow = false;
        Util.hideDom($emojiContainer);
    }

    function toggle() {
        if (isContainerShow) {
            hide();
        } else {
            show();
        }
    }

    init();

    window.Emoji = {
        show,
        hide,
        toggle,
        addEvent
    };
})();

