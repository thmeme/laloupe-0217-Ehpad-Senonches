angular.module('app')
    .controller('UsersController', function($scope, CurrentUser, UserService, $mdDialog, $state) {
      $scope.user = CurrentUser.user();
      function loadAllUsers() {
        UserService.getAll().then(function(res) {
          console.log('listUsers', res);
          $scope.listUsers = res.data;
          console.log('res.data', res.data);
        });
      }
      loadAllUsers();

      $scope.showConfirm = function(ev, id) {
        console.log('ev', ev);
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Voulez-vous supprimer cet utilisateur ?')
          .textContent('')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Supprimer')
          .cancel('Annuler');

        $mdDialog.show(confirm).then(function() {
          UserService.delete(id).then(function(res) {
            console.log('delete', res);
            loadAllUsers();
          }, function (err) {
            console.error('error on show', err);
          });
        });
      };
    });
