angular.module('app')
    .service('MailService', function($http) {
      return {
      sendMail: function() {
        console.log('hello');
          return $http.post('/mailer/sendall');
        }
      };
    });
