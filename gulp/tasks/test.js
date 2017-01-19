var gulp = require('gulp'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minimist = require('minimist'),
    htmlmin = require('gulp-htmlmin'),
    gulpif = require('gulp-if'),
    config = require('../config');

gulp.task('test', function () {
  return gulp.src(['gulp/*.json','dist/html/*.html'])
      .pipe(revCollector())
    //  .pipe(gulpif(options.env === 'production', htmlmin(config.html.settings)))
      .pipe(gulp.dest('dist/html'))
});
