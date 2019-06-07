<?php
header("Access-Control-Allow-Origin: http://domain_name.ru");

if (!function_exists('http_response_code')) {
    function http_response_code($newcode = NULL) {
        static $code = 200;
        if ($newcode !== NULL) {
            header('X-PHP-Response-Code: ' . $newcode, true, $newcode);
            if (!headers_sent()) {
                $code = $newcode;
            }
        }
        return $code;
    }
}

//echo 'this is counter lead';
//echo '<br/>';
//echo '<br/>';


$servername = "";
$dbname     = '';
$username   = "";
$password   = "";

$tablename  = 'leads';
$tablecols = array(
    'leads_count_key',
    'leads_count_value',
);


// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


mysqli_select_db($conn, $dbname) or die('connect to db failed');


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $counterNumber    = $_GET['counterNumber'];
    $counterNumberSQL = null;

    switch (intval($counterNumber)) {
        case 1:
            $counterNumberSQL = 1;
            break;
        case 2:
            $counterNumberSQL = 2;
            break;
        case 3:
            $counterNumberSQL = 3;
            break;
    }


    $queryGet = "SELECT `" . $tablecols[1] . "` FROM `"  . $tablename . "`" . " WHERE `" . $tablecols[0] . "`='counter_" . $counterNumberSQL ."'";
    $resultGet = $conn->query($queryGet);

    if (!$resultGet) {
        echo 'bad query <br/>';
        http_response_code(500);
        exit;
    }


    $resultGetArray = $resultGet->fetch_assoc();

    if ( empty($resultGetArray) ) {
        echo json_encode(array(
           'server_response' => 'db is empty',
           'server_data' => 'nothing',
//           '$_GET_counterNumber' => false,
        ));
//        http_response_code(500);
        exit;
    } else {
        echo json_encode(array(
            'server_response' => 'value getted',
            'server_data' => $resultGetArray[ $tablecols[1] ],
        ));

        exit;
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $counterNumber    = $_POST['counterNumber'];
    $counterNumberSQL = null;

    switch (intval($counterNumber)) {
        case 1:
            $counterNumberSQL = 1;
            break;
        case 2:
            $counterNumberSQL = 2;
            break;
        case 3:
            $counterNumberSQL = 3;
            break;
    }

    $queryGet = "SELECT `" . $tablecols[1] . "` FROM `"  . $tablename . "`" . " WHERE `" . $tablecols[0] . "`='counter_" . $counterNumberSQL ."'";
    $resultGet = $conn->query($queryGet);
    $resultGetArray = $resultGet->fetch_assoc();

    $newCounterValue = $resultGetArray[ $tablecols[1] ] + 1;

    $queryPut = "UPDATE `" . $tablename . "`"
        . " SET `". $tablecols[1] . "`=" . $newCounterValue
        . " WHERE `" . $tablecols[0] . "`='counter_" . $counterNumberSQL ."'";
    $resultPut = $conn->query($queryPut);

    if ( !$resultPut ) {
        echo json_encode(array(
            'server_response' => 'error when writ to db',
        ));
        exit;
    } else {
        echo json_encode(array(
            'server_response' => 'count updated success',
        ));
        exit;
    }
}

$conn->close();
