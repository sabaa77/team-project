<?php
session_start();

include 'db.php';

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    $stmt->execute([$data['email']]);
    if ($stmt->fetchColumn() > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
        exit;
    }

    $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash, user_type, address) VALUES (?, ?, ?, "customer", ?)');
    $stmt->execute([$data['name'], $data['email'], $password_hash, $data['address'] ?? null, $data['phone_number'] ?? null]);
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}