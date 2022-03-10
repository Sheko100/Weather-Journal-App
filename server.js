// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 8000;
const server = app.listen(port, listening);
// Callback to debug
function listening()  {
console.log(`local server on port ${port}`)
}

// Initialize all route with a callback function
app.get("/all", getWeatherData);
// Callback function to complete GET '/all'
function getWeatherData(req, res) {
    res.send(projectData);
}
// Post Route
app.post("/all", function(request, response){
 projectData = {
    temperature: request.body.temperature,
    date: request.body.date,
    feeling: request.body.feeling
};
console.log(projectData);
});
  