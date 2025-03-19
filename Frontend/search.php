<?php
header('Content-Type: application/json');

$host = 'cs2410-web01pvm.aston.ac.uk';
$user = 'cs2team49';
$password = 'wHP74YYCEr1LqhK';
$database = 'cs2team49_db';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(['error' => 'Database connection failed']));
}

$query = isset($_GET['query']) ? trim($_GET['query']) : '';

if (empty($query)) {
    http_response_code(400);
    die(json_encode(['error' => 'No search term provided']));
}

$stmt = $conn->prepare("
    SELECT id, name, description, price, image_url 
    FROM products 
    WHERE name LIKE CONCAT('%', ?, '%') 
       OR description LIKE CONCAT('%', ?, '%')
");
$stmt->bind_param("ss", $query, $query);
$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);

$stmt->close();
$conn->close();
?>