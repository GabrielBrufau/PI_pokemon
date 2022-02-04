/*importamos librerias*/
const express = require( 'express');
const morgan = require('morgan');

/*importamos routes*/
const router_api = require( './routes/index.js');

/*start*/
const app = express();


/*Middlewares*/
app.use(morgan('dev')); /*muestra en consola peticiones*/
app.use(express.json()); 	/*lee json*/

/*use routes*/
router_api(app);

module.exports = app;



