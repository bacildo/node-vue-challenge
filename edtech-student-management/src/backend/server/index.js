const express = require("express");
const {createDbConnection} = require("../../backend/configs/database/mysql");

const app = express();
const PORT = 3000;
const routePrefix = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routePrefix, (req, res, next) => {
  req.routePrefix = routePrefix;
  next();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


