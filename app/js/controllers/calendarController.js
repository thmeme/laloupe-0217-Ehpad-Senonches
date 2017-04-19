angular.module('app')
    .controller('CalendarController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
