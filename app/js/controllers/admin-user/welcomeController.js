angular.module('app')
  .controller('WelcomeController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, WelcomeService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

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
      });
    };

    var idWel = '';

    function loadWelcome(id) {
        WelcomeService.getOne(idWel).then(function(res) {
          console.log('res One', res.data);
          $scope.welcome = res.data;
          console.log('$scope.Welcome', $scope.welcome);
        }, function(err) {
          console.error('error on getOne Welcome', err);
        });
    }


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
  });
