const mongoose = require("mongoose");

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true});
//DB=mongodb+srv://Recipes:Recipes@cluster0.olpgp.mongodb.net/?retryWrites=true&w=majority
// , { useNewUrlParser: true, useUnifiedTopology: true}
const db = mongoose.connection;


db.on('error', console.error.bind(console, "connection error: "));

db.once('open', () => {
    console.log("database connected!");
})

// Models
require('../models/Category');
require('../models/Recipe');