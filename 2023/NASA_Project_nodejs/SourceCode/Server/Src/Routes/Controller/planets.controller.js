const { getAllPlanets } = require("../../Models/planets.model");


function httpGetAllPlanets( req, res ){
    return res.status(200).json( getAllPlanets() );
    // the return of this function isn't used by the express we are setting this
    // so our express doesn't complain about setting the status code again
}

module.exports = {
  httpGetAllPlanets,
};