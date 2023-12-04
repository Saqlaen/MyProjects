const { parse } = require('csv-parse');

const path = require('path')
const fs = require('fs');

const habitablePlanets = [];

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
            if (isPlanetHabitable(data)){
                habitablePlanets.push(data);
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

// DATA ACCESS FUNCTION'S
function getAllPlanets(){
    return habitablePlanets
}

module.exports = {
  getAllPlanets,
  loadPlanetsData,
};