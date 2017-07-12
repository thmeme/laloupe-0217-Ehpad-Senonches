angular.module('app')
  .controller('MailController', function($scope, $mdDialog, MailService) {
    $scope.mail = {
      email: '',
      name: '',
      subject: '',
      message: ''
    };
    $scope.sendMail = function() {
      swal({
        title: 'Envoi',
        text: 'Votre email est en cours d\'envoi',
        showConfirmButton: false,
      });
      MailService.sendMail($scope.mail).then(function(res) {
        if (res.status === 200) {
          swal({
            title: 'Succès !',
            text: 'Votre email a bien été envoyé.',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          document.getElementById("send").innerHTML = "Mail envoyé";
        } else {
          swal(
            'ERREUR !',
            'L\'envoi de votre email a échoué!',
            'error'
          );
        }
      });
    };
  });
