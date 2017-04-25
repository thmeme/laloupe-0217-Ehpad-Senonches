angular.module('app')
    .controller('SubmenuController', function($scope, $stateParams, $window, $mdDialog, CurrentUser, SubmenuService) {
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

            });
        };

        function loadAllSubmenus() {
            SubmenuService.getAll().then(function(res) {
                console.log('listSubmenus', res);
                $scope.listSubmenu = res.data;
                console.log('res.data', res.data);
            });
        }
        loadAllSubmenus();

        $scope.updateSubmenu = function() {
            SubmenuService.update($scope.idSubmenu, $scope.submenu).then(function(res) {
                console.log('update', res);
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
                });
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




    });
