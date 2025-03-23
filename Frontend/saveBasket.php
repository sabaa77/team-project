<?php
session_start();
include "db.php";

header('Content-Type: application/json');

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'User not logged in.']);
    exit();
}

$user_id = $_SESSION['user_id'];
$data = json_decode(file_get_contents('php://input'), true);

// Debugging: Log the raw incoming data
error_log("Raw basket data received: " . file_get_contents('php://input'));

// Check if the data is valid
if (!$data || !is_array($data)) {
    error_log("Invalid basket data: " . print_r($data, true));
    echo json_encode(['success' => false, 'message' => 'Invalid basket data.']);
    exit();
}

try {
    $pdo->beginTransaction();

    // Clear the user's existing basket
    $stmt = $pdo->prepare("DELETE FROM basket WHERE user_id = ?");
    $stmt->execute([$user_id]);

    // Prepare the insert statement
    $stmt = $pdo->prepare("INSERT INTO basket (user_id, product_id, product_name, price, size, quantity) VALUES (?, ?, ?, ?, ?, ?)");

    foreach ($data as $item) {
        // Debugging: Log each item being processed
        error_log("Processing basket item: " . print_r($item, true));

        // Validate each field
        if (!isset($item['product_id']) || !is_numeric($item['product_id'])) {
            throw new Exception('Invalid or missing product_id: ' . print_r($item, true));
        }
        if (!isset($item['product_name']) || empty($item['product_name'])) {
            throw new Exception('Invalid or missing product_name: ' . print_r($item, true));
        }
        if (!isset($item['price']) || !is_numeric($item['price'])) {
            throw new Exception('Invalid or missing price: ' . print_r($item, true));
        }
        if (!isset($item['size']) || empty($item['size'])) {
            throw new Exception('Invalid or missing size: ' . print_r($item, true));
        }
        if (!isset($item['quantity']) || !is_numeric($item['quantity'])) {
            throw new Exception('Invalid or missing quantity: ' . print_r($item, true));
        }

        // Execute the insert statement
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
    error_log("Error saving basket: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Error saving basket: ' . $e->getMessage()]);
}
?>