# blinker-testing
Automated tests for Blinker App

## Setup
1. Clone this repo by running 'git clone https://github.com/mblasiusnyc/blinker-testing.git'
2. Run 'npm install'


## Running the tests
### API Tests
The API tests test the listings API at https://api.blinker.com/api/v3/listings/ by comparing random search parameters to the results they return from the API. The implementation is incomplete and does not currently test location based search parameters but the existing framework allows for this feature to be written later. Note that the 'defaultCases' variable in web_api.test.js will determine the amount of randomly-generated test cases to be run. 

To run the API tests, run the following command from the project root: 
> npm run-script test-api

### Web e2e Tests
Currently, the web e2e tests only cover https://www.blinker.com/.

To run the Web e2e's, run the following command from the project root: 
> npm run-script test-web
