'use strict';

// Import Google Places node library
var GooglePlaces = require('googleplaces');
var googlePlaces = new GooglePlaces(process.env.GOOGLE_PLACES_API_KEY, 'json');

module.exports.placeSearch = function(query, callback) {
    var parameters = {
        location: [51.50687, -0.111977],
        name: query
    };
    googlePlaces.placeSearch(parameters, function(error, response) {
        if (!!error) {
            return callback(new Error('An error occurred when searching for ' + query), null);
        }
        else {
            console.log(response.results);
            return callback(null, response.results);
        }
    });
};
