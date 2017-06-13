angular.module('app')
    .service('newsService', function($http, CurrentUser) {
        var user = CurrentUser.user();
        return {
            create: function(news) {
              if(user.isAdmin) {
                return $http.post('/news/admin/', news);
              }
                return $http.post('/news/', news);
            },
            getAll: function() {
                return $http.get('/news');
            },
            getOne: function(id) {
                return $http.get('/news/' + id);
            },
            update: function(id, news) {
              if(user.isAdmin) {
                return $http.put('/news/admin/' + id, news);
              }
                return $http.put('/news/' + id, news);
            },
            delete: function(id) {
                return $http.delete('/news/' + id);
            }
        };
    });
