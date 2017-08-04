const filters = {
	color: ['beige','black','blue','brown','burgundy','charcoal','gold','gray','green','off White','orange','purple','red','silver','tan','turquoise','white','yellow'],
	make: ['acura','alfaromeo','audi','bmw','buick','cadillac','chevrolet','chrysler','dodge','fiat','ford','gmc','honda','hummer','hyundai','infiniti','jaguar','jeep','kia','landrover','lexus','lincoln','maserati','mazda','mercedes-benz','mercury','mini','mitsubishi','nissan','oldsmobile','pontiac','porsche','ram','saturn','scion','subaru','suzuki','tesla','toyota','volkswagen','volvo'],
	style: ['2-door-mid-size-passenger-car','full-size-car','full-size-van','large-crossover-suv','large-luxury-crossover-suv','luxury-car','mid-size-car','minivan','pickup','small-car','small-crossover-suv','small-luxury-crossover-suv','sporty-car','two-seater-passenger-car']
}

const filterMap = ['color', 'make', 'style'];

function randomizeFilters() {
	let testFilters = {};
	const chosenFilters = [Math.random()<.5, Math.random()<.5, Math.random()<.5];
	chosenFilters.forEach((filter, i) => {
		if(filter) {
			let filterValue = filters[filterMap[i]][Math.floor(Math.random()*filters[filterMap[i]].length)];
			testFilters[filterMap[i]] = filterValue;
		}
	})
	return testFilters;
}

function generateTestCases(num) {
	let testCases = [];
	for(let i=0; i<num; i++) {
		testCases.push({
			filters: randomizeFilters()
		});
	}
	return testCases;
}

module.exports = {
	generateTestCases: generateTestCases
}