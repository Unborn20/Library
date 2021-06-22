'use strict';
const Book = require('../models/Book');
const Author = require('../models/Author');
const Publisher = require('../models/Publisher');

class BookController{    

    _errorMessage = 'Server Internal Error'
    _warningMessage = ''
    _noLimitBooks = -1

    async getBooks(queryParams){
        try{
            const {author, title, released_year} = queryParams;
            const books = await Book.find({title, released_year})
            .populate('author', 'name')
            .populate('publisher', 'name')
            .exec();
            
            if(!books.length){                
                return {status: 404, books: 'No results found'};    
            }
            
            return {status: 200, books};
        }catch(err){
            return {status: 500, msg: `${this._errorMessage}`};
        }
    }

    /**
     * 
     * @param {*} bookData 
     * @returns JSON with HTTP status and info Message
     */
    async saveBook(bookData){        
        try{
            const author_id = bookData.author;
            const publisher_id = bookData.publisher;
            
            const {exists, existsMsg} = await this.ifExists(author_id, publisher_id);            
            if(!exists){                
                return {status: 400, msg: existsMsg};
            } 
            
            const {limitReached, limitMsg} = await this.countBooks(publisher_id);
            if(limitReached){
                return {status: 405, msg: limitMsg};
            }               

            const book = new Book(bookData);    
            await book.save();
            return {status: 200, msg: `Book ${bookData.title} registered success`};
        }catch(err){            
            return {status: 500, msg: `${this._errorMessage}`};
        }
    }

    /**
     * 
     * @param {*} authorData 
     * @returns JSON with HTTP status and info Message
     */
    async saveAuthor(authorData){
        try{
            const author = new Author(authorData);
            await author.save();
            return {status: 200, msg: `Author ${authorData.name} registered success`};
        }catch(err){
            return {status: 500, msg: `${this._errorMessage}`};
        }        
    }

    /**
     * 
     * @param {*} publisherData 
     * @returns JSON with HTTP status and info Message
     */
    async savePublisher(publisherData){
        try{
            const publisher = new Publisher(publisherData);
            await publisher.save();
            return {status: 200, msg: `Publisher ${publisherData.name} registered success`};
        }catch(err){
            return {status: 500, msg: `${this._errorMessage}`};
        }
    }

    /**
     * 
     * @param {*} author_id 
     * @param {*} publisher_id 
     * @returns JSON with state (true/false) and info Message
     */
    async ifExists(author_id, publisher_id){ 
        try{            
            const authorExists = await Author.exists({_id: author_id});
            const publisherExists = await Publisher.exists({_id: publisher_id});
            
            if (!authorExists){                
                this._warningMessage = 'This author does\'t registered';
                return {exists: false, existsMsg: this._warningMessage};
            }

            if (!publisherExists){
                this._warningMessage = 'This publisher does\'t registered';
                return {exists: false, existsMsg: this._warningMessage};
            }

            return {exists: true};
        }catch(err){
            throw new Error(err);
        }
    }

    /**
     * 
     * @param {*} publisher_id 
     * @returns JSON with state (true/false) and info Message
     */
    async countBooks(publisher_id){
        try{
            const count = await Book.countDocuments({publisher: publisher_id});
            const [...publisher] = await Publisher.find({_id: publisher_id}).select('max_books_registered -_id');            
            const max_books_registered = publisher[0].max_books_registered;

            if(this._noLimitBooks === max_books_registered){
                return {limitReached: false};
            }
            
            if(count === max_books_registered){
                this._warningMessage = 'Can\'t save more book in this publisher. Limit reached';
                return {limitReached: true, limitMsg: this._warningMessage};
            }
    
            return {limitReached: false};
        }catch(err){            
            throw new Error(err);
        }
    }

}

module.exports = BookController;