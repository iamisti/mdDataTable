var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// Basic usage 
gulp.task('browserify', function() {
    // Single entry point to browserify 
    gulp.src(['./build/compiled/**/**.js'], {read: false})
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});