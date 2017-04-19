angular.module('app')
    .controller('SubmenuController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
