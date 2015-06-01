var gulp   = require('gulp'),
    utils  = require('./gulp-utils.js'),
    watch  = require('gulp-watch'),
    inject = require('gulp-inject'),
    bowerFiles  = require('main-bower-files'),
    runSequence = require('run-sequence');

var jsAssets    = ['app/modules/**/*.js'],
    bowerAssets = bowerFiles({ debug: true });

gulp.task('inject assets into index.html', function() {
    return gulp.src('app/index.html')
        .pipe(inject(gulp.src(bowerAssets, { read: false }), { name: 'bower' }))
        .pipe(inject(gulp.src(jsAssets,    { read: false })))
        .pipe(gulp.dest('build'));
});

gulp.task('create index.html', ['inject assets into index.html'], function() {
    if(utils.isNeedToWatch()) {
        var files = utils.combine(jsAssets, bowerAssets);

        watch(files, { verbose: true, events: [ 'add', 'unlink' ] }, function() {
            runSequence('inject assets into index.html', utils.livereload);
        });

        watch('app/index.html', { verbose: true }, function() {
            runSequence('inject assets into index.html', utils.livereload);
        });
    }
});