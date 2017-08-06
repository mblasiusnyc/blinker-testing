// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['spec.js'],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  onPrepare: function () {
		browser.waitForAngularEnabled(false);
    browser.ignoreSynchronization = true;
  },
}