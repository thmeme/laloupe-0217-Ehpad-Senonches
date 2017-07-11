angular.module('app')
  .controller('NewsController', function($scope, $stateParams, $window, $state, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, NewsService, Auth) {

    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.idNews = $stateParams.id;

    function loadAllNews() {
      NewsService.getAll().then(function(res) {
        $scope.listNews = res.data;
      });
    }
    loadAllNews();

    $scope.news = {
      content: '',
      title: '',
      image: '',
      author: ''
    };

    function loadNews(id) {
      if (id !== undefined) {
        NewsService.getOne($scope.idNews).then(function(res) {
          $scope.news = res.data;
        });
      }
    }
    loadNews($scope.idNews);

    $scope.redirectListNews = function() {
      $state.go('user.news');
    };


    $scope.redirectCreateNews = function() {
      $state.go('user.create-news');
    };

    $scope.showConfirm = function(ev, id) {
      swal({
        text: "Voulez-vous supprimer ce sous-menus ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      }).then(function() {
        NewsService.delete(id).then(function(res) {
            swal({
              type: 'success',
              showConfirmButton: false,
              text: 'Element supprimé',
              timer: 2000
            });
            loadAllNews();
          },
          function(err) {
            swal({
              type: 'error',
              title: 'Une erreur s\'est produite',
              text: 'Vous pouvez réessayer',
              timer: 2000
            });
          });
      });
    };

    $scope.currentPageNews = 0;
    $scope.pageSizeNews = 5;
    $scope.listNews = [];
    $scope.numberOfPagesNews = function() {
      return Math.ceil($scope.listNews.length / $scope.pageSizeNews);
    };
    for (var i = 0; i < $scope.listNews.length - 1; i++) {
      $scope.listNews.push("Item " + i);
    }
  });
