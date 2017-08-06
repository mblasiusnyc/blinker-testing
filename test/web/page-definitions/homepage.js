class Homepage {
	constructor() {
		// page elements
		// this.navBar = $$('*');
		this.playVideoButton = $$('.play_button');
		this.signUpEmailInput = $$('input[name="EMAIL"]');
		this.signUpStateInput = $$('input[name="STATE"]');
		this.signUpSubmitButton = $$('input[value="SIGN UP"]');

		// App Download Link
		this.downloadTodayButton = $$('.download-sms').first();
		this.phoneInput = $$('#phone').first();
		this.sendLinkButton = $$('input[value="Send"]').first();
		this.linkSentConfirmationMsg = $$('.wpb_wrapper h2').last();

		this.signUpSuccessMsg = $$('.mc4wp-success p').first();
	}

	get() {
    return browser.driver.get('https://www.blinker.com/');
  };

	isLoaded() {
		let EC = protractor.ExpectedConditions;

		return EC.and(
			EC.visibilityOf(this.playVideoButton),
			EC.visibilityOf(this.signUpEmailInput),
			EC.visibilityOf(this.signUpStateInput),
			EC.visibilityOf(this.downloadTodayButton)
		);
	}

	submitNotificationForm(data) {
		this.signUpEmailInput.sendKeys(data.email);
		this.signUpStateInput.sendKeys(data.state);
		this.signUpSubmitButton.click();
	}
}

module.exports = new Homepage();