(function () {
    angular.module('calfScramble')
        .controller('CorrespondenceController', CorrespondenceController);

    CorrespondenceController.$inject = ['$scope', 'globalServices'];

    function CorrespondenceController($scope, globalServices) {
        var vm = this;
        vm.monthDetails;
        vm.yearDetails;
        vm.startDate = 11;
        vm.endDate = 10;
        vm.CopprespondenceDetails = [];
        vm.CorrespondenceDoc = '';
        vm.corresId = '';
        vm.CorrespondenceName = '';
        vm.photo1 = '';
        vm.photo1Id = '';
        vm.photo1name = '';
        vm.photo2 = '';
        vm.photo2Id = '';
        vm.photo2name = '';
        vm.photo3 = '';
        vm.photo3name = '';
        vm.photo3Id = '';

        vm.add = add;
        vm.downloadFile = downloadFile;
        vm.InitalizeData = InitalizeData;
        vm.DeleteData = DeleteData;
        vm.getCorrespondenceDetails = getCorrespondenceDetails;

        InitalizeData();
        function add(type) {
            var isUploadOk = false;
            var f = document.getElementById(type).files[0],
                r = new FileReader();

            console.log(f.type);
            if (type == "photo1" || type == "photo2" || type == "photo3") {
                if (f.type == "image/jpeg" || f.type == "image/png") {
                    alert("Image Ok");
                    isUploadOk = true;
                }                
            }
            else if (type == "corres") {
                var res = f.name.split("."); 
                if (res[1] == "docx" || res[1] == "pdf" || res[1] == "txt") {
                    alert("corres Ok");
                    isUploadOk = true;
                }
            }
            if (isUploadOk) {
                r.onloadend = function (e) {
                    var data = e.target.result;
                    globalServices.UploadData(f, type).then(function (res) {
                        getCorrespondenceDetails();
                    });
                }
                r.readAsBinaryString(f);
            }
            else {
                alert("Please Check File type");
            }
        }

        function DeleteData(id) {
            globalServices.DeleteData(id).then(function (res) {
                getCorrespondenceDetails()
            });
        }

        function getCorrespondenceDetails() {
            globalServices.GetCorrespondenceDetails(vm.yearDetails, vm.monthDetails).then(function (res) {
                vm.CopprespondenceDetails = res.data;
                vm.CorrespondenceDoc = '';
                vm.corresId = '';
                vm.CorrespondenceName = '';
                vm.photo1 = '';
                vm.photo1Id = '';
                vm.photo1name = '';
                vm.photo2 = '';
                vm.photo2Id = '';
                vm.photo2name = '';
                vm.photo3 = '';
                vm.photo3name = '';
                vm.photo3Id = '';
                for (var i = 0; i < vm.CopprespondenceDetails.length; i++) {
                    if (vm.CopprespondenceDetails[i].COMMENTS == "corres") {
                        vm.CorrespondenceDoc = vm.CopprespondenceDetails[i].CORRESPONDENCE;
                        vm.CorrespondenceName = vm.CopprespondenceDetails[i].CORR_FILE_NAME;
                        vm.corresId = vm.CopprespondenceDetails[i].CLFS_DOC_ID;
                    }
                    if (vm.CopprespondenceDetails[i].COMMENTS == "photo1") {
                        vm.photo1 = "data:image/png;base64," + vm.CopprespondenceDetails[i].PHOTO;
                        vm.photo1Name = vm.CopprespondenceDetails[i].PHOTO_FILE_NAME;
                        vm.photo1Id = vm.CopprespondenceDetails[i].CLFS_DOC_ID;
                    }
                    if (vm.CopprespondenceDetails[i].COMMENTS == "photo2") {
                        vm.photo2 = "data:image/png;base64," + vm.CopprespondenceDetails[i].PHOTO;
                        vm.photo2Name = vm.CopprespondenceDetails[i].PHOTO_FILE_NAME;
                        vm.photo2Id = vm.CopprespondenceDetails[i].CLFS_DOC_ID;
                    }
                    if (vm.CopprespondenceDetails[i].COMMENTS == "photo3") {
                        vm.photo3 = "data:image/png;base64," + vm.CopprespondenceDetails[i].PHOTO;
                        vm.photo3name = vm.CopprespondenceDetails[i].PHOTO_FILE_NAME;
                        vm.photo3Id = vm.CopprespondenceDetails[i].CLFS_DOC_ID;
                        console.log(vm.photo3name);
                    }
                }
            });
        }

        function InitalizeData() {
            globalServices.getMonth().then(function (res) {
                vm.monthDetails = res.data;
                globalServices.getYear().then(function (res) {
                    vm.yearDetails = res.data;
                    getCorrespondenceDetails()
                });
            });
        }

        function downloadFile(type) {
            globalServices.downloadCoress(type);
        }
    }
})();
