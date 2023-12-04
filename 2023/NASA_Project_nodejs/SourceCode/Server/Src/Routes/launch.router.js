const express = require('express');
const { httpGetAllLaunches, httpAddNewLaunch  } = require('./Controller/launch.controller')

const launchesRouter = express.Router();

launchesRouter.get( '/', httpGetAllLaunches );
launchesRouter.post( '/', httpAddNewLaunch );

module.exports = launchesRouter