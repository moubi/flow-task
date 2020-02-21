<?php
  define("TASKS_TABLE", "../../db/tasks.json");

  // Get all tasks
  if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo file_get_contents(TASKS_TABLE);

  // Create a new task
  } elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    parse_str($_SERVER["QUERY_STRING"], $urlParams);
    $taskId = $urlParams["id"];
    $rawdata = file_get_contents(TASKS_TABLE);
    $data = json_decode($rawdata);

    // Converting in order to set the prop
    $data = (array)$data;
    $data[$taskId] = (object)[
      id => $taskId,
      text =>""
    ];
    $data = (object)$data;

    $table = fopen(TASKS_TABLE, "w");
    fwrite($table, json_encode($data));
    fclose($table);

    echo json_encode($data->{"$taskId"});
  }
?>
