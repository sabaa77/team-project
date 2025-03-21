<?php
session_start();
include "db.php";

if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['userID'];
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
        $stmt->execute([
            $user_id,
            $item['product_id'] ?? null,
            $item['name'],
            $item['price'],
            $item['size'],
            $item['quantity']
        ]);
    }

    $pdo->commit();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'message' => 'Error saving basket: ' . $e->getMessage()]);
}
?>