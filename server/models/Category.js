const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: "this filed is required"
    },
    image: {
        type: String,
        required: "this filed is required"
    }
});

module.exports = mongoose.model('category', categorySchema);