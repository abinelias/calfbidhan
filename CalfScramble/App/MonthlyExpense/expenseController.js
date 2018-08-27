(function () {
    angular.module('calfScramble')
        .controller('ExpenseController', ExpenseController);

    ExpenseController.$inject = ['$scope', 'globalServices', '$localStorage', '$sessionStorage'];

    function ExpenseController($scope, globalServices, $localStorage, $sessionStorage) {
        var vm = this;
        vm.selectedQuanity = 0;
        vm.expenseType = '';
        vm.expenseDetails = {};
        vm.unitCost;
        vm.AddNewExpense = true;
        vm.monthlyData = [];
        vm.yearlyData = [];
        vm.expenseTypeCorrect = true;
        vm.unitCostCorrect = true;
        vm.quantity = [{ "Id": 0, "Name": "Select Quantity" }, { "Id": 1, "Name": 1 }, { "Id": 2, "Name": 2 }, { "Id": 3, "Name": 3 }, { "Id": 4, "Name": 4 }, { "Id": 5, "Name": 5 }, { "Id": 6, "Name": 6 }, { "Id": 7, "Name": 7 }, { "Id": 8, "Name": 8 }, { "Id": 9, "Name": 9 }, { "Id": 10, "Name": 10 }]

        // Functions defined on vm
        vm.AssignHolding = AssignHolding;
        vm.AddExpense = AddExpense;
        vm.ExpenseToExcel = ExpenseToExcel;
        vm.saveExpense = saveExpense;
        vm.cancelExpense = cancelExpense;
        vm.deleteExpense = deleteExpense;
        vm.InitalizeData = InitalizeData;
        vm.ExpenseCheck = ExpenseCheck;
        vm.unitCostCheck = unitCostCheck;

        InitalizeData();

        function ExpenseCheck() {
            var exp = /^[a-z0-9]+$/i;
            if (exp.test(vm.expenseType)) {
                vm.expenseTypeCorrect = true;
                return true;
            }
            else {
                vm.expenseTypeCorrect = false;
                return false;
            }
        }

        function unitCostCheck() {
            var reg = /^\d+$/;
            if (vm.unitCost !=null && reg.test(vm.unitCost)) {
                vm.unitCostCorrect = true;
                return true;
            }
            else {
                vm.unitCostCorrect = false;
                return false;
            }
        }

        function InitalizeData() {
            globalServices.GetExpense().then(function (res) {
                vm.monthlyData = [];
                vm.yearlyData = [];
                vm.expenseDetails = res.data;
                for (var i = 0; i < vm.expenseDetails.length; i++) {
                    if ($localStorage.month == vm.expenseDetails[i].month) {
                        var monthInfo = {};
                        monthInfo.expenseid = vm.expenseDetails[i].expenseid;
                        monthInfo.expensetype = vm.expenseDetails[i].expensetype;
                        monthInfo.quantity = vm.expenseDetails[i].quantity;
                        monthInfo.unitcost = vm.expenseDetails[i].unitcost;
                        monthInfo.totalCost = parseInt(vm.expenseDetails[i].unitcost) * parseInt(vm.expenseDetails[i].quantity);
                        vm.monthlyData.push(monthInfo);
                    }
                    var yearInfo = {};
                    yearInfo.expenseid = vm.expenseDetails[i].expenseid;
                    yearInfo.month = vm.expenseDetails[i].month;
                    yearInfo.expensetype = vm.expenseDetails[i].expensetype;
                    yearInfo.quantity = vm.expenseDetails[i].quantity;
                    yearInfo.unitcost = vm.expenseDetails[i].unitcost;
                    yearInfo.totalCost = parseInt(vm.expenseDetails[i].unitcost) * parseInt(vm.expenseDetails[i].quantity);
                    vm.yearlyData.push(yearInfo);
                }
            });
        }

        function AddExpense() {
            vm.AddNewExpense = true;
        }

        function AssignHolding(accountHolding, index) {
            GoalAccountsService.AssignHolding(accountHolding, vm.GoalAccounts[index], vm.profileText.toLowerCase());
        }

        function saveExpense() {
            if (vm.unitCost != null && vm.expenseType !=null && vm.unitCostCorrect && vm.expenseTypeCorrect && vm.selectedQuanity > 0) {
                var data = {};
                data.expensetype = vm.expenseType;
                data.quantity = vm.selectedQuanity;
                data.unitcost = vm.unitCost;
                data.year = $localStorage.year;
                data.customerid = 1;
                data.month = $localStorage.month;
                vm.selectedQuanity = 0;
                vm.expenseType = '';
                vm.unitCost = '';
                vm.AddNewExpense = true;

                globalServices.AddExpense(data).then(function (res) {
                    if (res.data) {
                        vm.monthlyData = [];
                        vm.yearlyData = [];
                        vm.InitalizeData();
                    }
                });
            }
            else {
                alert("Please correect the values");
            }
        }

        function cancelExpense() {
            vm.selectedQuanity = 0;
            vm.expenseType = '';
            vm.unitCost = '';
            vm.AddNewExpense = false;
        }

        function deleteExpense(id) {
            globalServices.DeleteExpense(id).then(function (res) {
                console.log(res);
                InitalizeData();
            });
        }

        function ExpenseToExcel() {
            angular.element.ig.GridExcelExporter.exportGrid(
                angular.element('#yearlyExpense'),
                {
                    fileName: 'YearlyExpense',
                    worksheetName: 'YearlyExpense',

                }
            );
        }
    }
})();
