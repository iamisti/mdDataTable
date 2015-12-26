var gulp  = require('gulp'),
    karma = require('gulp-karma'),
    KarmaServer = require('karma').Server;

gulp.task('unit', function(done) {
    var config = {
        configFile: __dirname + '/../test/karma.unit.conf.js',
        singleRun: true
    };

    new KarmaServer(config, done).start();
});

gulp.task('integration', function() {
    var config = {
        configFile: 'test/karma.integration.conf.js',
        action:     'run'
    };

    return gulp.src([]).pipe(karma(config));
});
