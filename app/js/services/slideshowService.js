angular.module('app')
  .service('SlideshowService', function($http, CurrentUser) {
    var user = CurrentUser.user();
    return {
      create: function(img) {
        if (user.isAdmin) {
          return $http.post('/slideshow/admin/', img);
        }
        return $http.post('/slideshow/', img);
      },
      getAll: function() {
        return $http.get('/slideshow');
      },
      getOne: function(id) {
        return $http.get('/slideshow/' + id);
      },
      update: function(list) {
        if (user.isAdmin) {
          return $http.put('/slideshow/admin/', list);
        }
        return $http.put('/slideshow/', list);
      },
      delete: function(id) {
        return $http.delete('/slideshow/' + id);
      }
    };
  });
