angular.module('app')
    .controller('NewsController', function($scope, CurrentUser) {
      $scope.user = CurrentUser.user();
    });
