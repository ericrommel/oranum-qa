const assert = require("assert");

const I = actor();

const mainPage = "https://oranum.com/en/home";
const searchPage = "https://oranum.com/en/search/Live";
const urls = {
  main: mainPage,
  search: searchPage,
};
const homeLogo =
  '//*[@id="oranum-home-page"]/div[2]/div[1]/div[3]/header/div/div[2]/div/img';
const footer = '//*[@id="oranum-home-page"]/div[2]/div[1]/div[7]/div/footer';
const buttonViewAllPsychics = '//button[contains(., "view all live psychics")]';
const labelViewAllPsychics =
  "#oranum-home-page > div.react-root > div.sc-fxNMLY.eYIiku > div.sc-fnlXEO.qqExU > div > div:nth-child(2) > section > a > button";
const mainTitle =
  "Oranum – Free Online Psychic & Tarot Readings, 24/7 Live Video Chat";

module.exports = {
  goto(url) {
    I.amOnPage(urls[url]);
    I.seeElement(homeLogo);
    I.seeInTitle(mainTitle);
  },

  refresh() {
    I.refreshPage();
  },

  seeFooter() {
    I.scrollPageToBottom();
    I.seeElement(footer);
  },

  seeButtonViewAllPsychics() {
    // scrollTo() was not working fine. Pressing key arrow down worked fine, but should be a few times
    for (let step = 0; step < 10; step++) {
      I.pressKey(["ArrowDown"]);
      I.wait(0.2);
    }
    I.seeElement(buttonViewAllPsychics);
  },

  clearCookies() {
    I.clearCookie();
    I.executeScript(() => sessionStorage.clear());
  },

  clickOn(label) {
    I.click(label);
  },

  redirectedTo(url) {
    if (url === "search page") {
      I.seeInCurrentUrl(searchPage);
      I.wait(5);
    }
  },

  getPsychicList() {
    const endpoint = "/guest/magazine/tags";
    const queryString = {
      session: this.helpers.WebDriverIO.browser.session(),
      "criteria[0][field]": "visibility",
      "criteria[0][operator]": "IN",
      "criteria[0][value]": "oranum_search",
      showTestModels: 0,
    };

    const response = I.sendGetRequest(endpoint, queryString);
    console.log(response);
  },
};
