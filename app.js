const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const Port = process.env.PORT || 4000;

const routes = require("./v1/routes/supplierRoutes");
const DB = require("./conecction/dbConnection");

app.use(bodyParser.json());
app.use(express.json());
// Routes
app.use('/api/supplier', routes);

// server
app.listen(Port, async () => {
  try {
    await DB();
    console.log(`Server is listen at port http://localhost:${Port}`);
  } catch (error) {
    console.log("error: ", error);
  }
});
