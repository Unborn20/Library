'use strict';
const express = require('express');
const BookController = require('../controllers/BookController');
const sendResponse = require('../helpers/sendResponse');
const validateFields = require('../middlewares/validateFields');
const {bookValidations, authorValidations, publisherValidations} = require('../validations/validations');

const bookRouter = express.Router();

bookRouter.get('/books', async (req, res) => {
    let queryParams = req.query;
    const bookController = new BookController();
    const {status, books} = await bookController.getBooks(queryParams);
    
    return sendResponse(res, status, books);
});

bookRouter.post('/book', [...bookValidations, validateFields], async (req, res) => {    
    let bookData = req.body;    
    const bookController = new BookController();
    const {status, msg} = await bookController.saveBook(bookData);

    return sendResponse(res, status, msg);
});

bookRouter.post('/author', [...authorValidations, validateFields], async (req, res) => {
    let authorData = req.body;    
    const bookController = new BookController();
    const {status, msg} = await bookController.saveAuthor(authorData);

    return sendResponse(res, status, msg);
});

bookRouter.post('/publisher', [...publisherValidations, validateFields], async (req, res) => {
    let publisherData = req.body;
    const bookController = new BookController();
    const {status, msg} = await bookController.savePublisher(publisherData);

    return sendResponse(res, status, msg);
});

module.exports = bookRouter;