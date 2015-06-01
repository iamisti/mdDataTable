var gulp    = require('gulp'),
    connect = require('gulp-connect');

module.exports.not = function(sources) {
    if(typeof sources === 'string') {
        sources = [sources];
    }

    return sources.map(function(path) {
        return '!' + path;
    });
};

module.exports.combine = function() {
    var result = [];
    return result.concat.apply(result, arguments);
};

module.exports.livereload = function() {
    gulp.src('gulpfile.js').pipe(connect.reload());
};

module.exports.isNeedToWatch = function() {
    return !!process.isLongRunning;
};