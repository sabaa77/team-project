<?php
session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

include 'db.php';

function createShoppingSession($user_id, $pdo) {
    $total = 0.00;

    try {
        $stmt = $pdo->prepare("INSERT INTO shoppingSession (user_id, total) VALUES (?, ?)");
        $stmt->execute([$user_id, $total]);
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
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Please enter both email and password.']);
        exit();
    }

    try {
        $stmt = $pdo->prepare("SELECT user_id, name, password_hash, user_type FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($password, $user['password_hash'])) {
            $stmt = $pdo->prepare("SELECT id FROM shoppingSession WHERE user_id = ?");
            $stmt->execute([$user['user_id']]);
            $existing_session = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($existing_session) {
                $session_id = $existing_session['id'];
            } else {
                $session_id = createShoppingSession($user['user_id'], $pdo);
            }

            if ($session_id !== false) {
                setcookie('id', $session_id, time() + 3600, "/", "", false, true);
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['isLoggedIn'] = true;
                $_SESSION['user_type'] = $user['user_type'];

                echo json_encode([
                    'success' => true,
                    'userName' => $user['name'],
                    'userEmail' => $email['email'],
                    'userType' => $user['user_type'],
                    'redirect' => 'index.html'
                ]);
                exit();
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to create shopping session.']);
                exit();
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
            exit();
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        exit();
    }
}
?>