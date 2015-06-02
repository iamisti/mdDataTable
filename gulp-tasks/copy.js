var gulp  = require('gulp'),
    utils = require('./gulp-utils.js'),
    watch = require('gulp-watch'),
    eventStream = require('event-stream'),
    ngAnnotate  = require('gulp-ng-annotate');

gulp.task('copy',function() {
    var applicationSources = ['app/modules/**/*.js'],
        demoSources = ['demo/**/*.js'],
        applicationAssets  = ['app/assets/**/*.js'],
        bowerComponents    = ['app/bower_components/**'];

    var sourcesStream = gulp
        .src(applicationSources, { base: '.' })
        .pipe(ngAnnotate({ remove: false, add: true, single_quotes: true }))
        .pipe(gulp.dest('build'));

    var demoStream = gulp
        .src(demoSources, { base: '.' })
        .pipe(gulp.dest('build'));

    var assetsStream = gulp
        .src(applicationAssets,{ base: 'app' })
        .pipe(gulp.dest('build'));

    var bowerStream = gulp
        .src(bowerComponents, { base: '.' })
        .pipe(gulp.dest('build'));

    if(utils.isNeedToWatch()) {
        watch(applicationSources, { base: '.', verbose: true }, utils.livereload)
            .pipe(ngAnnotate({ remove: false, add: true, single_quotes: true }))
            .pipe(gulp.dest('build'));

        watch(demoSources, { base: '.', verbose: true }, utils.livereload)
            .pipe(ngAnnotate({ remove: false, add: true, single_quotes: true }))
            .pipe(gulp.dest('build'));

        watch(applicationAssets, { base: 'app', verbose: true }, utils.livereload)
            .pipe(gulp.dest('build'));
    }

    return eventStream.merge([sourcesStream, bowerStream, assetsStream, demoStream]);
});
