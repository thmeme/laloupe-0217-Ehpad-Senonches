angular.module('app')
  .controller('SlideshowController', function($scope, $stateParams, $rootScope, $window, $state, SlideshowService, UploadService, UploadLargeService, $timeout, $mdDialog, CurrentUser) {
    $scope.user = CurrentUser.user();

    $scope.idImg = $stateParams.id;

    $scope.showConfirm = function(ev, id) {
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

    $scope.galleryAssociateModalShow = false;
    $scope.OpenModalgalleryAssociate = function() {
      $scope.galleryAssociateModalShow = !$scope.galleryAssociateModalShow;
      UploadLargeService.getAll().then(function(res) {
        $scope.listImagesLarges = res.data;
      });
    };

    loadImgSlideshow = function() {
      SlideshowService.getAll().then(function(res) {
        $scope.listImgSlideShow = res.data;

      });
    };
    loadImgSlideshow();

    $scope.newImgSlideShow = {
      date: '',
      name: '',
    };

    $scope.addImgLargeSlideShow = function(img) {
      var newImgSlideShow = {
        name: img
      };
      SlideshowService.create(newImgSlideShow).then(function(res) {
        $scope.galleryAssociateModalShow = false;
        loadImgSlideshow();
      });
    };

    $scope.showConfirm = function(ev, id) {
      swal({
        text: "Voulez-vous supprimer cette image du carrousel ?",
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
      }).then(function() {
        SlideshowService.delete(id).then(function(res) {
            swal({
              type: 'success',
              showConfirmButton: false,
              text: 'Element supprimé',
              timer: 2000
            });
            loadImgSlideshow();
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

    $scope.updateSlideshow = function() {
      SlideshowService.update($scope.img._id, $scope.listImgSlideShow).then(function(res) {}, function(err) {});
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
  });
