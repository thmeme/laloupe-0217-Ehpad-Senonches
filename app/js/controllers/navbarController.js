angular.module('app')
    .controller('NavbarController', function($scope, Auth, CurrentUser, $timeout) {
      $timeout(function(){$(".button-collapse").sideNav();},0);


        $scope.isCollapsed = true;
        $scope.auth = Auth;
        $scope.user = CurrentUser.user();

        $scope.logout = function() {
            Auth.logout();
        };
    });
