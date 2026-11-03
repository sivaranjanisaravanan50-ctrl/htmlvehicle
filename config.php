<?php
// Copy this file to config.php and enter your hosting database credentials.
$host = 'localhost';
$dbname = 'vehicleverse';
$username = 'root';
$password = '';
$charset = 'utf8mb4';
$dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";
$options = [
 PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
 PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
 PDO::ATTR_EMULATE_PREPARES => false
];
try { $pdo = new PDO($dsn, $username, $password, $options); }
catch (PDOException $e) { http_response_code(500); exit('Database connection failed. Check config.php credentials and import database.sql.'); }
?>
