angular.module('app')
  .controller('DisplayMenuController', function($scope, SubmenuService, CalendarService, NewsService, SlideshowService) {
    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {};

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
      onChange: function(e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      skin: 'lightgray',
      theme: 'modern',
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };

    $scope.listSubmenusAnon = [];

    function loadAllSubmenusAnon() {
      SubmenuService.getAllAnon().then(function(res) {
        $scope.listSubmenusAnon = res.data;
      });
    }
    loadAllSubmenusAnon();
  });
