'use strict';

// Import environment variables
require('dotenv').config();

// Import Express
const express = require('express');
const app = express();

// Import Google Places functions
const googlePlaces = require(__dirname + '/server/google-places');

// Serve anything in the public directory as our main files
app.use('/', express.static(__dirname + '/public'));

// Serve Bower libraries from /lib
app.use('/lib', express.static(__dirname + '/bower_components'));

// API routing
app.get('/api/place-search/:placeQuery', function(req, res) {
   googlePlaces.placeSearch(req.params.placeQuery, function(err, response) {
       if (!!err) {
           res.send(err);
       }
       else {
           res.json(response);
       }
   });
});

// start server on the specified port and binding host
app.listen(8585, '0.0.0.0', function() {
    console.log('Web server started on http://localhost:8585');
});
