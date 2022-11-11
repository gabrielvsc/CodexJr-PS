const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json()); 

// PORT definition
const PORT = process.env.PORT || 5000;

// Importing Routes
const ToDoItemRoute = require('./routes/toDoItems');

// Connection with mongodb
mongoose.connect(process.env.DB_CONNECT)
.then(() => console.log("Database connected"))
.catch(err => console.log(err))

app.use('/', ToDoItemRoute);

app.listen(PORT, () => console.log("Server connected"));