import $ from './lib/jquery.js'; //jquery
import { cookie } from './lib/cookie.js';
(function() {
    let $btn = $('#btn'); //按钮
    $btn.on('click', function() {
        const $username = $('#username'); //用户名
        const $password = $('#password'); //密码

        $.ajax({
            type: 'post',
            url: '../../interface/login.php',
            data: {
                username: $username.val(),
                password: $password.val(),
            },
            success: function(data) {
                console.log(!data);
                if (!data) {
                    alert("用户名或密码错误")
                } else {
                    alert("登录成功")
                    cookie.set('username', $($username).val(), 1)
                    location.href = "./index.html";
                };
            }
        })
    })



})();