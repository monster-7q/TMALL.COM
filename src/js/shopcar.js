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
                    console.log(arr);
                    template += `
                    <ul>
                        <li>
                            <input type="checkbox">
                        </li>
                        <li>
                            <div>
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
                        <li>￥${elm.price}</li>
                        <li>
                            <div>
                                <a href="">-</a>
                                <input type="text" value="${arr[0].num}">
                                <a href="">+</a>
                            </div>
                        </li>
                        <li>
                            ￥${(elm.price*arr[0].num).toFixed(2)}
                            <p>(${elm.kg}kg)</p>
                        </li>
                        <li><a href="">删除</a></li>
                    </ul>
                    `;
                });
                $('#shopcar-list').append(template);
            }
        })

    }
})()