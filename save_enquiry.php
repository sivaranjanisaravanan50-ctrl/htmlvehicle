<?php
declare(strict_types=1);
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { header('Location: enquiry.html'); exit; }
require __DIR__ . '/config.php';
$name=trim($_POST['name'] ?? ''); $email=trim($_POST['email'] ?? '');
$phone=trim($_POST['phone'] ?? ''); $vehicle=trim($_POST['vehicle'] ?? '');
$message=trim($_POST['message'] ?? '');
if (!preg_match('/^[A-Za-z .\\'-]{2,80}$/',$name) || !filter_var($email,FILTER_VALIDATE_EMAIL) ||
 !preg_match('/^[0-9]{10}$/',$phone) || $vehicle==='' || mb_strlen($message)<5) {
 header('Location: enquiry.html?status=invalid'); exit;
}
$stmt=$pdo->prepare('INSERT INTO enquiries (full_name,email,phone,vehicle,message) VALUES (?,?,?,?,?)');
$stmt->execute([$name,$email,$phone,$vehicle,$message]);
header('Location: enquiry.html?status=success'); exit;
?>
