const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch  } = require('./Controller/launch.controller')

const launchesRouter = express.Router();

// END POINTS
launchesRouter.get( '/', httpGetAllLaunches );
launchesRouter.post( '/', httpAddNewLaunch );
launchesRouter.delete("/:id", httpAbortLaunch );

module.exports = launchesRouter