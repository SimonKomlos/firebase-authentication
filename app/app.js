'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3'
])

.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        return $firebaseAuth();
    }
])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }])
    .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$firebaseAuth', 'Auth', function($scope, $rootScope, $location, $firebaseAuth, Auth) {

        $scope.logUserOut = function() {
            firebase.auth().signOut().then(function() {
                console.log("signed out");
                $rootScope.$apply(function() {
                    $location.path("/");
                });
            }, function(error) {
                console.log(error);
            });
        };

    }]);
