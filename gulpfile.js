var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var mocha = require('gulp-mocha');

gulp.task('build:src', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/src/"));
});

gulp.task('build:test', function () {
  return gulp.src([
    'test/*.js',
    'test/declaration/class*',
    'test/declaration/fun*',
    '!test/declaration/gen*',
    '!test/declaration/lex*',
    '!test/destructuring/*',
    '!test/expressions/*',
    '!test/miscellaneous/*',
    '!test/modules/*',
    '!test/property-definition/*',
    '!test/statements/*'])
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/test/"));
});

gulp.task('mocha', ['build:src', 'build:test'], function () {
  return gulp.src('build/test/**/*.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('default', ['mocha']);

gulp.task("dist", function () {
  return gulp.src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist"));
});

gulp.task('watch', ['default'], function () {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['default']);
});

gulp.task('watch:build', ['build:src'], function () {
  gulp.watch(['src/**/*.js',], ['build:src']);
});
