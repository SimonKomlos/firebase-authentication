'use strict';

angular.module('myApp.view3', ['ngRoute', 'firebase'])

.run(["$rootScope", "$location", function($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/");
        }
    });
}])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'view3/dashboard.html',
        controller: 'DashboardCtrl',
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $stateChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
    });
}])


.controller('DashboardCtrl', ['$scope', '$timeout', '$firebaseAuth', 'currentAuth', 'Auth', function($scope, $timeout, $firebaseAuth, $location, currentAuth, Auth) {

    $scope.userInfo = currentAuth.$getAuth();
    if (currentAuth) {
        console.log($scope.loggedIn);
        $timeout(function() {
            firebase.database().ref('/users/' + currentAuth.$getAuth().uid).once('value').then(function(snapshot) {
                $scope.checkValue = snapshot.val().checkbox;
                console.log(snapshot.val())
            });
        },1000);
    } else {
        console.log("Not logged in");
    }
    console.log(currentAuth.$getAuth());

    $scope.logUserOut = function() {
        currentAuth.updateProfile({
            refreshToken: null
        }).then(function() {
            console.log(refreshToken)
        }, function(error) {
            console.log(error)
        });
    };

    $scope.saveSettings = function() {
        $scope.updateCheckbox($scope.checkValue);
        console.log("Settings Saved")
    };

    $scope.updateCheckbox = function(value) {
        firebase.database().ref('users/' + currentAuth.$getAuth().uid).update({
            checkbox: value
        });
    }

}]);
