'use strict';
const mongoose = require('../connection_db/Connection_DB');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const PublisherModel = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        correspondence_address: {
            type: String,
            required: [true, 'Correspondence address is required']
        },
        phone: {
            type: String,
            unique: true,
            required: [true, 'Phone is required']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required']
        },
        max_books_registered: {
            type: Number,
            default: -1
        }
    }
);

PublisherModel.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('Publisher', PublisherModel);