
angular.module('app', ['ngMap','ui.router', 'ui.tinymce', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngFileUpload', 'ngSanitize', 'textSizeSlider','ksSwiper'])
.run(function() {
  moment.locale('fr');
});
