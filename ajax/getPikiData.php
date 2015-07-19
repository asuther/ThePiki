<?php
    require_once('connectToDatabase.php');
    $pikiID = $_GET['pikiID'];

    //Get piki information
    $pikiResult = $conn->query("SELECT * FROM pikis WHERE id = $pikiID");

    if(mysqli_num_rows($pikiResult) == 1) {
        //Store piki data of parent
        $pikiData = $pikiResult->fetch_assoc();

        //Get piki tab information

        //Get piki child information for current tab
        $childrenResult = $conn->query("SELECT * FROM pikilinks WHERE parentPikiID = $pikiID");

        //Create an array with the children data
        $childrenData = array();
        while($childRow = $childrenResult->fetch_assoc()) {
            //Get the piki row from the 'pikis' database
            $childrenPikiResult = $conn->query("SELECT name,description FROM pikis WHERE id = $childRow[childPikiID] ");
            $childPikiRow = $childrenPikiResult->fetch_assoc();

            $childRow['childPikiID'] = intval($childRow['childPikiID']);
            $childRow['parentPikiID'] = intval($childRow['parentPikiID']);
            $childRow['tabID'] = intval($childRow['tabID']);

            //Append the piki name/description info onto the rest of the child information
            $childRow = array_merge($childRow, $childPikiRow);

            array_push($childrenData, $childRow);
        }

        $pikiData['childrenData'] = $childrenData;

        echo json_encode($pikiData);
    }

?>
