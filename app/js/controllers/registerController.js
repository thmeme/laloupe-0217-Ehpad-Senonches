angular.module('app')
  .controller('RegisterController', function($scope, $state, UserService, CurrentUser) {
    if (!CurrentUser.user().isAdmin) {
      $state.go('user.dashboard');
    }

    $scope.register = function() {
      var user = $scope.user;
      user.isAdmin = $scope.user.role === 'admin';
      UserService.create(user).then(function() {
        $state.go('user.admin');
      });
    };

  });
