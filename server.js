const express = require("express");
// const session = require("express-session");
// // Requiring passport as we've configured it
// const passport = require("./config/passport");
if (process.env.NODE_ENV) {
  require("dotenv").config({
    path: `${__dirname}/.env.${process.env.NODE_ENV}`,
  });
} else {
  require("dotenv").config();
}

console.log(process.env.DB_PASS);
const axios = require("axios");
const path = require("path");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
let host = process.env.HOST;

const db = require("./models");
const sequelize = require("./models");
// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Set Handlebars.
let exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: path.join(__dirname, "views/layouts") }));
app.set("view engine", "handlebars");
// Requiring our routes
// app.use(HTMLRoutes);
const routes = "./routes";
app.use(require(routes));

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, host, function () {
    console.log("App listening on PORT " + PORT);
  });
});
module.exports = app;
