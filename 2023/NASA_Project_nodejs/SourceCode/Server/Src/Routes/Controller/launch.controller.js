const {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../Models/launches.model");

async function httpGetAllLaunches( req, res ){
    return res.status(200).json( await getAllLaunches() );
}

async function httpAddNewLaunch( req, res ){
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
    await addNewLaunch( launch );

    return res.status( 201 ).json( launch )
}

function httpAbortLaunch( req, res ){
    const launchId = +req.params.id;

    // if launch doesn't exist
    if( !existsLaunchWithId ){
        return res.status(404).json({
            error: 'Launch not found'
        })
    }
    
    // if launch exists 
    const abordedLaunch = abortLaunchById( launchId );
    return res.status(200).json( abordedLaunch );
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
};