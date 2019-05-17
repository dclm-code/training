var app = angular.module("ntb-app", ['ngRoute']);

var baseUrl = baseUrl('http://localhost:8000/');

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.php',
            controller: 'memberHomeController'
        })

    .when('/profpix', {
        templateUrl: 'pages/profile_pix.php',
        controller: 'profpixController'
    })

    .when('/profile_update', {
        templateUrl: 'pages/profile.php',
        controller: 'profileController'
    })

    .when('/acct_bal', {
        templateUrl: 'pages/accountbal.php',
        controller: 'acctbalController'
    })

    .when('/stat_acct', {
        templateUrl: 'pages/statement.php',
        controller: 'acctStatController'
    })
});

app.controller('memberHomeController', function($scope, $filter, $http) {
    this.user = local_store({}, "user", "get");
    $scope.pkg_bought = 2;
    $scope.amt_earned = 31556.78;
    $scope.amt_wdrawn = 15000.00
    $scope.amt_balance = $scope.amt_earned - $scope.amt_wdrawn;
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
    $scope.showname = function(id) {
        let file = document.getElementById(id); //$("#" + id);
        //console.log(filex.files[0]);
        if (file.files.length > 0) {
            document.getElementById('filename').innerHTML = file.files[0].name;
        }
    };
});

app.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});

app.service('fileUpload', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('dest', uploadUrl);
        fd.append('filename', local_store({}, "user", "get")['user_name']);

        $http({
            method: "POST",
            url: "../upload.php",
            data: fd,
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then((result) => {
            console.log(result.data);
        }, function(error) {
            console.log(error);
        });
    }
});
app.controller('profpixController', function($scope, fileUpload) {
    $scope.uploadFile = function() {

        var file = $scope.pixUpload;
        var uploadUrl = "images/profile/";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
});

app.controller('profileController', function($scope, $filter, $http) {
    $scope.user = local_store({}, "user", "get");

    // Be aware that the month argument is zero-based (January = 0)
    var date1 = new Date($scope.user.created_at);
    var date2 = new Date();
    $scope.membersince = JSON.stringify(date_interval(date1, date2));
});

app.controller('acctbalController', function($scope, $filter, $http) {
    this.user = local_store({}, "user", "get");
    this.accountno = this.user.acct_id;
    //console.log(this.user.api_token);
    $http({
        url: baseUrl + "api/account_balance/" + this.accountno,
        method: "GET",
        headers: {
            Authorization: `Bearer ${this.user.api_token}`
        },
        contentType: "application/json"
    }).then((result) => {
        $scope.balance = result.data;
    }, function(error) {
        $scope.notify = error.data.message;
    });
});

app.controller('acctStatController', function($scope, $http) {
    $scope.report_header = ['SN', 'TRANSACTION DATE', 'NARATION','VALUE DATE', 'AMOUNT'];
    $scope.statement = [
        { "tdate": '2019-01-03', "naration": 'Account activation','vdate':'2019-01-03', "amount": '50000', "type": 'debit' },
        { "tdate": '2019-01-03', "naration": 'Extra Bucket Purchase','vdate':'2019-02-03', "amount": '50000', "type": 'debit' },
        { "tdate": '2019-01-10', "naration": 'Level matching bonus','vdate':'2019-01-10', "amount": '5000', "type": 'credit' }
    ];
    $scope.sum_up = function() {
        var tot = 0;
        var amt = 0;
        for (var i = 0; i < $scope.statement.length; i++) {
            if ($scope.statement[i].type == "debit") {
                amt = -1 * $scope.statement[i].amount;
            } else {
                amt = +1 * $scope.statement[i].amount;
            }
            tot += amt;
        }
        return tot;
    }
});
