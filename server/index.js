const express = require("express");
const app = express();
const connectDb = require("./config/database");
const port = 5000;

connectDb()
  .then(() => {
    console.log("Database connected");
    app.listen(() => {
      console.log("server is connected to port " + port);
    });
  })
  .catch((err) => {
    console.log("Server is not connected !");
  });
