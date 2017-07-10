angular.module('app')
  .controller('DisplayAgendaController', function($scope, $state, $stateParams, $window, $mdDialog, CurrentUser, CalendarService) {
    $scope.user = CurrentUser.user();
    $scope.evenement = [];

    CalendarService.getOne($state.params.id).then(function(res) {
      $scope.evenement = res.data;
      $scope.evenement.date = new Date($scope.evenement.date);
      $scope.evenement.start = new Date($scope.evenement.start);
      $scope.evenement.end = new Date($scope.evenement.end);
    });
    $scope.updateEvenement = function() {
      CalendarService.update($state.params.id, $scope.evenement).then(function(res) {});
    };
  });
