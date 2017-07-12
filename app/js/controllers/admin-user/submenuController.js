angular.module('app')
  .controller('SubmenuController', function($scope, $state, $stateParams, $window, $sce, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, SubmenuService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.menus = [
      "Votre admission",
      "Votre séjour",
      "Vos droits"
    ];

    $scope.auth = Auth;
    $scope.idSubmenu = $stateParams.id;

    function loadAllSubmenus() {
      SubmenuService.getAll().then(function(res) {
        $scope.listSubmenu = res.data;
      }, function(err) {});
    }
    loadAllSubmenus();

    $scope.uCanTrust = function(string) {
      return $sce.trustAsHtml(string);
    };

    function loadSubmenu(id) {
      if (id !== undefined) {
        SubmenuService.getOne($scope.idSubmenu).then(function(res) {
          $scope.submenu = res.data;
          $scope.submenu.content = $sce.trustAsHtml(res.data.content);
        }, function(err) {});
      }
    }
    loadSubmenu($scope.idSubmenu);

    $scope.newSubmenu = {
      content: '',
      title: '',
      menu: '',
      author: ''
    };
    $scope.newSubmenu.author = CurrentUser.user()._id;

    $scope.addSubmenu = function() {
      SubmenuService.create($scope.newSubmenu).then(function(res) {
        $state.go('user.edit-submenu', {
          id: res.data.submenu._id
        });
      }, function(err) {});
    };

    $scope.updateSubmenu = function() {
      SubmenuService.update($scope.idSubmenu, $scope.submenu).then(function(res) {}, function(err) {});
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
        SubmenuService.delete(id).then(function(res) {
            swal({
              type: 'success',
              showConfirmButton: false,
              text: 'Element supprimé',
              timer: 2000
            });
            loadAllSubmenus();
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

    $scope.tinymceOptions = {
      onChange: function(e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      skin: 'ehpad2',
      height: 300,
      theme: 'modern',
      plugins: 'advlist autolink lists colorpicker link textcolor image charmap code table',
      toolbar1: 'fontsizeselect | undo redo | bold italic underline | alignleft aligncenter alignjustify alignright | bullist numlist outdent indent | preview media | forecolor backcolor | link',
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      content_css: [
        '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
      ]
    };
    $scope.redirect = function() {
      $state.go('user.submenu');
    };

    $scope.redirectCreateSubmenu = function() {
      $state.go('user.create-submenu');
    };

    $scope.galleryInsertModalShow = false;
    $scope.OpenModalgalleryInsert = function() {
      $scope.galleryInsertModalShow = !$scope.galleryInsertModalShow;
      UploadService.getAll().then(function(res) {
        $scope.listimages = res.data;
      }, function(err) {});
    };
    $scope.textmodal = [];
    $scope.textModalShow = false;
    $scope.OpenModalDisplayText = function() {
      $scope.textModalShow = !$scope.textModalShow;
    };


    $scope.UploadImgModalShow = false;
    $scope.OpenModalUploadImg = function() {
      $scope.UploadImgModalShow = !$scope.UploadImgModalShow;
    };

    $scope.insertImg = function(nameImg) {
      $scope.newSubmenu.content += '<p><img src="uploads/images/' + nameImg + '" width="500"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.insertImgEdit = function(name) {
      $scope.submenu.content += '<p><img src="uploads/images/' + name + '" width="500"/></p>';
      $scope.galleryInsertModalShow = false;
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

    $scope.UploadPdfModalShow = false;
    $scope.OpenModalUploadPdf = function() {
      $scope.UploadPdfModalShow = !$scope.UploadPdfModalShow;
    };

    $scope.galleryPdfModalShow = false;
    $scope.OpenModalUrlPdf = function() {
      $scope.galleryPdfModalShow = !$scope.galleryPdfModalShow;
      UploadPdfService.getAll().then(function(res) {
        $scope.listPdf = res.data;
      }, function(err) {});
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
