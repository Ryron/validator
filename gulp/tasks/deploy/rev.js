var gulp = require('gulp'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    replace = require('gulp-replace'),
    config = require('../../config');

gulp.task('rev', function () {
  return gulp.src('dist/css/test.css')
      .pipe(rev())
      .pipe(gulp.dest('dist/css'))
      .pipe(rev.manifest())
      .pipe(gulp.dest('gulp'))
});


gulp.task('aaa', function() {
    gulp.src(['dist/html/*.html'])
        .pipe(replace(/javascript\/test.css/g,'javascript/test.min.css'))
        .pipe(gulp.dest('./dist/html'));
});
