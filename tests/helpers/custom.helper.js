const Helper = codeceptHelper;

class CustomHelper extends Helper {
  // Save current Browser logs
  saveBrowserLogs() {
    const browser = this.helpers.WebDriver.browser;

    function printLogs(logType) {
      _.forEach(browser.getLogs(logType), function (log) {
        browser.testableLogInfo(
          `[${logType} log] [${log.level}] ${log.message}`
        );
      });
    }

    printLogs("browser");
  }

  async getCookies() {
    const cookie = await I.grabCookie();
    console.log(cookie);
  }

  // method which restarts browser
  async restartBrowser() {
    const browser = this.helpers.WebDriver.browser;
    await browser.reloadSession();
    await browser.maximizeWindow();
  }

  // Method which goes to previous page
  async backToPreviousPage() {
    const browser = this.helpers.WebDriver.browser;
    await browser.back();
  }
}

module.exports = CustomHelper;
