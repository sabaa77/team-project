<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT);
    $address = $_POST["address"];
    $phone_number = $_POST["phone_number"];
    $user_type = "customer";  // Default to 'customer'

    // Check if email already exists
    $stmt = $conn->prepare("SELECT user_id FROM Users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        echo "Email already registered!";
    } else {
        // Insert new user
        $stmt = $conn->prepare("INSERT INTO Users (name, email, password_hash, user_type, address, phone_number) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $name, $email, $password, $user_type, $address, $phone_number);
        
        if ($stmt->execute()) {
            $_SESSION["user_id"] = $stmt->insert_id;
            header("Location: index.php"); // Redirect to homepage
        } else {
            echo "Error signing up!";
        }
    }
}
?>

<!-- Signup Form -->
<form method="POST">
    <input type="text" name="name" placeholder="Full Name" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="text" name="address" placeholder="Full Address" required>
    <input type="text" name="phone_number" placeholder="Phone Number" required>
    <button type="submit">Sign Up</button>
</form>
