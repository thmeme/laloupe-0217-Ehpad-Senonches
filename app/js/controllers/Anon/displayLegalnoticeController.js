angular.module('app')
  .controller('DisplayLegalnoticeController', function($scope, $sce, CurrentUser, LegalnoticeService, Auth) {
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

    var idLeg = '';

    function loadLegalnotice(id) {
      LegalnoticeService.getOne(idLeg).then(function(res) {
        console.log('res One', res.data);
        $scope.legal = res.data;
        console.log('$scope.legal', $scope.legal);
      }, function(err) {
        console.error('error on getOne legal', err);
      });
    }


    function loadAllLegalnotices() {
      LegalnoticeService.getAll().then(function(res) {
        console.log('listlegales', res);
        $scope.legal = res.data[0];
        console.log('id legal', $scope.legal._id);
        idLeg = $scope.legal._id;
        console.log('idWLegel', idLeg);
        loadLegalnotice(idLeg);
      }, function(err) {
        console.error('error on loadAllLegalnotices', err);
      });
    }
    loadAllLegalnotices();

  });
