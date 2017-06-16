angular.module('app')
.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('ehpad')
        .primaryPalette('teal', {
        'default': '500'
        })
        .accentPalette('pink', {
          'default': '500'
        })
        .warnPalette('green')
        .backgroundPalette('grey');
        $mdThemingProvider.setDefaultTheme('ehpad');
});
