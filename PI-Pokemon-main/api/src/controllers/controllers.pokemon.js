const pokemon_model = require( '../models/models.pokemon.js');

class Controller_pokemon{
	
	async create(req,res){
		const {name,type,sprites,created} = req.body;
		const new_pokemon = await pokemon_model.create({
			name,
			type,
			sprites,
			created
		},{
			fields:['name','type','sprites','created']
		});
		res.send('date received');
	}

}
module.exports = Controller_pokemon;
