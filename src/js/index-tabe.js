import $ from './lib/jquery.js'; //jquery
(function() {
    const $tianmao = $('.supermarket-tabe');
    const $tablist = $('.supermarket-tabe>a'); //内容
    const $btnlist = $('.supermarket-tabe>ul>li'); //按钮
    let index = 0;
    let timer = null; //延迟计时器
    let autotimer = null; //自动轮播计时
    //鼠标移入切换
    $btnlist.on('mouseover', function() {
        index = $(this).index(); //当前的索引
        tabswitch();
    });
    //自动切换
    autotimer = setInterval(function() {
        index++;
        if (index > $btnlist.length - 1) {
            index = 0;
        }
        tabswitch();
    }, 2000);
    //移入暂停
    $tianmao.hover(function() {
        clearTimeout(autotimer);
    }, function() {
        autotimer = setInterval(function() {
            index++;
            tabswitch();
        }, 2000);
    });

    function tabswitch() {
        $btnlist.eq(index).addClass('tab-active').siblings('ul li').removeClass('tab-active');
        $tablist.eq(index).addClass('tab-a').siblings('a').removeClass('tab-a');
    }

})();