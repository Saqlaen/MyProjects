const express = require('express');

const api = express.Router();

const planetsRouter = require("./planets.router");
const launchesRouter = require("./launch.router");

// adding our route handler's
api.use("/planets", planetsRouter);
api.use( '/launches', launchesRouter );

module.exports = api;