var app = angular.module('ntb-dash', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.php',
            controller: 'homeController'
        })

    .when('/profpix', {
        templateUrl: 'pages/profilepix.php',
        controller: 'tempController'
    })
});

app.controller('homeController', function($scope, $http) {
    this.user = local_store({}, "user", "get");
    $scope.logout = function() {
        $http({
            url: baseUrl + "api/logout",
            method: "POST",
            data: { "api_token": this.user.api_token },
            contentType: "application/json"
        }).then((result) => {
            alert(result.data.message);
            local_store({}, "user", "remove");
            setTimeout("window.location.href = '../'", 1000);
        }, function(error) {
            alert(error.data.message);
        });
    };
    $scope.user = this.user;
});

app.controller('tempController', function($scope, $http) {});