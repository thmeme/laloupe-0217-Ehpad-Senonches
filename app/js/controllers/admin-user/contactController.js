angular.module('app')
  .controller('ContactController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, WelcomeService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    // $scope.idWelcome = $stateParams.id;
    console.log('id', $scope.idWelcome);

    $scope.welcome = {
      title: '',
      content: '',
      signature: '',
      author: ''
    };

    $scope.welcome.author = CurrentUser.user()._id;

    $scope.addWelcome = function() {
      WelcomeService.update('', $scope.welcome).then(function(res) {
        console.log('welcome',res);
        console.log('auteur', $scope.welcome.author);
        $scope.welcome = res.data.welcome;
      // $state.go('user.edit-submenu', {id: res.data.welcome._id});
      });
    };

    var idWel = '';
    function loadAllWelcomes() {
      WelcomeService.getAll().then(function(res) {
        console.log('listWelcomes', res);
        $scope.welcome = res.data[0];
        console.log('id Welcome', $scope.welcome._id);
        idWel = $scope.welcome._id;
        console.log('idWel', idWel);
        loadWelcome(idWel);
      }, function(err) {
        console.error('error on loadAllWelcomes', err);
      });
    }
    loadAllWelcomes();



    console.log('idWel', idWel);

    function loadWelcome(id) {
        WelcomeService.getOne(idWel).then(function(res) {
          console.log('res One', res.data);
          $scope.welcome = res.data;
          console.log('$scope.Welcome', $scope.welcome);
        }, function(err) {
          console.error('error on getOne Welcome', err);
        });
    }




    // $scope.updateWelcome = function() {
    //   WelcomeService.update($scope.idWelcome, $scope.welcome).then(function(res) {
    //     console.log('update', res);
    //   }, function(err) {
    //     console.error('error on loadAllWelcomes', err);
    //   });
    // };
    //
    // $scope.customFullscreen = false;
    // $scope.showConfirm = function(ev, id) {
    //   console.log('ev', ev);
    //   // Appending dialog to document.body to cover sidenav in docs app
    //   var confirm = $mdDialog.confirm()
    //     .title('Voulez-vous supprimer ce sous-menus ?')
    //     .textContent('Tous les éléments seront définitivement perdus')
    //     .ariaLabel('Lucky day')
    //     .targetEvent(ev)
    //     .ok('Supprimer')
    //     .cancel('Annuler');
    //
    //   $mdDialog.show(confirm).then(function() {
    //     SubmenuService.delete(id).then(function(res) {
    //       console.log('delete', res);
    //       loadAllSubmenus();
    //     }, function(err) {
    //       console.error('error on show', err);
    //     });
    //   });
    // };

    // $scope.redirect = function() {
    //   $state.go('user.submenu');
    // };
    //
    // $scope.redirectCreateSubmenu = function() {
    //   $state.go('user.create-submenu');
    // };



  });
