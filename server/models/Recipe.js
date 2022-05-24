const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "this filed is required"
    },
    description: {
        type: String,
        required: "this filed is required"
    },
    email: {
        type: String,
        required: "this filed is required"
    },
    ingredients: {
        type: Array,
        required: "this filed is required"
    },
    category: {
        type: String,
        enum: ['Thai', 'American', 'Chinese', 'Mexican', 'Indian', 'Spansh'],
        required: "this filed is required"
    },
    image: {
        type: String,
        required: "this filed is required"
    },
});

recipeSchema.index({name: "text", description: "text"})

module.exports = mongoose.model('Recipe', recipeSchema);