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

        vm.addressCorrect = true;
        vm.cityCorrect = true;
        vm.zipCorrect = true;
        vm.emailCorrect = true;
        vm.animalNameCorrect = true;
        vm.registerNoCorrect = true;
        vm.SirNameCorrect = true;
        vm.registerSirCorrect = true;
        vm.damNameCorrect = true;
        vm.registryDamCorrect = true;
        vm.animalIdentificationCorrect = true;
        vm.sellarCorrect = true;
        vm.hiferCostCorrect = true;
        vm.steerCostCorrect = true;
        vm.SellarSteerCorrect = true;
        vm.dateOfBirthCorrect = true;
        vm.purchaseDateCorrect = true;

        // Functions defined on vm
        vm.GetScramblerDetails = GetScramblerDetails;
        vm.EditInfo = EditInfo;
        vm.Save = Save;
        vm.alphaNumericCheck = alphaNumericCheck;
        vm.onlyNumbers = onlyNumbers;
        vm.alphaNumericWithSpaceCheck = alphaNumericWithSpaceCheck;
        vm.validateEmail = validateEmail;
        vm.dateValidation = dateValidation;

        GetScramblerDetails();

        globalServices.getMonth().then(function (res) {
            $localStorage.month = vm.monthDetails = res.data;
        });

        globalServices.getYear().then(function (res) {
            $localStorage.year = vm.yearDetails = res.data;
        });

        function alphaNumericWithSpaceCheck(val, type) {
            var exp = /^[a-z\d\-_\s]+$/i;
            if (exp.test(val)) {
                if (type == 'address') {
                    vm.addressCorrect = true;
                }
                return true;
            }
            else {
                if (type == 'address') {
                    vm.addressCorrect = false;
                }
                return false;
            }
        }
        vm.dateOfBirthCorrect = true;
        vm.purchaseDateCorrect = true;
        function dateValidation(date, type) {
            var newchar = '-'
            var newDate = date.split('/').join(newchar);
            var dateParse = newDate.split('-');
            if (dateParse.length == 3) {
                if (dateParse[0] > 0 && dateParse[0] < 13) {
                    if (dateParse[1] > 0 && dateParse[1] < 31) {
                        if (dateParse[2] > 1900) {

                            if (type == 'purchaseDateHifer') {
                                vm.purchaseDateCorrect = true;
                            }
                            else if (type == 'dateOfBirth') {
                                vm.dateOfBirthCorrect = true;
                            }
                        }
                        else {
                            if (type == 'purchaseDateHifer') {
                                vm.purchaseDateCorrect = false;
                            }
                            else if (type == 'dateOfBirth') {
                                vm.dateOfBirthCorrect = false;
                            }
                        }
                    }
                    else {
                        if (type == 'purchaseDateHifer') {
                            vm.purchaseDateCorrect = false;
                        }
                        else if (type == 'dateOfBirth') {
                            vm.dateOfBirthCorrect = false;
                        }
                    }
                }
                else {
                    if (type == 'purchaseDateHifer') {
                        vm.purchaseDateCorrect = false;
                    }
                    else if (type == 'dateOfBirth') {
                        vm.dateOfBirthCorrect = false;
                    }
                }
            }
            else {
                if (type == 'purchaseDateHifer') {
                    vm.purchaseDateCorrect = false;
                }
                else if (type == 'dateOfBirth') {
                    vm.dateOfBirthCorrect = false;
                }
            }
        }


        function alphaNumericCheck(val, type) {
            var exp = /^[a-z\d\-_\s]+$/i;// /^[a-z0-9]+$/i;
            if (exp.test(val)) {
                if (type == 'city') {
                    vm.cityCorrect = true;
                }
                else if (type == 'animalName') {
                    vm.animalNameCorrect = true;
                }
                else if (type == 'registryNumber') {
                    vm.registerNoCorrect = true;
                }
                else if (type == 'nameOfSire') {
                    vm.SirNameCorrect = true;
                }
                else if (type == 'SireRegisterNo') {
                    vm.registerSirCorrect = true;
                }
                else if (type == 'nameOfDam') {
                    vm.damNameCorrect = true;
                }
                else if (type == 'DamRegisterNo') {
                    vm.registryDamCorrect = true;
                }
                else if (type == 'animalIdentification') {
                    vm.animalIdentificationCorrect = true;
                }
                else if (type == 'Sellar') {
                    vm.sellarCorrect = true;
                }
                else if (type == 'hiferCost') {
                    vm.hiferCostCorrect = true;
                }
                else if (type == 'SellarSteer') {
                    vm.SellarSteerCorrect = true;
                }
                return true;
            }
            else {
                if (type == 'city') {
                    vm.cityCorrect = false;
                }
                else if (type == 'animalName') {
                    vm.animalNameCorrect = false;
                }
                else if (type == 'registryNumber') {
                    vm.registerNoCorrect = false;
                }
                else if (type == 'nameOfSire') {
                    vm.SirNameCorrect = false;
                }
                else if (type == 'SireRegisterNo') {
                    vm.registerSirCorrect = false;
                }
                else if (type == 'nameOfDam') {
                    vm.damNameCorrect = false;
                }
                else if (type == 'DamRegisterNo') {
                    vm.registryDamCorrect = false;
                }
                else if (type == 'animalIdentification') {
                    vm.animalIdentificationCorrect = false;
                }
                else if (type == 'Sellar') {
                    vm.sellarCorrect = false;
                }
                else if (type == 'SellarSteer') {
                    vm.SellarSteerCorrect = false;
                }
                return false;
            }
        }

        function onlyNumbers(val, type) {
            var reg = /^\d+$/;
            if (reg.test(val)) {
                if (type == 'zip') {
                    vm.zipCorrect = true;
                } 
                else if (type == 'hiferCost') {
                    vm.hiferCostCorrect = true;
                }
                else if (type == 'steerCost') {
                    vm.steerCostCorrect = true;
                }
                return true;
            }
            else {
                if (type == 'zip') {
                    vm.zipCorrect = false;
                }
                else if (type == 'hiferCost') {
                    vm.hiferCostCorrect = false;
                }
                else if (type == 'steerCost') {
                    vm.steerCostCorrect = false;
                }
                return false;
            }
        }

        function validateEmail() {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(vm.scramblerDetails.address.EMAIL_SECOND.toLowerCase())) {
                vm.emailCorrect = true;
                return true;
            }
            else {
                vm.emailCorrect = false;
                return false;
            }
        }

        function formatDate(val) {
            var res = val.split("T");
            return res[0];
        }

        function GetScramblerDetails() {
            globalServices.GetScramblerDetails().then(function (res) {
                vm.scramblerDetails = res.data;
                console.log(vm.scramblerDetails);
                if (vm.scramblerDetails.animal.ANIMAL_ID > 0) {
                    vm.animalDisable = true;
                    console.log(vm.scramblerDetails.animal);
                    vm.scramblerDetails.animal.DATE_OF_BIRTH = formatDate(vm.scramblerDetails.animal.DATE_OF_BIRTH);
                    vm.scramblerDetails.animal.PURCHASE_DATE = formatDate(vm.scramblerDetails.animal.PURCHASE_DATE);
                }
            });
        }

        function EditInfo() {
            vm.isEdit = true;
        }

        function Save() {
            if (vm.addressCorrect && vm.cityCorrect && vm.zipCorrect && vm.emailCorrect && vm.animalNameCorrect &&
                vm.registerNoCorrect && vm.SirNameCorrect && vm.registerSirCorrect && vm.damNameCorrect && vm.registryDamCorrect &&
                vm.animalIdentificationCorrect && vm.sellarCorrect && vm.hiferCostCorrect && vm.steerCostCorrect && vm.SellarSteerCorrect) {
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
            else {
                alert("Please enter correct the values")
            }
        }
    }
})();