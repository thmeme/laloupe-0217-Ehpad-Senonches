angular.module('app')
  .controller('UploadController', function($scope, $state, $stateParams, $window, UploadPdfService, UploadService, UploadLargeService, $timeout, $mdDialog, CurrentUser) {


    $scope.image = {
      file: {},
      progress: ''
    };

    function uploadImage(imageFile) {
      UploadService.uploadImage(imageFile).then(function(res) {
        if (res.data.success) { //validate success
          console.log('Success ' + res.config.data.name + 'uploaded. Response: ');
        } else {
          console.error('An error occured during upload (file:' + res.config.data.name + ')');
        }
      }, function(err) { //catch error
        console.log('Error status: ' + err.status);
      }, function(evt) {
        console.log('evt during upload: ', evt);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress (file: ' + evt.config.data.name + '): ' + progressPercentage + '% ');
        $scope.image.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
      });
    }

    $scope.uploadImage = function() {
      if ($scope.upload_form.file.$valid && $scope.image.file) { //check if from is valid
        uploadImage($scope.image.file);

      }
    };
    $scope.imageLarge = {
      file: {},
      progress: ''
    };

    function uploadImageLarge(imageFile) {
      UploadLargeService.uploadImageLarge(imageFile).then(function(res) {
        console.log('After upload: ', res);
        if (res.data.success) { //validate success
          console.log('Success ' + res.config.data.name + 'uploaded. Response: ');
        } else {
          console.error('An error occured during upload (file:' + res.config.data.name + ')');
        }
      }, function(err) { //catch error
        console.log('Error status: ' + err.status);
      }, function(evt) {
        console.log('evt during upload large: ', evt);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress (file: ' + evt.config.data.name + '): ' + progressPercentage + '% ');
        $scope.image.progress = 'progress large: ' + progressPercentage + '% '; // capture upload progress
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
        if (res.data.success) { //validate success
          console.log('Success ' + res.config.data.name + 'uploaded. Response: ');
        } else {
          console.error('An error occured during upload (file:' + res.config.data.name + ')');
        }
      }, function(err) { //catch error
        console.log('Error status: ' + err.status);
      }, function(evt) {
        console.log('evt during upload: ', evt);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress (file: ' + evt.config.data.name + '): ' + progressPercentage + '% ');
        $scope.pdf.progress = 'progress: ' + progressPercentage + '% '; 
      });
    }

    $scope.uploadPdf = function() {
      if ($scope.upload_form.file.$valid && $scope.pdf.file) {
        uploadPdf($scope.pdf.file);
      }
    };
  });
