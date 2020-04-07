Required installed software for working on this project:
    1. Docker
    2. Docker-compose
    3. Code editor (VS Code is good enough because of the available extensions it has)
    4. Npm along with Node.js (https://www.npmjs.com/get-npm) this project is using node version ^12.*.*

To run the project for the first time:
    1. Get in "theam_crm_api" folder and run "npm install" in terminal/console.
    2. Run in terminal/console "docker-compose up"

To set env variables using VS code terminal in windows write powershell commands like '$env:VARIABLE_NAME=VARIABLE_VALUE'

--------morgan is used to log each of the requests made to our endpoint, can be logged to a file

--------mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

--------