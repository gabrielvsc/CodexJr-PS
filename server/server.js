require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require("./db")
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));

