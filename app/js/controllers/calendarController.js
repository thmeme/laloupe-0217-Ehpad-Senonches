angular.module('app')
  .controller('CalendarController',
    function($scope, $state, $stateParams, $mdDialog, CurrentUser, CalendarService) {
      $scope.user = CurrentUser.user();
      // console.log($state.params);
      // $scope.newEvenement = {
      //   date: undefined,
      //   start: undefined,
      //   end: undefined,
      //   title: '',
      //   // content: '',
      //   isOnline: false
      // };

      CalendarService.getAll().then(function(res) {
        $scope.evenements = res.data;
      });
      function loadEvenements() {
        CalendarService.getAll().then(function(res) {
          $scope.evenements = res.data;
        });
      }
      loadEvenements();

      $scope.currentPageCalendar = 0;
      $scope.pageSizeCalendar = 5;
      $scope.listCalendar = [];
      $scope.numberOfPagesCalendar = function() {
        return Math.ceil($scope.listCalendar.length / $scope.pageSizeCalendar);
      };
      for (var i = 0; i < $scope.listCalendar.length - 1; i++) {
        $scope.listCalendar.push("Item " + i);
      }

      function loadEvenement(id) {
        if (id !== undefined) {
          CalendarService.getOne($scope.idEvenements).then(function(res) {
            console.log('res One', res);
            $scope.evenement = res.data;
          });
        }
      }
      loadEvenement($scope.idEvenements);

      $scope.addEvenement = function() {
        $scope.evenements = [];
        CalendarService.create($scope.newEvenement).then(function(res) {
          $scope.newEvenement = {
            date: undefined,
            start: undefined,
            end: undefined,
            title: '',
            // content: '',
            isOnline: false
          };
          loadEvenements();
        });
      };

      $scope.redirectCalendar = function() {
        $state.go('user.calendar');
      };

      $scope.redirectCreateCalendar = function() {
        $state.go('user.create-calendar');
      };




        $scope.customFullscreen = false;
        $scope.showConfirm = function(ev, id) {
          console.log('ev', ev);
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
            .title('Voulez-vous supprimer cet évènement ?')
            .textContent('Tous les éléments seront définitivement perdus')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Supprimer')
            .cancel('Annuler');

          $mdDialog.show(confirm).then(function() {
            CalendarService.delete(id).then(function(res) {
              loadEvenements();
            });
          });
        };
    });
