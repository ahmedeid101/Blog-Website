require("dotenv").config();
const express = require("express");
const cors = require('cors');
const dbConnect = require("./config/dbConfig");
const errorHandler = require('./Middlewares/errorHandler');
const authRoutes = require("./Routes/auth.route");
const userRoutes = require('./Routes/user.routes');

//database connection
dbConnect();

//Init App
const app = express();

//Middlewares
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data


//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//Error handler
app.use(errorHandler);

//runing the server
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server Is Running on ${process.env.NODE_ENV} mode on ${port}`))