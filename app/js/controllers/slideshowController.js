angular.module('app')
  .controller('SlideshowController', function($scope, $stateParams, $rootScope ,$window, $state, SlideshowService, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, newsService) {
    $scope.user = CurrentUser.user();

    $scope.idImg = $stateParams.id;
    console.log('id', $scope.idImg);

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
        newsService.delete(id).then(function(res) {
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
      }, function(err) {
        console.error('err slideshow', err);
      });
    };

    $scope.listImgSlideShow = [];

    loadImgSlideshow = function () {
      SlideshowService.getAll().then(function(res) {
        console.log('loadImgSlideshow', res);
        $scope.listImgSlideShow = res.data;
      });
    };
    loadImgSlideshow();

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


    $rootScope.$on('dropEvent', function(evt, dragged, dropped) {
        var i, oldIndex1, oldIndex2;
        for(i=0; i<$scope.listImgSlideShow.length; i++) {
            var c = $scope.listImgSlideShow[i];
            if(dragged.name === img.name) {
                oldIndex1 = i;
            }
            if(dropped.name === img.name) {
                oldIndex2 = i;
            }
        }
        var temp = $scope.listImgSlideShow[oldIndex1];
        $scope.listImgSlideShow[oldIndex1] = $scope.listImgSlideShow[oldIndex2];
        $scope.listImgSlideShow[oldIndex2] = temp;
        $scope.$apply();
    });



  });
