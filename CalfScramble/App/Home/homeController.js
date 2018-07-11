(function () {
    angular.module('calfScramble').controller('HomeController', HomeController);
    HomeController.$inject = ['$scope', 'globalServices', '$localStorage', '$sessionStorage'];

    function HomeController($scope, globalServices, $localStorage, $sessionStorage) {
        var vm = this;
        var vm = this;
        vm.scramblerDetails;
        vm.selectedState = 0;
        vm.isEdit = true;
        vm.monthDetails = '';
        vm.states = [{ "Id": 0, "Name": "Select State" }, { "Id": "AL", "Name": "Alabama" }, { "Id": "FL", "Name": "Florida" },];
        vm.selectedBreed = 0;
        vm.breed = [{ "Id": null, "Name": "Select Breed" }, { "Id": "BreedA", "Name": "BreedA" }, { "Id": "BreedB", "Name": "BreedB" }];
        vm.selectedAnimalType = 0;
        vm.animalType = [{ "Id":null , "Name": "Select Animal Type" }, { "Id": "Heifer", "Name": "Heifer" }, { "Id": "Steer", "Name": "Steer" }];
        vm.selectedAttending = 0;
        vm.attending = [{ "Id": 0, "Name": "Yes" }, { "Id": 1, "Name": "No" }];
        vm.selectedTShirtSize = 0;
        vm.tShirtSize = [{ "Id": 0, "Name": "Select T-Shirt Size" }, { "Id": 1, "Name": "S" }, { "Id": 2, "Name": "M" }, { "Id": 3, "Name": "L" }, { "Id": 4, "Name": "XL" }, { "Id": 5, "Name": "XXL" }];
        vm.animalDisable = false;

        // Functions defined on vm
        vm.GetScramblerDetails = GetScramblerDetails;
        vm.EditInfo = EditInfo;
        vm.Save = Save;

        GetScramblerDetails();

        globalServices.getMonth().then(function (res) {
            $localStorage.month = vm.monthDetails = res.data;
        });

        globalServices.getYear().then(function (res) {
            $localStorage.year = vm.yearDetails = res.data;
        });

        function GetScramblerDetails() {
            globalServices.GetScramblerDetails().then(function (res) {
                vm.scramblerDetails = res.data;
                if (vm.scramblerDetails.animal.ANIMAL_ID > 0)
                    vm.animalDisable = true;
            });
        }

        function EditInfo() {
            vm.isEdit = true;
        }

        function Save() {
            console.log(vm.scramblerDetails);
            vm.scramblerDetails.animal.CUSTOMER_ID = vm.scramblerDetails.address.CUSTOMER_ID
            globalServices.saveCustomer(vm.scramblerDetails).then(function (res) {
                if (res.data) {
                    globalServices.GetScramblerDetails().then(function (res) {
                        vm.scramblerDetails = res.data;
                        if (vm.scramblerDetails.animal.ANIMAL_ID > 0)
                            vm.animalDisable = true;
                    });
                }
            });
        }        
    }
})();