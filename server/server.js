const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;
const path = require("path").resolve("../dist");

app.use(express.static(path));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/api/test", (req, res) => {
  res.json("test success");
});

app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

// listen on the port
app.listen(port);
