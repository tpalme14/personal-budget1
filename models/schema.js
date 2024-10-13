const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[0-9a-fA-F]+$/.test(v);
            },
            message: props => `${props.value} is not a valid hexadecimal value!`
        },
    },
    title: {
        type: String,
        trim: true,
        uppercase: true,
        required: true
    },
    budget: {
        type: Number,
        required: true
    }
}, { collection: 'myBudget'})

module.exports = mongoose.model('myBudget', budgetSchema)