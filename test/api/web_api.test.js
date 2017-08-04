const request = require('superagent');
const chai = require('chai');
chai.should();
const should = chai.should;

const baseUrl = 'https://api.blinker.com/api/v3/listings/search?page=1&per_page=29&search%5Blatitude%5D=39.76396&search%5Blongitude%5D=-105.02021&search%5Bzipcode%5D=80211&search%5BisZipcodeValid%5D=true&search%5Bdistance%5D=500';

describe('Listings API', function() {
	it('should make the request successfully', function() {
		let one = 1;
		// expect(one.to.equal(1));
		one.should.equal(2);

		// request
		// 	.get(baseUrl)
		//   .end(function(err, res) {
		//   	expect(res.to.not.be(null));
		//   	expect(res.headers.content-type.to.be('fapplication/json; charset=utf-8'));
		//   	console.log(res);
		//   })
	});
});

