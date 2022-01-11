import app from './app.js';

const port = 3000;
async function main(){
	await app.listen(port, () => {
		  console.log(`Example app listening at http://localhost:${port}`)
	})
};
main();
