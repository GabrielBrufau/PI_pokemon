# example of API that consume api of pokemon 

*Getting started*
- First `mkdir api`
- then we'll install `npm install --save-dev @babel/cli @babel/core @babel/preset-env`
- then we''ll do `touch .babelrc` file for configuring babel
- this we'll host any options we might want to configure babel with
```json
{
  "presets": ["@babel/preset-env"]
}
```
- then create our server in index.js `touch index.js`

### index.js
```js
const htpp = require('htpp')

const server = http.createServer((req,res)=>{
	res.writeHead(200,{'content-type':'text/plain'});
	res.send("hello World\n");
}).listen(1337);

console.log('server running at port 1337');

module.export = server;
```

- whit recent charges to babel, you well need to transpile you ES6
before node can run it 
- so, we'll add our first script, `build`, in `package.json`
```diff
  "scripts": {
  +   "build": "babel index.js -d dist"
    }
```
- then we'll add our `start` script in `packaje.json`
```diff
"script":{
	"build":"babel index.js -d dist",
+	"start":"npm run build && node dist/index.js"
}
```
- you should be able to visit `1337` en see PIpokemon

### waching file changes with nodemon
- we can inprove our npm start script with nodemon
```shell
$ npm install --save-dev nodemon
```
- then can update our npm start script.
```diff
"script":{
	"build":"babel index.js -d dist",
- 	"start":"npm run build && node dist/index.js",
+	"start":"npm run build && nodemon dist/index.js"
}
```
- hacer testing al server
`npm install --save-dev mocha`
`mkdir test`
`touch text/index.js`
`npm install --save-dev @babel/register @babel/polyfill`
- dentro de src creamos
`touch app.js`
`mkdir controllers routes model db`
- en app.js importamos usamos y exportamos express
```js
import express,{json} from 'express';

const app = express();

export default app;
```
- para ir viendo por consola las peticiones que van llegando usamos morgan
- `app.js`
```diff
	import express,{json} from "express";
+	import morgan from "morgan";
	const app = express();

+	/*routes*/
+	app.get('/',(req,res)=>{
+			res.send('hello word peach')
+		    }
	/*middlewares*/
+	app.use(morgan('dev')); 	/*muestra por consola lo que va llegando*/
+	app.use(json());  		/*lee archivos json*/

	export default app;
```
- touch routes/nobrederuta.js hacemos las rutas
```js
import {Router} from 'express';
const router = Router();
export default router;
```
- usemos app.js en index.js
### index.js
```diff
-	const htpp = require('htpp')

-	const server = http.createServer((req,res)=>{
-		res.writeHead(200,{'content-type':'text/plain'});
-		res.send("hello World\n");
-	}).listen(1337);

-	console.log('server running at port 1337');

-	module.export = server;

+	const port = 3000;
+	import app from './src/app.js';
+	async function main(){
+		await app.listen(port, () => {
+  			console.log(`Example app listening at http://localhost:${port}`)
+	  	})
+	}
+	main();
```

- como al codigo se le agrego tiempo de espera a babel hay que agregarle plugins para 
- que no de errores
- podemos ver informacion de errores de babel aca https://babeljs.io/docs/en/babel-plugin-transform-runtime
- instalamos `npm install --save-dev @babel/plugin-transform-runtime` `npm install --save @babel/runtime`
- configuramos el archivo .babelrc
- configuramos el archivo .babelrc
```bash
{
    	"presets": ["@babel/preset-env"],
	"plugins": [
	      [
	              "@babel/plugin-transform-runtime",{
			                			"absoluteRuntime": false,
					          		"corejs": false,
						            	"helpers": true,
								"regenerator": true,
								"version": "7.0.0-beta.0"
							}
		]
	]
}
```
con esto tendriamos nuestro hola mundo
- ahora podriamos crear un post modularizando las rutas
- en `touch src/routes/index.js` definimos la ruta agregandole un versionado
`src/routes/index.js`
```js
import express from 'express';
const pokemon_routes = require('./routes.pokemon');
const router = express.Router();

function router_api(app){
	app.use('/api/v1',router);
	router.post('/pokemon',pokemon_routes);
	}
	module.exports = router_api;
```
en 'touch src/routes/routes.pokemon.js' manejamos el post
`src/routes/routes.pokemon.js`
```js
const {Router} = require("express");
const router = Router();

const Pokemon_controllers_class = require("../controllers/controllers.pokemon.js");
const pokemon = New Pokemon_controllers_class();

