const express = require('express');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');

const routes = express.Router();

// Sessao
routes.post('/sessions', SessionController.store);

//Spots
routes.post('/spots', SpotController.store);

module.exports = routes;