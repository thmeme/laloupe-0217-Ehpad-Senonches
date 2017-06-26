angular.module('app')
  .controller('DisplaySlideShowController', function($scope, SubmenuService, CalendarService, NewsService, SlideshowService) {


    SlideshowService.getAll().then(function(res) {
      console.log('loadImgSlideshow', res.data);
      $scope.listImgSlideShow = res.data;

    });

    $scope.listImgSlideShow = [];
    loadImgSlideshow = function() {
    };
    loadImgSlideshow();




//*****slider*****//


            $scope.onReadySwiper = function(swiper) {
              console.log(swiper);
              swiper.on('init', function () {

       console.log('slideChangeStart');
     });


            };

  });
