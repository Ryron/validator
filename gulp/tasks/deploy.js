var gulp = require('gulp'),
    requireDir = require('require-dir'),
    config = require('../config'),
    revCollector = require('gulp-rev-collector');

    requireDir('./deploy', { recurse: true});
gulp.task('deploy', ['lessmin','imagesmin','htmlmin','javascriptmin'],function(){
  return gulp.src(['gulp/*.json','dist/html/*.html'])
             .pipe(revCollector())
             .pipe(gulp.dest('dist/html'))
});
