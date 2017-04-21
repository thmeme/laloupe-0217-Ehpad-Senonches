angular.module('app')
    .controller('SubmenuController', function($scope, $stateParams, CurrentUser, SubmenuService) {
        $scope.user = CurrentUser.user();
        $scope.menus = [
            "Votre admission",
            "Votre séjour",
            "Vos droits"
        ];
        $scope.idSubmenu = $stateParams.id;
        console.log('id', $scope.idSubmenu);

        SubmenuService.getOne($scope.idSubmenu).then(function(res) {
          console.log('res One', res);
          $scope.submenu = res.data;

        });


        $scope.addSubmenu = function() {
            SubmenuService.create($scope.newSubmenu).then(function(res) {
                console.log('submenu', $scope.newSubmenu);
                $scope.newSubmenu.content = '';
                $scope.newSubmenu.title = '';
                $scope.newSubmenu.menu = '';
                loadSubmenu();

            });
        };

        function loadSubmenu() {
            SubmenuService.getAll().then(function(res) {
                console.log('listSubmenus', res);
                $scope.listSubmenu = res.data;
                console.log('res.data', res.data);
            });
        }
        loadSubmenu();

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


    });
