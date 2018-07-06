

(function (app) {
    "use strict";

    var app = angular.module("calfScramble");

    app.constant("homeUrl", "/CalfScramble/Home/");

    var MainController = function ($scope, globalServices, homeUrl) {

        $scope.scramblerLogIn = {};
        $scope.globalInfo = {};

        //alert("Main Controller routeUrl");


        $scope.scramblerLogIn.customerName = "John Doe";
        $scope.scramblerLogIn.customerNumber = "12345";
        $scope.scramblerLogIn.customerID = 99999;


        console.log($scope.scramblerLogIn);

    };


    MainController.$inject = ["$scope", "globalServices", "homeUrl"];



    app.controller("MainController", MainController);

}());
