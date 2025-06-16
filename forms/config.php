<?php
/*
 * MINT ITS Email Configuration
 * Copyright (c) 2024 MINT ITS
 */

// Email Configuration
define('SMTP_ENABLED', true); // Set to false to use PHP mail() instead of SMTP
define('RECEIVING_EMAIL', 'info@mintits.com');
define('SMTP_HOST', 'smtp.gmail.com'); // Change this to your SMTP host
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com'); // Change to your email
define('SMTP_PASSWORD', 'your-app-specific-password'); // Change to your password
define('SMTP_SECURE', 'tls'); // tls or ssl

// Website Configuration
define('SITE_NAME', 'MINT ITS');
define('SITE_EMAIL', 'noreply@mintits.com');

// Security
define('ENABLE_CSRF', true);
define('ENABLE_CAPTCHA', false); // Set to true if you want to add CAPTCHA

// Response Messages
define('SUCCESS_MESSAGE', 'Thank you for your message. We will contact you soon.');
define('ERROR_MESSAGE', 'Sorry, there was an error sending your message.');
define('INVALID_EMAIL_MESSAGE', 'Please enter a valid email address.');
define('REQUIRED_FIELDS_MESSAGE', 'Please fill in all required fields.');
?> 