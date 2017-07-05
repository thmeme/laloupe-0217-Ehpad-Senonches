angular.module('app')
  .controller('CreateSubmenuController', function($scope, $state, $stateParams, $window, $sce, UploadPdfService, UploadService, $timeout, $mdDialog, CurrentUser, SubmenuService, Auth) {

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
    console.log('id', $scope.idSubmenu);

    $scope.newSubmenu = {
      content: '',
      title: '',
      menu: '',
      author: ''
    };
    $scope.newSubmenu.author = CurrentUser.user()._id;

    $scope.addSubmenu = function() {
      SubmenuService.create($scope.newSubmenu).then(function(res) {
        console.log('submenu', $scope.newSubmenu);
        console.log('auteur', $scope.newSubmenu.author);
        $state.go('user.edit-submenu', {
          id: res.data.submenu._id
        });
      }, function(err) {
        console.error('error on create', err);
      });
    };

    $scope.tinymceOptions = {
      onChange: function(e) {
      },
      inline: false,
      skin: 'ehpad2',
      height: 300,
      theme: 'modern',
      plugins: 'advlist autolink paste lists colorpicker link textcolor image charmap code table emoticons',
      toolbar1: 'fontsizeselect | undo redo | bold italic underline | alignleft aligncenter alignjustify alignright | bullist numlist outdent indent | preview media | forecolor backcolor emoticons | link',
      fontsize_formats: '12pt 14pt 18pt 24pt 36pt',
      paste_as_text: true,
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
        console.log('load', res);
        $scope.listimages = res.data;
      }, function(err) {
        console.error('error on image load', err);
      });
    };
    $scope.textmodal = [];
    $scope.textModalShow = false;
    $scope.OpenModalDisplayText = function() {
      $scope.textModalShow = !$scope.textModalShow;
    };
    console.log('$scope.textmodal', $scope.textmodal);


    $scope.UploadImgModalShow = false;
    $scope.OpenModalUploadImg = function() {
      $scope.UploadImgModalShow = !$scope.UploadImgModalShow;
    };

    $scope.insertImg = function(nameImg) {
      $scope.newSubmenu.content += '<p><img src="uploads/images/' + nameImg + '" width="100%"/></p>';
      $scope.galleryInsertModalShow = false;
    };

    $scope.insertImgEdit = function(name) {
      $scope.submenu.content += '<p><img src="uploads/images/' + name + '" width="100%"/></p>';
      console.log('submenu.content', $scope.submenu.content);
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
