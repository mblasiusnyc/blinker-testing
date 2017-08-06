// spec.js
const Homepage = require('./page-definitions/homepage');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
chai.should();

function generateTestEmail() {
	return Math.random().toString(36).replace(/[^a-z]+/g, '')+"@blinkerqa.com"
}

describe('Blinker Home Page', function() {
	beforeEach(function() {
	})

  it('should submit the form correctly', function(done) {
  	let EC = protractor.ExpectedConditions
  	browser.get('https://www.blinker.com/');
  	$$('input[name="EMAIL"]').sendKeys(generateTestEmail());
  	$$('input[name="STATE"]').sendKeys('CO');
  	$$('input[value="SIGN UP"]').click();
  	browser.sleep(3000);
  	$$('.mc4wp-success p').first().getText().should.eventually.equal('Thanks! Please check your email inbox to confirm.')
		done();
  });

  // it('should be able to submit the notification form', function() {
		// homepage.submitForm({
		// 	email: 'mblasiusnyc@gmail.com',
		// 	state: 'CO'
		// });
		// expect(Homepage.signUpSuccessMsg.getText()).to.equal('Thanks! Please check your email inbox to confirm.');
  // })
});