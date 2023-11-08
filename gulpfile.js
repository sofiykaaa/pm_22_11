 const{series, src, dest, parallel, watch}= require('gulp');
 const sass = require('gulp-sass')(require('sass'));
 const concat = require("gulp-concat");
 const uglify = require('gulp-uglify');
 const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');

const html_task = () => src('app/*.html')
  .pipe(dest('dist'));
 
const scss_task = () => src('app/scss/*.scss')
 .pipe(concat('index.scss'))
 .pipe(sass())
 .pipe(cssnano())
 .pipe(rename({suffix: '.min'}))
 .pipe(dest('dist/css'));

 const scripts_task = () => src('app/js/*.js')
.pipe(concat('index.js'))
.pipe(uglify())
.pipe(rename({suffix: '.min'}))
.pipe(dest('dist/js'));

function task_imgs() {
    return src("app/img/*.+(jpg|jpeg|png|gif)")
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true
    }))
    .pipe(dest("dist/images"))
  }
  exports.imgs = task_imgs

  const lib_css_task = () => src('app/lib/css/*.css')
   .pipe(dest('dist/css'));

   const lib_js_task = () => src('app/lib/js/*.js')
   .pipe(dest('dist/js'));
   
const watch_task = () => {
    watch('app/*.html', parallel(html_task));
    watch('app/scss/*.scss', parallel(scss_task));
    watch('app/js/*.js', parallel(scripts_task));
    watch('app/images/*.+(jpg|jpeg|png|gif', task_imgs);
}

exports.default=series(html_task, scss_task, scripts_task, task_imgs, lib_css_task, lib_js_task ,watch_task);