app.directive('groupTournament', function() {
  return {
    restrict: 'EA',
    scope: {
      teams: '=',
      matches: '=',
      num: '@',
      admin: '@',
      cols: '@'
    },
    controller: function($scope) {
      $scope.cols = $scope.cols.split(",");
      $scope.roundAreaShow = true;
      $scope.rounds = {
        _: {},
        1: {},
        2: {},
        3: {}
      };
      $scope.data = {};

      $scope.init = function(teams, origMatches) {
        matches = [];
        var keys = Object.keys( teams );
        for (i = 0; i < keys.length; i++) {
          for (j = i + 1; j < keys.length; j++) {
            matches.push({
              teamA: keys[i],
              teamB: keys[j]
            });
          }
        }
        return angular.merge(origMatches, matches);
      };

      $scope.sync = function() {
        angular.forEach($scope.teams, function(team) {
          $scope.data[team.name] = {w: 0,l: 0,t: 0,p: 0,d: 0};
        });
        for (var i = 0; i < $scope.matches.length; i++) {
          var match = $scope.matches[i];
          if (match.scoreA > match.scoreB) {
            $scope.data[$scope.teams[match.teamA].name].w += 1;
            $scope.data[$scope.teams[match.teamB].name].l += 1;
          } else if (match.scoreA < match.scoreB) {
            $scope.data[$scope.teams[match.teamB].name].w += 1;
            $scope.data[$scope.teams[match.teamA].name].l += 1;
          } else if (match.scoreA == match.scoreB) {
            $scope.data[$scope.teams[match.teamB].name].t += 1;
            $scope.data[$scope.teams[match.teamA].name].t += 1;
          }
        }
      };

      $scope.showRounds = function() {
        $scope.roundAreaShow = !$scope.roundAreaShow;
      }
    },
    link: function($scope, element, attrs) {
      $scope.matches = $scope.init($scope.teams, $scope.matches);
      $scope.sync();
    },
    replace: true,
    templateUrl: 'groupTournament.html'
  };
});
