<?php
include "db.php";

$category = isset($_GET['category']) ? $_GET['category'] : '';
$search = isset($_GET['search']) ? $_GET['search'] : '';

$sql = "SELECT * FROM Products WHERE 1";
if ($category) $sql .= " AND category_id = ?";
if ($search) $sql .= " AND name LIKE ?";

$stmt = $conn->prepare($sql);
if ($category && $search) {
    $search = "%$search%";
    $stmt->bind_param("is", $category, $search);
} elseif ($category) {
    $stmt->bind_param("i", $category);
} elseif ($search) {
    $search = "%$search%";
    $stmt->bind_param("s", $search);
}

$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
    echo "<div>
            <img src='{$row['image_url']}' alt='{$row['name']}' width='100'>
            <h3>{$row['name']}</h3>
            <p>{$row['description']}</p>
            <p>Price: \${$row['price']}</p>
            <button onclick='addToCart({$row['product_id']})'>Add to Cart</button>
         </div>";
}
?>
