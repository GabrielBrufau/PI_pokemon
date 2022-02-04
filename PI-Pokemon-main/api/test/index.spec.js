let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/api/v1';

describe('Insert a pokemon ',()=>{
	 it('should insert a pokemon', (done) => {
		  chai.request(url)
		  .post('/pokemon')
		  .send({
		      	"name": "gabriel",
		      	"type": "mora",
		      	"sprites": "URL",
			"created":true
		    	})
		  .end( function(err,res){
			   console.log(res.body)
			   expect(res).to.have.status(201);
			   done();
			   });
		  });
});




