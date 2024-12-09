<?php
include 'db.php';

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
