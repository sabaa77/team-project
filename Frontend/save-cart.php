<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_SESSION['user_id'])) {
    $data = json_decode(file_get_contents('php://input'), true);
    $basketItems = $data['basketItems'];

    foreach (explode("\n", trim($basketItems)) as $item) {
        if ($item) {
            $stmt = $pdo->prepare('INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, "pending")');
            $stmt->execute([$_SESSION['user_id'], $item]);
        }
    }
    echo "Basket saved successfully!";
} else {
    echo "Failed to save basket";
}
?>
