<?php
include 'config.php';

session_start();

$admin_id = $_SESSION['admin_id'];

if (!isset($admin_id)) {
    header('location:login.php');
    exit();
}

if (isset($_POST['add_product'])) {
    $product_name = mysqli_real_escape_string($conn, $_POST['product_name']);
    $product_description = mysqli_real_escape_string($conn, $_POST['product_description']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $category_id = mysqli_real_escape_string($conn, $_POST['category_id']);
    $product_page_url = mysqli_real_escape_string($conn, $_POST['product_page_url']);
    $image = $_FILES['image']['name'];
    $image_tmp_name = $_FILES['image']['tmp_name'];
    $image_folder = 'uploaded_img/' . $image;

    if (empty($product_name) || empty($price) || empty($category_id) || empty($image)) {
        $message[] = 'Please fill out all required fields!';
    } else {
        $insert_query = "INSERT INTO products (product_name, product_description, price, category_id, image_url, product_page_url) 
                         VALUES ('$product_name', '$product_description', '$price', '$category_id', '$image_folder', '$product_page_url')";
        $insert_result = mysqli_query($conn, $insert_query);

        if ($insert_result) {
            move_uploaded_file($image_tmp_name, $image_folder);
            $message[] = 'Product added successfully!';
        } else {
            $message[] = 'Failed to add product!';
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin - Add Products</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="css/admin_style.css">
</head>
<body>

<?php include 'admin_header.php'; ?>

<section class="add-products">
    <h1 class="title">Add New Product</h1>

    <?php
    if (isset($message)) {
        foreach ($message as $msg) {
            echo '<p class="message">' . $msg . '</p>';
        }
    }
    ?>

    <form action="" method="post" enctype="multipart/form-data">
        <input type="text" name="product_name" placeholder="Enter product name" class="box" required>
        <textarea name="product_description" placeholder="Enter product description" class="box"></textarea>
        <input type="number" name="price" placeholder="Enter product price" class="box" required>
        <input type="number" name="category_id" placeholder="Enter category ID" class="box" required>
        <input type="text" name="product_page_url" placeholder="Enter product page URL (optional)" class="box">
        <input type="file" name="image" accept="image/jpg, image/jpeg, image/png" class="box" required>
        <input type="submit" value="Add Product" name="add_product" class="btn">
    </form>
</section>

<section class="show-products">
    <h1 class="title">Your Products</h1>

    <div class="box-container">
        <?php
        $select_products = mysqli_query($conn, "SELECT * FROM products") or die('Query failed');
        if (mysqli_num_rows($select_products) > 0) {
            while ($fetch_products = mysqli_fetch_assoc($select_products)) {
        ?>
        <div class="box">
            <img src="<?php echo $fetch_products['image_url']; ?>" alt="">
            <div class="name"><?php echo $fetch_products['product_name']; ?></div>
            <div class="description"><?php echo $fetch_products['product_description']; ?></div>
            <div class="price">$<?php echo $fetch_products['price']; ?>/-</div>
            <div class="category">Category ID: <?php echo $fetch_products['category_id']; ?></div>
            <?php if (!empty($fetch_products['product_page_url'])) { ?>
                <a href="<?php echo $fetch_products['product_page_url']; ?>" target="_blank" class="btn">View Product</a>
            <?php } ?>
        </div>
        <?php
            }
        } else {
            echo '<p class="empty">No products added yet!</p>';
        }
        ?>
    </div>
</section>

<script src="js/admin.js"></script>

</body>
</html>