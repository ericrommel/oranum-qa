// const { setHeadlessWhen } = require('@codeceptjs/configure');
require("dotenv").config();

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
// setHeadlessWhen(process.env.HEADLESS);

const mainApi = "https://oranum.com";
const chromeArgs = [];
if (process.env.HEADLESS_MODE.toUpperCase() === "TRUE") {
  chromeArgs.push(
    "--headless",
    "--disable-dev-shm-usage",
    "--no-sandbox",
    "--window-size=1300,1000"
  );
} else {
  chromeArgs.push("--window-size=1300,1000");
}

let pauseOnFail = false;
const _pauseOnFail = process.env.PAUSE_ON_FAIL;
if (_pauseOnFail && _pauseOnFail.toUpperCase() === "TRUE") {
  pauseOnFail = true;
}

const config = {
  output: "./output",
  helpers: {
    WebDriver: {
      url: mainApi,
      browser: "chrome",
      desiredCapabilities: {
        chromeOptions: {
          args: chromeArgs,
        },
      },
      windowSize: "maximize",
      waitForTimeout: 120000,
      smartWait: 5000,
      // change to false to not restart browser between tests
      restart: true,
      // // don't change browser state and not clear cookies between tests
      // keepBrowserState: true,
      // keepCookies: true,
      timeouts: {
        script: 60000,
        "page load": 60000,
      },
    },

    CustomHelper: {
      require: "./tests/helpers/custom.helper.js",
    },

    AssertWrapper: {
      require: "codeceptjs-assert",
    },

    ChaiAssert: {
      require: "codeceptjs-chai",
    },
    REST: {
      endpoint: "https://api-gateway.docleradn.com/v1",
      defaultHeaders: {
        refer: mainApi,
      },
    },
  },

  gherkin: {
    features: "./tests/features/*.feature",
    steps: ["./tests/step-definitions/view.live.psychics.steps.js"],
  },

  include: {
    ViewPsychicsPage: "./tests/pages/view.live.psychics.page.js",
  },

  bootstrap: null,
  mocha: {},
  name: "oranum-qa",

  plugins: {
    allure: { enabled: true },
    pauseOnFail: { enabled: pauseOnFail },
    screenshotOnFail: { enabled: true },
    wdio: { enabled: true, services: ["selenium-standalone", "devtools"] },
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
  },

  multiple: {
    basic: {
      browsers: ["firefox", "chrome"],
    },
  },

  rerun: {
    // Run tests multiple times to detect and fix flaky tests.
    // how many times all tests should pass
    minSuccess: 3,

    // how many times to try to rerun all tests
    maxReruns: 3,
  },
};

exports.config = config;
