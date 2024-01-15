const express = require("express");
const studentRoutes = require("./src/students/routes");

const app = express();

const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME PAGE...");
});

app.use("/api/v1/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Listing on port ${PORT}...`);
});
