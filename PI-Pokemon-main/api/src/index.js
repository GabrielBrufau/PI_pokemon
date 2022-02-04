const app = require('./app.js');
const { conn } = require('./db.js');
const port = 3000;
conn.sync({force:false}).then(()=>{
	app.listen(port, () => {
		  console.log(`
			  post = http://localhost:3000/api/v1/pokemon/\n
			  Example app listening at http://localhost:${port}`)
	})
});
