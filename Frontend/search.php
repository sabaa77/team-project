<?php
$servername = 'localhost';
$user = 'cs2team49';
$password = 'wHP74YYCEr1LqhK';
$database = 'cs2team49_db';

$conn = new mysqli($servername, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "GET" && !empty($_GET['query'])) {
    $searchTerm = $_GET['query'];
    
    $sql = "SELECT * FROM products WHERE product_name LIKE ? OR product_description LIKE ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $searchTermWithWildcards = "%" . $searchTerm . "%"; 
        $stmt->bind_param("ss", $searchTermWithWildcards, $searchTermWithWildcards);
        $stmt->execute();
        $result = $stmt->get_result();

        $results = [];
        while ($row = $result->fetch_assoc()) {
            $results[] = [
                "name" => $row['product_name'],
                "description" => $row['product_description'],
                "image" => $row['image_url'] ?? "#"
                "link" => $row['product_url'] ?? "#"

            ];
        }

        header('Content-Type: application/json');
        echo json_encode($results);
    } else {
        echo json_encode(["error" => "Failed to prepare the SQL statement."]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request or missing query parameter."]);
}

$conn->close();
?>