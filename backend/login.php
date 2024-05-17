<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Headers:*");
header("Access-Control-Allow-Methods:*");

$db_conn = mysqli_connect("localhost", "root", "", "growmore");

if ($db_conn === false) {

  die("ERROR: Could Not Connect" . mysqli_connect_error());

}

$method = $_SERVER['REQUEST_METHOD'];

switch ("$method") {

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));
      // print_r ($userpostdata->email);
        $email = $userpostdata->email;
        $password = md5($userpostdata->password);
        $refferal = $userpostdata->referral;
        // $user_id=uniqid();
        // $profit = "00000";
        // $balance = '00000';
        //$bonus = (25*($balance-$profit))/100;
        //$result1 = mysqli_query($db_conn,"INSERT INTO `users`(`user_id`,`username`,`email`,`balance`, `profit`, `refferal`, `password`) VALUES('$user_id','$username', '$email','$balance',$profit,'$refferal','$password')");
       // $result2 = mysqli_query($db_conn,"UPDATE `users` SET profit=profit+$bonus ,balance=balance+$bonus WHERE user_id='$refferal'" )or die();

 $user = mysqli_query($db_conn, "SELECT email,user_id,role FROM users WHERE email='$email' AND password ='$password'");
 //print_r($user);
 if(mysqli_num_rows($user)>0){
    while($row=mysqli_fetch_array($user)){ 
       $client=$row['user_id'];
    //    $_SESSION['invester'] = $client;
    try {
        echo json_encode([
            'success' => true,
            'data' => $row,
            'message' => 'Successfully logged in user redirecting.....'
        ]);
    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => $e->getMessage()."Enter correct detils"
        ]);
    }
    }
   
}else{
    $user_id=uniqid();
    $profit = "00000";
    $balance = '2000';
    $result1 = mysqli_query($db_conn,"INSERT INTO `users`(`user_id`,`email`,`balance`, `profit`, `refferal`, `password`) VALUES('$user_id', '$email','$balance',$profit,'$refferal','$password')");
    if($result1){
       $getUser= mysqli_query($db_conn, "SELECT email,user_id,role FROM users WHERE email='$email' AND password ='$password'");
        while($row=mysqli_fetch_array($getUser)){ 
           $client=$row['user_id'];
        //    $_SESSION['invester'] = $client;
        try {
            echo json_encode([
                'success' => true,
                'data' => $row,
                'message' => 'Successfully logged in user redirecting.....'
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()."Enter correct detils"
            ]);
        }
        }
        $bonus = (25*($balance-$profit))/100;
   $result2 = mysqli_query($db_conn,"UPDATE `users` SET profit=profit+$bonus ,balance=balance+$bonus WHERE user_id='$refferal'" )or die();
   
       
    }else{
            echo json_encode([
                'success' => false,
                'message' => 'Login failed, please enter correct detils.'
            ]);
            exit;
        }

    

    
}
}
?>