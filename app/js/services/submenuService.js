angular.module('app')
    .service('SubmenuService', function($http, CurrentUser) {
        var user = CurrentUser.user();
        return {
            create: function(submenu) {
              if(user.isAdmin) {
                return $http.post('/submenus/admin/', submenu);
              }
                return $http.post('/submenus/', submenu);
            },
            getAll: function() {
                return $http.get('/submenus');
            },
            getAllAnon: function() {
                return $http.get('/submenus/anon');
            },
            getOne: function(id) {
                return $http.get('/submenus/' + id);
            },
            update: function(id, submenu) {
              if(user.isAdmin) {
                return $http.put('/submenus/admin/' + id, submenu);
              }
                return $http.put('/submenus/' + id, submenu);
            },
            delete: function(id) {
                return $http.delete('/submenus/' + id);
             }
        };
    });
