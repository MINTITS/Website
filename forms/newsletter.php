<?php
/*
 * MINT ITS Newsletter Form Handler
 * Copyright (c) 2024 MINT ITS
 */

require_once 'config.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/phpmailer/phpmailer/src/Exception.php';
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';

header('Content-Type: application/json');

try {
    // Validate input
    if (empty($_POST['email'])) {
        throw new Exception(REQUIRED_FIELDS_MESSAGE);
    }

    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception(INVALID_EMAIL_MESSAGE);
    }

    $mail = new PHPMailer(true);

    if (SMTP_ENABLED) {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = SMTP_HOST;
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port = SMTP_PORT;
    }

    // Email Content
    $mail->setFrom(SITE_EMAIL, SITE_NAME);
    $mail->addAddress(RECEIVING_EMAIL);
    $mail->addReplyTo(SITE_EMAIL, SITE_NAME);

    $mail->isHTML(true);
    $mail->Subject = 'New Newsletter Subscription';
    
    // Create HTML message
    $message = "<h2>New Newsletter Subscription</h2>";
    $message .= "<p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>";
    $message .= "<p>A new user has subscribed to the newsletter.</p>";
    
    $mail->Body = $message;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $message));

    // Send confirmation email to subscriber
    $confirmMail = new PHPMailer(true);
    $confirmMail->isSMTP();
    $confirmMail->Host = SMTP_HOST;
    $confirmMail->SMTPAuth = true;
    $confirmMail->Username = SMTP_USERNAME;
    $confirmMail->Password = SMTP_PASSWORD;
    $confirmMail->SMTPSecure = SMTP_SECURE;
    $confirmMail->Port = SMTP_PORT;
    
    $confirmMail->setFrom(SITE_EMAIL, SITE_NAME);
    $confirmMail->addAddress($_POST['email']);
    $confirmMail->isHTML(true);
    $confirmMail->Subject = 'Welcome to MINT ITS Newsletter';
    
    $confirmMessage = "<h2>Welcome to MINT ITS Newsletter!</h2>";
    $confirmMessage .= "<p>Thank you for subscribing to our newsletter. We're excited to keep you updated with the latest technology insights and business solutions.</p>";
    $confirmMessage .= "<p>Best regards,<br>The MINT ITS Team</p>";
    
    $confirmMail->Body = $confirmMessage;
    $confirmMail->AltBody = strip_tags(str_replace('<br>', "\n", $confirmMessage));

    // Send both emails
    $mail->send();
    $confirmMail->send();
    
    echo json_encode(['success' => true, 'message' => SUCCESS_MESSAGE]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
