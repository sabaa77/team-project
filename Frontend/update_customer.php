<?php
session_start();

include 'db.php';

if (!isset($_SESSION['user_type']) || $_SESSION['user_type'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['id']) || !isset($data['name']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

try {
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $pdo->prepare('SELECT email FROM users WHERE user_id = ? AND user_type = "customer"');
    $stmt->execute([$data['id']]);
    $current_email = $stmt->fetchColumn();
    if ($current_email === false) {
        echo json_encode(['success' => false, 'message' => 'Customer not found']);
        exit;
    }

    if ($data['email'] !== $current_email) {
        $stmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
        $stmt->execute([$data['email']]);
        if ($stmt->fetchColumn() > 0) {
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            exit;
        }
    }

    if (isset($data['password']) && !empty($data['password'])) {
        $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('UPDATE users SET name = ?, email = ?, password_hash = ?, WHERE user_id = ? AND user_type = "customer"');
        $stmt->execute([$data['name'], $data['email'], $password_hash, $data['id']]);
    } else {
        $stmt = $pdo->prepare('UPDATE users SET name = ?, email = ?, WHERE user_id = ? AND user_type = "customer"');
        $stmt->execute([$data['name'], $data['email'], $data['id']]);
    }
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}