angular.module('app')
    .service('MailService', function($http) {
      return {
      sendMail: function(mail) {
          return $http.post('/mailer/sendall', mail);
        }
      }
    });
