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

$userId = $_SESSION['user_id'] ?? null; 
if (!$userId) {
    die("Please log in to proceed with checkout.");
}

$sql = "SELECT products.name, order_details.quantity, products.price
        FROM order_details
        JOIN orders ON order_details.order_id = orders.id
        JOIN products ON order_details.product_id = products.id
        WHERE orders.user_id = ? AND orders.status = 'pending'";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$result = $stmt->get_result();

$basketItems = [];
$totalPrice = 0;

while ($row = $result->fetch_assoc()) {
    $basketItems[] = $row;
    $totalPrice += $row['quantity'] * $row['price'];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $country = $_POST['country'];
    $zip = $_POST['zip'];

    $orderSql = "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')";
    $orderStmt = $conn->prepare($orderSql);
    $orderStmt->bind_param("id", $userId, $totalPrice);
    $orderStmt->execute();
    $orderId = $conn->insert_id;

    foreach ($basketItems as $item) {
        $orderDetailSql = "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
        $orderDetailStmt = $conn->prepare($orderDetailSql);
        $orderDetailStmt->bind_param(
            "iiid",
            $orderId,
            $item['product_id'],
            $item['quantity'],
            $item['price']
        );
        $orderDetailStmt->execute();
    }

    $clearBasketSql = "DELETE FROM orders WHERE user_id = ? AND status = 'pending'";
    $clearBasketStmt = $conn->prepare($clearBasketSql);
    $clearBasketStmt->bind_param("i", $userId);
    $clearBasketStmt->execute();

    echo "Order placed successfully! Your order ID is $orderId.";
    exit;
}
?>