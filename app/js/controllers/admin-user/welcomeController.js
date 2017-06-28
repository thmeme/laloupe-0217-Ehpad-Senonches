angular.module('app')
  .controller('WelcomeController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, WelcomeService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.idWelcome = $stateParams.id;
    console.log('id', $scope.idWelcome);

    $scope.welcome = {
      title: '',
      content: '',
      author: '',
    };

    $scope.welcome.author = CurrentUser.user()._id;

    $scope.addWelcome = function() {
      WelcomeService.update('', $scope.welcome).then(function(res) {
        console.log('welcome', $scope.welcome);
        console.log('auteur', $scope.welcome.author);
      // $state.go('user.edit-submenu', {id: res.data.welcome._id});
      });
    };

    // function loadAllWelcomes() {
    //   // if (id !== undefined)
    //   WelcomeService.getAll().then(function(res) {
    //     console.log('listWelcomes', res);
    //     $scope.Welcome = res.data;
    //     console.log('res.data', res.data);
    //   }, function(err) {
    //     console.error('error on loadAllWelcomes', err);
    //   });
    // }
    // loadAllWelcomes();

    // function loadWelcome() {
    //     WelcomeService.getOne($scope.welcome.id).then(function(res) {
    //       console.log('res One', res);
    //       $scope.welcome = res.data;
    //
    //     }, function(err) {
    //       console.error('error on getOne Welcome', err);
    //     });
    //
    // }
    // loadWelcome($scope.idWelcome);



    $scope.updateWelcome = function() {
      WelcomeService.update($scope.idWelcome, $scope.welcome).then(function(res) {
        console.log('update', res);
      }, function(err) {
        console.error('error on loadAllWelcomes', err);
      });
    };
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
