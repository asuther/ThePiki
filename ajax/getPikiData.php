<?php
    require_once('connectToDatabase.php');
    $pikiID = $_GET['pikiID'];
    $tabID = $_GET['tabID'];

    //Get piki information
    $pikiResult = $conn->query("SELECT * FROM pikis WHERE id = $pikiID");

    if(mysqli_num_rows($pikiResult) == 1) {
        //Store piki data of parent
        $pikiData = $pikiResult->fetch_assoc();

        //Get piki tab information

        //Get piki child information for current tab
        $childrenResult = $conn->query("SELECT * FROM pikilinks WHERE parentPikiID = $pikiID AND tabID = $tabID");

        //Create an array with the children data
        $childrenData = array();
        while($childRow = $childrenResult->fetch_assoc()) {
            array_push($childrenData, $childRow);
        }

        $pikiData['childrenData'] = $childrenData;

        echo json_encode($pikiData);
    }

?>
