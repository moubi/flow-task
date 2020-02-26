const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB = {
  path: "db/",
  columns: "db/columns.json",
  tasks: "db/tasks.json"
};

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/columns", function(req, res) {
  const columnsData = fs.readFileSync(DB.columns);
  return res.send(JSON.parse(columnsData));
});

app.get("/tasks", function(req, res) {
  const tasksData = fs.readFileSync(DB.tasks);
  return res.send(JSON.parse(tasksData));
});

app.post("/columns/:id", function(req, res) {
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

app.post("/tasks/:id", function(req, res) {
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

app.delete("/tasks/:id", function(req, res) {
  const taskId = req.params.id;
  const rawdata = fs.readFileSync(DB.tasks);
  const data = JSON.parse(rawdata);
  delete data[taskId];

  return fs.writeFile(DB.tasks, JSON.stringify(data), err => {
    if (err) throw err;
    return res.send(data);
  });
});

app.put("/tasks/:id", function(req, res) {
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

app.listen(process.env.PORT || 8080);

// module.exports = app;
