angular.module('app')
    .service('ContactService', function($http, CurrentUser) {
        var user = CurrentUser.user();
        return {

            getAll: function() {
                return $http.get('/contact');
            },

            getOne: function(id) {
                return $http.get('/contact/' + id);
            },
            update: function(id, contact) {
              console.log(id);
              if(user.isAdmin) {
                return $http.put('/contact/admin/' + (id._id || ''), contact);
              }
                return $http.put('/contact/' + (id._id || ''), contact);
            }

        };
    });
