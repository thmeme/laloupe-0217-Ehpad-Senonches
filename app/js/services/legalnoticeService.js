angular.module('app')
    .service('LegalnoticeService', function($http, CurrentUser) {
        var user = CurrentUser.user();
        return {

            getAll: function() {
                return $http.get('/legalnotice');
            },

            getOne: function(id) {
              console.log('get One id', id);
                return $http.get('/legalnotice/' + id);
            },
            update: function(id, legalnotice) {
              console.log(id);
              if(user.isAdmin) {
                return $http.put('/legalnotice/admin/' + (id._id || ''), legalnotice);
              }
                return $http.put('/legalnotice/' + (id._id || ''), legalnotice);
            }

        };
    });
