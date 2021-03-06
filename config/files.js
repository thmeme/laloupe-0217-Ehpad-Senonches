/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
  //Override file patterns here
  return {
    js: {
      vendor: [
        "vendor/js/jquery.js",
        "vendor/js/bootstrap.js",
        "vendor/js/angular.js",
        "vendor/js/angular-ui-router.js",
        "vendor/js/tinymce.js",
        "vendor/js/moment.js",
        "vendor/js/moment-fr.js",
        "vendor/js/tinymce.angular.js",
        "vendor/js/ng-file-upload-shim.js",
        "vendor/js/ng-file-upload.js",
        "vendor/js/swiper.js",
        "vendor/js/**/*.js"
      ],
      app: [
        "app/js/app.js",
        "app/js/consts/*.js",
        "app/js/directives/*.js",
        "app/js/filters/*.js",
        "app/js/factories/*.js",
        "app/js/services/*.js",
        "app/js/controllers/**/*.js",
        "app/js/routes.js"
      ]
    },
  };
};
