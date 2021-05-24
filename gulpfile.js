var gulp = require("gulp");

//додаткові плагіни Gulp
var sass = require("gulp-sass"), //конвертує SASS в CSS
  cssnano = require("gulp-cssnano"), //мінімізація CSS
  autoprefixer = require("gulp-autoprefixer"), //додавання префіксів в
  //CSS для підтримки
  //старих браузерів
  imagemin = require("gulp-imagemin"), //стиснення зображень
  concat = require("gulp-concat"), //об'єднання файлів - конкатенація
  uglify = require("gulp-uglify"), //мінімізація javascript
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload,
  rename = require("gulp-rename"); //перейменування файлів

gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(gulp.dest("dist"));
});

//об'єднання, компіляція Sass в CSS, додавання префіксів і подальша мінімізація коду
gulp.task("sass", function () {
  return gulp
    .src("app/sass/*.sass")
    .pipe(concat("styles.sass"))
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(cssnano())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css"));
});

//об'єднання і стиснення JS-файлів
gulp.task("scripts", function () {
  return (
    gulp
      .src("app/js/*.js") //вихідна директорія файлів
      .pipe(concat("scripts.js")) // конкатенація js-файлів в один
      .pipe(uglify()) //стиснення коду
      .pipe(rename({ suffix: ".min" })) //перейменування файлу з
      //приставкою .min
      .pipe(gulp.dest("dist/js"))
  ); // директорія продакшена
});

//cтискання зображень
gulp.task("imgs", function () {
  return gulp
    .src("app/images/*.+(jpg | jpeg | png | gif)")
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest("dist/images"));
});

//відстежування за змінами у файлах
gulp.task("watch", function () {
  gulp.watch("app/*.html", gulp.series("html"));
  gulp.watch("app/js/*.js", gulp.series("scripts"));
  gulp.watch("app/sass/*.sass", gulp.series("sass"));
  gulp.watch("app/images/*.+(jpg | jpeg | png | gif)", gulp.series("imgs"));
  browserSync.init({
    server: {
      baseDir: "app",
    },
  });
  gulp.watch("app/*.html").on("change", reload);
});

//Запуск тасків за замовчуванням
gulp.task("default", gulp.series("html", "sass", "scripts", "imgs", "watch"));
