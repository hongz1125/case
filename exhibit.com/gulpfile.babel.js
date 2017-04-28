'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';


gulp.task('css', function() {
  //专题页
  gulp
    .src('./scss/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename("index.bundle.css"))
    .pipe(gulp.dest('./css/'));

});



gulp.task('watch', ['css'],function() {
  gulp
    .watch('scss/*.scss', ['css'])
    .on('error', swallowError);
});


gulp.task('default', ['watch']);



//用于捕获错误
function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}
