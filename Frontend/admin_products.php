<?php
include 'config.php';

session_start();

$admin_id = $_SESSION['admin_id'];

if (!isset($admin_id)) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_name = mysqli_real_escape_string($conn, $_POST['product_name']);
    $product_description = mysqli_real_escape_string($conn, $_POST['product_description']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $category_id = mysqli_real_escape_string($conn, $_POST['category_id']);
    $product_page_url = mysqli_real_escape_string($conn, $_POST['product_page_url']);
    $image = $_FILES['image']['name'];
    $image_tmp_name = $_FILES['image']['tmp_name'];
    $image_folder = 'uploaded_img/' . $image;

    if (empty($product_name) || empty($price) || empty($category_id) || empty($image)) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Please fill out all required fields!']);
        exit();
    }

    $insert_query = "INSERT INTO products (product_name, product_description, price, category_id, image_url, product_page_url) 
                     VALUES ('$product_name', '$product_description', '$price', '$category_id', '$image_folder', '$product_page_url')";
    $insert_result = mysqli_query($conn, $insert_query);

    if ($insert_result) {
        move_uploaded_file($image_tmp_name, $image_folder);
        header('Content-Type: application/json');
        echo json_encode(['success' => true, 'message' => 'Product added successfully!']);
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Failed to add product!']);
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $products = [];
    $select_products = mysqli_query($conn, "SELECT * FROM products") or die('Query failed');
    while ($row = mysqli_fetch_assoc($select_products)) {
        $products[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'products' => $products]);
    exit();
}
?>