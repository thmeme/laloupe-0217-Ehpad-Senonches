angular.module('app')
    .service('SubmenuService', function($http) {
        return {
            create: function(submenu) {
                return $http.post('/submenus/', submenu);
            },
            getAll: function() {
                return $http.get('/submenus');
            },
            getOne: function(id) {
                return $http.get(`/submenus/${id}`);
            },
            update: function(id) {
                return $http.put('/submenus', id);
            },
            delete: function(id) {
                return $http.delete('/submenus/${id}', id);
            }
        };
    });
