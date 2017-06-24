angular.module('app')
  .controller('MailController', function($scope, $mdDialog, MailService) {


    // var dateGlobale = new Date();
    //
    // var annee = dateGlobale.getFullYear();
    // var mois = dateGlobale.getMonth();
    // var jour = dateGlobale.getDate();
    // var jour_semaine = dateGlobale.getDay();
    //
    // var heure = dateGlobale.getHours();
    // var minute = dateGlobale.getMinutes();
    // var seconde = dateGlobale.getSeconds();
    //
    // if (heure < 10) {
    //   heure = "0" + heure;
    // }
    // if (minute < 10) {
    //   minute = "0" + minute;
    // }
    // if (seconde < 10) {
    //   seconde = "0" + seconde;
    // }
    //
    // var MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre"];
    // var JOUR_SEMAINE = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    //
    // mois = MOIS[mois];
    // jour_semaine = JOUR_SEMAINE[jour_semaine];
    //
    // document.getElementById("heure").innerHTML = jour_semaine + " " + jour + " " + mois + " " + annee;
    // document.getElementById("heure2").innerHTML = heure + ":" + minute;


    $scope.sendMail = function () {
      console.log($scope.mail);
      MailService.sendMail($scope.mail).then(function(res) {
      });
      $scope.mail = {
        email:'',
        name:'',
        subject:'',
        message:''
      };
      swal(
         'Succès !',
        'Votre email a bien été envoyé!',
        'success'
      );
     };



  });