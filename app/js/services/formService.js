angular.module('app')
    .service('FormService', function($http) {
        return {
            create: function(formContact) {
                return $http.post('/contactForm/', formContact);
            },
            getAll: function() {
                return $http.get('/contactForm');
            },
            getOne: function(id) {
                return $http.get(`/contactForm/${id}`);
            },
            update: function(id, contactForm) {
                return $http.put(`/contactForm/${id}`, contactForm);
            },
            delete: function(id) {
                return $http.delete(`/contactForm/${id}`);
            }
        };
    });
