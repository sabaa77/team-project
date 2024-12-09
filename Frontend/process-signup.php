<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $phone = $_POST['phone'];
    $address = $_POST['address'];

    $stmt = $pdo->prepare('INSERT INTO users (name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, "customer")');
    
    if ($stmt->execute([$name, $email, $password, $phone, $address])) {
        echo "<p>Account created! <a href='login.html'>Login now</a></p>";
    } else {
        echo "<p>Signup failed. Try again.</p>";
    }
}
?>
