const mongoose = require('mongoose');

// Creating the Schema to our db
const ToDoItemSchema = new mongoose.Schema({
    item:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('todo', ToDoItemSchema);