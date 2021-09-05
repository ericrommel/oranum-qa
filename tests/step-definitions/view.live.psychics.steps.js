const { I, ViewPsychicsPage } = inject();

Given("I access the main page", () => {
  ViewPsychicsPage.goto("main");
});

Then("I see the button {string}", () => {
  ViewPsychicsPage.seeButtonViewAllPsychics();
});

When("I click on {string}", (label) => {
  ViewPsychicsPage.clickOn(label);
});

Then("I am redirected to the {string}", (url) => {
  ViewPsychicsPage.redirectedTo(url);
});

// Tip: You can use an API request to retrieve all live psychics to validate if they have the live badge.
Then("I see a list of live psychics", () => {
  ViewPsychicsPage.getPsychicList();
});

Then("I do not see duplicate psychic", () => {});

Then("I can see that all psychics have profile picture, nickname", () => {});

Then("I can see that the live psychics have Live status badge", () => {});
