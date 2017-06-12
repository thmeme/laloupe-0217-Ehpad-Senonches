angular.module('app')
    .service('CalendarService', function($http, CurrentUser) {
      var user = CurrentUser.user();
        return {
            create: function(evenement) {
              if(user.isAdmin) {
                return $http.post('/evenements/admin/', evenement);
              }
                return $http.post('/evenements/', evenement);
            },
            getAll: function() {
                return $http.get('/evenements');
            },
            getOne: function(id) {
                return $http.get('/evenements/'+ id);
            },
            update: function(id, evenement) {
              if(user.isAdmin) {
                return $http.put('/evenements/admin/:id', evenement);
              }
                return $http.put('/evenements/:id', evenement);
            },
            delete: function(id) {
                return $http.delete('/evenements/:id');
            }
        };
    });
