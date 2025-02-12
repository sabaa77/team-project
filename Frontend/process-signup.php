<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $phone = trim($_POST['phone']);
    $address = trim($_POST['address']);

    $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo "<p>Email already registered. <a href='login.html'>Login instead</a></p>";
        exit();
    }

    $stmt = $pdo->prepare('INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, "customer")');
    if ($stmt->execute([$name, $email, $password, $phone, $address])) {
        echo "<p>Account created! <a href='login.html'>Login now</a></p>";
    } else {
        echo "<p>Signup failed. Try again.</p>";
    }
    exit();
}