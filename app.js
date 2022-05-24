const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const fielUpload = require('express-fileupload');
const sessoin = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();
// app.use(express.urlencoded({ extended: true }));
app.use(express.json("CookingBlogSecure"));
app.use(fielUpload());
app.use(flash());
app.use(sessoin({
    secret: "CookingBlogSecretSessoin",
    saveUninitialized: true,
    resave: true
}));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons/")));
app.use(expressLayouts);

app.set("layout", "./layouts/main");
app.set("view engine", "ejs");
app.set("views");

const routes = require("./server/routes/recipeRoutes.js");

app.use("/", routes);

app.listen(port, () => console.log(`listening yo port ${port}`));
