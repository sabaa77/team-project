<?php
session_start();
include "db.php";

if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['userID'];

try {
    $stmt = $pdo->prepare("SELECT product_id, product_name, price, size, quantity FROM basket WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $basket = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($basket);

    echo json_encode(['success' => true, 'basket' => $basket]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error loading basket: ' . $e->getMessage()]);
}
?>