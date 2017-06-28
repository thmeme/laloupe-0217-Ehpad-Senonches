angular.module('app')
    .service('WelcomeService', function($http, CurrentUser) {
        var user = CurrentUser.user();
        return {

            getAll: function() {
                return $http.get('/welcome');
            },

            getOne: function(id) {
              console.log('get One id', id);
                return $http.get('/welcome/' + id);
            },
            update: function(id, welcome) {
              console.log(id);
              if(user.isAdmin) {
                return $http.put('/welcome/admin/' + (id._id || ''), welcome);
              }
                return $http.put('/welcome/' + (id._id || ''), welcome);
            }

        };
    });
