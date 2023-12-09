const { parse } = require('csv-parse');
const planets = require('./planets.mongo.schema');

const path = require('path')
const fs = require('fs');

function isPlanetHabitable( planet ){
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36
      && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
}

function loadPlanetsData(){
    return new Promise( ( resolve, reject ) => {
        fs.createReadStream(
          path.join(
            __dirname,
            "..",
            "..",
            "Data",
            "habitable_planets.csv"
          ))
          .pipe(
            parse({
              comment: "#",
              columns: true,
            }))
          .on("data", (data) => {
            if ( isPlanetHabitable(data) ){
                updateMongoDb_addToCollection( data );
                // console.log( data );
            } 
          })
          .on("error", (err) => {
            reject( err );
          })
          .on("end", () => {
            resolve();
          });
    } );
}

// helper function's
async function updateMongoDb_addToCollection( data ){
    try{
        // await planets.create( data ); if you wanna create a document
                    await planets.updateOne( {
                        keplerName: data.kepler_name, // query we are finding document that matches the keplerName
                    },
                    {
                        keplerName: data.kepler_name, // if it doesn't find any document it will add this or if it finds anything it will update it with this 
                    }, 
                    {
                        upsert: true, // need to mention this if you want to update + insert
                    } );
    } catch( err ){
        console.error( err );
    }
}


// DATA ACCESS FUNCTION'S
async function getAllPlanets(){
    return await planets.find( {}, // filter document's based on a criteria
        {
            '__v': 0,
            '__id': 0,
        }, // projection allow's us to tell which field's are included in the response    
    );
}


module.exports = {
  getAllPlanets,
  loadPlanetsData,
};