import $ from './lib/jquery.js';
import { cookie } from './lib/cookie.js';

(function() {
    let id = location.search.split('=')[1]; // 获取id
    $.ajax({
        type: "get",
        url: "../../interface/product-getitem.php",
        data: {
            id: id
        },
        dataType: "json",
        success: function(res) {
            let picture = JSON.parse(res.pic);
            let loupe_left = `
            <div class="loupe-left-top">
                <a href="javascript:;">
                    <span class="iconfont icon-icon-"></span>
                    <div class="ks-imagezoom-wrap">
                        <img src="${picture[0].src}" alt="">
                        <div class="sf"></div>
                    </div>
                </a>
            </div>
            <ul class="loupe-left-bottom">
                <li>
                    <a href="javascript:;" class="loupe-active">
                        <img src="${picture[0].src}" alt="">
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="${picture[1].src}" alt="">
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="${picture[2].src}" alt="">
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="${picture[3].src}" alt="">
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <img src="${picture[4].src}" alt="">
                    </a>
                </li>
            </ul>
            <p>收藏商品 （88567人气）</p>
            `;
            let loupe_right = `
            <div class="loupe-right-title">
                <h1>${res.title}</h1>
                <p>${res.subhead}</p>
            </div>
            <!-- 价格 -->
            <div class="loupe-right-top">
                <div class="loupe-right-panel">
                    <dl>
                        <dt>价格</dt>
                        <dd>
                            <span>¥${res.price}</span>
                        </dd>
                    </dl>
                </div>
                <div class="loupe-right-site">
                    <dl>
                        <dt>发货地</dt>
                        <dd>
                            <span>广东茂名</span>
                        </dd>
                    </dl>
                </div>
            </div>
            <!-- 销量 -->
            <ul class="loupe-right-bottom">
                <li>月销量<span>${res.num}</span></li>
                <li>累计评价<span>${res.evaluate}</span></li>
            </ul>
            <!-- 颜色分类 -->
            <div class="loupe-right-color">
                <dt>颜色分类</dt>
            </div>
            <!-- 加入数量 -->
            <dl class="loupe-right-number">
                <dt>数量</dt>
                <dd>
                    <span>
                        <input type="text" value="1" id="loupe-num">
                        <span>
                            <i>+</i>
                            <i>-</i>
                        </span>
                    <span>件</span>
                    </span>
                    <i>库存216件</i>
                </dd>
            </dl>
            <!-- 购买 -->
            <div class="loupe-right-buy">
                <!-- <div>
                    <a href="javascript:;">立即购买</a>
                </div> -->
                <div>
                    <a href="javascript:;" id="additem">加入购物车</a>
                </div>
            </div>
            `;

            $('#loupe-left').append(loupe_left);
            $('#loupe-right').append(loupe_right).find('#additem').on('click', function() {
                addItem(res.id, $("#loupe-num").val());
            })
        }
    });

    function addItem(id, num) {
        let shop = cookie.get('shop'); // 从cookie中获取shop数据
        let product = {
            id: id,
            num: num
        };
        if (shop) {
            shop = JSON.parse(shop);
            if (shop.some(elm => elm.id == id)) {
                shop.forEach(elm => {
                    elm.id === id ? elm.num = num : null;
                });
            } else {
                shop.push(product);
            }
        } else {
            shop = [];
            shop.push(product);
        }
        cookie.set('shop', JSON.stringify(shop), 1)
    }
})();