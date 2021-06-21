'use strict';
const mongoose = require('../connection_db/Connection_DB');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const AuthorModel = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        birth_day: {
            type: String,
            required: [true, 'Birth day is required']
        },
        city: {
            type:String,
            required: [true, 'City is required']
        },
        email: {
            type:String,
            unique: true,
            required: [true, 'Email is required']
        }
    }
);

AuthorModel.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('Author', AuthorModel);