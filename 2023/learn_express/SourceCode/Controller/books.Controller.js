const path = require('path'); 
// in linux /folder/file.jpg
// in window \folder\file.jpg 
// path will take of this for us  

//CREATING A MODULE TO HANDLE ROUTE'S FOR BOOK RELATED STUFF
const { booksDatabase } = require('../Model/books.model')

//using function because it is a good idea when you are debugging javascript can tell at which function you have a problem
//opposed to named function it would only tell you that their is a problem with some function when you use arrow function
function getAllBooks(req, res){
  res.json( booksDatabase ); // Content-type will be set to application/JSON
}

function getBooksById(req, res) {
  const bookId = +req.params.bookId;
  const book = booksDatabase[bookId];
  //validation
  if (book) {
    res.json(book);
  } else {
    // res.sendStatus(404); // will set the code and send message
    res.status(404).json({
      error: "book does not exist",
    });
  }
}

function storeTheBook(req, res) {
//   console.log("we can store the data we get ", req.body, res.sendStatus(200));
    if( !req.body.name ){
        return res.status(400).json({         //adding return so node does not try to got to the next line and process res.sendStatus(200) -> will throw an error [ cannot set status for already sent object ]
            error: 'send a valid name plz'
        })
    }
    console.log( req.body );
    req.body.age = booksDatabase.length
    booksDatabase.push( req.body )
    res.sendStatus(200); // send to the browser telling that the post was succesfull
}

function handleEmptyRoute( req, res ){
    res.status(200).json({
        "message":"connected to the server this is an empty route."
    })
}

function storeTheFile( req, res ){

}

function getTheFile( req, res ){
    console.log( __dirname );
    let file_path = path.join( __dirname, '..', 'Public', 'Images' ,'skimountain.jpg' );
    res.sendFile(file_path );
}

module.exports = {
    getAllBooks,
    getBooksById,
    storeTheBook,
    handleEmptyRoute, 
    storeTheFile, 
    getTheFile
}