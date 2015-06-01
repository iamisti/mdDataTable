var bowerFiles  = require('main-bower-files');

var dependencies = bowerFiles({ debug: false });

module.exports = function() {
    return {
        basePath: '..',

        files: dependencies.concat([
             //required for html2js
            'app/modules/**/*.html',
            'app/modules/**/*.js',
            {
                pattern: 'app/assets/**',
                watched:  false,
                served:   true,
                included: false
            }
        ]),

        preprocessors: {
            'app/modules/**/*.html': ['html2js']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/modules/',
            moduleName:  'templates'
        },

        frameworks: ['jasmine-jquery', 'jasmine'],
        browsers:   ['PhantomJS']
    };
};