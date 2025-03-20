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
  `size` enum('S','M','L','XL') NOT NULL,
  `stock_added` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stock_removed` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `stock_balance` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventory_id`, `product_id`, `size`, `stock_added`, `stock_removed`, `stock_balance`) VALUES
(1, 1, 'S', 30, 5, 25),
(2, 2, 'S', 20, 4, 16),
(3, 3, 'S', 15, 3, 12),
(4, 4, 'S', 25, 5, 20),
(5, 5, 'S', 10, 2, 8),
(6, 6, 'S', 12, 3, 9),
(7, 7, 'S', 18, 2, 16),
(8, 8, 'S', 10, 1, 9),
(9, 9, 'S', 8, 1, 7),
(10, 10, 'S', 15, 5, 10),
(11, 11, 'S', 6, 1, 5),
(12, 12, 'S', 20, 2, 18),
(13, 13, 'S', 25, 5, 20),
(14, 14, 'S', 30, 10, 20),
(15, 15, 'S', 40, 5, 35),
(16, 16, 'S', 35, 5, 30),
(17, 17, 'S', 20, 3, 17),
(18, 18, 'S', 15, 2, 13),
(19, 1, 'M', 5, 0, 5),
(20, 2, 'M', 5, 0, 5),
(21, 3, 'M', 5, 0, 5),
(22, 4, 'M', 5, 0, 5),
(23, 5, 'M', 5, 0, 5),
(24, 6, 'M', 5, 0, 5),
(25, 7, 'M', 5, 0, 5),
(26, 8, 'M', 5, 0, 5),
(27, 9, 'M', 5, 0, 5),
(28, 10, 'M', 5, 0, 5),
(29, 11, 'M', 5, 0, 5),
(30, 12, 'M', 5, 0, 5),
(31, 13, 'M', 5, 0, 5),
(32, 14, 'M', 5, 0, 5),
(33, 15, 'M', 5, 0, 5),
(34, 16, 'M', 5, 0, 5),
(35, 17, 'M', 5, 0, 5),
(36, 18, 'M', 5, 0, 5),
(50, 1, 'L', 5, 0, 5),
(51, 2, 'L', 5, 0, 5),
(52, 3, 'L', 5, 0, 5),
(53, 4, 'L', 5, 0, 5),
(54, 5, 'L', 5, 0, 5),
(55, 6, 'L', 5, 0, 5),
(56, 7, 'L', 5, 0, 5),
(57, 8, 'L', 5, 0, 5),
(58, 9, 'L', 5, 0, 5),
(59, 10, 'L', 5, 0, 5),
(60, 11, 'L', 5, 0, 5),
(61, 12, 'L', 5, 0, 5),
(62, 13, 'L', 5, 0, 5),
(63, 14, 'L', 5, 0, 5),
(64, 15, 'L', 5, 0, 5),
(65, 16, 'L', 5, 0, 5),
(66, 17, 'L', 5, 0, 5),
(67, 18, 'L', 5, 0, 5),
(81, 1, 'XL', 5, 0, 5),
(82, 2, 'XL', 5, 0, 5),
(83, 3, 'XL', 5, 0, 5),
(84, 4, 'XL', 5, 0, 5),
(85, 5, 'XL', 5, 0, 5),
(86, 6, 'XL', 5, 0, 5),
(87, 7, 'XL', 5, 0, 5),
(88, 8, 'XL', 5, 0, 5),
(89, 9, 'XL', 5, 0, 5),
(90, 10, 'XL', 5, 0, 5),
(91, 11, 'XL', 5, 0, 5),
(92, 12, 'XL', 5, 0, 5),
(93, 13, 'XL', 5, 0, 5),
(94, 14, 'XL', 5, 0, 5),
(95, 15, 'XL', 5, 0, 5),
(96, 16, 'XL', 5, 0, 5),
(97, 17, 'XL', 5, 0, 5),
(98, 18, 'XL', 5, 0, 5),
(112, 1, 'L', 5, 0, 5),
(113, 2, 'L', 5, 0, 5),
(114, 3, 'L', 5, 0, 5),
(115, 4, 'L', 5, 0, 5),
(116, 5, 'L', 5, 0, 5),
(117, 6, 'L', 5, 0, 5),
(118, 7, 'L', 5, 0, 5),
(119, 8, 'L', 5, 0, 5),
(120, 9, 'L', 5, 0, 5),
(121, 10, 'L', 5, 0, 5),
(122, 11, 'L', 5, 0, 5),
(123, 12, 'L', 5, 0, 5),
(124, 13, 'L', 5, 0, 5),
(125, 14, 'L', 5, 0, 5),
(126, 15, 'L', 5, 0, 5),
(127, 16, 'L', 5, 0, 5),
(128, 17, 'L', 5, 0, 5),
(129, 18, 'L', 5, 0, 5),
(143, 1, 'XL', 5, 0, 5),
(144, 2, 'XL', 5, 0, 5),
(145, 3, 'XL', 5, 0, 5),
(146, 4, 'XL', 5, 0, 5),
(147, 5, 'XL', 5, 0, 5),
(148, 6, 'XL', 5, 0, 5),
(149, 7, 'XL', 5, 0, 5),
(150, 8, 'XL', 5, 0, 5),
(151, 9, 'XL', 5, 0, 5),
(152, 10, 'XL', 5, 0, 5),
(153, 11, 'XL', 5, 0, 5),
(154, 12, 'XL', 5, 0, 5),
(155, 13, 'XL', 5, 0, 5),
(156, 14, 'XL', 5, 0, 5),
(157, 15, 'XL', 5, 0, 5),
(158, 16, 'XL', 5, 0, 5),
(159, 17, 'XL', 5, 0, 5),
(160, 18, 'XL', 5, 0, 5);

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
  `total_price` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_price`, `order_date`, `status`) VALUES
(1, 1, 895.00, '2025-03-12 12:38:05', ''),
(2, 2, 825.00, '2025-03-12 12:38:05', 'shipped'),
(3, 3, 690.00, '2025-03-12 12:38:05', ''),
(4, 4, 1560.00, '2025-03-12 12:38:05', '');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(10) UNSIGNED NOT NULL,
  `order_id` int(10) UNSIGNED NOT NULL,
  `product_id` int(10) UNSIGNED NOT NULL,
  `size` enum('S','M','L','XL') NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `price_per_unit` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `order_id`, `product_id`, `size`, `quantity`, `price_per_unit`) VALUES
(1, 1, 1, 'S', 1, 895.00),
(2, 2, 2, 'S', 1, 825.00),
(3, 3, 3, 'S', 1, 690.00),
(4, 4, 7, 'S', 1, 1560.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(10) UNSIGNED NOT NULL,
  `size` enum('S','M','L','XL') NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL,
  `image_url` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `products` ADD COLUMN `product_page_url` VARCHAR(500) DEFAULT NULL;
--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `size`, `product_name`, `product_description`, `price`, `category_id`, `image_url`) VALUES
(1, 'S', 'Canada Goose HyBridge® Coat', 'The Canada Goose HyBridge® Coat is designed for superior warmth and style. Crafted with advanced insulation technology, its perfect for cold-weather conditions. A blend of functionality and luxury for modern adventurers', 895.00, 1, 'CanadaGooseCoat.png'),
(2, 'S', 'Valentino Cotton Hooded Sweatshirt', 'Cotton sweatshirt with hood and Chez Valentino print.', 825.00, 1, 'ValentinoHoodie.png'),
(3, 'S', 'Balencia Back T-Shirt', 'Balenciaga Back T-Shirt Medium Fit in grey painted vintage jersey', 690.00, 1, 'BalenciagaTshirt.png'),
(4, 'S', 'Gucci Cotton polo shirt', 'The GG motif appears in unexpected colours and fabric combinations, from linen blend to nylon. This regular fit polo shirt is presented in a GG stretch cotton piquet jacquard and enriched with a Gucci embroidery.', 830.00, 1, 'GucciPolo.png'),
(5, 'S', 'Burberry Wool Tailored Jacket', 'A tailored jacket made in Italy from wool twill. Cut to a slim fit, the single-breasted style has a half-canvas construction for a lightly structured shape. Part of Burberry Classics, wardrobe foundations with a unique Burberry slant.', 1790.00, 1, 'BurberrySuit.png '),
(6, 'S', 'Givenchy Jogger Pants', 'Jogger pants in double face wool and cashmere', 1250.00, 1, 'GivenchyJoggers.png'),
(7, 'S', 'Prada Ribbed Knit Jersey Pants', 'These ribbed knit jersey pants with sleek, contemporary lines are decorated with the enameled metal triangle logo.', 1560.00, 2, 'PradaPants.png'),
(8, 'S', 'Versace Draped-Neck Cady Mini Dress', 'This short-sleeved mini dress in cady has a draped neckline and an archival Gianni Ribbon satin bow with the signature Medusa accent at the waist.', 1940.00, 2, 'VersaceMiniDress.png '),
(9, 'S', 'Valentino Coat in Textured Wool', 'If you are seeking elegance to complete your cold-weather edit, look no further than this wool coat from Valentino. Designed with a wrap-around style for maximum convenience, the showstopping element lies in the faux fur trim that cloaks the neckline for a parade of timeless femininity.', 4200.00, 2, 'ValentinoCoat.png'),
(10, 'S', 'Gucci Embroidered Cotton Hoodie', 'Gucci House codes continue to evolve for the new season across relaxed jersey pieces. This regular fit hooded sweatshirt is presented in a cotton jersey and defined by a Gucci embroidery.', 950.00, 2, 'GucciHoodie.png'),
(11, 'S', 'Saint Laurent Wrap Dress', 'Sheer short wrap dress gathered and tied at the side, featuring a surplice neckline, and gathered shoulders.', 2740.00, 2, 'YSLDress.png'),
(12, 'S', 'Balenciaga Flared Cargo Pants in Blue', 'Womens Flared Cargo Pants in Blue', 1690.00, 2, 'BalenciagaPants.png'),
(13, 'S', 'Boys Moncler New Maya Jacket', 'Moncler encapsulate innovation and passion in their beautifully crafted designs. T his boys new Maya jacket is the perfect water repellent puffer for turbulent weather conditions. Engineered in goose down via tiered padding with a detachable hood, side zip pockets, press-stud side sleeves and the iconic Moncler embroidered badge. He will embody unparalleled style.', 545.00, 3, 'BoysMonclerCoat.png'),
(14, 'S', 'Boys Gucci Printed Cotton Hoodie', 'The archival Web stripe appears throughout the Cruise 2025 childrens collection in a varietyof iterations. Green and red trims across ready-to-wear, shoes and accessories create a sporty attitude, fit for every adventure. This childrens classic fit sweatshirt is stated in cotton jersey and reveals a Gucci overlay Web print.', 285.00, 3, 'BoysGucciHoodie.png '),
(15, 'S', 'Boys Burberry Check Cotton Shirt', 'A cotton poplin shirt with a point collar, woven in the Burberry Check. Part of Burberry Classics, wardrobe foundations with a unique Burberry slant.', 190.00, 3, 'BoysBurberryShirt.png '),
(16, 'S', 'Girls Burberry Polo Shirt Dress', 'A polo shirt dress in cotton piqué with a Burberry Check collar.', 240.00, 3, 'GirlsBurberryDress.png'),
(17, 'S', 'Girls Emporio Armani Joggers', 'Joggers in a comfortable fit with elasticated waist and ankle cuffs. Made of cotton-blend jersey with a dense pattern of all-over jacquard logo lettering.', 190.00, 3, 'GirlsEAJoggers.png'),
(18, 'S', 'Girls Fendi Denim Trousers', 'Regular-fit, medium-wash denim junior trousers with chalk white FF Fendi Roma thread embroidery on the front below the pocket.', 410.00, 3, 'GirlsFendiPants.png'),
(19, 'S', 'Mens Versace Sunglasses', 'Stylish and iconic, these Versace sunglasses are perfect for any occasion.', 300.00, 4, 'MensVersaceGlasses.png'),
(20, 'S', 'Womens Gucci Belt', 'A timeless Gucci belt with the iconic GG logo.', 320.00, 4, 'GucciBelt.png'),
(21, 'S', 'Mens Saint Laurent Chain', 'A sleek and modern chain from Saint Laurent.', 690.00, 4, 'YSLChain.png'),
(22, 'S', 'Womens Balenciaga Headband', 'A chic Balenciaga headband for a stylish look.', 395.00, 4, 'BalenciagaHeadband.png'),
(23, 'S', 'Mens Valentino Wallet', 'A premium leather wallet from Valentino.', 330.00, 4, 'ValentinoWallet.png'),
(24, 'S', 'Womens Prada Bracelet', 'An elegant bracelet from Prada.', 410.00, 4, 'PradaBracelet.png'),
(25, 'S', 'Mens Louboutin Shoes', 'The refined Chambeliss Night Strass enchants with its tapered silhouette.', 1075.00, 5, 'MensLouboutinShoes.png'),
(26, 'S', 'Womens Louis Vuitton High Heels', 'Crafted from supple lambskin, these elegant high heels feature signature hardware.', 845.00, 5, 'WomensLVHeels.png'),
(27, 'S', 'Mens Gucci Trainers', 'A chunkier construction defines the shape of these iconic Gucci trainers.', 620.00, 5, 'MensGucciTrainers.png'),
(28, 'S', 'Womens Prada Slides', 'Minimalist geometric pattern enriches the design of these Prada slides.', 730.00, 5, 'WomensPradaSlides.png'),
(29, 'S', 'Mens Nike Air Max', 'The iconic Nike Air Max with superior cushioning and style.', 150.00, 5, 'MensNikeAirMax.png'),
(30, 'S', 'Womens Adidas Ultraboost', 'High-performance running shoes with unmatched comfort.', 180.00, 5, 'WomensAdidasUltraboost.png');

UPDATE `products` 
SET `product_page_url` = 'MensProduct1.html' 
WHERE `product_id` = 1;

UPDATE `products` 
SET `product_page_url` = 'MensProduct2.html' 
WHERE `product_id` = 2;

UPDATE `products` 
SET `product_page_url` = 'MensProduct3.html' 
WHERE `product_id` = 3;

UPDATE `products` 
SET `product_page_url` = 'MensProduct4.html' 
WHERE `product_id` = 4;

UPDATE `products` 
SET `product_page_url` = 'MensProduct5.html' 
WHERE `product_id` = 5;

UPDATE `products` 
SET `product_page_url` = 'MensProduct6.html' 
WHERE `product_id` = 6;

UPDATE `products` 
SET `product_page_url` = 'WomensProduct1.html' 
WHERE `product_id` = 7;

UPDATE `products` 
SET `product_page_url` = 'WomensProduct2.html' 
WHERE `product_id` = 8;

UPDATE `products` 
SET `product_page_url` = 'WomensProduct3.html' 
WHERE `product_id` = 9;

UPDATE `products` 
SET `product_page_url` = 'WomensProduct4.html' 
WHERE `product_id` = 10;

UPDATE `products` 
SET `product_page_url` = 'WomensProduct5.html' 
WHERE `product_id` = 11;

UPDATE `products` 
SET `product_page_url` = 'WomensProduct6.html' 
WHERE `product_id` = 12;

UPDATE `products` 
SET `product_page_url` = 'KidsProduct1.html' 
WHERE `product_id` = 13;

UPDATE `products` 
SET `product_page_url` = 'KidsProduct2.html' 
WHERE `product_id` = 14;

UPDATE `products` 
SET `product_page_url` = 'KidsProduct3.html' 
WHERE `product_id` = 15;

UPDATE `products` 
SET `product_page_url` = 'KidsProduct4.html' 
WHERE `product_id` = 16;

UPDATE `products` 
SET `product_page_url` = 'KidsProduct5.html' 
WHERE `product_id` = 17;

UPDATE `products` 
SET `product_page_url` = 'KidsProduct6.html' 
WHERE `product_id` = 18;

UPDATE `products` 
SET `product_page_url` = 'AccessoriesProduct1.html' 
WHERE `product_id` = 19;

UPDATE `products` 
SET `product_page_url` = 'AccessoriesProduct2.html' 
WHERE `product_id` = 20;

UPDATE `products` 
SET `product_page_url` = 'AccessoriesProduct3.html' 
WHERE `product_id` = 21;

UPDATE `products` 
SET `product_page_url` = 'AccessoriesProduct4.html' 
WHERE `product_id` = 22;

UPDATE `products` 
SET `product_page_url` = 'AccessoriesProduct5.html' 
WHERE `product_id` = 23;

UPDATE `products` 
SET `product_page_url` = 'AccessoriesProduct6.html' 
WHERE `product_id` = 24;

UPDATE `products` 
SET `product_page_url` = 'ShoesProduct1.html' 
WHERE `product_id` = 25;

UPDATE `products` 
SET `product_page_url` = 'ShoesProduct2.html' 
WHERE `product_id` = 26;

UPDATE `products` 
SET `product_page_url` = 'ShoesProduct3.html' 
WHERE `product_id` = 27;

UPDATE `products` 
SET `product_page_url` = 'ShoesProduct4.html' 
WHERE `product_id` = 28;

UPDATE `products` 
SET `product_page_url` = 'ShoesProduct5.html' 
WHERE `product_id` = 29;

UPDATE `products` 
SET `product_page_url` = 'ShoesProduct6.html' 
WHERE `product_id` = 30;

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
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `user_type` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `address` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `user_type`, `address`, `phone_number`) VALUES
(1, 'John Doe', 'john@example.com', 'hashed_password_123', 'customer', '11 High Street, Newcastle', '07439827718'),
(2, 'Jules Smith', 'jane@example.com', 'hashed_password_456', 'customer', '45 Oakland Road, Birmingham', '07653728999'),
(3, 'Admin Sabaa', 'sabaaramzan@outlook.com', 'hashed_password_admin', 'admin', 'Admin HQ, NY', '07466783219'),
(4, 'Alice Canberre', 'alice677@gmail.com', 'password_hash', 'customer', '64 Zoo Lane, Windenburg, UK', '07889276321');

--
-- Indexes for dumped tables
--

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