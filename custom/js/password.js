var app = angular.module("ntb-app1", []);

var baseUrl = baseUrl('http://localhost:8000/');

app.controller("passwordReset", function($scope, $filter, $http) {
    this.reset = { "email": '', "token": '', "password": '', "password_confirmation": '' };
    $scope.validate = false;
    $scope.doValidate = function() {
        $("#btnValidate").addClass("is-loading");
        $http({
            url: baseUrl + "api/password/email",
            method: "POST",
            data: this.reset,
            contentType: "application/json"
        }).then((result) => {
            $(".notification-hide")
                .removeClass("notification-hide")
                .addClass("notification-show-success");
            $("#btnValidate").removeClass("is-loading");
            $scope.notify = result.data.message;
            $scope.validate = true;
        }, function(error) {
            $(".notification-hide")
                .removeClass("notification-hide")
                .addClass("notification-show-error");
            $("#btnValidate").removeClass("is-loading");
            $scope.notify = error.data.message;
        });
    };
    $scope.doReset = function() {
        //this.reset = {"email":'', "password": '', "password_confirm": '', "token": '' };
        $("#btnReset").addClass("is-loading");
        $http({
            url: baseUrl + "api/password/reset",
            method: "POST",
            data: this.reset,
            contentType: "application/json"
        }).then((result) => {
            $(".notification-hide")
                .removeClass("notification-hide")
                .addClass("notification-show-success");
            $("#btnReset").removeClass("is-loading");
            $scope.notify = result.data.message;
            setTimeout("window.location.href = 'signin.php'", 2000);
        }, function(error) {
            $(".notification-hide")
                .removeClass("notification-hide")
                .addClass("notification-show-error");
            $("#btnReset").removeClass("is-loading");
            $scope.notify = error.data.message;
        });
    };
});