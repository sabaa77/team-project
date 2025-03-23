<?php
session_start();
include "db.php";

header('Content-Type: application/json');

$pdo->beginTransaction();

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['email'], $data['name'], $data['address'], $data['basket'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid order data.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$product_id = $data['product_id'];
$email = $data['email'];
$name = $data['name'];
$address = $data['address'];
$city = $data['city'];
$country = $data['country'];
$postal_code = $data['postal_code'];
$basket = $data['basket'];

try {

    $stmt = $pdo->prepare("INSERT INTO orders (user_id, product_id, email, name, address, city, country, postal_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$order_id, $user_id, $product_id, $email, $name, $address, $city, $country, $postal_code]);
    $order_id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, product_name, size, quantity, price) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($basket as $item) {
        if (!isset($item['product_id'], $item['product_name'], $item['size'], $item['quantity'], $item['price'])) {
            throw new Exception('Invalid basket item data.');
    }
    $stmt->execute([
        $order_id,
        $item['product_id'],
        $item['product_name'],
        $item['size'],
        $item['quantity'],
        $item['price']
    ]);
}

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Order placed successfully.']);
} catch (Exception $e) {
    $pdo->rollback();
    error_log("Error processing order: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error processing order.']);
}
?>