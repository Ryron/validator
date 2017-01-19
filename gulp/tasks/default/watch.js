var gulp = require('gulp'),
    watch = require('gulp-watch'),
    config = require('../../config'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    reload =browserSync.reload;
gulp.task('watch', function(){
    watch(config.less.all, function(){  //监听所有less
        gulp.start('less');             //出现修改、立马执行less任务
        reload();
    });
    watch(config.images.all, function(){  //监听所有images
        gulp.start('images');
        reload();
    });
    watch(config.javascript.all, function(){  //监听所有javascript
        gulp.start('javascript');
        reload();
    });
    watch(config.html.all, function(){  //监听所有baseConfig
        gulp.start('html');
        reload();
    });
})
