<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

require_once 'connection.php'; 

$error_message = "";
$success_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($name) || empty($email) || empty($password)) {
        $error_message = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid Email";
    } else {
        try {
            $stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = ?");
            $stmt->execute([$email]);

            if ($stmt->rowCount() > 0) {
                $error_message = "Email already in use. Please try a different email.";
            } else {
                $hashed_password = password_hash($password, PASSWORD_BCRYPT);

                $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?, ?)");
                $stmt->execute([$name, $email, $hashed_password]);

                $success_message = "Signup successful! <a href='logIn.php'>Go to Login</a>";
                header("Location: logIn.php");
                exit;
            }
        } catch (PDOException $e) {
            $error_message = "Error: " . $e->getMessage();
            error_log("Signup error: " . $e->getMessage());
        }
    }
}
?>