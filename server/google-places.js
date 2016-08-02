'use strict';

// Import Google Places and Google Maps node libraries
const GooglePlaces = require('node-googleplaces');
const googlePlaces = new GooglePlaces(process.env.GOOGLE_PLACES_API_KEY);
const GoogleMaps = require('googlemaps');
const googleMaps = new GoogleMaps({
	key: process.env.GOOGLE_PLACES_API_KEY
});

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

module.exports.reverseGeocode = function(latitude, longitude, callback) {
	// Set a default value of Charing Cross in London (the official centre of the city)
	if (latitude === null && longitude === null) {
		latitude = 51.5073125,
		longitude = -0.1297387
	}
	
	// Concatenate latitude and longitude
	const strLatLong = latitude + ',' + longitude;
	
	// Build our parameters object
	const parameters = {
		'latlng': strLatLong
	};
	
	// Now send the coordinates to the reverse geocoder
	googleMaps.reverseGeocode(parameters, function(err, res) {
		if (!!err) {
			return callback(err);
		}
		else {
			return callback(null, res);
		}
	});
};
