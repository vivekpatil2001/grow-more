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


?>