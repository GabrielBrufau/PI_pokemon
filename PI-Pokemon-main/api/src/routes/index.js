const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/auth', ()=>{
	res.send("hola");
});


module.exports = router;
