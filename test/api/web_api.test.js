const request = require('supertest');
const chai = require('chai');

const should = chai.should;
chai.should();
const assert = chai.assert;

const generateTestCases = require('./test_cases').generateTestCases;
const defaultCases = 100; //this many cases will be run

const baseUrl = 'https://api.blinker.com/api/v3';

const defaultSearchParams = {
	page: 1,
	per_page: 29
};

// helper function that allows us to iterate over objects more easily
function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

function createListingsUrl(testCase) {
	let reqSearches = testCase.searches;
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

const validationFuncs = {
	// TODO: add evaluation functions for location search params
	zipcode: (testValue, result) => true,
	distance: (testValue, result) => true,
	latitude: (testValue, result) => true,
	longitude: (testValue, result) => true,
	isZipcodeValid: (testValue, result) => true,

	max_mileage: (testValue, result) => testValue >= result.miles,
	min_mileage: (testValue, result) => testValue <= result.miles,
	max_year: (testValue, result) => testValue >= parseInt(result.headline.substring(0,4)),
	min_year: (testValue, result) => testValue <= parseInt(result.headline.substring(0,4)),
	max_price: (testValue, result) => testValue >= result.asking_price,
	min_price: (testValue, result) => testValue <= result.asking_price,

	// FILTER EVALUATION FUNCTIONS
	make: (testValue, result) => result.headline.toLowerCase().replace(/-/g, ' ').includes(testValue.replace(/-/g, ' '))
}


describe('Listings API', function() {

	generateTestCases(defaultCases).forEach((testCase, i) => {
		it(`should filter #${i+1}`, function(done) {
			request(baseUrl)
				.get(createListingsUrl(testCase))
	      .expect(200)
	      .expect('Content-Type', 'application/json; charset=utf-8')
	      .end(function(err, res) {
	        if (err) return done(err);
	        for(let [searchParam, value] of entries(testCase.searches)) {
  	      	res.body.results.forEach((result, i) => {
  	      		assert.equal(validationFuncs[searchParam](value, result), true);
  	      	})
	        }
	        for(let [filterParam, value] of entries(testCase.filters)) {
  	      	res.body.results.forEach((result, i) => {
		        	assert.equal(validationFuncs[filterParam](value, result), true);
  	      	})
	        }
	        done();
	      });
		});

	})
});