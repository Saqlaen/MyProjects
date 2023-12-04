const { getAllLaunches, addNewLaunch } = require("../../Models/launches.model");

function httpGetAllLaunches( req, res ){
    return res.status(200).json( getAllLaunches());
}

function httpAddNewLaunch( req, res ){
    const launch = req.body;

    if( !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target ){
            return res.status(400).json({
                error: 'missing required launch property'
            });
        }

    launch.launchDate = new Date( launch.launchDate );

    if( isNaN( launch.launchDate ) ){
        // const noDate = new Date('hello')
        // noDate.valueOf() --> NaN
        return res.status(400).json({
            "error": 'invalid date'
        })
    }
    addNewLaunch(launch);

    return res.status( 201 ).json( launch )
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch
};