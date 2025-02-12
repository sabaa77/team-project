<?php
    $host = 'localhost';
    $dbname = 'cs2team49_db';
    $username = 'cs2team49';
    $password = 'wHP74YYCEr1LqhK';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
    ?>
    
