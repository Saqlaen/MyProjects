require('dotenv').config();

const http = require('http');

const app = require('./app');
const { connectToMongoDb } = require("./Services/mongo");
const { loadPlanetsData } = require('./Models/planets.model');
const { loadLaunchData } = require('./Models/launches.model');

async function startServer(){

    try{
        await connectToMongoDb();
        await loadPlanetsData();
        await loadLaunchData();
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