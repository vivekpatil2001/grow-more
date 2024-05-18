<?php
require('./config.php');

//var_dump($_SESSION); // Output the session data to see what's inside

 $method = $_SERVER['REQUEST_METHOD'];

 


switch ("$method") {
 

  case "POST":
 
    $userpostdata = json_decode(file_get_contents("php://input"));
     //print_r($userpostdata); die;
    $user_id=uniqid();
    $username = $userpostdata->username;
    $email = $userpostdata->email;
    $refferal = $userpostdata->referral;
    $password = md5($userpostdata->password);
    $plan = 'Regular';
    $profit = '00000';
    $balance = '2000';



    $bonus = (65*($balance-$profit))/100;
    $result1 = mysqli_query($db_conn,"INSERT INTO `users`(`user_id`,`username`, `email`, `balance`, `profit`, `refferal`, `password`) VALUES('$user_id','$username', '$email','$balance',$profit,'$refferal','$password')");
    $result2 = mysqli_query($db_conn,"UPDATE `users` SET profit=profit+$bonus ,balance=balance+$bonus WHERE user_id='$refferal'" )or die();
   

  

  if ($result1) {
    try {
      echo json_encode([
          'success' => true,
          'message' => "User Added Successfully"
      ]);
  } catch (Exception $e) {
      echo json_encode([
          'success' => false,
          'message' => $e->getMessage()."Enter correct detils"
      ]);
  }
  } else {
    echo json_encode([    'success' => false,
    'message' => $e->getMessage()."Enter correct detils"]);
  }
  $db_conn ->close();
  break;
    default: ;
   
}


?>