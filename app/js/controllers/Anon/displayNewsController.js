angular.module('app')
  .controller('DisplayNewsController', function($scope, $stateParams, $window, $sce, $state, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, NewsService, Auth) {

    $scope.user = CurrentUser.user();

    $scope.auth = Auth;

    $scope.idNews = $stateParams.id;
    console.log('id', $scope.idNews);

    function loadAllNewsAnon() {
      NewsService.getAllAnon().then(function(res) {
        console.log('listNewsAnon', res);
        $scope.listNewsAnon = res.data;

        console.log('res.data Anon', res.data);
      });
    }
    loadAllNewsAnon();

    function loadNews(id) {
      if (id !== undefined) {
        NewsService.getOne($scope.idNews).then(function(res) {
          console.log('res One', res);
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
    $scope.pageSizeNews = 5;
    $scope.listNewsAnon = [];
    $scope.numberOfPagesNews = function() {
      return Math.ceil($scope.listNewsAnon.length / $scope.pageSizeNews);
    };
    for (var i = 0; i < $scope.listNewsAnon.length - 1; i++) {
      $scope.listNewsAnon.push("Item " + i);
    }
  });
