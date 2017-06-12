angular.module('app')
  .controller('SlideshowController', function($scope, $stateParams, $rootScope ,$window, $state, SlideshowService, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, newsService) {
    $scope.user = CurrentUser.user();

    $scope.idImg = $stateParams.id;
    console.log('id', $scope.idImg);

    $scope.showConfirm = function(ev, id) {
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Voulez vous supprimer cette image ?')
        .textContent('Tous les éléments seront définitivement perdus')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Supprimer')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        SlideshowService.delete(id).then(function(res) {
          loadImgSlideshow();
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
    for (var k = 0; k < $scope.listNews.length - 1; k++) {
      $scope.listNews.push("Item " + k);
    }

    // $scope.insertImg = function(nameImg) {
    //   $scope.newNews.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
    //   $scope.galleryInsertModalShow = false;
    // };
    //
    // $scope.insertImgEditNews = function(nameImg) {
    //   $scope.news.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
    //   $scope.galleryInsertModalShow = false;
    // };

    $scope.galleryAssociateModalShow = false;
    $scope.OpenModalgalleryAssociate = function() {
        $scope.galleryAssociateModalShow = !$scope.galleryAssociateModalShow;
        UploadService.getAll().then(function(res) {
          console.log('load', res);
          $scope.listimages = res.data;
        }, function(err) {
          console.error('error on image load', err);
        });
    };

    $scope.newImgSlideShow = {
      id :'',
      name :'',
    };

    $scope.addImgSlideShow = function (img) {
      var newImgSlideShow = {
        name: img
      };
      SlideshowService.create(newImgSlideShow).then(function(res){
        console.log('img Slideshow', res);
        $scope.galleryAssociateModalShow = false;
        loadImgSlideshow();


      }, function(err) {
        console.error('err slideshow', err);
      });
    };



    $scope.currentPage = 0;
    $scope.pageSize = 12;
    $scope.listimages = [];
    $scope.numberOfPages = function() {
      return Math.ceil($scope.listimages.length / $scope.pageSize);
    };
    for (var i = 0; i < $scope.listimages.length - 1; i++) {
      $scope.listimages.push("Item " + i);
    }

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

    $scope.listImgSlideShow = [];

    loadImgSlideshow = function () {
      SlideshowService.getAll().then(function(res) {
        console.log('loadImgSlideshow', res);
        $scope.listImgSlideShow = res.data;

      });
    };
    loadImgSlideshow();

    $scope.$watch('llistImgSlideShow', function(listImgSlideShow) {
        $scope.modelAsJson = angular.toJson(listImgSlideShow, true);
    }, true);
    console.log('modelJson', $scope.modelAsJson);









  });
