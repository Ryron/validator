var gulp = require('gulp');
var less = require('gulp-less');
var config = require('../../config').iconfont;
gulp.task('iconfont', function(){
    return gulp.src(config.src)         //less源文件
        .pipe(gulp.dest(config.dest))   //输出目录
});
