var _ = require('lodash'),
    environment = require('./helpers/environment.js'),
    baseConfig  = require('./karma.conf.js');

function mergeTopLevel(lhs, rhs) {
    if (_.isArray(lhs)) {
        return lhs.concat(rhs);
    }
}

var unitTestingConfig = _.merge(baseConfig(), {
    files: [
        //extra testing code
        'app/bower_components/angular-mocks/angular-mocks.js',

        //unit tests
        'test/unit/**/*.js'
    ],

    preprocessors: {
        'app/modules/**/*.js': ['coverage']
    },

    reporters:  environment.getUnitReportersForCurrentRun(),
    coverageReporter: {
        reporters: environment.getCoverageReportersForCurrentRun(),
        dir:    'reports',
        subdir: 'coverage'
    }
}, mergeTopLevel);

module.exports = function(config) {
    config.set(unitTestingConfig);
};