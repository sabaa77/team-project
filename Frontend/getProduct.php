<?php
include 'db.php';

if (!isset($_GET['id'])) {
    echo json_encode(['success' => false, 'message' => 'Product ID is required.']);
    exit();
}

$productId = intval($_GET['id']);

try {
    $stmt = $pdo->prepare("SELECT product_name, product_description, price, image_url FROM products WHERE product_id = ?");
    $stmt->execute([$productId]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($product) {
        echo json_encode(['success' => true, 'product' => $product]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Product not found.']);
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error fetching product: ' . $e->getMessage()]);
}
?>