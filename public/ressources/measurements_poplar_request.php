<?php

{
	$link = mysqli_connect("localhost", "root", "", "populus");
 
	// Check connection
	if($link === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	
	$resLog = '';
	$treeArray = array();
	$measurementArray = array();
	
	//var map = {};
	
	// Print host information
	$resLog .= "Connect Successfully. Host : " . mysqli_get_host_info($link);

	// Attempt select query execution
	$sql = "select t.TREE_ID, t.DATE, t.MEASUREMENT
			from populus.measurements t
			inner join (select TREE_ID, max(DATE) as max_date
						from populus.measurements
						group by TREE_ID) t2
			on t.TREE_ID = t2.TREE_ID and t.DATE = t2.max_date ORDER BY t.TREE_ID";

/*
select t.TREE_ID, t.DATE, t.MEASUREMENT
from populus.measurements t
inner join (select TREE_ID, max(DATE) as max_date
from populus.measurements where DATE >= '2030-01-01 00:00:00' 
and DATE < '2030-12-31 00:00:00'
group by TREE_ID) t2
on t.TREE_ID = t2.TREE_ID and t.DATE = t2.max_date ORDER BY t.TREE_ID 
*/

	$result = mysqli_query($link, $sql);

	
	if($result = mysqli_query($link, $sql)){
		if(mysqli_num_rows($result) > 0){
			while($row = mysqli_fetch_array($result)){
				array_push($treeArray, $row['TREE_ID']);
				array_push($measurementArray, $row['MEASUREMENT']);
			}

			// Free result set
			mysqli_free_result($result);
		}
	} 
	
	// Close connection
	mysqli_close($link);
	
    echo json_encode(array("sql"=>$sql, "trees"=>$treeArray, "measurements"=>$measurementArray, "logs"=>$resLog));
}	

?>