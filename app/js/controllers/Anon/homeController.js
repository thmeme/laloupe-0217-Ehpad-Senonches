angular.module('app')
  .controller('HomeController', function($scope, SubmenuService, ContactService, WelcomeService, CalendarService, $sce, NewsService, SlideshowService) {
    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    // $scope.tinymceOptions = {
    //   onChange: function(e) {
    //     // put logic here for keypress and cut/paste changes
    //   },
    //   inline: false,
    //   skin: 'lightgray',
    //   theme: 'modern',
    //   plugins: 'link image code',
    //   toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
    // };

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
    // document.getElementById("heure").innerHTML = jour_semaine + " " + jour + " " + mois + " " + annee + " - " + heure + ":" + minute;

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
      });
    }
    loadAllSubmenusAnon();

    function loadAllEvenementsAnon() {
      CalendarService.getAllAnon().then(function(res) {
        $scope.listEvenementsAnon = res.data;
        console.log('listEvenementsAnon', res.data);
      });
    }
    loadAllEvenementsAnon();

    $scope.currentPageCalendar = 0;
    $scope.pageSizeCalendar = 3;
    $scope.listEvenementsAnon = [];
    $scope.numberOfPagesCalendar = function() {
      return Math.ceil($scope.listEvenementsAnon.length / $scope.pageSizeCalendar);
    };
    for (var i = 0; i < $scope.listEvenementsAnon.length - 1; i++) {
      $scope.listEvenementsAnon.push("Item " + i);
    }
    $scope.uCanTrust = function(string) {
      return $sce.trustAsHtml(string);
    };
    function loadAllNewsAnon() {
      NewsService.getAllAnon().then(function(res) {
        console.log('listNewsAnon', res);
        $scope.listNewsAnon = res.data;
        $scope.listNewsAnon.content = $sce.trustAsHtml(res.data.content);
        console.log('$scope.listNewsAnon.content', $scope.listNewsAnon.content);
      });
    }
    loadAllNewsAnon();


    var idWel = '';
    function loadWelcome(id) {
        WelcomeService.getOne(idWel).then(function(res) {
          console.log('res One', res.data);
          $scope.welcome = res.data;
          console.log('$scope.Welcome', $scope.welcome);
        }, function(err) {
          console.error('error on getOne Welcome', err);
        });
    }
    function loadAllWelcomes() {
      WelcomeService.getAll().then(function(res) {
        console.log('listWelcomes', res);
        $scope.welcome = res.data[0];
        console.log('id Welcome', $scope.welcome._id);
        idWel = $scope.welcome._id;
        console.log('idWel', idWel);
        loadWelcome(idWel);
      }, function(err) {
        console.error('error on loadAllWelcomes', err);
      });
    }
    loadAllWelcomes();

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



    $scope.currentPageListNews = 0;
    $scope.pageSizeListNews = 3;
    $scope.listNewsAnon = [];
    $scope.numberOfPagesListNews = function() {
      return Math.ceil($scope.listNewsAnon.length / $scope.pageSizeListNews);
    };
    for (var a = 0; a < $scope.listNewsAnon.length - 1; a++) {
      $scope.listNewsAnon.push("Item " + a);
    }


    SlideshowService.getAll().then(function(res) {
      console.log('loadImgSlideshow', res.data);
      $scope.listImgSlideShow = res.data;

    });

    $scope.listImgSlideShow = [];
    loadImgSlideshow = function() {};
    loadImgSlideshow();
    $scope.listNewsAnon = [];



    //*****slider*****//


    $scope.onReadySwiper = function(swiper) {
      console.log(swiper);
      swiper.on('init', function() {

        console.log('slideChangeStart');
      });
    };

  });
