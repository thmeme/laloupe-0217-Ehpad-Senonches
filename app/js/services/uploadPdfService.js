angular.module('app')
  .service('UploadPdfService', function(Upload, $http) {
    var URL = '';
    return {
      uploadPdf: function(file) {
        return Upload.upload({
          url: URL + '/uploadpdf/pdf',
          data: {
            pdf: file
          }
        });
      },
      getAll: function() {
        return $http.get('/uploadpdf');
      }
    };
  });
