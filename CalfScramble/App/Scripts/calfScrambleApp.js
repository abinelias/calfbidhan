
(function () {
    "use strict";

    var app = angular.module("calfScramble", ["ngRoute","ngAnimate"]);

    //app.constant("routeUrl", "/CalfScramble/App/");   
    app.constant("routeUrl", "/App/");  

    var config = function ($routeProvider, $locationProvider, routeUrl) {

        $routeProvider
            .when("/", {
                templateUrl: routeUrl + "Home/Templates/home.html",
                controller: "HomeController",
                controllerAs: 'home'
            })
            .when("/expense", {
                templateUrl: routeUrl + "MonthlyExpense/Templates/monthlyExpense.html",
                controller: "ExpenseController"
            })
            .when("/correspondence", {
                templateUrl: routeUrl + "Correspondence/Templates/correspondence.html",
                controller: "CorrespondenceController"
            })
            .when("/essays", {
                templateUrl: routeUrl + "Essays/Templates/essays.html",
                controller: "EssayController"
            })
            .when("/summary", {
                templateUrl: routeUrl + "Summary/Templates/summary.html",
                controller: "SummaryController"
            })
            .when("/impersonation", {
                templateUrl: "impersonation.html",
                controller: "ImpersonationController"
            })
            .when("/assignment", {
                templateUrl: routeUrl + "Assignment/Templates/assignment.html",
                controller: "AssignmentController"
            })
            .otherwise({
                redirectTo: "/"
            });


        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode(true);
        }
        else {
            window.location.hash = '/'  // IE 9 FIX     
            $locationProvider.html5Mode(false);
            //$locationProvider.html5Mode(false).hashPrefix('*');
        }
    };

    config.$inject = ["$routeProvider", "$locationProvider","routeUrl"];

    app.config(config);


}());



//$routeProvider
//    .when("/", {
//        templateUrl: routeUrl + "Home/Templates/home.html",
//        controller: "HomeController"
//    })
//    .when("/expense", {
//        templateUrl: "/CalfScramble/App/MonthlyExpense/Templates/monthlyExpense.html",
//        controller: "ExpenseController"
//    })
//    .when("/correspondence", {
//        templateUrl: "/CalfScramble/App/Correspondence/Templates/correspondence.html",
//        controller: "CorrespondenceController"
//    })
//    .when("/essays", {
//        templateUrl: "/CalfScramble/App/Essays/Templates/essays.html",
//        controller: "EssayController"
//    })
//    .when("/summary", {
//        templateUrl: "/CalfScramble/App/Summary/Templates/summary.html",
//        controller: "SummaryController"
//    })
//    .when("/impersonation", {
//        templateUrl: "impersonation.html",
//        controller: "ImpersonationController"
//    })
//    .when("/assignment", {
//        templateUrl: "/CalfScramble/App/Assignment/Templates/assignment.html",
//        controller: "AssignmentController"
//    })
//    .otherwise({
//        redirectTo: "/"
//    });
