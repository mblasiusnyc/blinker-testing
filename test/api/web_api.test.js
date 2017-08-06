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
	// console.log(url)
	return url;
}

const validationFuncs = {
	// TODO: add evaluation functions for location search params
	zipcode: { assertion: (testValue, result) => true, err_msg: () => "This should not fail" },
	distance: { assertion: (testValue, result) => true, err_msg: () => "This should not fail" },
	latitude: { assertion: (testValue, result) => true, err_msg: () => "This should not fail" },
	longitude: { assertion: (testValue, result) => true, err_msg: () => "This should not fail" },
	isZipcodeValid: { assertion: (testValue, result) => true, err_msg: () => "This should not fail" },

	max_mileage: {
		assertion: (testValue, result) => testValue >= result.miles,
		err_msg: (testValue, result) => `max_mileage was exceeded: \n searchParam: ${testValue}\n resultValue: ${result.miles}`
	},
	min_mileage: {
		assertion: (testValue, result) => testValue <= result.miles,
		err_msg: (testValue, result) => `result was less than min_mileage: \n searchParam: ${testValue}\n resultValue: ${result.miles}`
	},
	max_year: {
		assertion: (testValue, result) => testValue >= parseInt(result.headline.substring(0,4)),
		err_msg: (testValue, result) => `max_year was exceeded: \n searchParam: ${testValue}\n resultValue: ${parseInt(result.headline.substring(0,4))}`
	},
	min_year: {
		assertion: (testValue, result) => testValue <= parseInt(result.headline.substring(0,4)),
		err_msg: (testValue, result) => `result was less than min_year: \n searchParam: ${testValue}\n resultValue: ${parseInt(result.headline.substring(0,4))}`
	},
	max_price: {
		assertion: (testValue, result) => testValue >= result.asking_price,
		err_msg: (testValue, result) => `max_price was exceeded: \n searchParam: ${testValue}\n resultValue: ${result.asking_price}`
	},
	min_price: {
		assertion: (testValue, result) => testValue <= result.asking_price,
		err_msg: (testValue, result) => `result was less than min_price: \n searchParam: ${testValue}\n resultValue: ${result.asking_price}`
	},

	// FILTER EVALUATION FUNCTIONS
	make: {
		assertion: (testValue, result) => result.headline.toLowerCase().replace(/-/g, ' ').includes(testValue.replace(/-/g, ' ')),
		err_msg: (testValue, result) => `Make was wrong: \n searchParam: ${testValue}\n resultValue: ${result.headline}`
	}
}


describe('Listings API', function() {

	generateTestCases(defaultCases).forEach((testCase, i) => {
		this.timeout(5000); // increase default timeout length
		const testUrl = createListingsUrl(testCase);
		it(`should filter request: \n ${testUrl}`, function(done) {
			request(baseUrl)
				.get(testUrl)
	      .expect(200)
	      .expect('Content-Type', 'application/json; charset=utf-8')
	      .end(function(err, res) {
	        if (err) return done(err);
	        // console.log(testCase);
	        assert.isBelow(res.body.results.length, defaultSearchParams.per_page+1);
	        for(let [searchParam, value] of entries(testCase.searches)) {
  	      	res.body.results.forEach((result, i) => {
  	      		assert(validationFuncs[searchParam].assertion(value, result), validationFuncs[searchParam].err_msg(value, result));
  	      	})
	        }
	        for(let [filterParam, value] of entries(testCase.filters)) {
  	      	res.body.results.forEach((result, i) => {
		        	assert(validationFuncs[filterParam].assertion(value, result), validationFuncs[filterParam].err_msg(value, result));
  	      	})
	        }
	        done();
	      });
		});

	})
});