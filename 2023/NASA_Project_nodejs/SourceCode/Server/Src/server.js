const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

const { loadPlanetsData } = require('./Models/planets.model');
const MONGO_URL =
  "mongodb+srv://saqlaen:koOpTAJz9Gdm85Nf@cluster0.bji63cs.mongodb.net/nasa?retryWrites=true&w=majority";

// mongoose exposes this connectoin object  it is an event emmitter that emit's event's
mongoose.connection.once( 'open', () => { // 'open' event will execute once, we are being explicit by using .once intead of .on
    console.log( 'MongoDB connection ready ')
} );

mongoose.connection.on( 'error', (err)=>{
    console.error( err );
} )

async function startServer(){

    await mongoose.connect( MONGO_URL );

    try{
        await loadPlanetsData();
    }
    catch( err ){
        console.log( err );
    }

    const PORT = process.env.PORT || 8000;
    const server = http.createServer(app);
    
    //STARTING OUR SERVER
    server.listen( PORT, ()=>{
        console.log(`Listening on PORT ${PORT}..`);
    });
}   

startServer();