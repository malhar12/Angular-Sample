(function(){
  'use strict';

  var gulp = require('gulp'),
      gutil = require('gulp-util'),
      jshint = require('gulp-jshint'),
      connect = require('gulp-connect'),
      wiredep = require('wiredep').stream,
      inject = require('gulp-inject'),
      clean = require('gulp-clean'),
      concatJS = require('gulp-concat'),
      count = require('gulp-count'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      bases = {
        app: 'app/',
        dist: 'dist/'
      },
      paths = {
        scripts: ['app/scripts/**/*.js'],
        ang_scripts: ['app/scripts/common/**/*.js'],
        styles: ['app/styles/**/*.css'],
        html: ['app/views/**/*.html'],
        images: ['app/images/**/*.png']
      };

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
        sources = gulp.src([paths.scripts, paths.styles], {read: false});

    return target.pipe(inject(sources, {relative: true}))
                 .pipe(gulp.dest('app/views'));
  });

  gulp.task('html', function(){
    gulp.src(paths.html)
        .pipe(connect.reload());
  });

  gulp.task('js', function(){
    gulp.src(paths.scripts)
        .pipe(connect.reload());
  });

  gulp.task('jshint', function(){
    return gulp.src(paths.scripts)
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'))
               .pipe(jshint.reporter('fail'));
  });

  gulp.task('watch', function(){
    gulp.watch(paths.scripts, ['jshint']);
    gulp.watch(paths.styles, ['html']);
    gulp.watch(paths.scripts, ['js']);
    gulp.watch('bower.json', ['wiredep']);
  });

  gulp.task('build-js', function(){
    return gulp.src('app/scripts/app/common/**/*.js')
               .pipe(concatJS('bundle.js'))
               .pipe(gulp.dest(bases.dist + 'scripts'))
               .pipe(uglify())
               pipe(gulp.dest(bases.dist + 'scripts'));
  });

  gulp.task('serve', ['connect', 'jshint', 'inject', 'wiredep', 'watch']);

  // Build Distribution/Publish Folder for application


    gulp.task('clean', function(){
      return gulp.src(bases.dist)
                .pipe(clean());
    });

    gulp.task('script-concat', ['clean'], function(){
      return gulp.src(['app/scripts/app/app.js', 'app/scripts/app/common/**/*.js'])
                 .pipe(count('# of JS files counted'))
                 .pipe(concatJS('app.js'))
                 .pipe(gulp.dest(bases.dist + 'scripts'))
                 .pipe(rename('app.min.js'))
                 .pipe(uglify())
                 .pipe(gulp.dest(bases.dist + 'scripts'));
    });

    gulp.task('copy', ['clean'], function(){

      gulp.src('app/views/**/*.html')
          .pipe(gulp.dest(bases.dist + 'views/'));

      gulp.src('app/styles/**/*.css')
          .pipe(gulp.dest(bases.dist + 'styles/'));

      gulp.src('app/fonts/**/*.md')
          .pipe(gulp.dest(bases.dist + 'fonts/'));
    });

    gulp.task('build-dist', ['clean', 'script-concat', 'copy']);
})();
