<?php
session_start();
include "db.php";

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !is_array($data)) {
    echo json_encode(['success' => false, 'message' => 'Invalid basket data.']);
    exit();
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("DELETE FROM basket WHERE user_id = ?");
    $stmt->execute([$user_id]);

    $stmt = $pdo->prepare("INSERT INTO basket (user_id, product_id, product_name, price, size, quantity) VALUES (?, ?, ?, ?, ?, ?)");
    foreach ($data as $item) {

        if (!isset($item['product_id'], $item['product_name'], $item['price'], $item['size'], $item['quantity'])) {
            throw new Exception('Missing required basket item fields.');
        }

        $stmt->execute([
            $user_id,
            $item['product_id'],
            $item['product_name'],
            $item['price'],
            $item['size'],
            $item['quantity']
        ]);
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'message' => 'Basket saved successfully.']);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Error saving basket: ' . $e->getMessage()]);
}
?>