var gulp  = require('gulp'),
    utils = require('./gulp-utils.js'),
    watch = require('gulp-watch'),
    templateCache = require('gulp-angular-templatecache'),
    runSequence   = require('run-sequence');

var htmlFiles = ['./app/modules/**/*.html'];

gulp.task('cache templates', function() {
    return gulp
        .src(htmlFiles)
        .pipe(templateCache('templates.js', { module:'templates', root:'/', standalone:true }))
        .pipe(gulp.dest('build'));
});

gulp.task('templates', ['cache templates'], function () {
    if(utils.isNeedToWatch()) {
        watch(htmlFiles, { verbose: true }, function() {
            runSequence('cache templates', utils.livereload);
        });
    }
});