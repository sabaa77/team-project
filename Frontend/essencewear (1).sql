-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 13, 2025 at 04:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `essencewear`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(10) UNSIGNED NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(3, 'Kids'),
(1, 'Men'),
(2, 'Women'),
(4, 'Accessories'),
(5, 'Shoes');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventory_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `size` enum('S','M','L','XL','2','3','4','5','6','7','8','9','10','11','12') NOT NULL,
  `stock_added` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stock_removed` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stock_balance` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO inventory (product_id, size, stock_added, stock_removed, stock_balance) VALUES
(1, 'S', 30, 5, 25),
(1, 'M', 30, 5, 25),
(1, 'L', 30, 5, 25),
(1, 'XL', 30, 5, 25),

(2, 'S', 30, 5, 25),
(2, 'M', 30, 5, 25),
(2, 'L', 30, 5, 25),
(2, 'XL', 30, 5, 25),

(3, 'S', 30, 5, 25),
(3, 'M', 30, 5, 25),
(3, 'L', 30, 5, 25),
(3, 'XL', 30, 5, 25),

(4, 'S', 30, 5, 25),
(4, 'M', 30, 5, 25),
(4, 'L', 30, 5, 25),
(4, 'XL', 30, 5, 25),

(5, 'S', 30, 5, 25),
(5, 'M', 30, 5, 25),
(5, 'L', 30, 5, 25),
(5, 'XL', 30, 5, 25),

(6, 'S', 30, 5, 25),
(6, 'M', 30, 5, 25),
(6, 'L', 30, 5, 25),
(6, 'XL', 30, 5, 25),

(7, 'S', 30, 5, 25),
(7, 'M', 30, 5, 25),
(7, 'L', 30, 5, 25),
(7, 'XL', 30, 5, 25),

(8, 'S', 30, 5, 25),
(8, 'M', 30, 5, 25),
(8, 'L', 30, 5, 25),
(8, 'XL', 30, 5, 25),

(9, 'S', 30, 5, 25),
(9, 'M', 30, 5, 25),
(9, 'L', 30, 5, 25),
(9, 'XL', 30, 5, 25),

(10, 'S', 30, 5, 25),
(10, 'M', 30, 5, 25),
(10, 'L', 30, 5, 25),
(10, 'XL', 30, 5, 25),

(11, 'S', 30, 5, 25),
(11, 'M', 30, 5, 25),
(11, 'L', 30, 5, 25),
(11, 'XL', 30, 5, 25),

(12, 'S', 30, 5, 25),
(12, 'M', 30, 5, 25),
(12, 'L', 30, 5, 25),
(12, 'XL', 30, 5, 25),

(13, 'S', 30, 5, 25),
(13, 'M', 30, 5, 25),
(13, 'L', 30, 5, 25),
(13, 'XL', 30, 5, 25),

(14, 'S', 30, 5, 25),
(14, 'M', 30, 5, 25),
(14, 'L', 30, 5, 25),
(14, 'XL', 30, 5, 25),

(15, 'S', 30, 5, 25),
(15, 'M', 30, 5, 25),
(15, 'L', 30, 5, 25),
(15, 'XL', 30, 5, 25),

(16, 'S', 30, 5, 25),
(16, 'M', 30, 5, 25),
(16, 'L', 30, 5, 25),
(16, 'XL', 30, 5, 25),

(17, 'S', 30, 5, 25),
(17, 'M', 30, 5, 25),
(17, 'L', 30, 5, 25),
(17, 'XL', 30, 5, 25),

(18, 'S', 30, 5, 25),
(18, 'M', 30, 5, 25),
(18, 'L', 30, 5, 25),
(18, 'XL', 30, 5, 25);


INSERT INTO inventory (product_id, size, stock_added, stock_removed, stock_balance) VALUES
(19, 'One Size', 50, 10, 40),
(20, 'One Size', 50, 10, 40),
(21, 'One Size', 50, 10, 40),
(22, 'One Size', 50, 10, 40),
(23, 'One Size', 50, 10, 40),
(24, 'One Size', 50, 10, 40);


INSERT INTO inventory (product_id, size, stock_added, stock_removed, stock_balance) VALUES
(25, '6', 10, 0, 10),
(25, '7', 10, 0, 10),
(25, '8', 10, 0, 10),
(25, '9', 10, 0, 10),
(25, '10', 10, 0, 10),
(25, '11', 10, 0, 10),
(25, '12', 10, 0, 10),

