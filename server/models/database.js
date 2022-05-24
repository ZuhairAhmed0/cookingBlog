const mongoose = require("mongoose");

mongoose.connect(process.env.DB);

const db = mongoose.connection;


db.on('error', console.error.bind(console, "connection error: "));

db.once('open', () => {
    console.log("database connected!");
})


// Models 
require('../models/Category');
require('../models/Recipe');
