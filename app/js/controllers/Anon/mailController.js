angular.module('app')
  .controller('MailController', function($scope, $mdDialog, MailService) {

    $scope.sendMail = function () {
        console.log($scope.mail);
       swal(
         'Envoi',
         'Votre email est en cours d\'envoi',
         'info'
       );
        MailService.sendMail($scope.mail).then(function(res) {
         if (res.status === 200) {
           swal(
             'Succès !',
             'Votre email a bien été envoyé!',
             'success'
           );
           document.getElementById("send").innerHTML = "Mail envoyé";
         } else {
           swal(
             'ERREUR !',
             'L\'envoi de votre email a échoué!',
             'error'
           );
         }
        });
        $scope.mail = {
          email:'',
          name:'',
          subject:'',
          message:''
        };
      };
  });
