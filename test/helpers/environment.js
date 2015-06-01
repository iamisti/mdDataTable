function isTeamCity() {
    return process.env['TEAMCITY_PROJECT_NAME'];
}

module.exports.getUnitReportersForCurrentRun = function() {
    var reporters = ['coverage'];

    if(isTeamCity()) {
        reporters.push('teamcity');
    }
    else {
        reporters.push('progress');
    }

    return reporters;
};

module.exports.getCoverageReportersForCurrentRun = function() {
    var reporters = [
        { type: 'lcov', subdir: 'coverage' },
    ];

    if(isTeamCity()) {
        reporters.push({ type: 'teamcity' });
    }

    return reporters;
};