angular.module('app')
.controller('editUserController',
  function($scope, $state, $stateParams, CurrentUser, UserService) {
    $scope.user = CurrentUser.user();
    console.log($state.params.id);

    UserService.getOne($state.params.id).then(function(res) {
      $scope.user = res.data;
      $scope.user.role = $scope.user.isAdmin ? 'admin' : 'user';
      console.log($scope.user.role, $scope.user.isAdmin);
    });
    $scope.idUser = $stateParams.id;
    $scope.updateUser = function() {
      $scope.user.isAdmin = $scope.user.role === 'admin';
      UserService.update($scope.idUser, $scope.user).then(function(res) {
        console.log('update', res);
      }, function (err) {
        console.error('error on loadAllSubmenus', err);
      });
    };
    $scope.passwordPath = function() {
      $state.go('user.edit-password');
    };
    $scope.redirect = function() {
      $state.go('user.users');
    };
});
