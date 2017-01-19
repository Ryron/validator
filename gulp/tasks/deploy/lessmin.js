var gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    config = require('../../config');
gulp.task('lessmin', function(){
    return gulp.src(config.less.src)         //less源文件
        .pipe(less(config.less.settings))    //执行编译
        .pipe(gulp.dest(config.less.dest))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.less.dest))   //输出目录
});
