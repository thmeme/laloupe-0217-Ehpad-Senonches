angular.module('app')
  .controller('LegalnoticeController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, LegalnoticeService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.legal = {
      name: '',
      company: '',
      status: '',
      address: '',
      publisher: '',
      mailpublisher: '',
      host: '',
      hostadress: ''
    };

    $scope.legal.author = CurrentUser.user()._id;

    $scope.addlegalnotice = function() {
      LegalnoticeService.update('', $scope.legal).then(function(res) {
        if (res.status === 200) {
          swal({
            showConfirmButton: false,
            type: 'success',
            text: 'Les éléments ont été enregistrés avec succès',
            timer: 2000
          }).then(function() {

            }, // handling the promise rejection
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

    var idLeg = '';

    function loadLegalnotice(id) {
      LegalnoticeService.getOne(idLeg).then(function(res) {
        $scope.legal = res.data;
      });
    }

    function loadAllLegalnotices() {
      LegalnoticeService.getAll().then(function(res) {
        $scope.legal = res.data[0];
        idLeg = $scope.legal._id;
        loadLegalnotice(idLeg);
      });
    }
    loadAllLegalnotices();
  });
