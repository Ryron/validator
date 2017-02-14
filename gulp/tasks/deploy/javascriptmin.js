var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    config = require('../../config');
gulp.task('javascriptmin', function(){
    return gulp.src(config.javascript.src)
    			.pipe(gulp.dest(config.javascript.dest))
                .pipe(uglify())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(config.javascript.dest))   //输出目录
});
