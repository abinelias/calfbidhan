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
        vm.downloadCoress = downloadCoress;

        function add(type) {
            alert(type);
            var f = document.getElementById('file').files[0],
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

        function downloadCoress() {
            globalServices.downloadCoress(1).then(function (res) {
            });
        }
    }
})();
