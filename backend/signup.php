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



    $bonus = (75*($balance-$profit))/100;
    $result1 = mysqli_query($db_conn,"INSERT INTO `users`(`user_id`,`username`, `email`, `balance`, `profit`, `refferal`, `password`) VALUES('$user_id','$username', '$email','$balance',$profit,'$refferal','$password')")or die();
    $result2 = mysqli_query($db_conn,"UPDATE `users` SET profit=profit+$bonus ,balance=balance+$bonus WHERE user_id='$refferal'" );
   // $result3 = mysqli_query($db_conn,"INSERT INTO `compony`(`user_id`,`username`, `balance`, `cmpprofit`) VALUES('$user_id','$balance',$profit)")or die();
   if( $refferal==""){
    $result3 = mysqli_query($db_conn,"INSERT INTO `compony`(`user_id`,`invest`, `cmpprofit`) VALUES('$user_id','$balance',2000)")or die();
   }else{
    $result3 = mysqli_query($db_conn,"INSERT INTO `compony`(`user_id`,`invest`, `cmpprofit`) VALUES('$user_id','$balance',500)")or die();
  
   }
  

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
    echo json_encode(['success' => false,
    'message' => $e->getMessage()."Enter correct detils"]);
  }
  $db_conn ->close();
  break;
    default: ;
   
}


?>