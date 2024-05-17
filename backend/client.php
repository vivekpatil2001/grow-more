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

$method =$_SERVER['REQUEST_METHOD'];


//echo "test----".$method; die;

switch($method)

 {

case "GET":

  $path= explode('/', $_SERVER['REQUEST_URI']);
  //print_r($path);
  if(isset($path[3]))
  {
   // $path= explode('/', $_SERVER['REQUEST_URI']);
    // print_r($path[3]);
  $json_array= array();
  
  $userid= $path[3];
 // echo "get user id--------------".$userid;die;
  $alluser = mysqli_query($db_conn, "SELECT * FROM users WHERE user_id='$userid'");
  
  if (mysqli_num_rows($alluser) > 0) {
    while ($row = mysqli_fetch_array($alluser)) {
      $json_array["userdata"][]= array("id" => $row['id'], "user_id"=>$row['user_id'], "email" => $row['email'], "balance" => $row['balance'], "profit" => $row['profit'], "reffer" => $row['refferal']);
    }
$info=$json_array["userdata"];
 
  $refferid= $info[0]['user_id'];
 
   $reffer =  mysqli_query($db_conn, "SELECT * FROM users WHERE refferal='$refferid'");
    if (mysqli_num_rows($reffer) > 0) {
      // $invite=[];
      while($row = mysqli_fetch_array($reffer)) {
        $json_array["userdata"][]= array( "user_id"=>$row['user_id'], "email" => $row['email'],"plan"=>'regular');
      //  array_push($invite,$row);
      }
       echo json_encode( $json_array["userdata"]);
    return;
  }else {
    $json_array["userdata"][]= array("result" => "No Reffer ");
    echo json_encode( $json_array["userdata"]);
    return;
  }
}
  }
  $db_conn ->close();
  break;
 }

?>