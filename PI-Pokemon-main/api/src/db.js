require('dotenv').config();
const {DB_USER,DB_PASSWORD,DB_HOST} = process.env;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,{logging: false, native: false})

const auth = async ()=>{
 try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');

 } catch (error) {
	console.error('Unable to connect to the database:', error);
 }
}
console.log(auth())
console.log(DB_USER)
console.log(DB_PASSWORD)
console.log(DB_HOST)
module.exports = {conn: sequelize};









/*-----------------------------------------------------------------------------------------------------------
require('dotenv').config();			//para usar .env
const { Sequelize } = require('sequelize');
const fs = require('fs');			//api node
const path = require('path');			//api node
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env; 	//usamos el .env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

//check if connecting to the database
const auth = async ()=>{
 try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
 } catch (error) {
	console.error('Unable to connect to the database:', error);
 }
}
auth()
const basename = path.basename(__filename); 	//The path.basename() method returns
						//the last portion of a path

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models est??n todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos as??: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexi??n { conn } = require('./db.js');
};
------------------------------------------------------------------------------------------------------------*/
