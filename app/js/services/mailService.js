angular.module('app')
    .service('MailService', function($http) {
      return {
      sendMail: function(sendMail) {
          return $http.post('/mailer', sendMail);
        }
      };
    });
