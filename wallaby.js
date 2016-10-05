//var wallabyAngularFilesort = require('wallaby-angular-filesort');
//var wallabyPostprocessor = wallabyAngularFilesort.create({
//  whitelist: ['app/modules/**/*.js']
//});

var angularTemplatePreprocessor = require('wallaby-ng-html2js-preprocessor');

module.exports = function () {
  return {
    files: [
      '/app/bower_components/jquery/dist/jquery.js',
      '/app/bower_components/lodash/lodash.js',
      '/app/bower_components/angular/angular.js',
      '/app/bower_components/angular-sanitize/angular-sanitize.js',
      '/app/bower_components/angular-animate/angular-animate.js',
      '/app/bower_components/angular-aria/angular-aria.js',
      '/app/bower_components/angular-messages/angular-messages.js',
      '/app/bower_components/angular-material-icons/angular-material-icons.min.js',
      '/app/bower_components/angular-material/angular-material.js',

      'app/**/*.html',

      '/app/bower_components/angular-mocks/angular-mocks.js',
      '/app/modules/**/*.js'
    ],
    tests: [
      'test/unit/**/*.js'
    ],
    //postprocessor: wallabyPostprocessor,
    preprocessors: {
      'app/modules/main/templates/**/*.html': function (file) {
        return angularTemplatePreprocessor.transform(file, {
          stripPrefix: 'app/modules',
          moduleName: 'mdtTemplates'
        })
      }
    },
    testFramework: 'jasmine',
    debug: true
  }
};