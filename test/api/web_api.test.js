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
	// let reqSearches = Object.assign(testCase.searches, defaultSearchParams);
	let reqFilters = testCase.filters;
	let url = `/listings/search?page=${defaultSearchParams.page}&per_page=${defaultSearchParams.per_page}`;

	// for(let [key, value] of entries(reqSearches)) {
	//   url += `&search%5B${key}=${value}`;
	// }

	for(let [key, value] of entries(reqFilters)) {
	  url += `&filter%5B%5D={key}=${value}`;
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
	      .end(function(err, res) {
	        if (err) return done(err);
	        console.log('got here')
	        done();
	      });
		});

	})
});






// Request URL:https://api.blinker.com/api/v3/listings/search?filter%5B%5D=blue&filter%5B%5D=luxury-car&filter%5B%5D=toyota&page=1&
// per_page=29&
// search%5Blatitude%5D=39.752441&
// search%5Blongitude%5D=-104.999831&
// search%5Bzipcode%5D=80202&
// search%5BisZipcodeValid%5D=true&
// search%5Bdistance%5D=50&
// search%5Blabel_max_mileage%5D=110000&
// search%5Bmax_mileage%5D=110000&
// search%5Bmin_mileage%5D=40000&
// search%5Blabel_min_mileage%5D=40000&
// search%5Blabel_min_year%5D=2008&
// search%5Blabel_max_year%5D=2014&
// search%5Bmin_year%5D=2008&
// search%5Bmax_year%5D=2014&
// search%5Blabel_max_price%5D=30000&
// search%5Bmax_price%5D=30000&
// search%5Blabel_min_price%5D=10000&
// search%5Bmin_price%5D=10000