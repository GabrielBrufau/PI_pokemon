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

-whit recent charges to babel, you well need to transpile you ES6
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
=		    }
	/*middlewares*/
+	app.use(morgan('dev')); 	/*muestra por consola lo quie va llegando*/
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





































