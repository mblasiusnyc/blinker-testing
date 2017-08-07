const filters = require('./test_data.js').filters;
const searches = require('./test_data.js').searches;
const distances = require('./test_data.js').distances;
const filterMap = ['color', 'make', 'style'];

function randomizeFilters() {
	let testFilters = {};
	// TODO: add color and style to api results so the filtering can be tested on the front end
	// filtering is apparently done on backend for now
	// const chosenFilters = [Math.random()<.5, Math.random()<.5, Math.random()<.5];
	const chosenFilters = [false, Math.random()<.5, false];
	chosenFilters.forEach((filter, i) => {
		if(filter) {
			let filterValue = filters[filterMap[i]][Math.floor(Math.random()*filters[filterMap[i]].length)];
			testFilters[filterMap[i]] = filterValue;
		}
	})
	return testFilters;
}

searchFunctions = {
	zipcode: () => '80202',
	// TODO: These search functions should be replaced with API calls to determine the actual
	// coords of a given zip code
	// latitude: () => '39.742043',
	// longitude: () => '-104.991531',
	// isZipcodeValid: () => true,
	distance: () => distances[Math.floor(Math.random() * distances.length)],
	max_mileage: () => Math.floor(Math.random()*200000),
	min_mileage: () => Math.floor(Math.random()*200000),
	min_year: () => 1981+Math.floor(Math.random()*36),
	max_year: () => 1981+Math.floor(Math.random()*36),
	max_price: () => Math.floor(Math.random()*100000),
	min_price: () => Math.floor(Math.random()*100000)
}

function randomizeSearches() {
	let testSearches = {};
	let chosenSearches = searches.filter(() => Math.random()<.25 );
	chosenSearches.forEach((search, i) => {
		testSearches[search] = searchFunctions[search]();
	});

	// if zip is included, also include lat and long of 80202 zip code
	if(testSearches.zipcode) {
		testSearches.latitude = '39.742043';
		testSearches.longitude = '-104.991531';
		testSearches.isZipcodeValid = true;
	}

	// Swap min and maxes if both exist and max is higher than min
	if(testSearches.max_mileage && testSearches.min_mileage && testSearches.min_mileage > testSearches.max_mileage) {
		testSearches.min_mileage = [testSearches.max_mileage, testSearches.max_mileage = testSearches.min_mileage][0];
	}
	if(testSearches.max_price && testSearches.min_price && testSearches.min_price > testSearches.max_price) {
		testSearches.min_price = [testSearches.max_price, testSearches.max_price = testSearches.min_price][0];
	}
	if(testSearches.max_year && testSearches.min_year && testSearches.min_year > testSearches.max_year) {
		testSearches.min_year = [testSearches.max_year, testSearches.max_year = testSearches.min_year][0];
	}

	return testSearches;
}

function generateTestCases(num) {
	let testCases = [];
	for(let i=0; i<num; i++) {
		testCases.push({
			filters: randomizeFilters(),
			searches: randomizeSearches()
		});
	}
	return testCases;
}

module.exports = {
	generateTestCases: generateTestCases
}