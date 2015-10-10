var gulp   = require('gulp'),
    concat  = require('gulp-concat'),
    eventStream = require('event-stream'),
    compass = require('gulp-compass'),
    rename = require('gulp-rename'),
    ngAnnotate  = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache');

var jsAssets = ['app/modules/**/*.js'];
var htmlFiles = ['app/modules/**/*.html'];

gulp.task('dist', function() {
    var jsStream = gulp.src(jsAssets)
        .pipe(concat('md-data-table.js'))
        .pipe(ngAnnotate({ remove: false, add: true, single_quotes: true }))
        .pipe(gulp.dest('dist'));

    var cssStream = gulp
        .src('app/scss/main.scss')
        .pipe(compass({ css: 'dist', sass: 'app/scss', image: 'app/img' }))
        .pipe(rename('md-data-table-style.css'))
        .pipe(gulp.dest('dist'));

    var templatesStream = gulp
        .src(htmlFiles)
        .pipe(templateCache('md-data-table-templates.js', { root:'/', standalone:true }))
        .pipe(gulp.dest('dist'));

    return eventStream.merge([jsStream, templatesStream, cssStream]);
});