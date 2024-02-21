const express = require("express");
const mysqlConnection = require("../../backend/configs/database/mysql");

const app = express();
const PORT = 3000;
const studentsRouter = require("../routes/students")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/students", studentsRouter);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


