angular.module('app')
  .controller('DisplaySlideShowController', function($scope, SlideshowService) {

    SlideshowService.getAll().then(function(res) {
      $scope.listImgSlideShow = res.data;
    });

    $scope.listImgSlideShow = [];
    loadImgSlideshow = function() {};
    loadImgSlideshow();

    $scope.onReadySwiper = function(swiper) {
      swiper.on('init', function() {});
    };
  });
