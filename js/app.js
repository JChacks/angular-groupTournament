var app = angular.module('groupTournament', []);

app.controller('MainCtrl', ['$scope','$http', function($scope, $http) {

  $scope.teams = {
    1:{name:'alpha'},
    2:{name:'beta'},
    3:{name:'gamma'}
  };
  
  $scope.matches = [{id: 1, round: 1, teamA: 0, teamB: 1, scoreA: 1, scoreB: 0}];
  
  // $http({method:'GET', url: "//api.github.com/users/JChacks/repos" }).then(function(res) {
  //   $scope.teams = res.data;  
  // });
  

  
}]);
