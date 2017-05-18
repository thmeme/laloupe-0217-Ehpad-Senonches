angular.module('app')
    .service('CalendarService', function($http) {
        return {
            create: function(evenement) {
                return $http.post('/evenements/', evenement);
            },
            getAll: function() {
                return $http.get('/evenements');
            }
            // getOne: function(id) {
            //     return $http.get('/evenements/' + id);
            // },
            // update: function(id, evenement) {
            //     return $http.put('/evenements/' +id, evenement);
            // },
            // delete: function(id) {
            //     return $http.delete('/evenements/' +id);
            // }
        };
    });
