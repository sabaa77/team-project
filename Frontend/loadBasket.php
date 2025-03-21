<?php
session_start();
include "db.php";

if (!isset($_SESSION['userID'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['userID'];

try {
    $stmt = $conn->prepare("SELECT product_name, price, quantity FROM basket WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $basket = [];
    while ($row = $result->fetch_assoc()) {
        $basket[] = $row;
    }

    echo json_encode(['success' => true, 'basket' => $basket]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error loading basket: ' . $e->getMessage()]);
}
?>