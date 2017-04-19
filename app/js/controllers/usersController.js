angular.module('app')
    .controller('UsersController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
