const express = require('express');

const booksController = require("../Controller/books.Controller");
const booksRouter = express.Router();

booksRouter.use( (req,res,next) => {
    console.log('BOOKS ROUTER MIDDLEWARE')
    console.log('ip address (ipv6 syntax) -> ', req.ip );
    next();
} )

//GET METHOD
// booksRouter.get("/", booksController.handleEmptyRoute );

booksRouter.get("/", booksController.getAllBooks );

booksRouter.get( '/file', booksController.getTheFile  );

booksRouter.get("/:bookId", booksController.getBooksById );

//POST METHOD
booksRouter.post("/store", booksController.storeTheBook );

booksRouter.post('/fileUpload', booksController.storeTheFile );


module.exports = booksRouter;