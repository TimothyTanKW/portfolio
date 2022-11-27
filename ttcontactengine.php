<?php
if(isset($_POST['email'])) {
 

 
    function died($error) {
        // your error code can go here
        echo "We are very sorry, but there were error(s) found with the form you submitted. ";
        echo "These errors appear below.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }


    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "timothy_ttkw@hotmail.com";
    $email_subject = "Contact Form Submission to Timothy Tan";
     
 
    $name = $_POST['name']; // required
    $email_from = $_POST['email']; // required
    $message = $_POST['message']; // required

 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
    $email_message = "Form details below.\n\n";
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";


 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();

 
 // send email
$success = mail($email_to, $email_subject, $email_message, $headers);	
	
// EDIT THE 3 LINES BELOW AS REQUIRED FOR REPLY EMAIL
$email_reply_to = $email_from;
$email_reply_subject = "Contact Form Submission to Timothy Tan";	
$email_reply_from ="Timothy Tan <timothy_ttkw@hotmail.com>"; 

// reply email headers
$reply_headers = 'From:'.$email_reply_from."\r\n". 
'Reply-To: '.$email_reply_from."\r\n" .
'X-Mailer: PHP/' . phpversion();	

    $email_reply_message = "Thank you for getting in touch with me :) \n\n";
    $email_reply_message .= "Your form submission details as follows: \n\n";
    $email_reply_message .= "Name: ".clean_string($name)."\n";
    $email_reply_message .= "Email: ".clean_string($email_from)."\n";
    $email_reply_message .= "Message: ".clean_string($message)."\n";


	
 
// redirect to success page
if ($success){
   mail($email_reply_to, $email_reply_subject, $email_reply_message, $reply_headers);
   echo json_encode(array("data" => "success"));
}else{
    echo json_encode(array("data" => "invalid"));
}	
?>
  
<?php
 
} else{
	echo "invalid";
}
?>