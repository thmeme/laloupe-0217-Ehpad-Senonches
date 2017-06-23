angular.module('app')
    .controller('AdminController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
