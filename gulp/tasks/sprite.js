var gulp = require('gulp'),
    merge = require('merge-stream'),
    buffer = require('vinyl-buffer'),
    imagemin = require('gulp-imagemin'),
    spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  // Generate our spritesheet
  var spriteData = gulp.src('src/images/icon/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }));

  // Pipe image stream through image optimizer and onto disk
  var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/icon/'));

  // Pipe CSS stream through CSS optimizer and onto disk
  var cssStream = spriteData.css
    //.pipe(csso())
    .pipe(gulp.dest('dist/css/icon'));

  // Return a merged stream to handle both `end` events
  return merge(imgStream, cssStream);
});
