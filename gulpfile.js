(function(){
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      jshint = require('gulp-jshint');

  gulp.task('default', ['watch']);

  gulp.task('jshint', function(){
    return gulp.src()
               .pipe(jshint('app/scripts/**/*.js'))
               .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('watch', function(){
    gulp.watch('app/scripts/**/*.js', ['jshint']);
  });

})();
