<?php

// Database connection setup
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$database = "your_database";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to sanitize data
function sanitize($value) {
    return is_null($value) || trim($value) === '' ? null : trim($value);
}

function sanitizeInteger($value) {
    return is_numeric($value) ? (int) $value : null;
}

function sanitizeDate($value) {
    try {
        $date = DateTime::createFromFormat('m/d/Y h:i:s A', $value);
        if (!$date) {
            $date = DateTime::createFromFormat('m/d/Y', $value);
        }
        return $date ? $date->format('Y-m-d') : null;
    } catch (Exception $e) {
        return null;
    }
}

// Get the file path from the command-line argument
$filePath = $argv[1];

if (!file_exists($filePath)) {
    echo "File not found!\n";
    exit(1);
}

// Open the file and read its content
$file = fopen($filePath, 'r');

// Skip the header row (first line)
$header = fgetcsv($file);

// Start the transaction
$conn->begin_transaction();

try {
    // Prepare the SQL statement
    $stmt = $conn->prepare("
        INSERT INTO data (OBJECTID, X, Y, FAC_ID, POINT_ID, NEAR_ID_1, NEAR_ID_2, NEAR_ID_3, AIR_CODE, AIR_CODE2, 
                          AMTRAKCODE, FERRY_CODE, RAIL_ID, BIKE_ID, DATE_UPDTE, ADDRESS, CITY, STATE, ZIPCODE, 
                          METRO_AREA, FAC_NAME, LONGITUDE, LATITUDE, POINT_LON, POINT_LAT, FAC_TYPE, FERRY_T, 
                          FERRY_I, BUS_T, BUS_I, BUS_CODE_S, BUS_SUPP, RAIL_I, RAIL_C, RAIL_H, RAIL_LIGHT, 
                          AIR_SERVE, BIKE_SHARE, BIKE_SYS_ID, BIKE_SYS, WEBSITE, NOTES, SOURCE, I_SERVICE, 
                          T_SERVICE, CBSA_CODE, CBSA_TYPE, MODES_SERV, MODE_BUS, MODE_AIR, MODE_RAIL, 
                          MODE_FERRY, MODE_BIKE, x2, y2) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    // Loop through the CSV file and insert each row into the database
    while (($row = fgetcsv($file)) !== false) {
        $stmt->bind_param("ssssssssssssssssssssssssssssssssssssssssssssssssssss", 
            sanitize($row[0]), sanitize($row[1]), sanitize($row[2]), sanitize($row[3]), sanitize($row[4]),
            sanitizeInteger($row[5]), sanitizeInteger($row[6]), sanitizeInteger($row[7]), sanitize($row[8]), sanitize($row[9]),
            sanitize($row[10]), sanitize($row[11]), sanitize($row[12]), sanitize($row[13]), sanitizeDate($row[14]),
            sanitize($row[15]), sanitize($row[16]), sanitize($row[17]), sanitize($row[18]), sanitize($row[19]),
            sanitize($row[20]), sanitize($row[21]), sanitize($row[22]), sanitize($row[23]), sanitize($row[24]),
            sanitize($row[25]), sanitize($row[26]), sanitize($row[27]), sanitize($row[28]), sanitize($row[29]),
            sanitize($row[30]), sanitize($row[31]), sanitize($row[32]), sanitize($row[33]), sanitize($row[34]),
            sanitize($row[35]), sanitize($row[36]), sanitize($row[37]), sanitize($row[38]), sanitize($row[39]),
            sanitize($row[40]), sanitize($row[41]), sanitize($row[42]), sanitize($row[43]), sanitize($row[44]),
            sanitize($row[45]), sanitize($row[46]), sanitize($row[47]), sanitize($row[48]), sanitize($row[49]),
            sanitize($row[50]), sanitize($row[51]), sanitize($row[52]), sanitize($row[53]), sanitize($row[54])
        );

        $stmt->execute();
    }

    // Commit the transaction
    $conn->commit();
    echo "Data imported successfully!\n";
} catch (Exception $e) {
    // Rollback the transaction in case of an error
    $conn->rollback();
    echo "Failed to import data: " . $e->getMessage() . "\n";
}

// Close the file and the statement
fclose($file);
$stmt->close();

// Close the database connection
$conn->close();

?>