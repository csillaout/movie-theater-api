const express = require("express");
const db = require("../db/connection");
const userRoutes = require("../routes/user.js");
const showRoutes = require("../routes/show.js");
const app = express();

//Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Sync the database
//db.sync();

//Use the routes
app.use("/shows", showRoutes);
app.use("/users", userRoutes);

//Export the app for use in server.js
module.exports = app;
