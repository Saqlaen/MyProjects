// const API_URL = 'http://localhost:8000/v1';
const API_URL = 'v1'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/planets`);
  // Load planets and return as JSON.
  return await response.json();
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/launches`);
  // Load launches, sort by flight number, and return as JSON.
    const launches = await response.json();
    return launches.sort( (a,b) => {
        return a.flightNumber - b.flightNumber
    })
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  try{
      return await fetch(`${API_URL}/launches`, {
        method: 'post',
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(launch)
      } )
  }
  catch ( err ){
    return {
        ok: false
    }
  }
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  try{
      return await fetch(`${API_URL}/launches/${id}`, {
        method: 'delete',
      })
  }
  catch( err ){
    console.log( err );
    return {
        ok: false
    }
  }
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};