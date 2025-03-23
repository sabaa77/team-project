<?php

$host = "cs2410-web01pvm.aston.ac.uk"; 
$user = "cs2team49";
$password = "wHP74YYCEr1LqhK";
$database = "cs2team49_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>
