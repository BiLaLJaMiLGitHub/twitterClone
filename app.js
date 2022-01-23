const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const tweetsRoute = require("./routes/tweets");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");
const imageRoute = require("./routes/images");

app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/tweets", tweetsRoute);
app.use("/users", usersRoute);
app.use("/categories", categoriesRoute);
app.use("/images", imageRoute);

module.exports = app;

// this is my new addition in this clone 
