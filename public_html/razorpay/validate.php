<?php 
error_reporting(0);
session_start();

$con = mysqli_connect('localhost','rams_ramsukh','Eiid3Cdbsy!aMEtO','rams_ramsukh');

require('../razorpay-php/Razorpay.php');
use Razorpay\Api\Api;
$razorpay_key 	 = 'rzp_live_RZtkXDKkbdykC5';
$razorpay_secret = 'dTUj29UDVXur6UYP4tebpXsu';

//Pay Online
if(isset($_POST['reservation_no'])){
	$reservation_no = trim(mysqli_real_escape_string($con, $_POST['reservation_no']));
	$amount 		= trim(mysqli_real_escape_string($con, $_POST['amount']));
	$txn_id 		= md5(time() + $reservation_no);
	
	if(empty($reservation_no) || empty($amount)){
		echo 'error|All fields are mandatory';
		exit();
	}

	if(!is_numeric($amount)){
		echo 'error|Invalid Amount';
		exit();
	}
   
    //RazorPay
    try {
		$api = new Api($razorpay_key, $razorpay_secret);
		$orderData = [
		    'receipt'         => $txn_id,
		    'amount'          => $amount * 100, // amount in paise
		    'currency'        => 'INR',
		    'payment_capture' => 1 // auto capture
		];
		$razorpayOrder = $api->order->create($orderData);
		$razorpayOrderId = $razorpayOrder['id'];
	}catch(Exception $e) {
	  echo 'error|'.$e->getMessage();
	  exit();
	}

	if(empty($razorpayOrderId)){
		echo 'error|payment gateway error';
		exit();
	}

	$sql = mysqli_query($con, "INSERT INTO payments (reservation_no, amount, txn_id) VALUES ('$reservation_no','$amount','$razorpayOrderId')");
	if(!$sql){
		echo 'error|Something went wrong';
		exit();
	}

	$data = [
	    "key"               => $razorpay_key,
	    "amount"            => $amount,
	    "description"       => 'Ramsukh Resorts - Pay Online',
	    "image"             => "",
	    "prefill"           => [
		    "name"              => '',
		    "email"             => '',
		    "contact"           => '',
	    ],
	    "notes"             => [
		    "reservation_no"    => $reservation_no,
		    "merchant_order_id" => '',
	    ],
	    "theme"             => [
	    	"color"             => "#F37254"
	    ],
	    "order_id"          => $razorpayOrderId,
	];

	$data['display_currency']  = 'INR';
	$data['display_amount']    = $amount;
	$_SESSION['razorpay_order_id'] = $razorpayOrderId;

	echo 'success|'.json_encode($data);
	exit();
	// RazorPay
}
?>