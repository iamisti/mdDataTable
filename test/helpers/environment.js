module.exports.getUnitReportersForCurrentRun = function() {
    var reporters = ['coverage', 'progress'];

    return reporters;
};

module.exports.getCoverageReportersForCurrentRun = function() {
    var reporters = [
        { type: 'lcov', subdir: '.' }
    ];

    return reporters;
};
