<?php
include 'db.php';

if (!isset($_GET['product_id'])) {
    echo json_encode(['success' => false, 'message' => 'Product ID is required.']);
    exit();
}

$product_id = intval($_GET['product_id']);

try {
    $stmt = $pdo->prepare("SELECT product_id, product_name, product_description, price, image_url FROM products WHERE product_id = ?");
    $stmt->execute([$product_id]);
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