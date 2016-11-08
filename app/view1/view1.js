'use strict';

angular.module('myApp.view1', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'view1/view1.html',
            controller: 'LoginCtrl',
            resolve: {
                // controller will not be loaded until $waitForSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $waitForSignIn returns a promise so the resolve waits for it to complete
                    return Auth.$waitForSignIn();
                }]
            }
        });
    }])
    .controller('LoginCtrl', ['$scope', '$firebaseAuth', 'currentAuth', 'Auth', '$location', function($scope, $firebaseAuth, currentAuth, Auth, $location) {

        if (currentAuth) {
            $location.path( "/dashboard" );
        } else {
            console.log($scope.loggedIn);
        }

        $scope.userLogin = function() {
            var user = $scope.user.email;
            var pass = $scope.user.password;

            Auth.$signInWithEmailAndPassword(user, pass).then(function(response) {
                $location.path( "/dashboard" );
            }).catch(function(error) {
                console.log(error);
            });
        }

    }]);
