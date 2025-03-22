<?php
session_start();
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Essence Wear | Home</title>
    <link rel="icon" type="image/png" href="essence wear logo (black).png">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
   <header>
    <a href="index.php" class="logo-link">
    <img src="essence wear logo (black).png" alt="logo" class="logo">
    </a>
    <div class="header-text">
       <h1>Essence Wear</h1>
       <p>Your Style, Your Way</p>
    </div>
    <div class="icons">
        <div class="search-container">
            <img src="searchlogo.png" alt="search-logo" class="search-logo" id="search-icon">
            <div class="search-bar" id="search-bar">
                <input type="text" placeholder="Search...">
                <button type="button">Go</button>
            </div>
            <div id="searchResults"></div>
        </div>
        <a href="basket.html" title="Basket">
            <img src="basketlogo.png" alt="basket-logo" class="basket-logo">
        </a>
        <a href="User Page.html" title="User Profile">
            <img src="userlogo.png" alt="user-logo" class="user-logo">
        </a>
    </div>
   </header>
   <nav>
    <a href="Mens.html">Men</a>
    <a href="Womens.html">Women</a>
    <a href="Kids.html">Kids</a>
    <a href="Accessories.html">Accessories</a>
    <a href="shoes.html">Shoes</a>
    <a href="About Us Page.html">About Us</a>
    <a href="Contact us.html">Contact Us</a>
    <a href="FAQ.html">FAQ</a> 

    <?php if (isset($_SESSION['user_type']) && $_SESSION['user_type'] === 'admin') { ?>
        <a href="admin_products.php">Admin Panel</a>
    <?php } ?>
   </nav>

   <div class="container">
    <h2>Categories</h2>
    <p>Check out our range of Categories</p>
   <div class="product">
        <a href="Mens.html"><img src="BalenciagaTshirt.png" alt="Product 1"></a> 
       <h3>Men's Clothing</h3>
       <p></p>
   </div>

   <div class="product">
    <a href="Womens.html"><img src="BalenciagaPants.png" alt="Product 2"></a>
    <h3>Women's Clothing</h3>
    <p></p>
   </div>

   <div class="product">
    <a href="Kids.html"><img src="BoysMonclerCoat.png" alt="Product 3"></a>
    <h3>Kid's Clothing</h3>
    <p></p>
   </div>  

   <div class="product">
    <a href="Accessories.html"><img src="PradaBracelet.png" alt="Product 4"></a>
    <h3>Accessories</h3>
    <p></p>
   </div>

   <div class="product">
    <a href="shoes.html"><img src="MensGucciTrainers.png" alt="Product 5"></a>
    <h3>Shoes</h3>
    <p></p>
   </div>
   </div>

<footer>
    <p>&copy; 2024 Essence Wear. All Rights Reserved.</p>
</footer>

<script src="search.js"></script>
</body> 
</html>