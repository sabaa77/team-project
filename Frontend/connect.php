<?php

$newUsername=$_POST['newUsername'];
$newPassword=$_POST['newPassword'];
$username=$_POST['username'];
$password=$_POST['password'];
$conn=new mysqli('localhost','root','','test');
if($conn->connect_error){
 die('Connection Failed : '.$conn->connect_error);
}else{
    $stmt = $conn->prepar("insert into registration( newUsername, newPassword, username, password)
    values((?,?,?,?)");
    $stmt->bind_param("ssss",$newUsername,$newPassword,$username,$password);
    $stmt->execute();
    echo"Registration succesful";
    $stmt->close();
    $conn->close()
}
?>