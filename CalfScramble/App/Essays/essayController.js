(function () {
    angular.module('calfScramble')
        .controller('EssayController', EssayController);

    EssayController.$inject = ['$scope', 'globalServices', '$localStorage', '$sessionStorage'];

    function EssayController($scope, globalServices, $localStorage, $sessionStorage) {
        var vm = this;
        vm.monthDetails;
        vm.yearDetails;
        vm.startDate = 11;
        vm.endDate = 10;
        vm.EssayInfo;

        vm.add = add;
        vm.downloadCoress = downloadCoress;
        vm.InitalizeData = InitalizeData;
        vm.getEssayDetails = getEssayDetails;
        vm.DeleteEssayData = DeleteEssayData;

        InitalizeData();

        function InitalizeData() {
            globalServices.getMonth().then(function (res) {
                vm.monthDetails = res.data;
                globalServices.getYear().then(function (res) {
                    vm.yearDetails = res.data;
                    getEssayDetails();
                });
            });
        }

        function DeleteEssayData(type) {
            globalServices.DeleteEssayData(vm.EssayInfo.Line_id, type).then(function (res) {
                getEssayDetails();
            });
        }

        function getEssayDetails() {
            globalServices.GetEssayData(vm.yearDetails, vm.monthDetails).then(function (res) {
                vm.EssayInfo = res.data;
                console.log(vm.EssayInfo);
            });
        }

        function add(type) {
            var isUploadOk = false;
            var f = document.getElementById(type).files[0],
                r = new FileReader();

            var res = f.name.split(".");
            if (res[1] == "docx" || res[1] == "pdf" || res[1] == "txt") {
                isUploadOk = true;
            }
            
            if (isUploadOk) {
                r.onloadend = function (e) {
                    var data = e.target.result;
                    globalServices.UploadEssayData(f, type).then(function (res) {
                        getEssayDetails()
                    });
                }
                r.readAsBinaryString(f);
            }
            else {
                alert("Please Check File type");
            }
        }


        function downloadCoress(type) {
            globalServices.downloadEssayCoress(type)
        }
    }
})();
