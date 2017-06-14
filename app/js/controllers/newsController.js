angular.module('app')
  .controller('NewsController', function($scope, $stateParams, $window, $state, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, NewsService) {
    $scope.user = CurrentUser.user();

    $scope.idNews = $stateParams.id;
    console.log('id', $scope.idNews);

    function loadAllNews() {
      NewsService.getAll().then(function(res) {
        console.log('listNews', res);
        $scope.listNews = res.data;
        console.log('res.data', res.data);
      });
    }
    loadAllNews();

    function loadNews(id) {
      if (id !== undefined) {
        NewsService.getOne($scope.idNews).then(function(res) {
          console.log('res One', res);
          $scope.news = res.data;
        });
      }
    }
    loadNews($scope.idNews);

    $scope.newNews = {
      content: '',
      title: '',
      menu: '',
      image: ''
    };

    $scope.addNews = function() {
      NewsService.create($scope.newNews).then(function(res) {
        console.log('news', $scope.newNews);
        // $scope.newNews.content = '';
        // $scope.newNews.title = '';
        // $scope.newNews.menu = '';
        // $scope.newNews.image = '';
        loadAllNews();
      });
    };



    $scope.updateNews = function() {
      NewsService.update($scope.idNews, $scope.news).then(function(res) {
        console.log('update', res);
      });
    };

    $scope.redirectListNews = function() {
      $state.go('user.news');
    };

    $scope.tinymceOptions = {
      onChange: function(e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      skin: 'ehpad2',
      height: 300,
      theme: 'modern',
      plugins: 'advlist autolink lists colorpicker link textcolor image charmap code table',
      toolbar1: 'undo redo | insert | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | preview media | forecolor backcolor | link image',
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
        // '//www.tinymce.com/css/codepen.min.css'
      ]
    };

    $scope.redirectCreateNews = function() {
      $state.go('user.create-news');
    };

    $scope.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Voulez vous supprimer cet article ?')
        .textContent('Tous les éléments seront définitivement perdus')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Supprimer')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        NewsService.delete(id).then(function(res) {
          loadAllNews();
        });
      });
    };

    $scope.UploadImgModalShow = false;
    $scope.OpenModalUploadImg = function() {
      $scope.UploadImgModalShow = !$scope.UploadImgModalShow;
    };

    $scope.galleryInsertModalShow = false;
    $scope.OpenModalgalleryInsert = function() {
      $scope.galleryInsertModalShow = !$scope.galleryInsertModalShow;
      UploadService.getAll().then(function(res) {
        console.log('load', res);
        $scope.listimages = res.data;
      }, function(err) {
        console.error('error on image load', err);
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

    $scope.insertImg = function(nameImg) {
      $scope.newNews.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.insertImgEditNews = function(nameImg) {
      $scope.news.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.galleryAssociateModalShow = false;
    $scope.OpenModalgalleryAssociate = function() {
      if ($scope.newNews.image) {
        $scope.newNews.image = '';
      } else {
        $scope.galleryAssociateModalShow = !$scope.galleryAssociateModalShow;
        UploadService.getAll().then(function(res) {
          console.log('load', res);
          $scope.listimages = res.data;
        }, function(err) {
          console.error('error on image load', err);
        });
      }
    };

    $scope.associateImg = function(nameImg) {
      $scope.newNews.image += 'uploads/images/' + nameImg;
      console.log('news.image', $scope.newNews.image);
      $scope.galleryAssociateModalShow = false;
    };

    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.listimages = [];
    $scope.numberOfPages = function() {
      return Math.ceil($scope.listimages.length / $scope.pageSize);
    };
    for (var j = 0; j < $scope.listimages.length - 1; j++) {
      $scope.listimages.push("Item " + j);
    }

    $scope.UploadPdfModalShow = false;
    $scope.OpenModalUploadPdf = function() {
      $scope.UploadPdfModalShow = !$scope.UploadPdfModalShow;
    };

    $scope.galleryPdfModalShow = false;
    $scope.OpenModalUrlPdf = function() {
      $scope.galleryPdfModalShow = !$scope.galleryPdfModalShow;
      UploadPdfService.getAll().then(function(res) {
        console.log('loadpdf', res);
        $scope.listPdf = res.data;
        console.log('listpdf', res.data);
      }, function(err) {
        console.error('error on image load', err);
      });
    };

    $scope.decodeURI = function(filename) {
      return decodeURI(filename);
    };

    $scope.currentPagePdf = 0;
    $scope.pageSizePdf = 8;
    $scope.listPdf = [];
    $scope.numberOfPagesPdf = function() {
      return Math.ceil($scope.listPdf.length / $scope.pageSizePdf);
    };
    for (i = 0; i < $scope.listPdf.length - 1; i++) {
      $scope.listPdf.push("Item " + i);
    }

  });
