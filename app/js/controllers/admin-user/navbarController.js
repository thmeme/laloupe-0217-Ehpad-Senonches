angular.module('app')
  .controller('NavbarController', function($scope, Auth, CurrentUser, $timeout, $mdSidenav, $log) {


    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleLeft = buildToggler('left');

    $scope.isOpenLeft = function() {
      return $mdSidenav('left').isOpen();
    };
    $scope.close = function() {
      $mdSidenav('left').close()
        .then(function() {
          $log.debug("close LEFT is done");
        });
    };

    $scope.isCollapsed = true;
    $scope.auth = Auth;
    $scope.user = CurrentUser.user();

    $scope.logout = function() {
      Auth.logout();
    };
  });
