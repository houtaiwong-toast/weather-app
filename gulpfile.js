const gulp = require('gulp');
const gulpESLintNew = require('gulp-eslint-new');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const source = require('vinyl-source-stream');

const sass = gulpSass(dartSass);

const paths = {
  clientApp: 'client/index.js',
  scss: 'client/**/*.scss',
  clientJS: 'client/**/*.js',
  serverJS: 'express/server.js',
};

// Lint JS
const lintJS = () =>
  gulp
    .src([paths.clientJS, paths.serverJS])
    .pipe(gulpESLintNew())
    .pipe(gulpESLintNew.format());

// Compile & Minify JS
const compileJS = () =>
  browserify(paths.clientApp)
    .transform(babelify) //———–> transpiles es6 to es5
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./public/'));

// Compile Sass
const compileCSS = () =>
  gulp
    .src(paths.scss)
    .pipe(
      sass
        .sync({ outputStyle: 'compressed' })
        .on('error', sass.logError)
    )
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./public/'));

exports.default = gulp.series(lintJS, compileJS, compileCSS);
