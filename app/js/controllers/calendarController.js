angular.module('app')
  .controller('CalendarController',
    function($scope, CurrentUser, CalendarService) {
      $scope.user = CurrentUser.user();





      $scope.addEvenement = function() {
        $scope.evenements = [];
        let evenement = {
          date: $scope.myDate +'z',
          title: $scope.myTitle,
          content: $scope.myContent,

        };
        CalendarService.getAll().then(function(res) {
          console.log('evenements', res);
          $scope.evenements = res.data;
          console.log('res.data', res.data);
        });

        CalendarService.create(evenement).then(function(res) {
          console.log(evenement, res);
        }, function(err) {
          console.log('echec');
        });
      };

    });
