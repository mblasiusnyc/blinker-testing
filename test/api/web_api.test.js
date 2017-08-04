const request = require('supertest');
const chai = require('chai');
chai.should();
const should = chai.should;

const baseUrl = 'https://api.blinker.com/api/v3';
const listingsUrl = '/listings/search?page=1&per_page=29&search%5Blatitude%5D=39.76396&search%5Blongitude%5D=-105.02021&search%5Bzipcode%5D=80211&search%5BisZipcodeValid%5D=true&search%5Bdistance%5D=500';

const defaultRequest = {
	page: 1,
	per_page: 29,
	latitude: 39.7501158, //Blinker HQ
	longitude:-73.989308, //Blinker HQ
	zipcode: 80202,      //Blinker HQ
	isZipCodeValid: true,
	distance: 50
};

function createListingsUrl(options) {
	let reqOptions = Object.assign(options, defaultRequest);

	let url = '/listings/search?' +
	'page=' + reqOptions.page + '&' +
	'per_page=' + reqOptions.per_page + '&' +
	'search%5Blatitude%5D=' + reqOptions.latitude + '&' +
	'search%5Blongitude%5D=' + reqOptions.longitude + '&' +
	'search%5Bzipcode%5D=' + reqOptions.zipcode + '&' +
	'search%5BisZipCodeValid%5D=' + reqOptions.isZipCodeValid + '&' +
	'search%5Bdistance%5D=' + reqOptions.distance;

	return url;
}

describe('Listings API', function() {
	it('should make the request successfully', function(done) {
		request(baseUrl)
			.get(createListingsUrl({
				latitude: 0
			}))
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res.body.facets)
        done();
      });
	});
});

