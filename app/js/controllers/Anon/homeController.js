angular.module('app')
  .controller('HomeController', function($scope, SubmenuService, ContactService, WelcomeService, CalendarService, $sce, NewsService, SlideshowService) {
    $scope.tinymceModel = 'Initial content';

    $scope.getContent = function() {};

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.listSubmenusAnon = [];
    function loadAllSubmenusAnon() {
      SubmenuService.getAllAnon().then(function(res) {
        $scope.listSubmenusAnon = res.data;
      });
    }
    loadAllSubmenusAnon();

    function loadAllEvenementsAnon() {
      CalendarService.getAllAnon().then(function(res) {
        $scope.listEvenementsAnon = res.data;
      });
    }
    loadAllEvenementsAnon();

    $scope.currentPageCalendar = 0;
    $scope.pageSizeCalendar = 4;
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
        $scope.listNewsAnon = res.data;
        $scope.listNewsAnon.content = $sce.trustAsHtml(res.data.content);
      });
    }
    loadAllNewsAnon();

    var idWel = '';
    function loadWelcome(id) {
      WelcomeService.getOne(idWel).then(function(res) {
        $scope.welcome = res.data;
      });
    }

    function loadAllWelcomes() {
      WelcomeService.getAll().then(function(res) {
        $scope.welcome = res.data[0];
        idWel = $scope.welcome._id;
        loadWelcome(idWel);
      });
    }
    loadAllWelcomes();

    var idCont = '';
    function loadContact(id) {
      ContactService.getOne(idCont).then(function(res) {
        $scope.contact = res.data;
      });
    }

    function loadAllContacts() {
      ContactService.getAll().then(function(res) {
        $scope.contact = res.data[0];
        idCont = $scope.contact._id;
        loadContact(idCont);
      });
    }
    loadAllContacts();

    $scope.currentPageListNews = 0;
    $scope.pageSizeListNews = 4;
    $scope.listNewsAnon = [];
    $scope.numberOfPagesListNews = function() {
      return Math.ceil($scope.listNewsAnon.length / $scope.pageSizeListNews);
    };
    for (var a = 0; a < $scope.listNewsAnon.length - 1; a++) {
      $scope.listNewsAnon.push("Item " + a);
    }

    SlideshowService.getAll().then(function(res) {
      $scope.listImgSlideShow = res.data;
    });

    $scope.listImgSlideShow = [];
    loadImgSlideshow = function() {};
    loadImgSlideshow();
    $scope.listNewsAnon = [];

    $scope.onReadySwiper = function(swiper) {
      swiper.on('init', function() {});
    };
  });
