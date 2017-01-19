var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    requireDir = require('require-dir'),
    config = require('../config'),
    minimist = require('minimist');
    requireDir('./default', { recurse: true});
gulp.task('default', ['less','javascript','html','images','iconfont','watch'],function(){
  console.log('javascript');
  browserSync({
    server: {
      baseDir: "./"   // 设定项目根目录启动服务
    }
  });
});
