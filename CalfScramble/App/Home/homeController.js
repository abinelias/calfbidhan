(function () {
    angular.module('calfScramble').controller('HomeController', HomeController);
    HomeController.$inject = ['$scope'];

    function HomeController($scope) {
        var vm = this;
        vm.scramblerDetails = "hii";
        
    }
})();


//(function (app) {
//    "use strict";
//    var app = angular.module("calfScramble");

//    var HomeController = function ($scope) {

//        //alert("Home Controller");

//    };

//    HomeController.$inject = ["$scope"];

//    app.controller("HomeController", HomeController);


//}());