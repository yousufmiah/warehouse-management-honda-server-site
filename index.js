const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.POR || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//root api
app.get("/", (req, res) => {
  res.send("Running Dry Fish server.");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
