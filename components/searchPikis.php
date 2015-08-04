<?php
    require_once('connectToDatabase.php');
    $searchTerm = $_GET['queryString'];

    //Get piki terms like the search term
    $pikiSearchResult = $conn->query("SELECT * FROM pikis WHERE name LIKE '%$searchTerm%'");

    if(mysqli_num_rows($pikiSearchResult) > 0) {
        $resultsArray = array();
        while($childRow = $pikiSearchResult->fetch_assoc()) {
            array_push($resultsArray, $childRow);
        }

        echo json_encode($resultsArray);
    }

?>
