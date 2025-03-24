<?php
session_start();
header('Content-Type: application/json');
include 'db.php';

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $pdo->query("
        SELECT 
            o.order_id, o.user_id, o.order_date, o.status, 
            o.name, o.email, o.address, o.city, o.country, o.postal_code,
            oi.product_name, oi.size, oi.quantity, oi.price
        FROM orders o
        JOIN order_items oi ON o.order_id = oi.order_id
        ORDER BY o.order_date DESC
    ");

    $orders = [];

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $orderId = $row['order_id'];

        if (!isset($orders[$orderId])) {
            $orders[$orderId] = [
                'order_id' => $row['order_id'],
                'user_id' => $row['user_id'],
                'order_date' => $row['order_date'],
                'status' => $row['status'],
                'name' => $row['name'],
                'email' => $row['email'],
                'address' => $row['address'],
                'city' => $row['city'],
                'country' => $row['country'],
                'postal_code' => $row['postal_code'],
                'items' => []
            ];
        }

        $orders[$orderId]['items'][] = [
            'product_name' => $row['product_name'],
            'size' => $row['size'],
            'quantity' => $row['quantity'],
            'price' => $row['price']
        ];
    }

    echo json_encode(['success' => true, 'orders' => array_values($orders)]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['order_id']) || !isset($data['status'])) {
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
        exit();
    }

    $order_id = $data['order_id'];
    $status = $data['status'];

    $stmt = $pdo->prepare("UPDATE orders SET status = ? WHERE order_id = ?");
    $stmt->execute([$status, $order_id]);

    if ($stmt->rowCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Order status updated successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to update order status']);
    }
}
