<?php
session_start();
include "db.php";

if (!isset($_SESSION["cart"])) $_SESSION["cart"] = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $product_id = $_POST["product_id"];
    $_SESSION["cart"][$product_id] = ($_SESSION["cart"][$product_id] ?? 0) + 1;
    echo "Added to cart!";
}

if (!empty($_SESSION["cart"])) {
    foreach ($_SESSION["cart"] as $id => $quantity) {
        $stmt = $conn->prepare("SELECT name, price FROM Products WHERE product_id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result()->fetch_assoc();
        echo "<p>{$result['name']} - $quantity x \${$result['price']}</p>";
    }
    echo "<a href='checkout.php'>Proceed to Checkout</a>";
}
?>
