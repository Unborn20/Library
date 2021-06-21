const { check } = require('express-validator');
const Publisher = require('../models/Publisher');
const Author = require('../models/Author');

/**
 * Book validations
 */
const bookValidations = [
    check('title', 'Title is required').not().isEmpty(),
    check('released_year', 'Released year is required').not().isEmpty(),
    check('genre', 'Genre is required').not().isEmpty(),
    check('page_numbers', 'Number pages is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('publisher', 'Publisher is required').not().isEmpty(),
    check('author', 'Author ID is invalid').isMongoId(),
    check('publisher', 'Publisher ID is invalid').isMongoId(),
];

/**
 * Author validations
 */
const authorValidations = [
    check('name', 'Name is required').not().isEmpty(),
    check('birth_day', 'Birth day is required').not().isEmpty(),
    check('city', 'City is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(async (email = '') => {
        const emailExists = await Author.findOne({email})
        if(emailExists) throw new Error('Author email is registered already');
    })
];

/**
 * Publisher validations
 */
const publisherValidations = [
    check('name', 'Name is required').not().isEmpty(),
    check('correspondence_address', 'Birth day is required').not().isEmpty(),
    check('phone', 'City is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(async (email = '') => {
        const emailExists = await Publisher.findOne({email});
        if(emailExists) throw new Error('Publisher email is registered already');
    }),
    check('phone').custom(async (phone = '') => {        
        const phoneExists = await Publisher.findOne({phone});        
        if(phoneExists) throw new Error('Publisher phone is registered already');
    })
];

module.exports = {
    bookValidations,
    authorValidations,
    publisherValidations
}