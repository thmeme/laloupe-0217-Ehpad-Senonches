angular.module('app')
  .controller('FormController', function($scope, FormService) {

    var dateGlobale = new Date();

    var annee = dateGlobale.getFullYear();
    var mois = dateGlobale.getMonth();
    var jour = dateGlobale.getDate();
    var jour_semaine = dateGlobale.getDay();

    var heure = dateGlobale.getHours();
    var minute = dateGlobale.getMinutes();
    var seconde = dateGlobale.getSeconds();

    if (heure < 10) {
      heure = "0" + heure;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (seconde < 10) {
      seconde = "0" + seconde;
    }

    var MOIS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aôut", "Septembre", "Octobre", "Novembre", "Décembre"];
    var JOUR_SEMAINE = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

    mois = MOIS[mois];
    jour_semaine = JOUR_SEMAINE[jour_semaine];

    document.getElementById("heure").innerHTML = jour_semaine + " " + jour + " " + mois + " " + annee + " - " + heure + ":" + minute;

    $scope.sendMail = function() {
      $scope.formContact = [];
      console.log($scope.formContact);
      FormService.create($scope.formContact).then(function(res){
        $scope.formContact = {
          mail: formContact.mail,
          name: formContact.name,
          subject: formContact.subject,
          message: formContact.message
        };
      });
    };
  });