(26, '2', 10, 0, 10),
(26, '3', 10, 0, 10),
(26, '4', 10, 0, 10),
(26, '5', 10, 0, 10),
(26, '6', 10, 0, 10),
(26, '7', 10, 0, 10),
(26, '8', 10, 0, 10),

(27, '6', 10, 0, 10),
(27, '7', 10, 0, 10),
(27, '8', 10, 0, 10),
(27, '9', 10, 0, 10),
(27, '10', 10, 0, 10),
(27, '11', 10, 0, 10),
(27, '12', 10, 0, 10),

(28, '2', 10, 0, 10),
(28, '3', 10, 0, 10),
(28, '4', 10, 0, 10),
(28, '5', 10, 0, 10),
(28, '6', 10, 0, 10),
(28, '7', 10, 0, 10),
(28, '8', 10, 0, 10),

(29, '6', 10, 0, 10),
(29, '7', 10, 0, 10),
(29, '8', 10, 0, 10),
(29, '9', 10, 0, 10),
(29, '10', 10, 0, 10),
(29, '11', 10, 0, 10),
(29, '12', 10, 0, 10),

(30, '2', 10, 0, 10),
(30, '3', 10, 0, 10),
(30, '4', 10, 0, 10),
(30, '5', 10, 0, 10),
(30, '6', 10, 0, 10),
(30, '7', 10, 0, 10),
(30, '8', 10, 0, 10);




--
-- Triggers `inventory`
--
DELIMITER $$
CREATE TRIGGER `trigger_low_stock_alert` AFTER UPDATE ON `inventory` FOR EACH ROW BEGIN
    DECLARE low_stock_threshold INT DEFAULT 3;
    
    -- Check if stock level falls below the threshold
    IF NEW.stock_balance < low_stock_threshold THEN
        INSERT INTO Low_Stock_Alerts (product_id, stock_balance, alert_message)
        VALUES (NEW.product_id, NEW.stock_balance, 
                CONCAT('Low stock alert: Product ID ', NEW.product_id, 
                ' has only ', NEW.stock_balance, ' units left.'));
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_stock_balance` BEFORE INSERT ON `inventory` FOR EACH ROW BEGIN
    SET NEW.stock_balance = NEW.stock_added - NEW.stock_removed;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_stock_balance_after_update` BEFORE UPDATE ON `inventory` FOR EACH ROW BEGIN
    SET NEW.stock_balance = NEW.stock_added - NEW.stock_removed;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `low_stock_alerts`
--

