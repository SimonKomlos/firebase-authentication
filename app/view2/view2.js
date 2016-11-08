'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'view2/view2.html',
        controller: 'RegisterCtrl',
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

.controller('RegisterCtrl', ['$scope', '$firebaseAuth', 'currentAuth', '$location', function($scope, $firebaseAuth, currentAuth, $location) {

    $scope.userRegister = function() {
        var firstName = $scope.user.firstName;
        var user = $scope.user.email;
        var pass = $scope.user.password;
        var auth = $firebaseAuth();

        auth.$createUserWithEmailAndPassword(user, pass).then(function(response) {
            // console.log(response);
            response.updateProfile({
                displayName: firstName
            }).then(function() {
                console.log(response)
            }, function(error) {
            	console.log(error)
            });
        }).catch(function(error) {
            console.log(error);
        });
    }

}]);
