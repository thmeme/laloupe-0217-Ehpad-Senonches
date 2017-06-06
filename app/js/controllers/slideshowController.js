// angular.module('app')
//   .controller('SlideshowController', function($scope, $stateParams, $window, $state, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, newsService) {
//     $scope.user = CurrentUser.user();
//
//     $scope.idNews = $stateParams.id;
//     console.log('id', $scope.idNews);
//
//
//     $scope.redirectListNews = function() {
//       $state.go('user.news');
//     };
//
//
//
//
//     $scope.showConfirm = function(ev, id) {
//       // Appending dialog to document.body to cover sidenav in docs app
//       var confirm = $mdDialog.confirm()
//         .title('Voulez vous supprimer cet article ?')
//         .textContent('Tous les éléments seront définitivement perdus')
//         .ariaLabel('Lucky day')
//         .targetEvent(ev)
//         .ok('Supprimer')
//         .cancel('Annuler');
//
//       $mdDialog.show(confirm).then(function() {
//         newsService.delete(id).then(function(res) {
//           loadAllNews();
//         });
//       });
//     };
//
//     $scope.UploadImgModalShown = false;
//     $scope.OpenModalUploadImg = function() {
//       $scope.UploadImgModalShown = !$scope.UploadImgModalShown;
//     };
//
//     $scope.galleryInsertModalShown = false;
//     $scope.OpenModalgalleryInsert = function() {
//       $scope.galleryInsertModalShown = !$scope.galleryInsertModalShown;
//       UploadService.getAll().then(function(res) {
//         console.log('load', res);
//         $scope.listimages = res.data;
//       }, function(err) {
//         console.error('error on image load', err);
//       });
//     };
//
//     $scope.currentPageNews = 0;
//     $scope.pageSizeNews = 5;
//     $scope.listNews = [];
//     $scope.numberOfPagesNews = function() {
//       return Math.ceil($scope.listNews.length / $scope.pageSizeNews);
//     };
//     for (var i = 0; i < $scope.listNews.length - 1; i++) {
//       $scope.listNews.push("Item " + i);
//     }
//
//     $scope.insertImg = function(nameImg) {
//       $scope.newNews.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
//       $scope.galleryInsertModalShown = false;
//     };
//
//     $scope.insertImgEditNews = function(nameImg) {
//       $scope.news.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
//       $scope.galleryInsertModalShown = false;
//     };
//
//     $scope.galleryAssociateModalShown = false;
//     $scope.OpenModalgalleryAssociate = function() {
//       // if ($scope.newNews.image) {
//       //   $scope.newNews.image = '';
//       // } else {
//         $scope.galleryAssociateModalShown = !$scope.galleryAssociateModalShown;
//         UploadService.getAll().then(function(res) {
//           console.log('load', res);
//           $scope.listimages = res.data;
//         }, function(err) {
//           console.error('error on image load', err);
//         });
//       // }
//     };
//
//     $scope.associateImg = function(nameImg) {
//       $scope.newNews.image += 'uploads/images/' + nameImg;
//       console.log('news.image', $scope.newNews.image);
//       $scope.galleryAssociateModalShown = false;
//     };
//
//     $scope.currentPage = 0;
//     $scope.pageSize = 12;
//     $scope.listimages = [];
//     $scope.numberOfPages = function() {
//       return Math.ceil($scope.listimages.length / $scope.pageSize);
//     };
//     for (var i = 0; i < $scope.listimages.length - 1; i++) {
//       $scope.listimages.push("Item " + i);
//     }
//
//     $scope.UploadPdfModalShown = false;
//     $scope.OpenModalUploadPdf = function() {
//       $scope.UploadPdfModalShown = !$scope.UploadPdfModalShown;
//     };
//
//     $scope.galleryPdfModalShown = false;
//     $scope.OpenModalUrlPdf = function() {
//       $scope.galleryPdfModalShown = !$scope.galleryPdfModalShown;
//       UploadPdfService.getAll().then(function(res) {
//         console.log('loadpdf', res);
//         $scope.listPdf = res.data;
//         console.log('listpdf', res.data);
//       }, function(err) {
//         console.error('error on image load', err);
//       });
//     };
//
//     $scope.decodeURI = function(filename) {
//       return decodeURI(filename);
//     };
//
//     $scope.currentPagePdf = 0;
//     $scope.pageSizePdf = 8;
//     $scope.listPdf = [];
//     $scope.numberOfPagesPdf = function() {
//       return Math.ceil($scope.listPdf.length / $scope.pageSizePdf);
//     };
//     for (i = 0; i < $scope.listPdf.length - 1; i++) {
//       $scope.listPdf.push("Item " + i);
//     }
//
//   });
