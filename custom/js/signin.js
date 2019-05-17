var app = angular.module("ntb-app", []);

var baseUrl = baseUrl('http://localhost:8000/');

app.controller("signIn", function($scope, $filter, $http) {
    this.signin = { "email": '', "password": '' };
    $scope.dsignin = function() {
        $("#btnSignIn").addClass("is-loading");
        $http({
            url: baseUrl + "api/login",
            method: "POST",
            data: this.signin,
            contentType: "application/json"
        }).then((result) => {
            //write result.data to persistent storage
            local_store(result.data.data, "user", "add");
            //redirect to dashboard
            if (result.data.data.role !== "member") {
                setTimeout("window.location.href = 'dashboard/'", 2000);
            } else {
                setTimeout("window.location.href = 'members/'", 2000);
            }

        }, function(error) {
            $(".notification-hide")
                .removeClass("notification-hide")
                .addClass("notification-show-error");
            $("#btnSignIn").removeClass("is-loading");
            $scope.notify = error.data.message;
        });
    };
});