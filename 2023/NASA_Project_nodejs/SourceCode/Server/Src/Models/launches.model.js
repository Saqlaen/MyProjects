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


// DATA ACCESS FUNCTION
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

module.exports = {
  getAllLaunches,
  addNewLaunch
};