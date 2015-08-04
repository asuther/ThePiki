<?php
    require_once('../connectToDatabase.php');
    $pikiID = $_GET['pikiID'];

    //Get piki information
    $tabIDResult = $conn->query("SELECT tabid FROM tablinks WHERE pikiid = $pikiID");

    $tabIDArray = array();

    while($tabIDRow = $tabIDResult->fetch_assoc()) {

        //echo $tabIDRow['tabid'];
        $tabResult = $conn->query("SELECT * FROM tabs WHERE id = $tabIDRow[tabid]");

        array_push($tabIDArray, $tabResult->fetch_assoc());

    }

    echo json_encode($tabIDArray);

?>
