angular.module('app')
  .controller('DisplayLegalnoticeController', function($scope, $sce, CurrentUser, LegalnoticeService, Auth) {
    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.legal = {
      name: '',
      company: '',
      status: '',
      companyaddress: '',
      companyzipcode: '',
      companycity: '',
      publisher: '',
      mailpublisher: '',
      host: '',
      hostadress: '',
      hostzipcode: '',
      hostcity: ''
    };

    $scope.legal.author = CurrentUser.user()._id;

    var idLeg = '';

    function loadLegalnotice(id) {
      LegalnoticeService.getOne(idLeg).then(function(res) {
        $scope.legal = res.data;
      }, function(err) {});
    }

    function loadAllLegalnotices() {
      LegalnoticeService.getAll().then(function(res) {
        $scope.legal = res.data[0];
        idLeg = $scope.legal._id;
        loadLegalnotice(idLeg);
      }, function(err) {});
    }
    loadAllLegalnotices();
  });
