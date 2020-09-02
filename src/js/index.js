import $ from './lib/jquery.js'; //jquery
import './lib/jquery.lazyload.js'; //懒加载插件
import { cookie } from './lib/cookie.js';

(function() {
    console.log(1);
    if (cookie.get('username')) { //存在
        $('#cookie-title>p>i').html(`Hi，${cookie.get('username')}，欢迎来到天猫`).css('color', 'red');
        $('#cookie-title>p>a').css('display', 'none');
    }

    //渲染数据
    $.ajax({
        type: "get",
        url: "../../interface/index-getproduct.php",
        dataType: "json",
        success: function(res) {
            // console.log(res);
            let temp = '';
            res.forEach((elm) => {
                let picture = JSON.parse(elm.pic);
                // console.log(picture);
                temp += `
            <li>
                <a href="./product.html?id=${elm.id}">
                    <div>
                        <img class="lazy" data-original="${picture[0].src}" alt="">
                        <h5>
                        ${elm.title}
                        </h5>
                        <p>￥${elm.price}</p>
                    </div>
                </a>
            </li>`;
            });
            $('#list-product').append(temp);
            $("img.lazy").lazyload({
                placeholder: "../images/timg.gif", //用图片提前占位
                effect: "fadeIn", // 载入使用何种效果
            });
        }
    })
})();