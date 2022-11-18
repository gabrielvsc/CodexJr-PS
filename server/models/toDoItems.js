const mongoose = require('mongoose');

// Creating task item Schema
const ToDoItemSchema = new mongoose.Schema({
    item:{
        type:String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model('todo', ToDoItemSchema);