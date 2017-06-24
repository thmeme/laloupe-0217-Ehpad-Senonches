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
      .primaryPalette('front', {
        'default': '50'
      })
      .accentPalette('front', {
        'default': '50'
      })
      .warnPalette('front')
      .backgroundPalette('grey');

    $mdThemingProvider.definePalette('front', {
      '50': '568dbc',

      '100': 'ffcdd2',
      '200': 'ef9a9a',
      '300': 'e57373',
      '400': 'ef5350',
      '500': 'f44336',
      '600': 'e53935',
      '700': 'd32f2f',
      '800': 'c62828',
      '900': 'b71c1c',
      'A100': 'ff8a80',
      'A200': 'ff5252',
      'A400': 'ff1744',
      'A700': '15426A',
      'contrastDefaultColor': 'light', // whether, by default, text (contrast)
      // on this palette should be dark or light

      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
        '200', '300', '400', 'A100'
      ],
      'contrastLightColors': undefined // could also specify this if default was 'dark'
    });

  });
