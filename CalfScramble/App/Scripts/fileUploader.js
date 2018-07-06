
(function () {
    "use strict";

    var fileApp = angular.module("fileUploader", []);

    fileApp.factory("FileUploaderService", ["$q", "$http",
                function ($q, $http) {

                    var getModelAsFormData = function (data) {
                        var dataAsFormData = new FormData();

                        angular.forEach(data, function (value, key) {
                            dataAsFormData.append(key, value);
                        });

                        return dataAsFormData;
                    };

                    var saveModel = function (data, apiUrl) {
                        var deferred = $q.defer();

                        $http({
                            url: apiUrl,
                            method: "POST",
                            data: getModelAsFormData(data),
                            transformRequest: angular.indentity,
                            headers: { 'Content-Type': undefined }
                        })
                            .then(function (result) {
                                deferred.resolve(result);
                            },
                            function (result) {
                                deferred.reject(result);
                            });
                        return deferred.promise;
                    };

                    return {
                        saveModel: saveModel
                    }
            }])
        .directive("fileModel", ["$parse",
            function ($parse) {
                return {
                    restrict: "A",
                    link: function (scope, element, attrs) {
                        var model = $parse(attrs.fileModel);
                        var modelSetter = mode.assign;

                        element.bind("change", function () {
                            scope.$apply(function () {
                                modelSetter(scope, element[0].files[0]);
                            });
                        });
                    }
                }
            }
        ]);

}(window, document));


            //var getVwJudgeScoreRank = function (Category, Finalist) {
            //    var deferred = $q.defer();
            //    $http.get(rptUrl + "GetJudgeResultRank", { params: { category: Category, finalist: Finalist } })
            //        .then(function (result) {
            //            deferred.resolve(result);
            //        },
            //        function (result) {
            //            deferred.reject(result);
            //        });
            //    return deferred.promise;
            //}

            //var populateContestResultRank = function (Category, User) {
            //    var deferred = $q.defer();
            //    $http.post(baseUrl + "PopulateContestResult?category=" + Category + "&user=" + User)
            //        .then(function (result) {
            //            deferred.resolve(result);
            //        },
            //        function (result) {
            //            deferred.reject(result);
            //        });
            //    return deferred.promise;
            //}
