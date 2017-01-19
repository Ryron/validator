var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    fileVersion = require('gulp-fileversion'),
    revCollector = require('gulp-rev-collector'),
    config = require('../../config');
gulp.task('htmlmin', function(){
    return gulp.src(config.html.src)
               //.pipe(htmlmin(config.html.settings))
               .pipe(fileVersion({ 'verName': 'ver' }))
               .pipe(gulp.dest(config.html.dest))   //输出目录
});
