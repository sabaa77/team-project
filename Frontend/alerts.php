<?php
session_start();
include 'db.php';

if ($_SESSION['user_type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

$stmt = $pdo->prepare("SELECT * FROM low_stock_alerts");
$stmt->execute();
$alerts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'alerts' => $alerts]);
?>