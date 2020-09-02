<?php
// 链接数据库
include('./conn.php');
// 获取前端数据
$username=$_REQUEST['username'];
$password=$_REQUEST['password'];
// 查询数据库
$sql="select * from users where username='$username' and password='$password'";
//执行
$result=$mysqli->query($sql);
// 关闭数据库
$mysqli->close();
// 判断账号密码是否正确
if($result->num_rows>0){
    echo true;
    // echo '<script>alert("登录成功")</script>';
}else{
    echo false;
    // echo '<script>alert("用户名或密码错误")</script>';
}



