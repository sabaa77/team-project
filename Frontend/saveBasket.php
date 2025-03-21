<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_SESSION['userID'])) {
        echo json_encode(['success' => false, 'message' => 'User not logged in.']);
        exit();
    }

    $user_id = $_SESSION['userID'];
    $basket = json_decode(file_get_contents('php://input'), true);

    try {
        $stmt = $conn->prepare("DELETE FROM basket WHERE user_id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();

        $stmt = $conn->prepare("INSERT INTO basket (user_id, product_name, price, quantity) VALUES (?, ?, ?, ?)");
        foreach ($basket as $item) {
            $stmt->bind_param("isdi", $user_id, $item['name'], $item['price'], $item['quantity']);
            $stmt->execute();
        }

        echo json_encode(['success' => true, 'message' => 'Basket saved successfully.']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error saving basket: ' . $e->getMessage()]);
    }
}
?>