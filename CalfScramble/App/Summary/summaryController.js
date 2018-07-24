(function () {
    angular.module('calfScramble')
        .controller('SummaryController', SummaryController);

    SummaryController.$inject = ['$scope', 'globalServices'];

    function SummaryController($scope, globalServices) {
        var vm = this;
        vm.FullDoc;
        vm.CorresSubmitDate;
        vm.corresFileName;

        vm.MonthSelection = MonthSelection;
        vm.downloadCoress = downloadCoress;
        vm.downloadFile = downloadFile;
        vm.formatDaate = formatDaate;

        vm.selectedMonth = null;
        vm.month = [{ "Id": null, "Name": "Select Month" }, { "Id": "January", "Name": "January" }, { "Id": "February", "Name": "February" }, { "Id": "March", "Name": "March" }, { "Id": "April", "Name": "April" }, { "Id": "May", "Name": "May" }, { "Id": "June", "Name": "June" }, { "Id": "July", "Name": "July" }, { "Id": "August", "Name": "August" }, { "Id": "September", "Name": "September" }, { "Id": "October", "Name": "October" }, { "Id": "November", "Name": "November" }, { "Id": "December", "Name": "December" }];

        function MonthSelection() {
            vm.FullDoc = [];
            vm.CorresSubmitDate = '';
            vm.corresFileName = '';
            if (vm.selectedMonth != null || vm.selectedMonth != 'null') {
                globalServices.getYear().then(function (res) {
                    vm.yearDetails = res.data;
                    globalServices.GetAllDocuments(vm.yearDetails, vm.selectedMonth).then(function (res) {
                        vm.FullDoc = res.data;
                        if (vm.FullDoc.monthly != null) {
                            for (var i = 0; i < vm.FullDoc.monthly.length; i++) {
                                if (vm.FullDoc.monthly[i].COMMENTS == "corres") {
                                    vm.CorresSubmitDate = vm.FullDoc.monthly[i].CORR_SUBMIT_DATE;
                                    vm.corresFileName = vm.FullDoc.monthly[i].CORR_FILE_NAME;
                                    break;
                                }
                            }
                        }
                    });
                });
            }
        }

        function formatDaate(val) {
            var d = new Date(val); 
            var re = d.toString();
            var res = re.split("GMT");
            console.log(res[0]);
            return res[0];
        }

        function downloadCoress(type) {
            globalServices.downloadEssayCoress(type)
        }

        function downloadFile(type) {
            globalServices.downloadCoress(type);
        }
    }
})();
