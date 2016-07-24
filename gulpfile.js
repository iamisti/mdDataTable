var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    runSequence = require('run-sequence');

require('./gulp-tasks/compass');
require('./gulp-tasks/copy');
require('./gulp-tasks/index');
require('./gulp-tasks/templates');
require('./gulp-tasks/lint');
require('./gulp-tasks/test');
require('./gulp-tasks/dist');
require('./gulp-tasks/gulpfile.ts');
require('./gulp-tasks/gulp-browserify');

gulp.task('start development webserver', function() {
    connect.server({
        root: [ 'build' ],
        port: 9000,
        livereload: true
    });
});

gulp.task('default', function(next) {
    process.isLongRunning = true;
    runSequence('build', 'start development webserver', next);
});

gulp.task('build', function(next) {
    runSequence('ts', 'copy', 'browserify', /*'test', */'templates', 'compass', 'create index.html', 'ngdocs', next);
});

gulp.task('ci', function(next) {
    runSequence('lint', 'test', next);
});

gulp.task('test', function(next) {
    runSequence('unit', /*'integration', */next);
});

gulp.task('release', function(next) {
    runSequence('build', 'dist', next);
});

gulp.task('ngdocs', [], function () {
    var gulpDocs = require('gulp-ngdocs');
    return gulp.src('app/modules/**/*.js')
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('./docs'));
});
