const express = require("express");
require("dotenv").config();
const cors = require("cors");
const rateLimiter = require("./middlewares/rateLimiter");
const port = process.env.PORT || 8080;
const customerRoutes = require("./routes/customerRoutes");
const connection = require("./config/connect_db");

const app = express();

app.use(rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/api", customerRoutes);

connection.connect((err, res) => {
  if (err) {
    console.log("Error connecting the Database");
    return res.json({ message: "Error connecting the Database" });
  } else {
    console.log("Database Connection Successful.");
    app.listen(port, () => {
      console.log(`Server listening on Port: ${port}.`);
    });
  }
});
