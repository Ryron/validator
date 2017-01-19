var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var config = require('../../config');
gulp.task('images', function(){
    return gulp.src(config.images.src)                //images源文件
               .pipe(gulp.dest(config.images.dest))   //输出目录
});
