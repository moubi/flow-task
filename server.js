const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB = {
  path: "src/db/",
  columns: "src/db/columns.json",
  tasks: "src/db/tasks.json"
};

app.get("/kanban-board", function(req, res) {
  const columnsData = fs.readFileSync(DB.columns);
  const tasksData = fs.readFileSync(DB.tasks);
  const columnsJSON = JSON.parse(columnsData);
  const tasksJSON = JSON.parse(tasksData);
  const data = Object.assign({}, columnsJSON, tasksJSON);

  return res.send(data);
});

// TODO: need a fix to work with columns and tasks DBs
app.post("/kanban-board", function(req, res) {
  const columnData = JSON.stringify(req.body.columns);
  const tasksData = JSON.stringify(req.body.tasks);

  return fs.writeFile(DB.columns, columnData, err => {
    if (err) throw err;

    return fs.writeFile(DB.tasks, tasksData, err => {
      if (err) throw err;
      return res.send(req.body);
    });
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/kanban-board/columns/:id", function(req, res) {
  const columnId = req.params.id;
  const columnJSON = req.body;
  const rawdata = fs.readFileSync(DB.columns);
  const data = JSON.parse(rawdata);

  if (data[columnId]) {
    data[columnId] = columnJSON;
  }
  return fs.writeFile(DB.columns, JSON.stringify(data), err => {
    if (err) throw err;
    return res.send(data);
  });
});

app.get("/kanban-board/columns", function(req, res) {
  const columnsData = fs.readFileSync(DB.columns);
  return res.send(JSON.parse(columnsData));
});

app.post("/kanban-board/tasks/:id", function(req, res) {
  const taskId = req.params.id;
  const taskJSON = req.body;
  const rawdata = fs.readFileSync(DB.tasks);
  const data = JSON.parse(rawdata);

  if (data[taskId]) {
    data[taskId] = taskJSON;
  }
  return fs.writeFile(DB.tasks, JSON.stringify(data), err => {
    if (err) throw err;
    return res.send(data);
  });
});

app.delete("/kanban-board/tasks/:id", function(req, res) {
  const taskId = req.params.id;
  const rawdata = fs.readFileSync(DB.tasks);
  const data = JSON.parse(rawdata);
  delete data[taskId];

  return fs.writeFile(DB.tasks, JSON.stringify(data), err => {
    if (err) throw err;
    return res.send(data);
  });
});

app.put("/kanban-board/tasks/:id", function(req, res) {
  const taskId = req.params.id;
  const rawdata = fs.readFileSync(DB.tasks);
  const data = JSON.parse(rawdata);
  data[taskId] = {
    id: taskId,
    text: ""
  };

  return fs.writeFile(DB.tasks, JSON.stringify(data), err => {
    if (err) throw err;
    return res.send(data[taskId]);
  });
});

app.get("/kanban-board/tasks", function(req, res) {
  const tasksData = fs.readFileSync(DB.tasks);
  return res.send(JSON.parse(tasksData));
});

app.listen(process.env.PORT || 8080);
