<?php
session_start();
header('Content-Type: application/json');
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => true, 'inventory' => []]);
    exit();
}

if ($_SESSION['user_type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || !isset($data['action'])) {
        echo json_encode(['success' => false, 'message' => 'No data received']);
        exit();
    }
    
    $action = $data['action'];

    if ($action === 'add_product') {
        $name = $data['product_name'];
        $description = $data['product_description'];
        $price = $data['price'];
        $stock_level = $data['stock_level'];
        $image_url = $data['image_url'];
        $product_page_url = $data['product_page_url'];
        $category_id = $data['category_id'];

        $stmt = $pdo->prepare("INSERT INTO products (product_name, product_description, price, stock_level, image_url, product_page_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $description, $price, $stock_level, $image_url, $product_page_url, $category_id]);

        echo json_encode(['success' => true, 'message' => 'Product added successfully!']);
    } elseif ($action === 'update_product') {
        $product_id = $data['product_id'];
        $name = $data['product_name'];
        $description = $data['product_description'];
        $price = $data['price'];
        $stock_level = $data['stock_level'];
        $image_url = $data['image_url'];
        $product_page_url = $data['product_page_url'];
        $category_id = $data['category_id'];

        $stmt = $pdo->prepare("UPDATE products SET product_name = ?, product_description = ?, price = ?, stock_level = ?, image_url = ?, product_page_url = ?, category_id = ? WHERE product_id = ?");
        $stmt->execute([$name, $description, $price, $stock_level, $image_url, $product_page_url, $product_id, $category_id]);

        echo json_encode(['success' => true, 'message' => 'Product updated successfully!']);
    } elseif ($action === 'delete_product') {
        $product_id = $_POST['product_id'];

        $stmt = $pdo->prepare("DELETE FROM products WHERE product_id = ?");
        $stmt->execute([$product_id]);

        echo json_encode(['success' => true, 'message' => 'Product deleted successfully!']);
    }
}
?>