const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
 
},  {
    timestamps: true
});

// Category Model
module.exports = mongoose.model("Category", categorySchema);