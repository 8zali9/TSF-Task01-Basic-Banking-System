const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 8080;
const customerRoutes = require("./routes/customerRoutes");
const connection = require("./config/connect_db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", customerRoutes);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting the Database");
  } else {
    console.log("Database Connection Successful.");
    app.listen(port, () => {
      console.log(`Server listening on Port: ${port}.`);
    });
  }
});
