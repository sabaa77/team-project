<?php
session_start();

$host = "localhost";
$user = "cs2team49";
$password = "wHP74YYCEr1LqhK";
$database = "cs2team49_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $pdo->query('SELECT * FROM products');
$products = $stmt->fetchAll();

foreach ($products as $product) {
    echo "<div class='product'>
            <img src='{$product['image_url']}' alt='{$product['name']}'>
            <h3>{$product['name']}</h3>
            <p>Price: £{$product['price']}</p>
         </div>";
}
?>
