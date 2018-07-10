(function () {
    angular.module('calfScramble')
        .controller('CorrespondenceController', CorrespondenceController);

    CorrespondenceController.$inject = ['$scope', 'globalServices'];

    function CorrespondenceController($scope, globalServices) {
        var vm = this;
        vm.monthDetails;
        vm.yearDetails;
        vm.startDate = 11;
        vm.endDate = 10

        vm.add = add;
        vm.downloadFile = downloadFile;

        function add(type) {
          //  alert(type);
            var f = document.getElementById(type).files[0],
                r = new FileReader();

            r.onloadend = function (e) {
                var data = e.target.result;
                globalServices.UploadData(f, type).then(function (res) {
                });
            }
            r.readAsBinaryString(f);
        }

        globalServices.getMonth().then(function (res) {
            vm.monthDetails = res.data;
        });

        globalServices.getYear().then(function (res) {
            vm.yearDetails = res.data;
        });

        function downloadFile(type) {
            globalServices.downloadCoress(type).then(function (res) {
            });
        }
    }
})();
