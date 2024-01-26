const express = require("express");
const studentRoutes = require("./routers/studentRouter");

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/api/v1/students", studentRoutes);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

module.exports = server;
