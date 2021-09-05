# QA Case Study

###### source: Docler Holding

Cover the below requirements with automated tests. Please use JavaScript, BDD and CodeceptJS to implement the test cases. You should also make sure your tests can be executed on a Dockerized environment, a Makefile is also nice to have, but not mandatory. Upload your code to a git repository and write a README.md file with details of how to execute the test cases. Please also use some reporting tool, such as allure.

##### Website: www.oranum.com

## Project Requirements

1. "View all live psychics" button is displayed on the home page. Clicking on the button should redirect the user to the search page and display all live psychics. No duplicate psychic should be displayed and all of them should have a profile picture, nickname and the ones that are live should have a 'Live' status badge. Tip: You can use an API request to retrieve all live psychics to validate if they have the live badge.

2. Searching for partial text should display only matching psychics. Example:

- Search for 'Matt', all results should contain 'matt'
- Search for 'Myst', all results should contain 'myst'
- Search for 'Ann', all results should contain 'ann'
- Search for 'psy', all results should contain 'psy'

3. Searching for full text should show a specific psychic profile. Example:

- Search for 'MattWarren', MattWarren's profile should be displayed
- Search for 'MysticMilena', MysticMilena's profile should be displayed
- Search for 'EternalFlame', EternalFlame's profile should be displayed

4. Open the livestream of any psychic, make sure the psychic is live (https://oranum.com/en/chat/LovePsychyicAnie this page, for example). Validate that the following buttons will trigger a 'Sign up' overlay to be displayed:

- Get Credits button
- Add to favorites button
- Surprise buttons
- Start Session button
- Get coins button

5. On the home page, selecting different topics should display only matching psychics. Topics to validate:

- Clicking on Love shows matching content, no duplicate content is displayed
- Clicking on Clairvoyant shows matching content, no duplicate content is displayed
- Clicking on Tarot shows matching content, no duplicate content is displayed
- Clicking on Astrology shows matching content, no duplicate content is displayed
- Clicking on Dreams shows matching content, no duplicate content is displayed
- Clicking on Guides shows matching content, no duplicate content is displayed
- Clicking on Family shows matching content, no duplicate content is displayed
- Clicking on Career shows matching content, no duplicate content is displayed
- Clicking on Fortune Teller shows matching content, no duplicate content is displayed
- Clicking on Numerology shows matching content, no duplicate content is displayed
- Clicking on Sounds Baths shows matching content, no duplicate content is displayed
- Clicking on Pet Psychic shows matching content, no duplicate content is displayed

## Technical Requirements

These are the main tech requirement. The complete list is in requirements.txt.

- [CodeceptJS](https://codecept.io/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/)
- [Node.js](https://nodejs.org/en/)

These are optional:

- [Docker](https://www.docker.com/)

### Installing

The default Git version is the master branch. ::

    # clone the repository
    $ cd desired/path/
    $ git clone git@github.com:ericrommel/oranum-qa.git

The next step is install and build the project's dependencies. Just like _Git_ if you still don't have Node.JS, go to the [official site](https://nodejs.org/en/) and get it done.

    $ cd path/to/oranum-qa
    $ npm build

### Start Container

Docker and docker-compose should be installed first. [Tutorial here](https://docs.docker.com/install/).
At the repo root run:
$ docker-compose up --build

### Run

If you want to run without docker, configure the application manually. This will require you to define a few variables and create the database.

Note: The pipenv virtual environment should be done.

Set the environment variables::

    $ export FLASK_APP=backend/run
    $ export FLASK_ENV=development
    $ export FLASK_CONFIG=development

Or on Windows cmd:: > set FLASK_APP=src > set FLASK_ENV=development > set FLASK_CONFIG=development

Create the database::

    $ flask db init
    $ flask db migrate
    $ flask db upgrade

Run the application::

    $ flask run

Open http://127.0.0.1:5000 in a browser.

Note: An _ADMIN_ user should be add first. After that, you can add questions. Check the next section for more details.

### Tests

In order to support the manual and automated tests, two requests were create to help using [Postman](https://www.postman.com/).
Feel free to use any other tool for API testing.

1. Add admin user # It will add a user that can add questions
2. Add questions in bulk # It will populate the database with questions

From Postman::

- Import the collection file: postman/
- Import the environment file: postman/

Note: You can see the sample file to add questions in the [static folder](https://github.com/ericrommel/quizz-app/blob/master/backend/src/static/sample_questions.xlsx). This template should be used to add questions by this request.

From Python code tests (unit tests)::

    $ pytest

Run with coverage report::

    $ coverage run -m pytest
    $ coverage report
    $ coverage html  # open htmlcov/index.html in a browser

### Kubernetes (K8s)

The project is running on Google Cloud after k8s settings. You can check the project on the Internet accessing the link
below in your browser:

    http://35.205.34.26/

The file quizz-app.yml contains the settings used.

## About

This project is part of [Exponential Ventures'](http://www.exponentialventures.com) challenge for their Full-Stack
hire process sent in November 2020. The whole project includes to create the front-end part using React.

## Author

- [Eric Dantas](https://github.com/ericrommel)

## License

This project is licensed under the GNU License - see the [License](./LICENSE) file for details.
