var gulp = require('gulp');
var config = require('../../config');
gulp.task('javascript', function(){
    return gulp.src(config.javascript.src)
        .pipe(gulp.dest(config.javascript.dest))   //输出目录
});
