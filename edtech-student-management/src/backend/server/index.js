const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;
const studentsRouter = require("../routes/students");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/", studentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
