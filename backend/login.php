<?php

require('./config.php');
$method = $_SERVER['REQUEST_METHOD'];

switch ("$method") {

    case "POST":
        $userpostdata = json_decode(file_get_contents("php://input"));
      // print_r ($userpostdata->email);
        $email = $userpostdata->email;
        $password = md5($userpostdata->password);
  
 $user = mysqli_query($db_conn, "SELECT email,user_id,role,payment FROM users WHERE email='$email' AND password ='$password'");
 //print_r($user);

 if(mysqli_num_rows($user)>0){
    while($row=mysqli_fetch_array($user)){ 
        if($row['payment']==""){
            echo json_encode([
                'success' => false,
                'message' => 'Buy A Plan .'
            ]);
            exit;
        }else{
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

    }
} else{
        echo json_encode([
            'success' => false,
            'message' => 'Login failed, please enter correct details.'
        ]);
        exit;
    }


$db_conn ->close();
break;
default: ;
}
?>