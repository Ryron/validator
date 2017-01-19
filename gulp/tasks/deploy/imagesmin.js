var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    config = require('../../config');
gulp.task('imagesmin', function(){
    return gulp.src(config.images.src)                //images源文件
               .pipe(imagemin())
               .pipe(gulp.dest(config.images.dest))   //输出目录
});
