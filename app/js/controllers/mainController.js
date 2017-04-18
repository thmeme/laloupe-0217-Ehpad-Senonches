angular.module('app')
    .controller('MainController', function($scope) {
        $scope.tinymceModel = 'Initial content';

        $scope.getContent = function() {
            console.log('Editor content:', $scope.tinymceModel);
        };

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
    });
