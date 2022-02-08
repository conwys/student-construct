$email=$_POST['email'];
$message=json_encode($_POST);
$receiver="benstcr@gmail.com";
$mailer="email@email.com";

mail($email,"Message:",$message,  array("from"=>$mailer));
