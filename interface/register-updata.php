<?php
// 链接数据库
include('./conn.php');
// 获取数据
$username=$_REQUEST['username'];
$password=$_REQUEST['password'];
$email=$_REQUEST['email'];
$phone=$_REQUEST['phone'];
// 插入数据
$sql="INSERT INTO `users`(`username`, `password`, `email`, `phone`) VALUES ('$username','$password','$email','$phone')";

// 执行数据
$mysqli->query($sql);
// 关闭数据库
$mysqli->close();
echo '<script>alert(注册成功);</script>';
// <script>location.href="../admin.php"</script>
?>