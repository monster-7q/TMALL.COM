import $ from './lib/jquery.js';
(function() {
    let $btn = $('#btn'); //按钮
    const $username = $('#username'); //用户名
    const $password = $('#password'); //密码
    const $email = $('#email'); //邮箱
    const $phone = $('#phone'); //手机号

    $btn.on('click', function() {
        if ($('[data-btn=true]').length) {
            $.ajax({
                url: '../../interface/register-updata.php',
                type: 'post',
                data: {
                    username: $username.val(),
                    password: $password.val(),
                    username: $username.val(),
                    email: $email.val(),
                    phone: $phone.val()
                },
                success: function(res) {
                    alert('注册成功,跳转至登录');
                    location.href = "./login.html";
                }
            })
        }
    });
})();