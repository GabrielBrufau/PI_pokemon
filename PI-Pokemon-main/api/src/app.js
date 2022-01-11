/*importamos librerias*/
import express,{json} from 'express';
import morgan from 'morgan';

/*importamos routes*/

/*start*/
const app = express();

/*Middlewares*/
app.use(morgan('dev')); /*muestra en consola peticiones*/
app.use(json()); 	/*lee json*/

/*use routes*/
app.get('/',(req,res)=>{
	res.send('hello word peach');
})

module.exports = app;

