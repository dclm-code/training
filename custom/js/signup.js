var app = angular.module("ntb-app", []);

var baseUrl = baseUrl('http://localhost:8000/');

app.controller('signUp', function($scope, $filter, $http) {
    this.save = true;
    this.signup = {
        "user_name": '',
        "first_name": '',
        "middle_name": '',
        "last_name": '',
        "telephone_numbers": '',
        "email": '',
        "password": '',
        "password_confirmation": '',
        "location_id": '',
        "role": '',
        "refferer": ''
    };
    $scope.validatesponsor = function() {
        $("#txtsponsorid").removeClass("is-danger");
        $http({
            url: baseUrl + "api/valid_sponsor/" + this.signup.refferer,
            method: "GET",
            contentType: 'application/json'
        }).then((result) => {
            $scope.validsponsor = result.data.status;
            if ($scope.validsponsor == false) {
                $("#txtsponsorid").addClass("is-danger");
                this.save = false;
            }
        }, function(error) {
            $scope.validsponsor = false;
            $("#txtsponsorid").addClass("is-danger");
            this.save = false;
        });
    };
    $scope.validateuserid = function() {
        $("#username").removeClass("is-danger");
        $http({
            url: baseUrl + "api/valid_user_id/" + this.signup.user_name,
            method: "GET",
            contentType: 'application/json'
        }).then((result) => {
            $scope.validuserid = result.data.status;
            if ($scope.validuserid == false) {
                $("#username").addClass("is-danger");
                this.save = false;
            }
        }, function(error) {
            $scope.validuserid = false;
            $("#username").addClass("is-danger");
            this.save = false;
        });
    };
    $scope.dsignup = function() {
        if (this.save == false) {
            $scope.notify = "Please correct the indicated errors to continue.";
            $(".notification-hide")
                .removeClass("notification-hide")
                .addClass("notification-show-error");
        } else {
            console.log(this.signup);
            $("#btnSignUp").addClass("is-loading");
            $http({
                url: baseUrl + "api/register",
                method: "POST",
                data: this.signup,
                contentType: 'application/json'
            }).then((result) => {
                $(".notification-hide")
                    .removeClass("notification-hide")
                    .addClass("notification-show-success");
                $("#btnSignUp").removeClass("is-loading");
                $scope.notify = "User account created successfully! check your mail for confirmation.";
                setTimeout("window.location.href = 'signin.php'", 3000);
            }, function(error) {
                console.log(error.data)
                $(".notification-hide")
                    .removeClass("notification-hide")
                    .addClass("notification-show-error");
                $("#btnSignUp").removeClass("is-loading");
                $scope.notify = error.data.message;
            });
        }
        console.log($scope.notify);
    };
    $scope.enable_submit = function(e) {
        if ($("#" + e).is(':checked') == true) {
            $("#btnSignUp").removeClass("button-disabled");
            $("#btnSignUp").addClass("is-success");
        } else {
            $("#btnSignUp").addClass("button-disabled");
            $("#btnSignUp").removeClass("is-success");
        }
    };

    $scope.locations = function() {
        $("#location_id").addClass("is-loading");
        $http({
            url: baseUrl + "api/locations",
            method: "GET",
            contentType: 'application/json'
        }).then((result) => {
            $scope.locations = result.data;
            //console.log($scope.locations);
        }, function(error) {
            console.log(error);
        });
        $("#location_id").removeClass("is-loading");
    }

});