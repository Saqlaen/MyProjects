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
    
    await launches.findOneAndUpdate( {
      flightNumber: launch.flightNumber
    }, launch, { // findOneAndUpdate will return only the properties we set in this launch it won't send us the '$setOnInsert': { __v : 0 } 
        upsert: true, // will insert the launch if it doesn't exist
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

async function existsLaunchWithId( launchId ){
    return await launches.findOne( { 
        flightNumber: launchId 
    }, );
}

async function abortLaunchById( launchId ){
    const aborted =  await launches.updateOne( {
        flightNumber: launchId,
    }, {
       upcoming: false,
       success: false, 
    } );
    // in aborted will get the metadata about the info we have on the operation to mongo
    return aborted.ok === 1 && aborted.nModified === 1;
}

module.exports = {
  getAllLaunches,
  addNewLaunch, 
  existsLaunchWithId,
  abortLaunchById
};