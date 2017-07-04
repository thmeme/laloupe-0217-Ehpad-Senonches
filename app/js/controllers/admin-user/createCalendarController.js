angular.module('app')
  .controller('CreateCalendarController',
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

      $scope.newEvenement = {
        date: '',
        start: '',
        end: '',
        author: '',
        title: ''
      };

      $scope.newEvenement.author = CurrentUser.user()._id;
      $scope.addEvenement = function() {
        CalendarService.create($scope.newEvenement).then(function(res) {
          console.log('newEvenement', res.data);

          $state.go('user.edit-calendar', {id: res.data.evenement._id});
        });
      };

      $scope.redirectCalendar = function() {
        $state.go('user.calendar');
      };

      $scope.redirectCreateCalendar = function() {
        $state.go('user.create-calendar');
      };
    });
