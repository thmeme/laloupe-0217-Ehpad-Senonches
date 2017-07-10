angular.module('app')
  .controller('FooterController', function($scope, SubmenuService, NewsService) {

    function loadAllSubmenusAnon() {
      SubmenuService.getAllAnon().then(function(res) {
        $scope.listSubmenusAnon = res.data;
      });
    }
    loadAllSubmenusAnon();

    function loadAllNewsAnon() {
      NewsService.getAllAnon().then(function(res) {
        $scope.listNewsAnon = res.data;
      });
    }
    loadAllNewsAnon();
  });
