module.exports.getUnitReportersForCurrentRun = function() {
    var reporters = ['coverage'];

    reporters.push('teamcity');

    return reporters;
};

module.exports.getCoverageReportersForCurrentRun = function() {
    var reporters = [
        { type: 'lcov', subdir: 'coverage' },
    ];

    return reporters;
};