<?php
session_start();

include 'db.php';

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if (!isset($_GET['user_id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing customer ID']);
    exit;
}

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT user_id, name, email, FROM users WHERE user_id = ? AND user_type = "customer"');
    $stmt->execute([$_GET['user_id']]);
    $customer = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($customer) {
        echo json_encode($customer);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Customer not found']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}