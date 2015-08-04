<?php
    require_once('../connectToDatabase.php');
    echo var_dump($_POST);
    $parentID = $_POST['parentID'];
    $shapeCoordinates = $_POST['shapeCoordinates'];

    $finalString = "[";
    foreach ( $shapeCoordinates as $shape ) {
        $finalString .= "[".implode(",", $shape)."],";
    }
    $finalString = substr($finalString, 0, (strlen($finalString) - 1));
    $finalString.="]";

    //Get piki information
    $pikiResult = $conn->query("INSERT INTO pikilinks (parentPikiID, childPikiID, coordinates, shapeType, tabID) VALUES ($parentID, 4000, '$finalString', 'rect', 1)");

?>