CREATE TABLE `low_stock_alerts` (
  `alert_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `stock_balance` int(11) NOT NULL,
  `alert_message` varchar(255) NOT NULL,
  `alert_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `low_stock_alerts`
--

INSERT INTO `low_stock_alerts` (`alert_id`, `product_id`, `stock_balance`, `alert_message`, `alert_time`) VALUES
(1, 5, 8, 'Low stock alert: Burberry Jacket has only 8 units left!', '2025-03-12 12:42:12'),
(2, 9, 7, 'Low stock alert: Valentino Coat has only 7 units left!', '2025-03-12 12:42:12'),
(3, 11, 5, 'Low stock alert: YSL Dress has only 5 units left!', '2025-03-12 12:42:12');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(10) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `message`, `created_at`, `user_id`) VALUES
(1, 'Your order #1 has been shipped!', '2025-03-12 12:49:18', 1),
(2, 'Your return request for order #2 has been approved.', '2025-03-12 12:49:18', 2),
(3, 'Low stock alert: Valentino Coat needs restocking.', '2025-03-12 12:49:18', 3),
(4, 'Your refund for order #4 has been processed.', '2025-03-12 12:49:18', 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `postal_code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `size` enum('S','M','L','XL','2','3','4','5','6','7','8','9','10','11','12') NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `products`
ADD COLUMN `stock_level` INT NOT NULL DEFAULT 0, 
ADD COLUMN `product_page_url` VARCHAR(500) DEFAULT NULL;
--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `price`, `category_id`, `image_url`, `product_page_url`) VALUES
(1, 'Canada Goose HyBridge® Coat', 'The Canada Goose HyBridge® Coat is designed for superior warmth and style.', 895.00, 1, 'CanadaGooseCoat.png', 'MensProduct1.html'),
(2, 'Valentino Cotton Hooded Sweatshirt', 'Cotton sweatshirt with hood and Chez Valentino print.', 825.00, 1, 'ValentinoHoodie.png', 'MensProduct2.html'),
(3, 'Balencia Back T-Shirt', 'Balenciaga Back T-Shirt Medium Fit in grey painted vintage jersey.', 690.00, 1, 'BalenciagaTshirt.png', 'MensProduct3.html'),
(4, 'Gucci Cotton Polo Shirt', 'The GG motif appears in unexpected colours and fabric combinations.', 830.00, 1, 'GucciPolo.png', 'MensProduct4.html'),
(5, 'Burberry Wool Tailored Jacket', 'A tailored jacket made in Italy from wool twill.', 1790.00, 1, 'BurberrySuit.png', 'MensProduct5.html'),
(6, 'Givenchy Jogger Pants', 'Jogger pants in double face wool and cashmere.', 1250.00, 1, 'GivenchyJoggers.png', 'MensProduct6.html'),
(7, 'Prada Ribbed Knit Jersey Pants', 'These ribbed knit jersey pants with sleek, contemporary lines.', 1560.00, 2, 'PradaPants.png', 'WomensProduct1.html'),
(8, 'Versace Draped-Neck Cady Mini Dress', 'This short-sleeved mini dress in cady has a draped neckline.', 1940.00, 2, 'VersaceMiniDress.png', 'WomensProduct2.html'),
(9, 'Valentino Coat in Textured Wool', 'If you are seeking elegance to complete your cold-weather edit.', 4200.00, 2, 'ValentinoCoat.png', 'WomensProduct3.html'),
(10, 'Gucci Embroidered Cotton Hoodie', 'Gucci House codes continue to evolve for the new season.', 950.00, 2, 'GucciHoodie.png', 'WomensProduct4.html'),
(11, 'Saint Laurent Wrap Dress', 'Sheer short wrap dress gathered and tied at the side.', 2740.00, 2, 'YSLDress.png', 'WomensProduct5.html'),
(12, 'Balenciaga Flared Cargo Pants in Blue', 'Womens Flared Cargo Pants in Blue.', 1690.00, 2, 'BalenciagaPants.png', 'WomensProduct6.html'),
(13, 'Boys Moncler New Maya Jacket', 'This boys new Maya jacket is the perfect water repellent puffer.', 545.00, 3, 'BoysMonclerCoat.png', 'KidsProduct1.html'),
(14, 'Boys Gucci Printed Cotton Hoodie', 'Green and red trims across ready-to-wear, shoes and accessories.', 285.00, 3, 'BoysGucciHoodie.png', 'KidsProduct2.html'),
(15, 'Boys Burberry Check Cotton Shirt', 'A cotton poplin shirt with a point collar, woven in the Burberry Check.', 190.00, 3, 'BoysBurberryShirt.png', 'KidsProduct3.html'),
(16, 'Girls Burberry Polo Shirt Dress', 'A polo shirt dress in cotton piqué with a Burberry Check collar.', 240.00, 3, 'GirlsBurberryDress.png', 'KidsProduct4.html'),
(17, 'Girls Emporio Armani Joggers', 'Joggers in a comfortable fit with elasticated waist and ankle cuffs.', 190.00, 3, 'GirlsEAJoggers.png', 'KidsProduct5.html'),
(18, 'Girls Fendi Denim Trousers', 'Regular-fit, medium-wash denim junior trousers.', 410.00, 3, 'GirlsFendiPants.png', 'KidsProduct6.html'),
(19, 'Mens Versace Sunglasses', 'Stylish and iconic, these Versace sunglasses are perfect for any occasion.', 300.00, 4, 'MensVersaceGlasses.png', 'AccessoriesProduct1.html'),
(20, 'Womens Gucci Belt', 'A timeless Gucci belt with the iconic GG logo.', 320.00, 4, 'GucciBelt.png', 'AccessoriesProduct2.html'),
(21, 'Mens Saint Laurent Chain', 'A sleek and modern chain from Saint Laurent.', 690.00, 4, 'YSLChain.png', 'AccessoriesProduct3.html'),
(22, 'Womens Balenciaga Headband', 'A chic Balenciaga headband for a stylish look.', 395.00, 4, 'BalenciagaHeadband.png', 'AccessoriesProduct4.html'),
(23, 'Mens Valentino Wallet', 'A premium leather wallet from Valentino.', 330.00, 4, 'ValentinoWallet.png', 'AccessoriesProduct5.html'),
(24, 'Womens Prada Bracelet', 'An elegant bracelet from Prada.', 410.00, 4, 'PradaBracelet.png', 'AccessoriesProduct6.html'),
(25, 'Mens Louboutin Shoes', 'The refined Chambeliss Night Strass enchants with its tapered silhouette.', 1075.00, 5, 'MensLouboutinShoes.png', 'ShoesProduct1.html'),
(26, 'Womens Louis Vuitton High Heels', 'Crafted from supple lambskin, these elegant high heels feature signature hardware.', 845.00, 5, 'WomensLVHeels.png', 'ShoesProduct2.html'),
(27, 'Mens Jimmy Choo Loafers', 'Our Marti Reverse loafers are crafted in a buffalo leather.', 620.00, 5, 'MensJimmyChooLoafer.png', 'ShoesProduct3.html'),
(28, 'Womens Prada Slides', 'Minimalist geometric pattern enriches the design of these Prada slides.', 730.00, 5, 'WomensPradaSlides.png', 'ShoesProduct4.html'),
(29, 'Mens Gucci Trainers', 'Inspired by the summer spirit and beach clubs on the Italian coast, this item is part of Gucci Lido.', 150.00, 5, 'MensGucciTrainers.png', 'ShoesProduct5.html'),
(30, 'Womens Balenciaga Boots', 'Strike Platform Bootie in black soft bullskin.', 180.00, 5, 'WomensBalenciagaBoots.png', 'ShoesProduct6.html');

-- --------------------------------------------------------

--
-- Table structure for table `returns`
--

CREATE TABLE `returns` (
  `return_id` int(10) UNSIGNED NOT NULL,
  `size` enum('S','M','L','XL') NOT NULL,
  `order_item_id` int(10) UNSIGNED NOT NULL,
  `reason` text NOT NULL,
  `return_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `returns`
--

INSERT INTO `returns` (`return_id`, `size`, `order_item_id`, `reason`, `return_status`) VALUES
(1, 'S', 2, 'Wrong size', 'approved'),
(2, 'S', 4, 'Defective item', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `review_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `user_id`, `product_id`, `rating`, `review_text`, `created_at`) VALUES
(1, 1, 1, 5, 'Amazing quality, super warm!', '2025-03-12 12:43:15'),
(2, 2, 2, 3, 'Nice but runs small.', '2025-03-12 12:43:15'),
(3, 3, 3, 4, 'Good fit, stylish!', '2025-03-12 12:43:15'),
(4, 1, 7, 2, 'Not worth the price.', '2025-03-12 12:43:15');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_type` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `address` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `shoppingSession`
--

CREATE TABLE `shoppingSession` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `basket`
--

CREATE TABLE `basket` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(10) UNSIGNED NOT NULL,
  `product_id` INT NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(10) NOT NULL,
  `size` enum('S','M','L','XL','2','3','4','5','6','7','8','9','10','11','12','One Size') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventory_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `low_stock_alerts`
--
ALTER TABLE `low_stock_alerts`
  ADD PRIMARY KEY (`alert_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `fk_notifications_user` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `returns`
--
ALTER TABLE `returns`
  ADD PRIMARY KEY (`return_id`),
  ADD KEY `order_item_id` (`order_item_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventory_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=174;

--
-- AUTO_INCREMENT for table `low_stock_alerts`
--
ALTER TABLE `low_stock_alerts`
  MODIFY `alert_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `returns`
--
ALTER TABLE `returns`
  MODIFY `return_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `low_stock_alerts`
--
ALTER TABLE `low_stock_alerts`
  ADD CONSTRAINT `low_stock_alerts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `inventory` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE;

--
-- Constraints for table `returns`
--
ALTER TABLE `returns`
  ADD CONSTRAINT `returns_ibfk_1` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`order_item_id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SELECT * FROM products 
WHERE MATCH(name, description) AGAINST (? IN NATURAL LANGUAGE MODE);

ALTER TABLE products ADD FULLTEXT(name, description);