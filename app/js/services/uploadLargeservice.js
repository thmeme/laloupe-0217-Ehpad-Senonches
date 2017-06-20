angular.module('app')
  .service('UploadLargeService', function(Upload, $http) {
    var URL = '';
    return {
      uploadImageLarge: function(file) {
        return Upload.upload({
          url: URL + '/uploadimglarge/imagel',
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
