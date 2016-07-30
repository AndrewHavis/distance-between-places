'use strict';

// Import module
var app = angular.module('dbpApp');

app.controller('dbpCtrl', ['$scope', function($scope) {
    $scope.place1 = null;
    $scope.place2 = null;
    $scope.distance = 0;
    $scope.latLong = [];
    $scope.debug = false; // Set this to true to show the returned JSON from Google Places
    
    console.log($scope);
    
    // Get the latitude and longitude of our two places
    $scope.calculateDistance = function () {
        if ($scope.place1 !== null) {
            console.log($scope.place1);
            $scope.latLong[0] = new google.maps.LatLng($scope.place1.geometry.location.lat(), $scope.place1.geometry.location.lng());
        }
        if ($scope.place2 !== null) {
            console.log($scope.place2);
            $scope.latLong[1] = new google.maps.LatLng($scope.place2.geometry.location.lat(), $scope.place1.geometry.location.lng());
        }
        if ($scope.place1 !== null && $scope.place2 !== null) {        
            // Now get the two sets of coordinates and calculate the distance between them using Google Maps' geometry library
            $scope.distance = google.maps.geometry.spherical.computeDistanceBetween($scope.latLong[0], $scope.latLong[1]);
        }
    };
}]);
