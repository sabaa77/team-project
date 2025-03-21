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
    die(json_encode(['success' => false, 'message' => 'Please log in to proceed with checkout.']));
}

$sql = "SELECT products.id AS product_id, products.name, order_details.quantity, products.price, order_details.size
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

    $conn->begin_transaction();

    try {
        $orderSql = "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')";
        $orderStmt = $conn->prepare($orderSql);
        $orderStmt->bind_param("id", $userId, $totalPrice);
        $orderStmt->execute();
        $orderId = $conn->insert_id;

        foreach ($basketItems as $item) {
            $orderDetailSql = "INSERT INTO order_details (order_id, product_id, size, quantity, price) VALUES (?, ?, ?, ?, ?)";
            $orderDetailStmt = $conn->prepare($orderDetailSql);
            $orderDetailStmt->bind_param(
                "iiisd",
                $orderId,
                $item['product_id'],
                $item['size'],
                $item['quantity'],
                $item['price']
            );
            $orderDetailStmt->execute();

            $updateInventorySql = "UPDATE inventory 
                                   SET stock_removed = stock_removed + ?, 
                                       stock_balance = stock_balance - ? 
                                   WHERE product_id = ? AND size = ?";
            $updateInventoryStmt = $conn->prepare($updateInventorySql);
            $updateInventoryStmt->bind_param(
                "iiis",
                $item['quantity'],
                $item['quantity'],
                $item['product_id'],
                $item['size']
            );
            $updateInventoryStmt->execute();

            if ($conn->affected_rows === 0) {
                throw new Exception("Insufficient stock for product: " . $item['name']);
            }
        }

        $clearBasketSql = "DELETE FROM orders WHERE user_id = ? AND status = 'pending'";
        $clearBasketStmt = $conn->prepare($clearBasketSql);
        $clearBasketStmt->bind_param("i", $userId);
        $clearBasketStmt->execute();

        $conn->commit();

        echo json_encode(['success' => true, 'order_id' => $orderId]);
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(['success' => false, 'message' => 'Error during checkout: ' . $e->getMessage()]);
    }

    exit;
}
?>