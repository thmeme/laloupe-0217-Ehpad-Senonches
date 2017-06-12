angular.module('app')
  .service('UploadService', function(Upload, $http) {
    var URL = '';
    return {
      uploadImage: function(file) {
        return Upload.upload({
          url: URL + '/upload/image',
          data: {
            image: file
          }
        });
      },
      getAll: function() {
        return $http.get('/upload');
      }
    };
  });
