angular.module('app')
  .controller('editUserController',
    function($scope, $state, $stateParams, CurrentUser, UserService) {
      $scope.user = CurrentUser.user();

      UserService.getOne($state.params.id).then(function(res) {
        $scope.user = res.data;
        $scope.user.role = $scope.user.isAdmin ? 'admin' : 'user';
      });

      $scope.idUser = $stateParams.id;

      $scope.updateUser = function() {
        $scope.user.isAdmin = $scope.user.role === 'admin';
        UserService.update($scope.idUser, $scope.user).then(function(res) {
          if (res.status === 200) {
            swal({
              showConfirmButton: false,
              type: 'success',
              text: 'L\'utilisateur a été enregistré avec succès',
              timer: 2000
            });
          }
        }, function(err) {
          swal({
            showConfirmButton: false,
            type: 'error',
            title: 'Une erreur s\'est produite',
            text: 'Vous pouvez réessayer',
            timer: 2000
          });
        });
      };

      $scope.passwordPath = function() {
        $state.go('user.edit-password');
      };
      $scope.redirect = function() {
        $state.go('user.users');
      };
    });
