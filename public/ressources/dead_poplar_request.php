<?php
{
	$link = mysqli_connect("localhost", "root", "", "populus");
 
	// Check connection
	if($link === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	
	$resLog = '';
	$poplars = array();
	
	// Print host information
	$resLog .= "Connect Successfully. Host : " . mysqli_get_host_info($link);

	// Attempt select query execution
	$sql = "SELECT * FROM arbres WHERE IsDead = TRUE";

	$result = mysqli_query($link, $sql);

	if($result = mysqli_query($link, $sql)){
		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array($result)){
				array_push($poplars, $row['ID']);
			}

			// Free result set
			mysqli_free_result($result);
		}
	} 
	// Close connection
	mysqli_close($link);
	
    echo json_encode(array("sql"=>$sql, "poplars"=>$poplars, "logs"=>$resLog));
}	
?>