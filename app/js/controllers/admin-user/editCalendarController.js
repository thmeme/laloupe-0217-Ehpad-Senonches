angular.module('app')
  .controller('EditCalendarController',
    function($scope, $state, $stateParams, $mdDialog, CurrentUser, CalendarService) {
      $scope.user = CurrentUser.user();
      $scope.newEvenement = {
        date: undefined,
        start: undefined,
        end: undefined,
        title: '',
        isOnline: false
      };

      $scope.idEvenement = $stateParams.id;

      function loadAllEvenements() {
        CalendarService.getAll().then(function(res) {
          $scope.evenements = res.data;
        });
      }
      loadAllEvenements();

      function loadEvenement(id) {
        if (id !== undefined) {
          CalendarService.getOne($scope.idEvenement).then(function(res) {
            $scope.evenement = res.data;
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

      $scope.updateEvenement = function() {
        CalendarService.update($scope.idEvenement, $scope.evenement).then(function(res) {
          if (res.status === 200) {
            swal({
              showConfirmButton: false,
              type: 'success',
              text: 'L\'événement a été enregistré avec succès',
              timer: 2000
            }).then(function() {}, // handling the promise rejection
              function(dismiss) {
                if (dismiss === 'timer') {}
              }
            );
          }
        }, function(err) {
          swal({
            showConfirmButton: false,
            type: 'error',
            text: 'Une erreur s\'est produite',
            timer: 2000
          });
        });
      };
    });
