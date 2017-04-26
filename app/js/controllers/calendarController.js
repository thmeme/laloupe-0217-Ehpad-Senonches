angular.module('app')
  .controller('CalendarController',
    function($scope, CurrentUser, CalendarService) {
      $scope.user = CurrentUser.user();

      CalendarService.getAll().then(function(res) {
        $scope.evenements = res.data;
      });

      $scope.addEvenement = function() {
        $scope.evenements = [];
        let evenement = {
          date: $scope.myDate +'z',
          start: $scope.start,
          end: $scope.end,
          title: $scope.title,
          content: $scope.content
        };
        CalendarService.create(evenement).then(function(res) {
          console.log(evenement, res);
          $scope.myDate = '';
          $scope.start = '';
          $scope.end = '';
          $scope.title = '';
          $scope.content = '';
        }, function(err) {
          console.log('echec');
        });
        CalendarService.getAll().then(function(res) {
          $scope.evenements = res.data;
        });
      };
    });
