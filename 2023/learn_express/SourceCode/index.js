const express = require("express");
const path = require('path')

const books_Router = require('./Routes/books.router')


const app = express();
const PORT = 3000;


// LISTEN ON THIS PORT
app.listen(PORT, () => {
    console.log(`use this url -> http://[::1]:3000`);
  console.log(`Listening on port ${PORT}`);
});

// OUR OWN LOGGIN MIDDLEWARE
app.use((req, res, next) => {
    const start = Date.now();
    next(); // we have to call the next method express will handle the appropriate middle ware for the coming req
    //AFTER NEXT THE EXECUTION COMES BACK HERE [CONTROL FLOW IS RETURNED HERE]
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms `);
});

// TO SERVE A WEBSITE FROM BACKEND SERVER WE CAN USE THIS
// app.use( express.static('public'))
// we can serve the website at a route 
app.use( '/site' , express.static( path.join( __dirname, 'Public')))

//SETTING UP THE EXPRESS JSON MIDDLEWARE
app.use( express.json() );

//SETTING UP OUR BOOKS ROUTER MIDDLEWARE
app.use('/books', books_Router )

