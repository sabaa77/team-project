<?php
$db_server = "cs2410-web01pvm.aston.ac.uk"; 
$db_user = "cs2team49"; 
$db_password = "wHP74YYCEr1LqhK"; 
$db_name = "cs2team49_db";

$conn = new mysqli($db_server, $db_user, $db_password, $db_name);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "You are connected!";
}
?>
