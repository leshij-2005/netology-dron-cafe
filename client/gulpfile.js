var gulp   = require('gulp');
var gutil = require('gulp-util');

var server = require('gulp-server-livereload');

var postcss = require('gulp-postcss');
var prefixer = require('gulp-autoprefixer');
var pxtorem = require('postcss-pxtorem');

var cssmin = require('gulp-clean-css');
var sass = require('gulp-sass');

//
// clean
//

gulp.task('clean', function () {
  del(path.outDir);
});

//
// css build
//
 
gulp.task('css:build', function () {
  var processors = [
    pxtorem({
      propWhiteList: [],
      mediaQuery: true,
      replace: true
    })
  ];

  gulp.src('./src/template/app.scss')
    .pipe(sass())
    .pipe(prefixer())
    .pipe(postcss(processors))
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/'))
});

//
// build
//

gulp.task('build', [
  'css:build'
]);

//
// server
//

gulp.task('webserver', function() {
 gulp.src('')
   .pipe(server({
     livereload:       true,
     open:             true,
     log:              'debug',
     clientConsole:    true,
     defaultFile:      'src/index.html'
   }));
});

//
// watch
//

gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', ['css:build']);
});

//
// default
//
 
gulp.task('default', ['build', 'webserver', 'watch']);