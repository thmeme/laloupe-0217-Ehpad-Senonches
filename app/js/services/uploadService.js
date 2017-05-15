angular.module('app')
  .service('UploadService', function(Upload, $http) {
    var URL = 'http://localhost:3000';
    return {
      uploadImage: function(file) {
        return Upload.upload({
          url: URL + '/upload/image',
          data: {
            image: file
          }
        });
      },
      getAll: function(file) {
        return $http.get('/upload');
      }


    };



  });
