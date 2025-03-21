<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

require_once 'connection.php'; 

$error_message = "";
$success_message = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $phone = trim($_POST['phone']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    if (empty($name) || empty($phone) || empty($email) || empty($password)) {
        $error_message = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid Email";
    } else {
        try {

            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);

            if ($stmt->rowCount() > 0) {
                $error_message = "Email already in use. Please try a different email.";
            } else {

                $hashed_password = password_hash($password, PASSWORD_BCRYPT);

                $stmt = $pdo->prepare("INSERT INTO users (name, phone_number, email, password) VALUES (?, ?, ?, ?)");
                $stmt->execute([$name, $phone, $email, $hashed_password]);

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