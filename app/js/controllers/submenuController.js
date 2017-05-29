angular.module('app')
  .controller('SubmenuController', function($scope, $state, $stateParams, $window, UploadService, $timeout, $mdDialog, CurrentUser, SubmenuService) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.menus = [
      "Votre admission",
      "Votre séjour",
      "Vos droits"
    ];
    $scope.idSubmenu = $stateParams.id;
    console.log('id', $scope.idSubmenu);

    function loadSubmenu(id) {
      if (id !== undefined) {
        SubmenuService.getOne($scope.idSubmenu).then(function(res) {
          console.log('res One', res);
          $scope.submenu = res.data;
        }, function (err) {
          console.error('error on getOne', err);
        });
      }
    }
    loadSubmenu($scope.idSubmenu);

    $scope.addSubmenu = function() {
      SubmenuService.create($scope.newSubmenu).then(function(res) {
        console.log('submenu', $scope.newSubmenu);
        $scope.newSubmenu.content = '';
        $scope.newSubmenu.title = '';
        $scope.newSubmenu.menu = '';
        loadAllSubmenus();
      }, function (err) {
        console.error('error on create', err);
      });
    };

    function loadAllSubmenus() {
      SubmenuService.getAll().then(function(res) {
        console.log('listSubmenus', res);
        $scope.listSubmenu = res.data;
        console.log('res.data', res.data);
      }, function (err) {
        console.error('error on loadAllSubmenus', err);
      });
    }
    loadAllSubmenus();

    $scope.updateSubmenu = function() {
      SubmenuService.update($scope.idSubmenu, $scope.submenu).then(function(res) {
        console.log('update', res);
      }, function (err) {
        console.error('error on loadAllSubmenus', err);
      });
    };

    $scope.customFullscreen = false;
    $scope.showConfirm = function(ev, id) {
      console.log('ev', ev);
      // Appending dialog to document.body to cover sidenav in docs app
      var confirm = $mdDialog.confirm()
        .title('Voulez-vous supprimer ce sous-menus ?')
        .textContent('Tous les éléments seront définitivement perdus')
        .ariaLabel('Lucky day')
        .targetEvent(ev)
        .ok('Supprimer')
        .cancel('Annuler');

      $mdDialog.show(confirm).then(function() {
        SubmenuService.delete(id).then(function(res) {
          console.log('delete', res);
          loadAllSubmenus();
        }, function (err) {
          console.error('error on show', err);
        });
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
    $scope.redirect = function() {
      $state.go('user.submenu');
    };

    $scope.redirectCreateSubmenu = function() {
      $state.go('user.create-submenu');
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

    // function loadAllimages() {
    //   UploadService.getAll().then(function(res) {
    //     console.log('load', res);
    //     $scope.listimages = res.data;
    //   }, function (err) {
    //     console.error('error on image load', err);
    //   });
    // }



    $scope.uploadImage = function() {
      console.log('image:', $scope.image);
      if ($scope.upload_form.file.$valid && $scope.image.file) { //check if from is valid
        uploadImage($scope.image.file);
         //call upload function
        //  console.log('res add', $scope.newImage.title);
      }
    };


  });
