angular.module('app', ['ngMap','ui.router', 'ui.tinymce', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngFileUpload', 'dndLists', 'ngSanitize'])
.run(function() {
  moment.locale('fr');
});
