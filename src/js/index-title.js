import $ from './lib/jquery.js'; //jquery
(function() {
    const $listtitle = $('#content-list>ul>li'); //11个列表
    const $listconter = $('#content-list>ol>li'); //11个内容
    let index = 0; //存储索引。
    let timer = null;
    let autotimer = null;

    $listtitle.hover(function() {
        index = $(this).index();
        titlewitch();
    }, function() {
        remove();
    });

    function titlewitch() {
        $listconter.eq(index).addClass('cartlist-active').siblings('ol li').removeClass('cartlist-active');

        // $piclist.eq(index).stop(true).animate({ opacity: 1 }).siblings('ul li').stop(true).animate({ opacity: 0 });
    };

    function remove() {
        $listconter.removeClass('cartlist-active');
    }
})();