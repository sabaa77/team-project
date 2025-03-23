<?php
session_start();
include 'db.php';

if ($_SESSION['user_type'] !== 'admin') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add_product') {
        $name = $_POST['product_name'];
        $description = $_POST['product_description'];
        $price = $_POST['price'];
        $stock_level = $_POST['stock_level'];
        $image_url = $_POST['image_url'];
        $product_page_url = $_POST['product_page_url'];
        $category_id = $_POST['category_id'];

        $stmt = $pdo->prepare("INSERT INTO products (product_name, product_description, price, stock_level, image_url, product_page_url, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $description, $price, $stock_level, $image_url, $product_page_url, $category_id]);

        echo json_encode(['success' => true, 'message' => 'Product added successfully!']);
    } elseif ($action === 'update_product') {
        $product_id = $_POST['product_id'];
        $name = $_POST['product_name'];
        $description = $_POST['product_description'];
        $price = $_POST['price'];
        $stock_level = $_POST['stock_level'];
        $image_url = $_POST['image_url'];
        $product_page_url = $_POST['product_page_url'];
        $category_id = $_POST['category_id'];

        $stmt = $pdo->prepare("UPDATE products SET product_name = ?, product_description = ?, price = ?, stock_level = ?, image_url = ?, product_page_url = ?, category_id = ? WHERE product_id = ?");
        $stmt->execute([$name, $description, $price, $stock_level, $image_url, $product_page_url, $product_id, $category_id]);

        echo json_encode(['success' => true, 'message' => 'Product updated successfully!']);
    } elseif ($action === 'delete_product') {
        $product_id = $_POST['product_id'];

        $stmt = $pdo->prepare("DELETE FROM products WHERE product_id = ?");
        $stmt->execute([$product_id]);

        echo json_encode(['success' => true, 'message' => 'Product deleted successfully!']);
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['success' => true, 'inventory' => []]);
        exit();
    }
}
?>