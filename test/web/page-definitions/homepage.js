class Homepage {
	constructor() {
		// Intro Video
		this.playVideoButton = $$('.play_button').first();
		this.introVideo = $$('video[src="blob:https://www.youtube.com/1894a63e-9a20-49a2-bbd3-725cdca41a66"]');

		// Sign up for updates
		this.signUpEmailInput = $$('input[name="EMAIL"]');
		this.signUpStateInput = $$('input[name="STATE"]');
		this.signUpSubmitButton = $$('input[value="SIGN UP"]');
		this.signUpSuccessMsg = $$('.mc4wp-success p').first();

		// App Download Link
		this.downloadTodayButton = $$('.download-sms').first();
		this.phoneInput = $$('#phone').first();
		this.sendLinkButton = $$('input[value="Send"]').first();
		this.linkSentConfirmationMsg = $$('.wpb_wrapper h2').last();
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