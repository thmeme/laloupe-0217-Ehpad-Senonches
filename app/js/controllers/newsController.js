angular.module('app')
  .controller('newsController', function($scope, $stateParams, $state, UploadService, $mdDialog, CurrentUser, newsService) {
      $scope.user = CurrentUser.user();

      $scope.idNews = $stateParams.id;
      console.log('id', $scope.idNews);

      function loadNews(id) {
        if (id !== undefined) {
          newsService.getOne($scope.idNews).then(function(res) {
            console.log('res One', res);
            $scope.news = res.data;
          });
        }
      }
      loadNews($scope.idNews);

      $scope.addNews = function() {
        newsService.create($scope.newNews).then(function(res) {
          console.log('news', $scope.newNews);
          $scope.newNews.content = '';
          $scope.newNews.title = '';
          $scope.newNews.menu = '';
          loadAllNews();
        });
      };

      function loadAllNews() {
        newsService.getAll().then(function(res) {
          console.log('listNews', res);
          $scope.listNews = res.data;
          console.log('res.data', res.data);
        });
      }
      loadAllNews();

      $scope.updateNews = function() {
        newsService.update($scope.idNews, $scope.news).then(function(res) {
          console.log('update', res);
        });
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


      $scope.showConfirm = function(ev, id) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Voulez vous supprimer cet article ?')
          .textContent('Une fois supprimé, celui-ci ne sera pas récupérable')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('OUI')
          .cancel('NON');

        $mdDialog.show(confirm).then(function() {
          newsService.delete(id).then(function(res) {
            loadAllNews();
          });
        });
      };

      $scope.image = {
        file: {},
        progress: ''
      };

      function uploadImage(imageFile) {
        UploadService.uploadImage(imageFile).then(function(res) {
          console.log('After upload: ', res);
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
        console.log('image:', $scope.image);
        if ($scope.upload_form.file.$valid && $scope.image.file) { //check if from is valid
          uploadImage($scope.image.file);
           //call upload function
          //  console.log('res add', $scope.newImage.title);
        }
      };

      $scope.modalShown = false;

      $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
        UploadService.getAll().then(function(res) {
          console.log('load', res);
          $scope.listimages = res.data;
        }, function (err) {
          console.error('error on image load', err);
        });
      };


      $scope.currentPage = 0;
      $scope.pageSize = 5;
      $scope.listimages = [];
      $scope.numberOfPages=function(){
          return Math.ceil($scope.listimages.length/$scope.pageSize);
      };
      for (var i=0; i<$scope.listimages.length -1; i++) {
          $scope.listimages.push("Item "+i);
      }



    });
