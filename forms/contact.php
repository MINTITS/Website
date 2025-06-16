<?php
/*
 * MINT ITS Contact Form Handler
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
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
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
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Message: ' . $_POST['subject'];
    
    // Create HTML message
    $message = "<h2>New Contact Form Submission</h2>";
    $message .= "<p><strong>Name:</strong> " . htmlspecialchars($_POST['name']) . "</p>";
    $message .= "<p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>";
    $message .= "<p><strong>Subject:</strong> " . htmlspecialchars($_POST['subject']) . "</p>";
    $message .= "<p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($_POST['message'])) . "</p>";
    
    $mail->Body = $message;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $message));

    $mail->send();
    echo json_encode(['success' => true, 'message' => SUCCESS_MESSAGE]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