async function pokemon_routes(req,res){
	res_of_pokemon = await pokemon.create(req,res);
	res.status(201).json(res_of_pokemon);
	}
	module.exports = pokemon_routes;
```
- ahora configuremos el controlador de esta ruta
- `touch ../controllers/controllers.pokemon.js`
```js
Class Controllers_pokemon{
	async create(req,res){
	const post = {"hola":"putitos"};
	return post:
	}
}
module.exports = Controllers_pokemon;
```
- checkeamos que app este usando las rutas

- `app.js`
```diff
	import express,{json} from "express";
	import morgan from "morgan";
	const app = express();

+	/*importamos rutas*/
+	import routes_app from './routes/index.js'
	
	/*routes*/
-	app.get('/',(req,res)=>{
-			res.send('hello word peach')
-		    }
+	routes_app(app);

	/*middlewares*/
	app.use(morgan('dev')); 	/*muestra por consola lo quie va llegando*/
	app.use(json());  		/*lee archivos json*/

	export default app;
```
- con esto configurado ya nos dejaria hacer un post si no les sale me escriben please!!
- modularicemos un poco mas las rutas y dejemos mas limpio el codigo
- `src/routes/index.js`
```diff
import express from 'express';
const pokemon_routes = require('./routes.pokemon');
const router = express.Router();

function router_api(app){
	app.use('/api/v1',router);
-	router.post('/pokemon',pokemon_routes);
+	router.use('/pokemon',pokemon_routes);
}
	module.exports = router_api;
```
`src/routes/routes.pokemon.js`
```diff
const {Router} = require("express");
const router = Router();

const Pokemon_controllers_class = require("../controllers/controllers.pokemon.js");
const pokemon = New Pokemon_controllers_class();

router.post('/',async function pokemon_routes(req,res){
	res_of_pokemon = await pokemon.create(req,res);
	res.status(201).json(res_of_pokemon);
	})
	module.exports = pokemon_routes;
```
- esto nos deja trabajar mas ordenado con archivos bastante especializados
- creemos la coneccion a la db
- `src/db.js`
```js
require('dotenv').config();
const {DB_USER,DB_PASSWORD,DB_HOST} = process.env;

import Sequelize from 'sequelize';

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`)

module.exports = {auth,sequelize}
```
- configuramos `touch api/.env` 
```bash
DB_USER=
DB_PASSWORD=
DB_HOST=
```
- vamos a model/model.pokemon.js y escribimos
```js
const { DataTypes } = require('sequelize');
import sequelize from '../db.js';
const pokemon_model =  sequelize.define('pokemon', {
    id:{
	    type:DataTypes.UUID,
	    allowNull:false,
	    defaultValue:DataTypes.UUIDV4,
	    primaryKey:true
    },

    name:{
	    type: DataTypes.STRING,
	    allowNull: false,
    },
    type:{
	    type:DataTypes.STRING
    },
    sprites:{
	    type:DataTypes.STRING,
	    allowNull:false,
	    defaultValue:"https://www.audienciaelectronica.net/wp-content/uploads/2016/08/POKEMON-GO-CAE.jpg"
    },
    created:{
	    type:DataTypes.BOOLEAN,
	    defaultValue:false
    }
  },{
	timestamps:false
    });
export default pokemon_model;

```
- probamos con postman o insomnia si le podemos mandar por body un json
vamos que el id lo genera solo entonses escribimos en imsonia 
```json
{
	"name":"ken",
	"type":"normal",
	"imagen":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png",
	"created":true,
	}
```
- para que estos datos se guarden en la base de datos usamos los modelos
vamos a controllers/controllers.pokemon.js y traemos los schemas

- `src/controllers/controllers.pokemon.js`
```diff
+	import pokemon_model from '../model/model.pokemon.js'
	class Controller_pokemon{
	
		async create(req,res){
-			const post = {"hola":"putitos"}
-			return post
			/*extraemos lo que me envian en la ruta post*/
+			const {name,type,sprites,created} = req.body;
			/*guardar los datos recuerda que el guardado puede tomar un tiempo asignale un await*/
+			let new_pokemon = await pokemon_model.create({
+				name,
+				type,
+				sprites,
+				created
+			});
+			res.send('date received')

		}

	}
	module.exports = Controller_pokemon;
```
- a este punto tuve algunos problemas con babel y creo que fireware cree
el script dev en package json y cambie todos los import por const = require




























