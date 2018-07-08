(function () {
    angular.module('calfScramble')
        .controller('SummaryController', SummaryController);

    SummaryController.$inject = ['$scope'];

    function SummaryController($scope) {
        var vm = this;
        vm.Essay = [{ "DocumentType": "Initial Assessment", "FileName": "BPExhibitor.PDF", "FileUploadDate": "17-MAY-2018 09:23:44am" },
        { "DocumentType": "Monthly Ledgers", "FileName": "", "FileUploadDate": "" },
        { "DocumentType": "Final Assessment", "FileName": "", "FileUploadDate": "" },
        { "DocumentType": "Breed Essay", "FileName": "", "FileUploadDate": "" },
        { "DocumentType": "Year End Essay", "FileName": "", "FileUploadDate": "" },];

        vm.Correspodence = [{ "Month": "May", "GreeterContacted": "Yes", "ReportSubmitDate": "17-MAY-2018 09:23:44am", "FileName": "MayReport.PDF", "FileUploadDate": "17-MAY-2018 09:23:44am" }];
        vm.Photos = [{ "Month": "May", "FileName": "Image1.jpg", "FileUploadDate": "17-MAY-2018 09:23:44am" }];
    }
})();
