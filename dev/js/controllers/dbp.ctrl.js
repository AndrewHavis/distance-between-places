'use strict';

// Import module
var app = angular.module('dbpApp');

app.controller('dbpCtrl', ['$scope', function($scope) {
    $scope.place1 = null;
    $scope.place2 = null;
    $scope.distance = 0;
    $scope.distanceConverted = 0;
    $scope.latLong = [];
    $scope.debug = false; // Set this to true to show the returned JSON from Google Places
    
    // Measurements to show in drop-down menu, with divisors from the original measurement in metres
    $scope.measurements = {
        availableOptions: [
            {divisor: 1000, name: 'kilometres'},
            {divisor: 1, name: 'metres'},
            {divisor: 1609.3, name: 'miles'}
        ],
        selectedOption: {divisor: 1609.3, name: 'miles'}
    };
    
    console.log($scope);
    
    // Calculate the distance between our two places
    $scope.calculateDistance = function () {
        if ($scope.place1 !== null) {
            $scope.latLong[0] = new google.maps.LatLng($scope.place1.geometry.location.lat(), $scope.place1.geometry.location.lng());
        }
        if ($scope.place2 !== null) {
            $scope.latLong[1] = new google.maps.LatLng($scope.place2.geometry.location.lat(), $scope.place2.geometry.location.lng());
        }
        if ($scope.place1 !== null && $scope.place2 !== null) {        
            // Now get the two sets of coordinates and calculate the distance between them using Google Maps' geometry library
            $scope.distance = google.maps.geometry.spherical.computeDistanceBetween($scope.latLong[0], $scope.latLong[1]);
            $scope.distanceConverted = $scope.distance / $scope.measurements.selectedOption.divisor;
        }
    };
    
    // Measurement conversions (without the potential API overhead)
    $scope.convert = function() {
        $scope.distanceConverted = $scope.distance / $scope.measurements.selectedOption.divisor;
    };
}]);
