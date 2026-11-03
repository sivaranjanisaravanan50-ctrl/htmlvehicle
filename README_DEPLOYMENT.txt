VEHICLEVERSE — PHP + MYSQL DATABASE & DEPLOYMENT EDITION
======================================================

WHAT'S NEW
- Enquiry form submits to save_enquiry.php (PHP server-side validation).
- database.sql creates the MySQL database and enquiries table.
- config.php contains PDO database connection settings.
- admin-enquiries.php is a password-protected page to view all database enquiries.
- Existing static pages, categories, and vehicle detail pages are retained.

LOCAL RUN (Windows / XAMPP)
1. Install XAMPP (Apache + PHP + MySQL).
2. Extract the whole VehicleVerse_Modified folder into:
   C:\xampp\htdocs\VehicleVerse_Modified
3. Open XAMPP Control Panel; Start Apache and MySQL.
4. Open http://localhost/phpmyadmin
5. Select Import; import database.sql.
6. Open config.php and set database username/password (default XAMPP local: root / blank password).
7. Visit http://localhost/VehicleVerse_Modified/index.html
8. Test an enquiry. View database records at:
   http://localhost/VehicleVerse_Modified/admin-enquiries.php
   Default admin password: ChangeMe@123

IMPORTANT SECURITY
- Change ADMIN_PASSWORD in admin-enquiries.php before deploying.
- Use a strong database password; never publish config.php credentials in a public repository.
- Enable HTTPS on the deployed site.
- This admin page is a basic academic demonstration, not production-grade authentication.
- Do not commit real customer personal information to public repositories.

DEPLOYMENT (PHP + MySQL HOST)
1. Choose hosting that supports PHP 8+ and MySQL/MariaDB (shared hosting or a PHP web host).
   GitHub Pages alone cannot run PHP/MySQL.
2. Create a MySQL database and database user from the hosting control panel.
3. Import database.sql using phpMyAdmin (or the host's database tool).
4. Edit config.php with the host-provided database host, database name, username and password.
5. Upload all project files/folders to the hosting web root (often public_html).
6. Change the admin password in admin-enquiries.php.
7. Enable SSL/HTTPS in the hosting panel and test:
   - homepage and category navigation
   - vehicle detail pages
   - enquiry submission
   - admin enquiries login and listing
8. Share your live HTTPS URL.

NOTE
- The HTML/CSS pages work as regular pages, but PHP endpoints need a PHP server.
- Do not open enquiry.html by double-clicking when testing database features; use localhost or your deployed URL.
- Vehicle specifications/prices are illustrative.
