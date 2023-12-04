const http = require('http');
const app = require('./app');

const { loadPlanetsData } = require('./Models/planets.model');

async function startServer(){
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