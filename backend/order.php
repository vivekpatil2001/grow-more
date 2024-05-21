<?php
require('vendor/autoload.php'); // Ensure this path is correct based on your project structure
require('./config.php'); // Include your database connection file

use Razorpay\Api\Api;

$api_key = 'rzp_test_yWMvyDcDnYXnV6';
$api_secret = 'KJ6GvUpZwxLX4N71xHgMgIPs';

$api = new Api($api_key, $api_secret);

$orderData = [
    'receipt'         => uniqid(),
    'amount'          => 2000 * 100, // amount in paise
    'currency'        => 'INR',
    'payment_capture' => 1 // auto capture
];

try {
    $razorpayOrder = $api->order->create($orderData);

     // Return the full response from Razorpay
     echo json_encode($razorpayOrder->toArray());
    } catch (Exception $e) {
        // Return error response
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()
        ]);
    }
    ?>
