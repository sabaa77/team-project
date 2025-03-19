<?php
$db_server = "localhost"; 
$db_user = "cs2team49"; 
$db_password = "wHP74YYCEr1LqhK"; 
$db_name = "cs2team49_db";

// Create connection
$conn = new mysqli($db_server, $db_user, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "You are connected!";
}
?>
