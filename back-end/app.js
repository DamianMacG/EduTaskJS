const express = require("express");
const studentRoutes = require("./routers/studentRouter");
const teacherRoutes = require("./routers/teacherRouter");
const assignmentsRoutes = require("./routers/assignmentsRouter");

const {
  handleCustomErrors,
  handleServerErrors,
  handlePsqlErrors,
} = require("./errors/errors");

const app = express();

app.use(express.json());

app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/assignments", assignmentsRoutes);

app.all("*", (_, res) => {
  res.status(404).send({ msg: "Not found" });
});

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
