'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const bookRouter = require('./routes/BookRoute');

/**
 * Middlewares 
 */
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

/**
 * Config cors
 */
 app.use(cors());
 
/**
 * Routes
 */
app.use('/', bookRouter);

/**
 * RunServer
 */
app.listen(3000, () => {
    console.log('Server Running');
});