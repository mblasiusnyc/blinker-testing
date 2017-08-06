// spec.js
const Homepage = require('./page-definitions/homepage');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
chai.should();

const EC = protractor.ExpectedConditions;

function generateTestEmail() {
	return Math.random().toString(36).replace(/[^a-z]+/g, '')+"@blinkerqa.com"
}

function generateTestPhone() {
	return '303555'+ Math.floor(Math.random()*10000);
}

describe('Blinker Home Page', function() {
	beforeEach(function() {
  	Homepage.get();
  	browser.sleep(2000);
	})

	it('should allow users to watch the intro video', function(done) {
		Homepage.playVideoButton.click();
		EC.visibilityOf(Homepage.introVideo).should.eventually.be(true);
	})

  it('should submit the notification form correctly', function(done) {
  	Homepage.submitNotificationForm({
  		email: generateTestEmail(),
  		state: 'CO'
  	})
  	browser.wait(EC.visibilityOf(Homepage.signUpSuccessMsg), 5000);
  	Homepage.signUpSuccessMsg.getText().should.eventually.equal('Thanks! Please check your email inbox to confirm.')
		done();
  });

  it('should allow user to send themself a download link', function() {
  	browser.wait(EC.visibilityOf(Homepage.downloadTodayButton), 2000);
  	Homepage.downloadTodayButton.click();
  	browser.wait(EC.visibilityOf(Homepage.phoneInput), 5000);
  	Homepage.phoneInput.sendKeys(generateTestPhone());
  	Homepage.sendLinkButton.click();
  	browser.wait(EC.invisibilityOf(Homepage.phoneInput), 5000);
  	Homepage.linkSentConfirmationMsg.getText().should.eventually.equal('Download link sent!')
  });


});