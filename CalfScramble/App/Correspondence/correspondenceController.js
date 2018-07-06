

(function (app) {
    "use strict";

    var app = angular.module("calfScramble");


    app.constant("homeUrl","/CalfScramble/Home/")
    app.constant("docUrl", "/CalfScramble/DocumentAPI/");


    //var baseUrl = "/WCBBQScoring/Home/";//http://localhost:8080/WCBBQScoring/ContestReporting/Index
    //var judgeUrl = "/WCBBQScoring/ContestJudge/";

    var CorrespondenceController = function ($scope, homeUrl, docUrl ) {

        //var apiUrl = "";

        //var docObj = {
        //    DocumentID: "",
        //    HeaderID: "",
        //    Photo: "",
        //    PhotoFileType: "",
        //    PhotoFileName: "",
        //    Corresp: "",
        //    CorrespFileType: "",
        //    CorrespFileName: "",
        //    Comments: "",
        //    CreatedBy: ""
        //};

        //alert("Correspondence Controller");


        //WebInsToWinDocument(Int32 documentID, Int32 headerID, byte[] photo, string photoFileType, string photoFileName,
        //byte[] correspondence, string correspondenceFileType, string correspondenceFileName, string comments, Int32 createdBy


        //var docID = docApi.WebInsToWinDocument(0, 61130, null, ".JPG", "TestFileName", null, null, null, "Testing without Photo", 1812);
        //saveFile = function (dataModel, apiUrl)

        //$scope.saveFile = function (dataVM) {

        //    //docObj = {
        //    //    DocumentID: "",
        //    //    HeaderID: 61130,        //dataVM.HeaderID
        //    //    Photo: "",              //dataVM.Photo        
        //    //    PhotoFileType: "",      //dataVM.PhotoFileType
        //    //    PhotoFileName: "",      //dataVM.PhotFileName
        //    //    Corresp: "",            //dataVM.Correspondence
        //    //    CorrespFileType: "",    //dataVM.CorrespFileTYpe
        //    //    CorrespFileName: "",    //dataVM.CorrespFileName
        //    //    Comments: "",           //dataVM.Comments
        //    //    CreatedBy: 1812           //dataVM.CreatedBy
        //    //};

        //    docObj = {
        //        DocumentID: "",
        //        HeaderID: 61130,                    //dataVM.HeaderID,
        //        Photo: "",                          //dataVM.Photo,        
        //        PhotoFileType: "",                  //dataVM.PhotoFileType,
        //        PhotoFileName: "",                  //dataVM.PhotFileName,
        //        Corresp: dataVM.Correspondence,
        //        CorrespFileType: "docx",            //dataVM.CorrespFileTYpe,
        //        CorrespFileName: "Testing",         //dataVM.CorrespFileName,
        //        Comments: dataVM.Comments,
        //        CreatedBy: 1812                     //dataVM.CreatedBy
        //    };



        //    FileCommonServices.saveFile(docObj, docUrl + "WebInsToWinDocument")
        //        .then(function (result) {
        //            alert("File has been successfully saved.");
        //        },
        //        function (error) {
        //            alert("Problem saving the document. " + error.statusText);
        //        });
        //};


    };


    CorrespondenceController.$inect = ["$scope", "homeUrl", "docUrl"];


    app.controller("CorrespondenceController", CorrespondenceController);


}());