angular.module('app')
  .service('UploadLargeService', function(Upload, $http) {
    var URL = '';
    return {
      uploadImageLarge: function(file) {
        return Upload.upload({
          url: URL + '/upload/imglarge',
          data: {
            image: file
          }
        });
      },
      getAll: function() {
        return $http.get('/uploadimglarge');
      }
    };
  });
