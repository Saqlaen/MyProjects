const express = require('express');
const { getAllPlanets } = require('./Controller/planets.controller')
const planetsRouter = express.Router();

planetsRouter.get('/planets', getAllPlanets );

module.exports = planetsRouter;