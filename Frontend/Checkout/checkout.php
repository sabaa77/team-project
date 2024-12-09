<?php
session_start();

// Database connection
$host = "DB_HOST";
$user = "DB_USER";
$password = "DB_PASSWORD";
$database = "DB_NAME";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch basket items for the current user (or session-based basket)
$userId = $_SESSION['user_id'] ?? null; // Assume a logged-in user
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

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $country = $_POST['country'];
    $zip = $_POST['zip'];

    // Insert new order
    $orderSql = "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')";
    $orderStmt = $conn->prepare($orderSql);
    $orderStmt->bind_param("id", $userId, $totalPrice);
    $orderStmt->execute();
    $orderId = $conn->insert_id;

    // Copy basket items into order details
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

    // Clear the basket
    $clearBasketSql = "DELETE FROM orders WHERE user_id = ? AND status = 'pending'";
    $clearBasketStmt = $conn->prepare($clearBasketSql);
    $clearBasketStmt->bind_param("i", $userId);
    $clearBasketStmt->execute();

    echo "Order placed successfully! Your order ID is $orderId.";
    exit;
}
?>
