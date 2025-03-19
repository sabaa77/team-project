<?php
$conn = new mysqli("127.0.0.1", "root", "", "essencewear");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$searchTerm = isset($_GET['query']) ? $_GET['query'] : '';

$sql = "SELECT * FROM products WHERE name LIKE ? OR description LIKE ?";
$stmt = $conn->prepare($sql);

$searchParam = "%" . $searchTerm . "%";
$stmt->bind_param("ss", $searchParam, $searchParam);

$stmt->execute();
$result = $stmt->get_result();

$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

header('Content-Type: application/json');
echo json_encode($products);

$stmt->close();
$conn->close();
?>
