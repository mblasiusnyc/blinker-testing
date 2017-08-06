const filters = {
	color: ['beige','black','blue','brown','burgundy','charcoal','gold','gray','green','off White','orange','purple','red','silver','tan','turquoise','white','yellow'],
	make: ['acura','alfa-romeo','audi','bmw','buick','cadillac','chevrolet','chrysler','dodge','fiat','ford','gmc','honda','hummer','hyundai','infiniti','jaguar','jeep','kia','land-rover','lexus','lincoln','maserati','mazda','mercedes-benz','mercury','mini','mitsubishi','nissan','oldsmobile','pontiac','porsche','ram','saturn','scion','subaru','suzuki','tesla','toyota','volkswagen','volvo'],
	style: ['2-door-mid-size-passenger-car','full-size-car','full-size-van','large-crossover-suv','large-luxury-crossover-suv','luxury-car','mid-size-car','minivan','pickup','small-car','small-crossover-suv','small-luxury-crossover-suv','sporty-car','two-seater-passenger-car']
}

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

const searches = ['zipcode','distance','max_mileage','min_mileage','min_year','max_year','max_price','min_price'];
// TODO: Add these back when suitable searchFunctions can be added for each search
// 'latitude','longitude','isZipcodeValid','label_max_mileage','label_min_mileage','label_min_year','label_max_year','label_max_price','label_min_price'
const distances = [25,50,75,100,200,300,500];

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

	if(testSearches.max_mileage && testSearches.min_mileage) {
		let maxMileage = Math.max(testSearches.max_mileage, testSearches.min_mileage);
		let minMileage = Math.min(testSearches.max_mileage, testSearches.min_mileage);
		testSearches.min_mileage = minMileage;
		testSearches.max_mileage = maxMileage;
	}

	if(testSearches.max_price && testSearches.min_price) {
		let maxPrice = Math.max(testSearches.max_price, testSearches.min_price);
		let minPrice = Math.min(testSearches.max_price, testSearches.min_price);
		testSearches.min_price = minPrice;
		testSearches.max_price = maxPrice;
	}

	if(testSearches.max_year && testSearches.min_year) {
		let maxYear = Math.max(testSearches.max_year, testSearches.min_year);
		let minYear = Math.min(testSearches.max_year, testSearches.min_year);
		testSearches.min_year = minYear;
		testSearches.max_year = maxYear;
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