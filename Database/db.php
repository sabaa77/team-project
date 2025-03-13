<?php
$db_server = "root"
$db_user = "localhost"
$db_password = ""; // No space between quotes
$db_name = "essencewear";

// Corrected mysqli_connect syntax
$conn = new mysqli($db_server, $db_user, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "You are connected!";
}
?>

