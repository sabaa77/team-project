<?php

header('Content-Type: application/json');

$host = 'cs2410-web01pvm.aston.ac.uk';
$user = 'cs2team49';
$password = 'wHP74YYCEr1LqhK';
$database = 'cs2team49_db';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$query = isset($_GET['query']) ? $conn->real_escape_string($_GET['query']) : '';

if (empty($query)) {
    echo json_encode([]);
    exit;
}

$sql = "SELECT name, description, price, image_url 
        FROM products 
        WHERE name LIKE '%$query%' OR description LIKE '%$query%'";

$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

echo json_encode($products);

$conn->close();
?>