var gulp = require('gulp'),
    config = require('../../config'),
    fileVersion = require('gulp-fileversion'),
    htmlmin = require('gulp-htmlmin'),
    gulpif = require('gulp-if'),
    revCollector = require('gulp-rev-collector');
gulp.task('html', function(){
    return gulp.src(config.html.src)
        .pipe(gulp.dest(config.html.dest))   //输出目录
});
