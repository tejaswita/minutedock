define(['modules/app','service/entriesService'] , function (app) {

  var formatDate = function(date) {
    var actualMonth = date.getMonth() + 1;
    return actualMonth + "/" + date.getFullYear();
  };

  var getMonthName = function(monthNumber) {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November','December'];
    return monthNames[monthNumber - 1];
  };

  app.controller('entriesController.month.year',['$scope','$routeParams','$sessionStorage','entriesService', function($scope, $routeParams, $sessionStorage,entriesService){  	
    $scope.previousMonth = formatDate(new Date($routeParams.year, $routeParams.month-2, 1));
    var today = new Date();
    var nextMonth = new Date($routeParams.year, $routeParams.month, 1);
    if(nextMonth < today){
      $scope.nextMonth = formatDate(nextMonth);
    }
    $scope.currentMonth = getMonthName($routeParams.month) + " " + $routeParams.year;
    entriesService.getEntries($routeParams.month, $routeParams.year)
    .then(function(response) {
        var result = response.data.map(function(entry) {
          return {
            id : entry.id,
            date : entry.date, 
            contact : entry.contact ? $sessionStorage.contacts.filter(function(c){return c.id == entry.contact})[0].name : "",
            project : entry.project ? $sessionStorage.projects.filter(function(p){return p.id == entry.project})[0].name : "",
            duration : entry.duration
          };
        });        
        $scope.entries = result;
    });      	
  }]);
});