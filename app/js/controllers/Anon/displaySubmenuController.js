angular.module('app')
  .controller('DisplaySubmenuController', function($scope, $state, $stateParams, $window, $sce, UploadPdfService, CalendarService, UploadService, $timeout, $mdDialog, CurrentUser, SubmenuService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();

    $scope.auth = Auth;
    $scope.idSubmenu = $stateParams.id;

    function loadAllSubmenusAnon() {
      SubmenuService.getAllAnon().then(function(res) {
        $scope.listSubmenusAnon = res.data;
      });
    }
    loadAllSubmenusAnon();

    $scope.uCanTrust = function(string) {
      return $sce.trustAsHtml(string);
    };

    function loadSubmenu(id) {
      if (id !== undefined) {
        SubmenuService.getOne($scope.idSubmenu).then(function(res) {
          $scope.submenu = res.data;
          $scope.submenu.content = $sce.trustAsHtml(res.data.content);
        });
      }
    }
    loadSubmenu($scope.idSubmenu);

    function loadAllEvenementsAnon() {
      CalendarService.getAllAnon().then(function(res) {
        $scope.listEvenementsAnon = res.data;
      });
    }
    loadAllEvenementsAnon();

    $scope.currentPageCalendar = 0;
    $scope.pageSizeCalendar = 4;
    $scope.listEvenementsAnon = [];
    $scope.numberOfPagesCalendar = function() {
      return Math.ceil($scope.listEvenementsAnon.length / $scope.pageSizeCalendar);
    };
    for (var i = 0; i < $scope.listEvenementsAnon.length - 1; i++) {
      $scope.listEvenementsAnon.push("Item " + i);
    }
  });
