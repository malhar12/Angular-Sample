(function(){
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      jshint = require('gulp-jshint'),
      connect = require('gulp-connect'),
      wiredep = require('wiredep').stream,
      inject = require('gulp-inject');
      // map = require('map-stream'),
      // exitOnJShintError = map(function(file, cb){
      //   if(!file.jshint.success){
      //     console.error('jshint failed');
      //     process.exit(1);
      //   }
      // });

  gulp.task('connect', function(){
    connect.server({
      root: 'app',
      port: 9000,
      livereload: true
    });
  });

  gulp.task('bower-wiredep', function(){
    gulp.src('app/styles/**/*.css')
        .pipe(wiredep({devDependencies: true}))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/scripts/**/*.js')
        .pipe(wiredep({devDependencies: true}))
        .pipe(gulp.dest('app/scripts'));
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

  gulp.task('serve', ['connect', 'jshint', 'inject', 'bower-wiredep', 'watch']);


})();
