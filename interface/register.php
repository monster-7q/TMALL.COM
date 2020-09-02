<?php
    // 链接数据库
    include('./conn.php');
    // 获取用户名
    $username = $_REQUEST['username'];
    // 查询用户名
    $sql = "select * from users where username='$username'";
    // 执行
    $result = $mysqli->query($sql);
    // 关闭数据库
    $mysqli->close();
    // 判断查询结果
    if($result->num_rows>0){
        echo '1';//如果不存在
    }else{
        echo '0';//如果不存在
    }
?>