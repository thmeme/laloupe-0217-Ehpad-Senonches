angular.module('app')
  .controller('CalendarController',
    function($scope, $state, $stateParams, $mdDialog, CurrentUser, CalendarService) {
      $scope.user = CurrentUser.user();
      console.log('params', $state.params);
      $scope.newEvenement = {
        date: undefined,
        start: undefined,
        end: undefined,
        title: '',
        isOnline: false
      };

      $scope.idEvenement = $stateParams.id;
      console.log('id', $scope.idEvenement);

      CalendarService.getAll().then(function(res) {
        $scope.evenements = res.data;
      });

      function loadAllEvenements() {
        CalendarService.getAll().then(function(res) {
          $scope.evenements = res.data;
          console.log('loadAllEvenements', res.data);
        });
      }
      loadAllEvenements();

      $scope.currentPageCalendar = 0;
      $scope.pageSizeCalendar = 5;
      $scope.evenements = [];
      $scope.numberOfPagesCalendar = function() {
        return Math.ceil($scope.evenements.length / $scope.pageSizeCalendar);
      };
      for (var i = 0; i < $scope.evenements.length - 1; i++) {
        $scope.evenements.push("Item " + i);
      }

      function loadEvenement(id) {
        if (id !== undefined) {
          CalendarService.getOne($scope.idEvenement).then(function(res) {
            console.log('res One', res);
            $scope.evenement = res.data;
            console.log('res.data.strat', res.data.start);
          });
        }
      }
      loadEvenement($scope.idEvenement);

      $scope.redirectCalendar = function() {
        $state.go('user.calendar');
      };

      $scope.redirectCreateCalendar = function() {
        $state.go('user.create-calendar');
      };

      $scope.customFullscreen = false;
      $scope.showConfirm = function(ev, id) {
        console.log('ev', ev);
        var confirm = $mdDialog.confirm()
          .title('Voulez-vous supprimer cet évènement ?')
          .textContent('Tous les éléments seront définitivement perdus')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Supprimer')
          .cancel('Annuler');

        $mdDialog.show(confirm).then(function() {
          CalendarService.delete(id).then(function(res) {
          loadAllEvenements();
          });
        });
      };
    });
