const request = require('supertest');
const chai = require('chai');
chai.should();
const should = chai.should;
const generateTestCases = require('./test_cases').generateTestCases;

const baseUrl = 'https://api.blinker.com/api/v3';
const listingsUrl = '/listings/search?page=1&per_page=29&search%5Blatitude%5D=39.76396&search%5Blongitude%5D=-105.02021&search%5Bzipcode%5D=80211&search%5BisZipcodeValid%5D=true&search%5Bdistance%5D=500';

// https://api.blinker.com/api/v3/listings/search?page=1&per_page=29
const defaultSearchParams = {
	page: 1,
	per_page: 29
};

function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

function createListingsUrl(testCase) {
	let reqSearches = Object.assign(testCase.searches, defaultSearchParams);
	let reqFilters = testCase.filters;
	let url = `/listings/search?page=${defaultSearchParams.page}&per_page=${defaultSearchParams.per_page}`;

	for(let [key, value] of entries(reqSearches)) {
	  url += `&search%5B${key}=${value}`;
	}

	for(let [key, value] of entries(reqFilters)) {
	  url += `&filter%5B%5D=${value}`;
	}

	return url;
}


describe('Listings API', function() {

	generateTestCases(10).forEach((testCase, i) => {
		it(`should filter #${i+1}`, function(done) {
			request(baseUrl)
				.get(createListingsUrl(testCase))
	      .expect(200)
	      .expect('Content-Type', 'application/json; charset=utf-8')
	      .expect((res) => {
	      	console.log(testCase)
	      	// res.body.results.forEach((result, i) {

	      	// })
	      })
	      .end(function(err, res) {
	        if (err) return done(err);
	        done();
	      });
		});

	})
});






// Request URL:https://api.blinker.com/api/v3/listings/search?filter%5B%5D=blue&filter%5B%5D=luxury-car&filter%5B%5D=toyota&page=1&
