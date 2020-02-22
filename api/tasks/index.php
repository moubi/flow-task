<?php
  define("TASKS_TABLE", "../../db/tasks.json");

  // Get all tasks
  if ($_SERVER["REQUEST_METHOD"] === "GET") {
    echo file_get_contents(TASKS_TABLE);

  // Edit task
  } elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
    parse_str($_SERVER["QUERY_STRING"], $urlParams);
    $taskId = $urlParams["id"];
    $taskJSON = file_get_contents("php://input");
    $data = json_decode(file_get_contents(TASKS_TABLE));

    // Converting in order to set the prop
    $data = (array)$data;
    if ($data[$taskId]) {
      $data[$taskId] = json_decode($taskJSON);
    }
    $data = (object)$data;

    $table = fopen(TASKS_TABLE, "w");
    fwrite($table, json_encode($data));
    fclose($table);

    echo json_encode($data);

  // Create a new task
  } elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
    parse_str($_SERVER["QUERY_STRING"], $urlParams);
    $taskId = $urlParams["id"];
    $data = json_decode(file_get_contents(TASKS_TABLE));

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

  // Delete a task
  } elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
    parse_str($_SERVER["QUERY_STRING"], $urlParams);
    $taskId = $urlParams["id"];
    $data = json_decode(file_get_contents(TASKS_TABLE));

    // Converting in order to delete the prop
    $data = (array)$data;
    unset($data[$taskId]);
    $data = (object)$data;

    $table = fopen(TASKS_TABLE, "w");
    fwrite($table, json_encode($data));
    fclose($table);

    echo json_encode($data);
  }
?>
