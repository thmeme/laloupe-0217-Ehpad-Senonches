angular.module('app')
  .controller('UploadController', function($scope, $state, $stateParams, $window, UploadPdfService, UploadService, UploadLargeService, $timeout, $mdDialog, CurrentUser) {


    $scope.image = {
      file: {},
      progress: ''
    };

    function uploadImage(imageFile) {
      UploadService.uploadImage(imageFile).then(function(res) {
        if (res.data.success) {} else {
        }
      }, function(err) {}, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.image.progress = 'progress: ' + progressPercentage + '% ';
      });
    }

    $scope.uploadImage = function() {
      if ($scope.upload_form.file.$valid && $scope.image.file) {
        uploadImage($scope.image.file);

      }
    };
    $scope.imageLarge = {
      file: {},
      progress: ''
    };

    function uploadImageLarge(imageFile) {
      UploadLargeService.uploadImageLarge(imageFile).then(function(res) {
        if (res.data.success) {} else {
        }
      }, function(err) {}, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.image.progress = 'progress large: ' + progressPercentage + '% ';
      });
    }

    $scope.uploadImageLarge = function() {
      if ($scope.upload_form.file.$valid && $scope.imageLarge.file) {
        uploadImageLarge($scope.imageLarge.file);
      }
    };

    $scope.pdf = {
      file: {},
      progress: ''
    };

    function uploadPdf(pdfFile) {
      UploadPdfService.uploadPdf(pdfFile).then(function(res) {
        if (res.data.success) {} else {
        }
      }, function(err) {}, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.pdf.progress = 'progress: ' + progressPercentage + '% ';
      });
    }

    $scope.uploadPdf = function() {
      if ($scope.upload_form.file.$valid && $scope.pdf.file) {
        uploadPdf($scope.pdf.file);
      }
    };
  });
