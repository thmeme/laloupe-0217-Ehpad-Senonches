angular.module('app')
  .controller('EditCalendarController',
    function($scope, $state, $stateParams, $mdDialog, CurrentUser, CalendarService) {
      $scope.user = CurrentUser.user();
      console.log('params', $state.params);
      $scope.newEvenement = {
        date: undefined,
        start: undefined,
        end: undefined,
        title: '',
        isOnline: false
      };

      $scope.idEvenement = $stateParams.id;
      console.log('id', $scope.idEvenement);

      function loadAllEvenements() {
        CalendarService.getAll().then(function(res) {
          $scope.evenements = res.data;
          console.log('loadAllEvenements', res.data);
        });
      }
      loadAllEvenements();

      function loadEvenement(id) {
        if (id !== undefined) {
          CalendarService.getOne($scope.idEvenement).then(function(res) {
            console.log('res One', res);
            $scope.evenement = res.data;
            console.log('res.data.strat', res.data.start);
          });
        }
      }
      loadEvenement($scope.idEvenement);

      $scope.redirectCalendar = function() {
        $state.go('user.calendar');
      };

      $scope.redirectCreateCalendar = function() {
        $state.go('user.create-calendar');
      };

      $scope.updateEvenement = function() {
        CalendarService.update($scope.idEvenement, $scope.evenement).then(function(res) {
          console.log('update', res);
        });
      };
    });
