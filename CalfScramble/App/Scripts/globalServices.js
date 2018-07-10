angular.module('calfScramble')
    .factory('globalServices', globalServices);

globalServices.$inject = ['$http', '$q', '$localStorage', '$sessionStorage'];
function globalServices($http, $q, $localStorage, $sessionStorage) {
    var baseWMUrl = '/api/CalfScramblerApi/';
    $localStorage.loggedInUserId = 1;
    var globalAPI = {
        GetScramblerDetails: GetScramblerDetails,
        GetCurrentMonth: GetCurrentMonth,
        AddExpense: AddExpense,
        saveCustomer: saveCustomer,
        GetExpense: GetExpense,
        UploadData: UploadData,
        downloadCoress: downloadCoress,
        getYear: getYear,
        getMonth: getMonth,
        DeleteExpense: DeleteExpense,
        UploadEssayData: UploadEssayData,
        downloadEssayCoress: downloadEssayCoress
    };

    return globalAPI;

    function GetScramblerDetails() {
        var val = $localStorage.loggedInUserId;
        var deferred = $q.defer();
        deferred.resolve($http.get(baseWMUrl + 'GetCustomerId?id=' + val).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }

    function DeleteExpense(id) {
        var deferred = $q.defer();
        alert('hi');
        deferred.resolve($http.get(baseWMUrl + 'DeleteExpense?id=' + id).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }
    function saveCustomer(data) {
        var deferred = $q.defer();
        deferred.resolve($http({
            url: baseWMUrl + 'saveCustomer', data: data, method: "POST", headers: { 'Content-Type': 'text/json' }
        }).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }
    function GetCurrentMonth() {
        var deferred = $q.defer();
        deferred.resolve($http.get(baseWMUrl + 'GetCurrentMonth').then(function (result) {
            $localStorage.month = result.data;
            return result;
        }));
        return deferred.promise;
    }

    function GetExpense() {
        var val = 1;
        var year = $localStorage.year;
        var deferred = $q.defer();
        deferred.resolve($http.get(baseWMUrl + 'GetExpenseByYear?year=' + year + '&customerid=' + val).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }

    function AddExpense(expenseObj) {
        var deferred = $q.defer();
        deferred.resolve($http.post(baseWMUrl + 'AddExpense', expenseObj).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }

    function getMonth() {
        var deferred = $q.defer();
        deferred.resolve($http.get(baseWMUrl + 'GetCurrentMonth').then(function (result) {
            $localStorage.month = result.data;
            return result;
        }));
        return deferred.promise;
    }

    function getYear() {
        var deferred = $q.defer();
        deferred.resolve($http.get(baseWMUrl + 'GetCurrentYear').then(function (result) {
            $localStorage.year = result.data;
            return result;
        }));
        return deferred.promise;
    }

    function UploadData(data, Type) {
        var val = 1;
        var payload = new FormData();
        payload.append("filesample", data);
        payload.append("year", $localStorage.year);
        payload.append("month", $localStorage.month);
        payload.append("type", Type);
        payload.append("cuid", $localStorage.loggedInUserId);
        var deferred = $q.defer();
        deferred.resolve($http({
            url: baseWMUrl + 'UploadTest', data: payload, method: "POST", headers: { 'Content-Type': undefined }
        }).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }

    function downloadCoress(type) {
        window.open(baseWMUrl + 'GetFileData?id=' + $localStorage.loggedInUserId + '&month=' + $localStorage.month + '&year=' + $localStorage.year + '&type='+type, '_blank', '');
    }

    function UploadEssayData(data, Type) {
        var val = 1;
        var payload = new FormData();
        payload.append("filesample", data);
        payload.append("year", $localStorage.year);
        payload.append("month", $localStorage.month);
        payload.append("type", Type);
        payload.append("cuid", $localStorage.loggedInUserId);
        alert(Type);
        var deferred = $q.defer();
        deferred.resolve($http({
            url: baseWMUrl + 'UploadEssay', data: payload, method: "POST", headers: { 'Content-Type': undefined }
        }).then(function (result) {
            return result;
        }));
        return deferred.promise;
    }

    function downloadEssayCoress(headerId) {
        window.open(baseWMUrl + 'GetEssayFileData?id=' + $localStorage.loggedInUserId + '&month=' + $localStorage.month + '&year=' + $localStorage.year + '&type=corres', '_blank', '');
    }
};