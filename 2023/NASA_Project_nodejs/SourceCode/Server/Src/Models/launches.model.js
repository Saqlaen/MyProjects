const launches = require('./launches.mongo.schema');
const planets = require('./planets.mongo.schema')

// state 
let latestFlightNum = 20;
const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'mk-23',
    rocket: 'aka-222',
    launchDate: new Date('December 27, 2028'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true, 
}

// launches.set( launch.flightNumber, launch );

// helper's
async function saveLaunch( launch ){
    const planet = await planets.findOne( {
        keplerName: launch.target,
    })

    if( !planet ){
        throw new Error( 'Noo matching planet was found');
    }
    
    await launches.updateOne( {
      flightNumber: launch.flightNumber
    }, launch, {
        upsert: true,
    });
}

async function getLatestFlightNo(){ // mongo doesn't have AUTO_INCREMENT feature
    const latestLaunch = await launches
                                .findOne() // will return first document if there are more than one
                                .sort( '-flightNumber' ); // using - to fetch the highest flightNumber 
    if( !latestLaunch ){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}

// DATA ACCESS FUNCTION'S
async function getAllLaunches() {
    return await launches.find( {}, { '__id': 0, '__v': 0 } );
}

async function addNewLaunch( launch ){
    const newFlightNu = await getLatestFlightNo() + 1; 

    const newLaunch = Object.assign( launch, {
        success: true,
        upcoming: true,
        customers: [ 'zero', 'nasa' ],
        flightNumber: newFlightNu,
    })

    await saveLaunch( newLaunch );
}

function existsLaunchWithId( launchId ){
    return launches.has( launchId );
}

function abortLaunchById( launchId ){
    const abordedLaunch = launches.get( launchId );
    abordedLaunch.upcoming = false;
    abordedLaunch.success = false;
    return abordedLaunch;
}

module.exports = {
  getAllLaunches,
  addNewLaunch, 
  existsLaunchWithId,
  abortLaunchById
};