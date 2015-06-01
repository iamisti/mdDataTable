module.exports.getUnitReportersForCurrentRun = function() {
    var reporters = ['coverage'];

    return reporters;
};

module.exports.getCoverageReportersForCurrentRun = function() {
    var reporters = [
        { type: 'lcov', subdir: 'coverage' }
    ];

    return reporters;
};