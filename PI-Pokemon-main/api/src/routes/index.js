const express = require( 'express');
const pokemon_routes = require('./routes.pokemon')
const router = express.Router();


function router_api(app){
	app.use('/api/v1',router);
	router.use('/pokemon',pokemon_routes);
}

module.exports = router_api;
