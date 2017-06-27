angular.module('app')
    .service('WelcomeService', function($http, CurrentUser) {
        var user = CurrentUser.user();
        return {
            create: function(welcome) {
              if(user.isAdmin) {
                return $http.post('/welcome/admin/', welcome);
              }
                return $http.post('/welcome/', welcome);
            },
            getAll: function() {
                return $http.get('/welcome');
            },
            getAllAnon: function() {
                return $http.get('/welcome/anon');
            },
            getOne: function(id) {
                return $http.get('/welcome/' + id);
            },
            update: function(id, welcome) {
              console.log(id);
              if(user.isAdmin) {
                return $http.put('/welcome/admin/' + (id._id || ''), welcome);
              }
                return $http.put('/welcome/' + (id._id || ''), welcome);
            },
            delete: function(id) {
                return $http.delete('/welcome/' + id);
             }
        };
    });
