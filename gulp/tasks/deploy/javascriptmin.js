var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    config = require('../../config');
gulp.task('javascriptmin', function(){
    return gulp.src(config.javascript.src)
               .pipe(uglify())
               .pipe(gulp.dest(config.javascript.dest))   //输出目录
});
