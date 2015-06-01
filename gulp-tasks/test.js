var gulp  = require('gulp'),
    karma = require('gulp-karma');

gulp.task('unit', function() {
    var config = {
        configFile: 'test/karma.unit.conf.js',
        action:     'run'
    };

    return gulp.src([]).pipe(karma(config));
});

gulp.task('integration', function() {
    var config = {
        configFile: 'test/karma.integration.conf.js',
        action:     'run'
    };

    return gulp.src([]).pipe(karma(config));
});
