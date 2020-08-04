const request = require('request');

const geocode = (location, callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoidWdvZWw5MTEiLCJhIjoiY2tkZXJkMThtMG95azJ4bnJib295ZzE3aCJ9.cIGO96-xosW6SbsVeSYMqQ`;

    request({ url: geoURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services');
        }
        else if (response.body.message) {
            callback(response.body.message);
        }
        else if (response.body.features.length === 0) {
            callback('No such location found');
        }
        else {
            const [longitude, latitude] = response.body.features[0].center;
            const location = response.body.features[0].place_name;
            callback(undefined,
                {
                    latitude,
                    longitude,
                    location
                });
        }
    });
}

module.exports = geocode;