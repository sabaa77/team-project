<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db.php';

function createShoppingSession($user_id, $pdo) {
    $total = 0.00;
    $created_at = date("Y-m-d H:i:s");
    $modified_at = $created_at;

    try {
        $stmt = $pdo->prepare("INSERT INTO shoppingSession (userID, total, created_at, modified_at) VALUES (?, ?, ?, ?)");
        $stmt->execute([$user_id, $total, $created_at, $modified_at]);
        return $pdo->lastInsertId();

    } catch (PDOException $e) {
        error_log("Error creating shopping session: " . $e->getMessage());
        return false;
    }
}

function updateShoppingSession($session_id, $new_total, $pdo) {
    $modified_at = date("Y-m-d H:i:s");

    try {
        $stmt = $pdo->prepare("UPDATE shoppingSession SET total = ?, modified_at = ? WHERE id = ?");
        $stmt->execute([$new_total, $modified_at, $session_id]);
        return true;

    } catch (PDOException $e) {
        error_log("Error updating shopping session: " . $e->getMessage());
        return false;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST['email'];
  $password = $_POST['password_hash'];

  if (empty($email) || empty($password)) {
      $error_message = "Please enter both email and password.";
  } else {
      try {
          $stmt = $pdo->prepare("SELECT id, password FROM users WHERE email = ?");
          $stmt->execute([$email]);
          $user = $stmt->fetch(PDO::FETCH_ASSOC);

          if ($user && password_verify($password, $user['password'])) {
              $stmt = $pdo->prepare("SELECT id FROM shoppingSession WHERE userID = ?");
              $stmt->execute([$user['id']]);
              $existing_session = $stmt->fetch(PDO::FETCH_ASSOC);

              if ($existing_session) {
                  $session_id = $existing_session['id'];
              } else {
                  $session_id = createShoppingSession($user['id'], $pdo);
              }

              if ($session_id !== false) {

                  setcookie('session_id', $session_id, time() + 1000, "/", "", false, true);
                  $_SESSION['userID'] = $user['id'];
                  $_SESSION['loggedin'] = true;

                  header("Location: index.html");
                  exit();
              } else {
                  $error_message = "Failed to create shopping session";
              }
          } else {
              $error_message = "Invalid credentials.";
          }
      } catch (PDOException $e) {
          $error_message = "Database error: " . $e->getMessage();
      }
  }
}

?>