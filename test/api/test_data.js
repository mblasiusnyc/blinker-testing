const filters = {
	color: ['beige','black','blue','brown','burgundy','charcoal','gold','gray','green','off White','orange','purple','red','silver','tan','turquoise','white','yellow'],
	make: ['acura','alfa-romeo','audi','bmw','buick','cadillac','chevrolet','chrysler','dodge','fiat','ford','gmc','honda','hummer','hyundai','infiniti','jaguar','jeep','kia','land-rover','lexus','lincoln','maserati','mazda','mercedes-benz','mercury','mini','mitsubishi','nissan','oldsmobile','pontiac','porsche','ram','saturn','scion','subaru','suzuki','tesla','toyota','volkswagen','volvo'],
	style: ['2-door-mid-size-passenger-car','full-size-car','full-size-van','large-crossover-suv','large-luxury-crossover-suv','luxury-car','mid-size-car','minivan','pickup','small-car','small-crossover-suv','small-luxury-crossover-suv','sporty-car','two-seater-passenger-car']
}

const searches = ['zipcode','distance','max_mileage','min_mileage','min_year','max_year','max_price','min_price'];
// TODO: Add these back when suitable searchFunctions can be added for each search
// these are being mocked for now
// 'latitude','longitude','isZipcodeValid','label_max_mileage','label_min_mileage','label_min_year','label_max_year','label_max_price','label_min_price'

const distances = [25,50,75,100,200,300,500];

module.exports = {
	filters: filters,
	searches: searches,
	distances: distances
}