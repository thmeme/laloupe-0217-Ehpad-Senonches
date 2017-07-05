angular.module('app')
  .controller('LegalnoticeController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, LegalnoticeService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    console.log('id', $scope.idlegal);

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
      LegalnoticeService.update('', $scope.legal);
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
