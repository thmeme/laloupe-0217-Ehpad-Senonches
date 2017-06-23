angular.module('app')
.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('ehpad')
        .primaryPalette('teal', {
        'default': '500'
        })
        .accentPalette('pink', {
          'default': '500'
        })
        .warnPalette('red')
        .backgroundPalette('grey');
    $mdThemingProvider.setDefaultTheme('ehpad');
    $mdThemingProvider.theme('anon')
        .primaryPalette('teal', {
        'default': '500'
        })
        .accentPalette('pink', {
          'default': '500'
        })
        .warnPalette('red')
        .backgroundPalette('grey');
});
