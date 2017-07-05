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

    // $scope.showConfirm = function(ev, id) {
    //   console.log('ev', ev);
    //   // Appending dialog to document.body to cover sidenav in docs app
    //   var confirm = $mdDialog.confirm()
    //     .title('Voulez-vous supprimer cet utilisateur ?')
    //     .textContent('Tous les éléments seront définitivement perdus')
    //     .ariaLabel('Lucky day')
    //     .targetEvent(ev)
    //     .ok('Supprimer')
    //     .cancel('Annuler');
    //
    //   $mdDialog.show(confirm).then(function() {
    //     UserService.delete(id).then(function(res) {
    //       console.log('delete', res);
    //       loadAllUsers();
    //     }, function (err) {
    //       console.error('error on show', err);
    //     });
    //   });
    // };

    $scope.showConfirm = function(ev, id) {
      swal({
        text: "Voulez-vous supprimer cet utilisateur ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      }).then(function() {
        UserService.delete(id).then(function(res) {
            swal({
              type: 'success',
              showConfirmButton: false,
              text: 'Element supprimé',
              timer: 2000
            });
            loadAllUsers();
          },
          function(err) {
            swal({
              text: 'Une erreur s\'est produite',
              timer: 2000
            });
          });
      });
    };

  });
