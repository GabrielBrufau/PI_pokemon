const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
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
    imagen:{
	    type:DataTypes.STRING,
	    allowNull:false,
	    defaultValue:"https://www.audienciaelectronica.net/wp-content/uploads/2016/08/POKEMON-GO-CAE.jpg"
    },
    created:{
	    type:DataTypes.BOOLEAN,
	    defaultValue:false
    }
  });
};
