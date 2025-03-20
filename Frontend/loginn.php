<?php
session_start();

$errors = [
    'login'    => $_SESSION['login_error']    ?? '',
    'register' => $_SESSION['register_error'] ?? ''
];

$activeForm = $_SESSION['active_form'] ?? 'login';

session_unset();

function showError($error) {
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}

function isActiveForm($formName, $activeForm) {
    return $formName === $activeForm 
        ? 'active' 
        : '';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Essence Wear | Log-In</title>
    <link rel="icon" type="image/png" href="essence wear logo (black).png">
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <nav class="navbar">
        <a href="index.html" class="home-button">Home</a>
    </nav>

    <div class="container">
        <div class="form-box <?= isActiveForm('login', $activeForm); ?>" id="login-form">
        <h2>Login</h2>
        <?= showError($errors['login']); ?>
        <form action="Frontend.php" method="post">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="login">Login</button>
            <p>Dont have an account? <a href="#" onclick="showForm('register-form')">Register</a></p>

            
            <p class="error" id="errorMsg"></p>
        </form>
    </div>



    <div class="form-box <?= isActiveForm('register', $activeForm); ?>" id="register-form">
        <h2>Register</h2>
        <?= showError($errors['register']); ?>
        <form action="Frontend.php" method="post">
            <input type="text" name="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit" name="register">Register</button>
            <p>Already have an account? <a href="#" onclick="showForm('login-form')"> Login</a></p>

            
            <p class="error" id="errorMsg"></p>
        </form>


    
    <script src="login.js"></script>
</body>
</html>