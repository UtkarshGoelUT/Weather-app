const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=5aaca230b9ace8f704f50819dcb1fd7a`;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services')
        }
        else if (response.body.message) {
            callback(response.body.message);
        }
        else {
            callback(undefined, `The current temprature is ${response.body.main.temp} and weather will be ${response.body.weather[0].main}`);
        }
    });
}

module.exports = forecast;