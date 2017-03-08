(function(){
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      jshint = require('gulp-jshint'),
      connect = require('gulp-connect'),
      wiredep = require('wiredep').stream,
      inject = require('gulp-inject');

  gulp.task('connect', function(){
    connect.server({
      root: 'app',
      port: 9000,
      livereload: true
    });
  });

  gulp.task('wiredep', function(){
    gulp.src('app/views/index.html')
        .pipe(wiredep({
          optional: 'configuration',
          goes: 'here'
    }))
    .pipe(gulp.dest('app/views'));
  });

  gulp.task('inject', function(){
    var target = gulp.src('app/views/index.html'),
        sources = gulp.src(['app/scripts/**/*.js', 'app/styles/**/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
                 .pipe(gulp.dest('app/views'));
  });

  gulp.task('html', function(){
    gulp.src('app/views/**/*.html')
        .pipe(connect.reload());
  });

  gulp.task('js', function(){
    gulp.src('app/scripts/**/*.js')
        .pipe(connect.reload());
  });

  gulp.task('jshint', function(){
    return gulp.src('app/scripts/**/*.js')
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'))
               .pipe(jshint.reporter('fail'));
  });

  gulp.task('watch', function(){
    gulp.watch('app/scripts/**/*.js', ['jshint']);
    gulp.watch('app/views/**/*.html', ['html']);
    gulp.watch('app/scripts/**/*.js', ['js']);
  });

  gulp.task('serve', ['connect', 'jshint', 'inject', 'wiredep', 'watch']);


})();
