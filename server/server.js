const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = 8000;

app.use(express.static(path.join(__dirname, "../dist")));

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
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// listen on the port
app.listen(port);
