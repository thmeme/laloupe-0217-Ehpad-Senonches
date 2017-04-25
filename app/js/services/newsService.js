angular.module('app')
    .service('newsService', function($http) {
        return {
            create: function(news) {
                return $http.post('/news/', news);
            },
            getAll: function() {
                return $http.get('/news');
            },
            getOne: function(id) {
                return $http.get(`/news/${id}`);
            },
            update: function(id, news) {
                return $http.put(`/news/${id}`, news);
            },
            delete: function(id) {
                return $http.delete(`/news/${id}`);
            }
        };
    });
