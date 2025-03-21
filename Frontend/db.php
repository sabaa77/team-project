<?php
$db_server = "localhost"; 
$db_user = "cs2team49"; 
$db_password = "wHP74YYCEr1LqhK"; 
$db_name = "cs2team49_db";

try {
    $pdo = new PDO("mysql:host=$db_server;dbname=$db_name;charset=utf8mb4", $db_user, $db_password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>