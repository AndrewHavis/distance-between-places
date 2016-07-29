'use strict';

// Import Google Places node library
const GooglePlaces = require('node-googleplaces');
const googlePlaces = new GooglePlaces(process.env.GOOGLE_PLACES_API_KEY);

module.exports.placeSearch = function(query, callback) {
    const parameters = {
        query: query,
        language: 'en-GB'
    };
    googlePlaces.textSearch(parameters, function(error, response) {
        if (!!error) {
            return callback(new Error('An error occurred when searching for ' + query), null);
        }
        else {
            return callback(null, response);
        }
    });
};
