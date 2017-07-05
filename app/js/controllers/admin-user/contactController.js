angular.module('app')
  .controller('ContactController', function($scope, $state, $stateParams, $window, $sce, $timeout, $mdDialog, CurrentUser, ContactService, Auth) {

    $scope.theme = 'ehpad';
    $scope.user = CurrentUser.user();
    $scope.auth = Auth;

    console.log('id', $scope.idContact);

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
          }).then(function() {

          }, // handling the promise rejection
            function(dismiss) {
              if (dismiss === 'timer') {
              }
            }
          );
        }
      }, function(err) {
        swal({
          showConfirmButton: false,
          type: 'error',
          text: 'Une erreur s\'est produite',
          timer: 2000
        } );
      });
    };



    var idCont = '';

    function loadContact(id) {
      ContactService.getOne(idCont).then(function(res) {
        console.log('res One', res.data);
        $scope.contact = res.data;
        console.log('$scope.contact', $scope.contact);
      }, function(err) {
        console.error('error on getOne contact', err);
      });
    }

    function loadAllContacts() {
      ContactService.getAll().then(function(res) {
        console.log('listContacts', res);
        $scope.contact = res.data[0];
        console.log('id contact', $scope.contact._id);
        idCont = $scope.contact._id;
        console.log('idCont', idCont);
        loadContact(idCont);
      }, function(err) {
        console.error('error on loadAllContacts', err);
      });
    }
    loadAllContacts();
  });
