var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var cache = require('gulp-cache');
var imagemin = require('imagemin');

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'

    }
  })
})

gulp.task('sass', function(){
  return gulp.src('assets/sass/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('build/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true  
    }));
})

gulp.task('pug', function(){
  return gulp.src('assets/template/**/*.pug')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});

gulp.task('js',function(){
  return gulp.src('assets/js/**/*.js')
  .pipe(gulp.dest('build/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});
// Watchers
gulp.task('watch', function() {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/template/**/*.pug', ['pug']);
  gulp.watch('assets/js/**/*.js', ['js']);
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('assets/template/*.pug')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(imagemin({
      interlaced: false
    }))
    .pipe(gulp.dest('build/images'))
});


// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'pug', 'browserSync'], 'watch',
    callback
  )
});

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'fonts'],
    callback
  )
});
