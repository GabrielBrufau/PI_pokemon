const { Router } = require('express');


const router = Router();
const Pokemon_controllers_class = require ('../controllers/controllers.pokemon.js');
const pokemon = new Pokemon_controllers_class();


router.post('/',async function pokemon_routes(req,res){
	const res_of_pokemon = await pokemon.create(req,res);
	res.status(201).json(res_of_pokemon);
})


module.exports = router;
