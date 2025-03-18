<?php
session_start();

try {
    $host = 'cs2410-web01pvm.aston.ac.uk';
    $db   = 'cs2team49_db';
    $user = 'cs2team49';
    $pass = 'wHP74YYCEr1LqhK';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'upload':
            handleFileUpload($pdo);
            break;
        case 'search':
            handleSearch($pdo);
            break;
    }
}

function handleFileUpload($pdo) {
    if (isset($_FILES['file'])) {
        $fileName = basename($_FILES['file']['name']);
        $filePath = 'uploads/' . $fileName;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            $stmt = $pdo->prepare('INSERT INTO files (name, file_path) VALUES (?, ?)');
            $stmt->execute([$fileName, $filePath]);
            echo "File uploaded successfully!";
        } else {
            echo "File upload failed.";
        }
    }
}

function handleSearch($pdo) {
    $searchTerm = $_POST['query'] ?? '';
    $stmt = $pdo->prepare('SELECT * FROM products WHERE name LIKE ?');
    $stmt->execute(['%' . $searchTerm . '%']);
    $results = $stmt->fetchAll();
    echo json_encode($results);
}
?>
