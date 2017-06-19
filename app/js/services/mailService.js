angular.module('app')
    .service('MailService', function($http) {
      return {
      sendMail: function() {
          return $http.post('/mailer/sendall');
          console.log('test', sendall);
        }
      };
    });
