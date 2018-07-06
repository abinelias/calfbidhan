

(function (app) {
    "use strict";
    var app = angular.module("calfScramble");

    var FileCommonServices = function (FileUploaderService) {

        var saveFile = function (dataModel, apiUrl) {
            return FileUploaderService.saveModel(dataModel, apiUrl);
        };

        return {
            saveFile: saveFile
        };
    };

    FileCommonServices.$inject = ["FileUploaderService"];

    app.factory("FileCommonServices", FileCommonServices);

}());