<?php
// Basic classroom-project admin gate. Change this password before deployment.
session_start();
define('ADMIN_PASSWORD', 'ChangeMe@123');
if (isset($_POST['password'])) {
 if (hash_equals(ADMIN_PASSWORD, (string)$_POST['password'])) $_SESSION['vv_admin']=true;
 else $error='Incorrect password.';
}
if (isset($_GET['logout'])) { session_destroy(); header('Location: admin-enquiries.php'); exit; }
if (empty($_SESSION['vv_admin'])) {
?><!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Admin Login | VehicleVerse</title><link rel="stylesheet" href="css/style.css"></head><body><main class="section form-section"><h1>Admin — Enquiries</h1><?php if(isset($error)) echo '<p>'.htmlspecialchars($error).'</p>'; ?><form method="post"><label>Admin password <input type="password" name="password" required></label><button class="btn">Login</button></form><p>Default password: ChangeMe@123 (change in this file before deployment)</p></main></body></html><?php exit; }
require __DIR__.'/config.php';
$rows=$pdo->query('SELECT * FROM enquiries ORDER BY created_at DESC')->fetchAll();
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Saved Enquiries | VehicleVerse</title><link rel="stylesheet" href="css/style.css"></head><body><header class="site-header"><a class="brand" href="index.html">Vehicle<span>Verse</span></a><nav><a href="index.html">Home</a><a href="?logout=1">Logout</a></nav></header><main class="section"><h1>Database Enquiries (<?=count($rows)?>)</h1><?php if(!$rows): ?><p>No enquiries yet.</p><?php else: ?><div class="vehicle-grid"><?php foreach($rows as $r): ?><article class="record"><h3><?=htmlspecialchars($r['vehicle'])?></h3><p><b>Name:</b> <?=htmlspecialchars($r['full_name'])?></p><p><b>Email:</b> <?=htmlspecialchars($r['email'])?></p><p><b>Phone:</b> <?=htmlspecialchars($r['phone'])?></p><p><b>Message:</b> <?=nl2br(htmlspecialchars($r['message']))?></p><p><b>Submitted:</b> <?=htmlspecialchars($r['created_at'])?></p></article><?php endforeach; ?></div><?php endif; ?></main></body></html>
