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
    // Validate required input
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['company']) || 
        empty($_POST['service_interest']) || empty($_POST['subject']) || empty($_POST['message'])) {
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
    $mail->Subject = 'New Business Inquiry: ' . $_POST['subject'];
    
    // Create HTML message
    $message = "<h2>🚀 New Business Inquiry - MINT ITS</h2>";
    $message .= "<div style='background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;'>";
    
    // Contact Information
    $message .= "<h3 style='color: #0ea5e9; margin-bottom: 15px;'>👤 Contact Information</h3>";
    $message .= "<p><strong>Name:</strong> " . htmlspecialchars($_POST['name']) . "</p>";
    $message .= "<p><strong>Email:</strong> " . htmlspecialchars($_POST['email']) . "</p>";
    if (!empty($_POST['phone'])) {
        $message .= "<p><strong>Phone:</strong> " . htmlspecialchars($_POST['phone']) . "</p>";
    }
    
    // Company Information
    $message .= "<h3 style='color: #0ea5e9; margin: 20px 0 15px 0;'>🏢 Company Information</h3>";
    $message .= "<p><strong>Company:</strong> " . htmlspecialchars($_POST['company']) . "</p>";
    if (!empty($_POST['address'])) {
        $message .= "<p><strong>Address:</strong> " . htmlspecialchars($_POST['address']) . "</p>";
    }
    if (!empty($_POST['company_size'])) {
        $message .= "<p><strong>Company Size:</strong> " . htmlspecialchars($_POST['company_size']) . "</p>";
    }
    
    // Project Information
    $message .= "<h3 style='color: #0ea5e9; margin: 20px 0 15px 0;'>🎯 Project Information</h3>";
    $message .= "<p><strong>Service Interest:</strong> " . htmlspecialchars($_POST['service_interest']) . "</p>";
    if (!empty($_POST['timeline'])) {
        $message .= "<p><strong>Timeline:</strong> " . htmlspecialchars($_POST['timeline']) . "</p>";
    }
    $message .= "<p><strong>Subject:</strong> " . htmlspecialchars($_POST['subject']) . "</p>";
    
    // Message
    $message .= "<h3 style='color: #0ea5e9; margin: 20px 0 15px 0;'>💬 Message</h3>";
    $message .= "<div style='background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #0ea5e9;'>";
    $message .= nl2br(htmlspecialchars($_POST['message']));
    $message .= "</div>";
    
    $message .= "</div>";
    
    // Add timestamp
    $message .= "<p style='color: #64748b; font-size: 12px; margin-top: 20px;'>";
    $message .= "📅 Received: " . date('F j, Y \a\t g:i A T') . "</p>";
    
    $mail->Body = $message;
    $mail->AltBody = strip_tags(str_replace('<br>', "\n", $message));

    $mail->send();
    echo json_encode(['success' => true, 'message' => SUCCESS_MESSAGE]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
