'use strict';
const mongoose = require('../connection_db/Connection_DB');
const Schema = mongoose.Schema;

const BookModel = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        released_year: {
            type: String,
            required: [true, 'Released year is required']
        },
        genre: {
            type: String,
            required: [true, 'Genre is required']
        },
        page_numbers: {
            type: Number,
            required: [true, 'Number pages is required']
        },
        author: { 
            type: Schema.ObjectId, 
            ref:'Author',
            required: [true, 'Author is required']
        },
        publisher: { 
            type: Schema.ObjectId, 
            ref:'Publisher',
            required: [true, 'Publisher is required']
        }
    }
);

module.exports = mongoose.model('Book', BookModel);