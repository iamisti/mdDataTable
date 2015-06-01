var gulp    = require('gulp'),
    utils   = require('./gulp-utils.js'),
    watch   = require('gulp-watch'),
    compass = require('gulp-compass'),
    runSequence = require('run-sequence');

gulp.task('run compass for main scss', function() {
    var runCompass = compass({ css: 'build', sass: 'app/scss', image: 'app/img' });

    return gulp
        .src('app/scss/main.scss')
        .pipe(runCompass)
        .pipe(gulp.dest('build'));
});

gulp.task('compass', ['run compass for main scss'], function () {
    if(utils.isNeedToWatch()) {
        var sassFiles = ['app/assets/**/*.scss', 'app/scss/**/*.scss'];

        watch(sassFiles, { base: 'app/scss', verbose: true }, function() {
            runSequence('run compass for main scss', utils.livereload);
        });
    }
});
