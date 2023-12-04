const launches = new Map();

// state 
let latestFlightNum = 20;

const launch = {
    flightNumber: 20,
    mission: 'mk-23',
    rocket: 'aka-222',
    launchDate: new Date('December 27, 2028'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true, 
}

launches.set( launch.flightNumber, launch );


// DATA ACCESS FUNCTION'S
function getAllLaunches(){
    return Array.from(launches.values());
}

function addNewLaunch( launch ){
    latestFlightNum++;
    launches.set( latestFlightNum, Object.assign( launch, {
        flightNumber: latestFlightNum,
        upcoming: true,
        success: true
    } ) );
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