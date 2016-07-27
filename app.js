'use strict';

// Import Express
var express = require('express');
var app = express();

// Import Google Places functions
var googlePlaces = require(__dirname + '/server/google-places');

app.get('/', function(req, res) {
   googlePlaces.placeSearch('Pub', function(err, res) {
       if (!!err) {
           res.send(err);
       }
       else {
           res.json(res);
       }
   });
});

// start server on the specified port and binding host
app.listen(8585, '0.0.0.0', function() {
    console.log('Web server started on http://localhost:8585');
});
