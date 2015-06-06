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

gulp.task('start development webserver', function() {
    connect.server({
        root: [ 'build' ],
        port: 9000,
        livereload: true
    });
});

gulp.task('default', function(next) {
    process.isLongRunning = true;
    runSequence('start development webserver', 'build', next);
});

gulp.task('build', function(next) {
    runSequence('test', 'copy', 'templates', 'compass', 'create index.html', next);
});

gulp.task('ci', function(next) {
    runSequence('lint', 'test', next);
});

gulp.task('test', function(next) {
    runSequence('unit', /*'integration', */next);
});

gulp.task('release', function(next) {
    runSequence('dist', /*'integration', */next);
});