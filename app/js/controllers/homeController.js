angular.module('app')
  .controller('HomeController', function($scope, SubmenuService, CalendarService, NewsService, SlideshowService) {
    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
      onChange: function(e) {
        // put logic here for keypress and cut/paste changes
      },
      inline: false,
      skin: 'lightgray',
      theme: 'modern',
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    };

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

    // $scope.listSubmenu = [];
    // function loadAllSubmenus() {
    //   SubmenuService.getAll().then(function(res) {
    //     console.log('listSubmenus', res);
    //     $scope.listSubmenu = res.data;
    //     console.log('res.data', res.data);
    //   }, function(err) {
    //     console.error('error on loadAllSubmenus', err);
    //   });
    // }loadAllSubmenus();

    $scope.listSubmenusAnon = [];

    function loadAllSubmenusAnon() {
      SubmenuService.getAllAnon().then(function(res) {
        console.log('listSubmenusAnon', res);
        $scope.listSubmenusAnon = res.data;
        console.log('res.data Anon', res.data);
      });
    }
    loadAllSubmenusAnon();



    $scope.listImgSlideShow = [];
    loadImgSlideshow = function() {
      SlideshowService.getAll().then(function(res) {
        console.log('loadImgSlideshow', res.data);
        $scope.listImgSlideShow = res.data;

      });
    };
    loadImgSlideshow();

    $scope.listNewsAnon = [];

    function loadAllNewsAnon() {
      NewsService.getAllAnon().then(function(res) {
        console.log('listNewsAnon', res);
        $scope.listNewsAnon = res.data;
        console.log('res.data Anon', res.data);
      });
    }
    loadAllNewsAnon();



    $scope.listEvenements = [];

    function loadEvenements() {
      CalendarService.getAll().then(function(res) {
        $scope.listEvenements = res.data;
      });
    }
    loadEvenements();



  });
