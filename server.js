const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DB = "db.json";

app.get("/kanban-board", function(req, res) {
  const rawdata = fs.readFileSync(DB);
  const data = JSON.parse(rawdata);

  return res.send(data);
});

app.post("/kanban-board", function(req, res) {
  const data = JSON.stringify(req.body);
  return fs.writeFile(DB, data, err => {
    if (err) throw err;
    return res.send(req.body);
  });
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 8080);
