import $ from './lib/jquery.js'; //jquery
import './lib/jquery.lazyload.js'; //懒加载插件

$("img.lazy").lazyload({
    placeholder: "../images/timg.gif", //用图片提前占位
    effect: "fadeIn", // 载入使用何种效果
});
(function() {
    $.ajax({
        type: "get",
        url: "../../interface/index-getproduct.php",
        dataType: "json",
        success: function(res) {
            console.log(res);
            let temp = '';
            res.forEach((elm) => {
                console.log(elm);
                let picture = JSON.parse(elm.pic);
                console.log(picture);
                temp += `
            <li>
                <a href="./product.html?id=${elm.id}">
                    <div>
                        <img src="${picture[0].src}" alt="">
                        <h5>
                        ${elm.title}
                        </h5>
                        <p>￥${elm.price}</p>
                    </div>
                </a>
            </li>`;
            });
            $('#list-product').append(temp);
        }
    })
})();