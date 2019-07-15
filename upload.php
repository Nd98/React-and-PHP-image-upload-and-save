<?php 

$content = $_POST['image_uri']; //raw data
$name = $_POST['image_name']; //image name

$di = base64_decode($content); //binary to base64 image file conversion

file_put_contents("img/".$name,$di); //file location

//database work;


?>