<?php
  define("COLUMNS_TABLE", "../../db/columns.json");

  // Get all columns
  if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo file_get_contents(COLUMNS_TABLE);

  // Update single column
  } elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    parse_str($_SERVER["QUERY_STRING"], $urlParams);
    $columnId = $urlParams["id"];
    $columnJSON = file_get_contents("php://input");
    $data = json_decode(file_get_contents(COLUMNS_TABLE));

    // Converting in order to set the prop
    $data = (array)$data;
    if ($data[$columnId]) {
      $data[$columnId] = json_decode($columnJSON);
    }
    $data = (object)$data;

    $table = fopen(COLUMNS_TABLE, "w");
    fwrite($table, json_encode($data));
    fclose($table);

    echo json_encode($data);
  }
?>
