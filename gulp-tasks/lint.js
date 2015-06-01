var gulp  = require('gulp'),
    cached = require('gulp-cached'),
    jshint = require('gulp-jshint');

gulp.task('lint',function() {
    var applicationSources = ['app/modules/**/*.js'];

    return gulp.src(applicationSources)
        .pipe(cached('lint'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});