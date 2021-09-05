Feature: View all live psychics

Scenario: Access the main page
  Given I access the main page
  Then I see the button "view all live psychics"
  When I click on "view all live psychics"
  Then I am redirected to the "search page"
  And I see a list of live psychics
  And I do not see duplicate psychic
  And I can see that all psychics have profile picture, nickname
  And I can see that the live psychics have Live status badge
