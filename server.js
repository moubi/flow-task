const express = require("express");
// const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/kanban-board", function(req, res) {
  return res.send("success load");
});

app.post("/kanban-board", function(req, res) {
  return res.send("successful save");
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT || 8080);
