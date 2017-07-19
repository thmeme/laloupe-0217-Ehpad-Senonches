angular.module('app')
  .controller('DisplayNewsController', function($scope, $stateParams, $window, $sce, $state, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, NewsService, Auth) {

    $scope.user = CurrentUser.user();

    $scope.auth = Auth;

    $scope.idNews = $stateParams.id;

    function loadAllNewsAnon() {
      NewsService.getAllAnon().then(function(res) {
        $scope.listNewsAnon = res.data;
      });
    }
    loadAllNewsAnon();

    function loadNews(id) {
      if (id !== undefined) {
        NewsService.getOne($scope.idNews).then(function(res) {
          $scope.news = res.data;
          $scope.news.content = $sce.trustAsHtml(res.data.content);
        });
      }
    }
    loadNews($scope.idNews);

    $scope.uCanTrust = function(string) {
      return $sce.trustAsHtml(string);
    };

    $scope.currentPageNews = 0;
    $scope.pageSizeNews = 4;
    $scope.listNewsAnon = [];
    $scope.numberOfPagesNews = function() {
      return Math.ceil($scope.listNewsAnon.length / $scope.pageSizeNews);
    };
    for (var i = 0; i < $scope.listNewsAnon.length - 1; i++) {
      $scope.listNewsAnon.push("Item " + i);
    }
  });
