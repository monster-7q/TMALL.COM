import $ from './lib/jquery.js'; //jquery

(function() {
    const $username = $('#username'); //用户名
    const $password = $('#password'); //密码
    const $checkpass = $('#checkpass'); //确认密码
    const $email = $('#email'); //邮箱
    const $phone = $('#phone'); //手机号
    const $btn = $('#btn'); //span元素
    let reg = { //验证正则
        "username": /^[A-z]\w{5,15}$/,
        "password": /^.{6,16}$/,
        "email": /^\w{6,16}@[A-z0-9_-]{2,}\.[A-z]{2,7}\.?[A-z]*$/,
        "phone": /^1[3-9]\d{9}$/
    };
    //用户名判断
    $username.on('input', function() {
        // resyz($username, '请输入字母开头6-16位的用户名')
        $.ajax({
            url: '../../interface/register.php',
            type: 'get',
            data: {
                username: $username.val()
            },
            dataType: 'json',
            success: function(res) {
                getval(res);
            }
        });
    });

    function getval(res) {
        let $chespan = $('span[class="' + $username.attr('id') + '"]');
        if (reg[$username.attr('id')].test($username.val())) {
            if (!res) {
                $chespan.html('用户名可以使用');
                $chespan.css('color', 'green');
                $username.attr('data-pass', true);
            } else {
                $chespan.html('该用户名已经被注册');
                $chespan.css('color', 'red');
                $(this).attr('data-pass', false);
            }
        } else {
            $chespan.html('请输入字母开头，6-16位的用户名');
            $chespan.css('color', 'red');
            $(this).attr('data-pass', false);
        }
    }

    $password.on('input', function() {
        resyz($password, '请输入6-16位密码')
    });
    $email.on('input', function() {
        resyz($email, '请输入正确的邮箱地址')
    });
    $phone.on('input', function() {
        resyz($phone, '请输入正确的手机号码')
    });

    $checkpass.on('input', function() {
        let chespan = $('span[class="' + $checkpass.attr('id') + '"]')
        if ($(this).val() === $password.val()) {
            chespan.html('通过验证');
            chespan.css('color', 'green'); //span颜色为绿色
            $(this).attr('data-pass', true); //通过添加自定义属性
        } else {
            chespan.html('两次密码不一致，请重新输入'); //span提示
            chespan.css('color', 'red') //span颜色为红色
            $(this).attr('data-pass', false);
        }
        check();
    });

    function resyz(elm, text) {
        if (reg[elm.attr('id')].test(elm.val())) {
            $('span[class="' + elm.attr('id') + '"]').html('通过验证'); //span提示
            $('span[class="' + elm.attr('id') + '"]').css('color', 'green'); //span颜色为绿色
            elm.attr('data-pass', true); //通过添加自定义属性
        } else {
            $('span[class="' + elm.attr('id') + '"]').html(text);
            $('span[class="' + elm.attr('id') + '"]').css('color', 'red') //span颜色为红色
            elm.attr('data-pass', false);
        }
        check();
    };

    function check() {
        if ($('[data-pass=true]').length == 5) {
            $btn.attr('data-btn', true);
            $btn.removeAttr('disabled');
            $btn.addClass('btncolor');
        } else {
            $btn.attr('disabled', 'disabled');
            $btn.removeClass('btncolor');
        }
    };






})();