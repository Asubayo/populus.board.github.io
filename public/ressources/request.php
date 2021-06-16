<?php

$id= $_POST['id'];

if ($id){

	$link = mysqli_connect("localhost", "root", "", "populus");
 
	// Check connection
	if($link === false){
		die("ERROR: Could not connect. " . mysqli_connect_error());
	}
	 
	$resLog = '';
	$dataInfos = '';
	$dataMeasures = '';
	$dataNotes = '';
	
	// Print host information
	$resLog .= "Connect Successfully. Host : " . mysqli_get_host_info($link);

	// Attempt select query execution
	$sql = "SELECT * FROM arbres WHERE ID=" .strval($id);

	$resultTreeInfo = mysqli_query($link, $sql);

	if($resultTreeInfo = mysqli_query($link, $sql)){
		if(mysqli_num_rows($resultTreeInfo) > 0){
			$dataInfos .= "<table width = \"100%\">";
				$dataInfos .= "<tr style=\"background-color: #009879;\">";
					$dataInfos .= "<th>Id</th>";
					$dataInfos .= "<th>Variety</th>";
					$dataInfos .= "<th>Planting Date</th>";
					$dataInfos .= "<th>Marked</th>";
					$dataInfos .= "<th>IsDead</th>";
				$dataInfos .= "</tr>";
			while($row = mysqli_fetch_array($resultTreeInfo)){
				$dataInfos .= "<tr>";
					$dataInfos .= "<td width = \"10%\">" . $row['ID'] . "</td>";
					$dataInfos .= "<td width = \"35%\">" . $row['Variety'] . "</td>";
					$dataInfos .= "<td width = \"35%\">" . $row['Planting Date'] . "</td>";
					$dataInfos .= "<td width = \"10%\">" . $row['Marked'] . "</td>";
					$dataInfos .= "<td width = \"10%\">" . $row['IsDead'] . "</td>";
				$dataInfos .= "</tr>";
			}
			$dataInfos .= "</table>";
			// Free result set
			mysqli_free_result($resultTreeInfo);
		} else{
			$resLog .= "No records matching your query were found.";
		}
	} else{
		$resLog .= "ERROR: Could not able to execute $sql. " . mysqli_error($link);
	}
	
	$sqlMeasurements = "SELECT * FROM populus.measurements WHERE TREE_ID=" .strval($id) ." ORDER BY DATE ASC"; 
	$resultMeasurementsInfo = mysqli_query($link, $sqlMeasurements);
	$measureArray = array();
	
	if($resultMeasurementsInfo = mysqli_query($link, $sqlMeasurements)){
		if(mysqli_num_rows($resultMeasurementsInfo) > 0){
			$dataMeasures .= "<table  width = \"100%\">";
				$dataMeasures .= "<tr  style=\"background-color: #009879;\">";
					$dataMeasures .= "<th>Date</th>";
					$dataMeasures .= "<th>Measurements</th>";
				$dataMeasures .= "</tr>";
			while($row = mysqli_fetch_array($resultMeasurementsInfo)){
				$measureInfo = array();
				$dataMeasures .= "<tr>";
					$dataMeasures .= "<td style=\"text-align: center; vertical-align: middle;\">" . $row['DATE'] . "</td>";
					$dataMeasures .= "<td style=\"text-align: center; vertical-align: middle;\">" . $row['MEASUREMENT'] . "</td>";
				$dataMeasures .= "</tr>";
				
				array_push($measureInfo, $row['DATE'], $row['MEASUREMENT']);
				
				array_push($measureArray, $measureInfo);
			}
			$dataMeasures .= "</table>";
			// Free result set
			mysqli_free_result($resultMeasurementsInfo);
		} else{
			$resLog .= "No records matching your query were found.";
		}
	} else{
		$resLog .= "ERROR: Could not able to execute $sql. " . mysqli_error($link);
	}
	
	$sqlNodes = "SELECT * FROM populus.notes WHERE POPULUS_ID=" .strval($id) ." ORDER BY Date ASC"; 
	$resultNotes = mysqli_query($link, $sqlNodes);
	
	
	if($resultNotes = mysqli_query($link, $sqlNodes)){
		if(mysqli_num_rows($resultNotes) > 0){
			$dataNotes .= "<table width = \"100%\">";
				$dataNotes .= "<tr  style=\"background-color: #009879;\">";
					$dataNotes .= "<th>Date</th>";
					$dataNotes .= "<th>Comment</th>";
				$dataNotes .= "</tr>";
			while($row = mysqli_fetch_array($resultNotes)){
				$dataNotes .= "<tr>";
					$dataNotes .= "<td style=\"width: 20%; text-align: center; vertical-align: middle;\">" . $row['Date'] . "</td>";
					$dataNotes .= "<td width = \"80%\">" . $row['Comment'] . "</td>";
				$dataNotes .= "</tr>";
			}
			$dataNotes .= "</table>";
			// Free result set
			mysqli_free_result($resultNotes);
		}
	}
	
	// Close connection
	mysqli_close($link);
	
    echo json_encode(
		array(
			"sql"=>$sql, 
			"measures"=>$measureArray,
			"infos"=>$dataInfos,
			"measurements"=>$dataMeasures,
			"notes"=>$dataNotes,
			"logs"=>$resLog));
}   
else{
	echo json_encode(array("abc"=>'not successfuly registered'));
}	
?>