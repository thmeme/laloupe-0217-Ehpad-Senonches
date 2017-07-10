angular.module('app')
  .controller('WelcomeController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, WelcomeService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.welcome = {
      title: '',
      content: '',
      signature: '',
      author: ''
    };

    $scope.welcome.author = CurrentUser.user()._id;

    $scope.addWelcome = function() {
      WelcomeService.update('', $scope.welcome).then(function(res) {
        if (res.status === 200) {
          swal({
            showConfirmButton: false,
            type: 'success',
            text: 'Les éléments ont été enregistrés avec succès',
            timer: 2000
          }).then(function() {},
            function(dismiss) {
              if (dismiss === 'timer') {}
            }
          );
        }
      }, function(err) {
        swal({
          showConfirmButton: false,
          type: 'error',
          text: 'Une erreur s\'est produite',
          timer: 2000
        });
      });
    };

    var idWel = '';

    function loadWelcome(id) {
      WelcomeService.getOne(idWel).then(function(res) {
        $scope.welcome = res.data;
      }, function(err) {});
    }


    function loadAllWelcomes() {
      WelcomeService.getAll().then(function(res) {
        $scope.welcome = res.data[0];
        idWel = $scope.welcome._id;
        loadWelcome(idWel);
      }, function(err) {});
    }
    loadAllWelcomes();
  });
