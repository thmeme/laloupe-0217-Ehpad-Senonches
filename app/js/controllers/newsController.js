angular.module('app')
  .controller('newsController', function($scope, $stateParams, $state, $mdDialog, CurrentUser, newsService) {
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
        skin: 'ehpad1',
        height: 300,
        theme: 'modern',
        plugins: 'advlist autolink lists link image charmap code table',
        toolbar: 'undo redo | insert | bold italic | alignleft aligncenter alignright | code | preview media | textcolor backcolor emoticons'
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
    });
