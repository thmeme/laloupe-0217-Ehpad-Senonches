angular.module('app')
  .controller('ContactController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, ContactService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    $scope.contact = {
      name: '',
      street: '',
      zipcode: '',
      city: '',
      phone: ''
    };

    $scope.contact.author = CurrentUser.user()._id;

    $scope.addContact = function() {
      ContactService.update('', $scope.contact).then(function(res) {
        if (res.status === 200) {
          swal({
            showConfirmButton: false,
            type: 'success',
            text: 'Les éléments ont été enregistrés avec succès',
            timer: 2000
          });
        }
      }, function(err) {
        swal({
          showConfirmButton: false,
          type: 'error',
          title: 'Une erreur s\'est produite',
          text: 'Vous pouvez réessayer',
          timer: 2000
        } );
      });
    };



    var idCont = '';

    function loadContact(id) {
      ContactService.getOne(idCont).then(function(res) {
        $scope.contact = res.data;
      }, function(err) {
      });
    }

    function loadAllContacts() {
      ContactService.getAll().then(function(res) {
        $scope.contact = res.data[0];
        idCont = $scope.contact._id;
        loadContact(idCont);
      }, function(err) {
      });
    }
    loadAllContacts();
  });
