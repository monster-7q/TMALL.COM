import $ from './lib/jquery.js';
import { cookie } from './lib/cookie.js';
(function() {
    let shop = cookie.get('shop');
    if (shop) {
        shop = JSON.parse(shop);
        let idList = shop.map(elm => elm.id).join();
        $.ajax({
            type: "get",
            url: "../../interface/shopcar-getitem.php",
            data: {
                idList: idList
            },
            dataType: "json",
            success: function(res) {
                let template = '';
                res.forEach(elm => {
                    let picture = JSON.parse(elm.pic);
                    let arr = shop.filter(val => val.id == elm.id);
                    template += `
                    <ul class="shopcar-ul">
                        <li>
                            <input type="checkbox" class="all">
                        </li>
                        <li>
                            <div class="shopcar-img">
                                <img src="${picture[0].src}" alt="">
                            </div>
                            <div>
                                <p>
                                    ${elm.title}
                                </p>
                                <div>
                                    <img src="../images/88.png" alt="">
                                </div>
                            </div>
                        </li>
                        <li class="sum">￥${elm.price}</li>
                        <li class="num2">
                            <div>
                                <a href="javascript:;">-</a>
                                <!-- 商品数量 -->
                                <input type="text" value="${arr[0].num}" class="num1">
                                <a href="javascript:;">+</a>
                            </div>
                        </li>
                        <li class="onesum">
                        ￥<i>${(elm.price*arr[0].num).toFixed(2)}</i>
                            <p>(${elm.kg}kg)</p>
                        </li>
                        <li><a href="javascript:;">删除</a></li>
                    </ul>
                    `;
                });
                $('#shopcar-list').append(template);
                allSelect();
            }
        })

        function allSelect() {
            const $onesum = $('.onesum>i'); //单个商品总价
            const $onenum = $('.num1'); //单个商品数量
            const $btn = $('#shopcar-list .all'); //单个商品按钮
            const $allbtn = $('#allselect'); //结算全选按钮
            const $allbtntop = $('#shopcar-main>ul>li>input'); //顶部结算全选按钮顶
            const $allnum = $('.cart-shopcar-right>div>em'); //商品数量总计
            const $allsum = $('.cart-shopcar-right>div>span'); //商品价格总计
            let $num = 0; //总数
            let $sum = 0; //总价
            //每个商品按钮添加索引
            // const usebox = $('#cart .item .usebox'); //商品选择按钮
            // 全选功能
            $allbtn.on('click', function() {
                //当结算全选按下，所有的商品选择框选中
                $btn.prop('checked', $($allbtn).prop('checked'));
                // 当结算全选按下，顶部选择框选中
                $allbtntop.prop('checked', $($allbtn).prop('checked'));
                // 遍历每个商品按钮
                btnclick();
                //赋值
                $allsum.html($sum.toFixed(2));
                $allnum.html($num);
            });
            //单击单个商品选择时
            $btn.on('click', function() {
                //如果所有的商品按钮都选中，则全选按钮选中
                if ($btn.length === $('#shopcar-list input:checked').length) {
                    $allbtntop.prop('checked', true);
                    $allbtn.prop('checked', true);
                } else { //否则取消全选
                    $allbtntop.prop('checked', false);
                    $allbtn.prop('checked', false);
                };
                //判断当前按钮是否选中
                if ($(this).prop('checked')) { //将价格数量统计
                    $sum += +$($onesum[$btn.index($(this))]).html();
                    $num += +$($onenum[$btn.index($(this))]).val();
                } else {
                    $sum -= +$($onesum[$btn.index($(this))]).html();
                    $num -= +$($onenum[$btn.index($(this))]).val();
                }
                $allsum.html($sum.toFixed(2));
                $allnum.html($num);
            });

            // 输入商品数量
            $onenum.on('input', function() {
                let $price = $(this).parents('.shopcar-ul').find('.sum').html().substring(1);
                let $reg = /^\d+$/g;
                let $num = $(this).val();
                if (!$reg.test($num)) {
                    $(this).val(1);
                    $(this).parents('.shopcar-ul').find('.onesum').find('i').html($price);
                } else {
                    $(this).parents('.shopcar-ul').find('.onesum').find('i').html(($price * $num).toFixed(2));
                }
                let shop = cookie.get('shop'); // 从cookie中获取shop数据
                // 获取id
                let $sid = $(this).parents('.shopcar-ul').find('.shopcar-img').find('img').attr('src').substring(11, 12);

                let product = {
                    id: $sid,
                    num: $num
                };
                // 写入
                if (shop) {
                    shop = JSON.parse(shop);
                    if (shop.some(elm => elm.id == $sid)) {
                        shop.forEach(elm => {
                            elm.id === $sid ? elm.num = $num : null;
                        });
                    } else {
                        shop.push(product);
                    }
                } else {
                    shop = [];
                    shop.push(product);
                }
                cookie.set('shop', JSON.stringify(shop), 1)
            })

            function btnclick() {
                for (let i = 0; i < $btn.length; i++) {
                    if ($($btn[i]).prop('checked')) {
                        $sum += +$($onesum[i]).html();
                        $num += +$($onenum[i]).val();
                    } else {
                        $sum -= +$($onesum[i]).html();
                        $num -= +$($onenum[i]).val();
                    }
                }

            }
        };

    };
})();