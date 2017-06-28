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
        console.log('contact',res);
        console.log('auteur', $scope.contact.author);
        $scope.contact = res.data.contact;
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
