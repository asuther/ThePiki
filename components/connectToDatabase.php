<?php

	DEFINE ('DB_HOST',"localhost");
	DEFINE ('DB_USER',"root");
	DEFINE ("DB_PW","");
	DEFINE ("DB_NAME","thepiki");


	$conn = new mysqli(DB_HOST,DB_USER,DB_PW,DB_NAME);

	if(!function_exists('escapeData')) {
		function escapeData($data) {

			$data = trim($data);

			if(function_exists('real_escape_string')) {
				global $conn;
				echo '.'.$data;
				$data = $conn->real_escape_string($data);
				$data = strip_tags($data);
			} else {
				$data = mysql_escape_string(trim($data));
				$data = strip_tags($data);
			}

			str_replace(");", "", $data);

			return $data;
		}
	}


?>
