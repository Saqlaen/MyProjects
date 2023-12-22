const axios = require('axios');

const launches = require('./launches.mongo.schema');
const planets = require('./planets.mongo.schema')


const DEFAULT_FLIGHT_NUMBER = 1;
const SPACE_X_API = `https://api.spacexdata.com/v4/launches/query`;

// helper's
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE_NO = 1;
function getPagination( query ){
    const page = Math.abs(query.page) || DEFAULT_PAGE_NO;
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
    const skip = ( page - 1 ) * limit;
    return {
        skip, 
        limit
    }
}

async function saveLaunch( launch ){
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
async function getAllLaunches( skip, limit ) {
    return await launches.find( {}, { '__id': 0, '__v': 0 } )
                         .sort({ flightNumber: 1 }) // -1 for decending value, 1 for ascending
                         .skip( skip )
                         .limit( limit );
}

async function addNewLaunch( launch ){

    const planet = await planets.findOne( {
        keplerName: launch.target,
    } );
    
    if( !planet ){
        throw new Error('NO matching planets found');
    }

    const newFlightNu = await getLatestFlightNo() + 1; 

    const newLaunch = Object.assign( launch, {
        success: true,
        upcoming: true,
        customers: [ 'zero', 'nasa' ],
        flightNumber: newFlightNu,
    })

    await saveLaunch( newLaunch );
}

async function findLaunch( filter ){
    return await launches.findOne( filter )
}

async function existsLaunchWithId( launchId ){
    return await findLaunch({
      flightNumber: launchId,
    });
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

async function loadLaunchData(){
    
    const firstLaunch = await findLaunch( {
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    } );

    if( firstLaunch ){
        console.log( 'Launch Data already loaded');
        return;
    }
    console.log( 'loading launch data...');

    const response = await axios.post(SPACE_X_API, {
      query: {},
      options: {
        pagination: false,
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    });

    if( response.status !== 200 ){
        console.log( 'something happend while downloading..');
        throw new Error('Launch data download failed');
    }

    const launchDocs = response.data.docs;
    for( const data of launchDocs ){
        // "payloads": [
        //         {
        //             "customers": [
        //                 "DARPA"
        //             ],
        //             "id": "5eb0e4b5b6c3bb0006eeb1e1"
        //         }
        //     ],
        const payloads = data['payloads'];
        const customer = payloads.flatMap( (e) => {
          return e["customers"];
        });
        const launch = {
            flightNumber: data['flight_number'],
            mission:      data['name'],
            rocket:       data['rocket']['name'],
            launchDate:   data['date_local'],
            upcoming:     data['upcoming'],
            success:      data['success'],
            customer,
        }
        await saveLaunch( launch );
    }
    console.log( 'No of launches happend so far ',launchDocs.length )
}
module.exports = {
  getAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
  loadLaunchData,
  getPagination
};