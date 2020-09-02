import $ from './lib/jquery.js'; //jquery
(function() {
    const $tianmao = $('#tianmao>ul');
    const $piclist = $('#tianmao>ul>li'); //6张图
    const $btnlist = $('#tianmao>ol>li'); //6个按钮
    let index = 0;
    let timer = null; //延迟计时器
    let autotimer = null; //自动轮播计时

    //鼠标移入按钮切换
    $btnlist.on('mouseover', function() {
        index = $(this).index(); //当前的索引
        //延迟定时
        timer = setTimeout(function() {
            tabswitch();
        }, 200);
    });
    //鼠标移除时关闭计时器
    $btnlist.on('mouseout', function() {
        clearTimeout(timer);
    });
    //自动轮播
    autotimer = setInterval(function() {
        index++;
        if (index > $btnlist.length - 1) {
            index = 0;
        }
        tabswitch();
    }, 2000);
    //鼠标移入暂停
    $tianmao.hover(function() {
        clearTimeout(autotimer);
    }, function() {
        autotimer = setInterval(function() {
            index++;
            tabswitch();
        }, 2000);
    });
    //切换类名
    function tabswitch() {
        $btnlist.eq(index).addClass('selected').siblings('ol li').removeClass('selected');
        $piclist.eq(index).stop(true).animate({ opacity: 1 }).siblings('ul li').stop(true).animate({ opacity: 0 });
    };
})();