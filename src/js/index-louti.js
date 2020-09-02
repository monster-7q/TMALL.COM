import $ from './lib/jquery.js'; //jquery
(function() {
    const $btnlista = $('#loutinav-list>li>a[title]'); //导航按钮
    const $btntop = $('#top1>a'); //顶部按钮

    //回到顶部
    $btntop.on('click', function() {
        $('html,body').animate({
            scrollTop: 0
        }, 'show');
    });
    //点击移动
    $btnlista.on('click', function() {
        let $top = $(`.${$(this).attr('title')}`).offset().top;
        $('html,body').animate({
            scrollTop: $top - 60
        }, 'show');
    });
    // 滚动下拉导航
    $(window).on('scroll', function() {
        let top = $(document).scrollTop();
        if (top > 300) {
            $('#top').stop(true).animate({
                top: 0
            }, 'show');
        } else {
            $('#top').stop(true).animate({
                top: '-60'
            }, 'show');
        }
    })

})();