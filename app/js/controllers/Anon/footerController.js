angular.module('app')
    .controller('FooterController', function($scope, SubmenuService, NewsService) {


      function loadAllSubmenusAnon() {
        SubmenuService.getAllAnon().then(function(res) {
          console.log('listSubmenusAnon', res);
          $scope.listSubmenusAnon = res.data;
          console.log('res.data Anon', res.data);
        });
      }
      loadAllSubmenusAnon();

      function loadAllNewsAnon() {
        NewsService.getAllAnon().then(function(res) {
          console.log('listNewsAnon', res);
          $scope.listNewsAnon = res.data;

          console.log('res.data Anon', res.data);
        });
      }
      loadAllNewsAnon();
    });
