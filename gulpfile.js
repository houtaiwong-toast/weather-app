const gulp = require('gulp');
const gulpESLintNew = require('gulp-eslint-new');
const concat = require('gulp-concat');
const browserify = require('browserify');
const babelify = require('babelify');
const gulpSass = require('gulp-sass');
const dartSass = require('sass');
const source = require('vinyl-source-stream');
const gls = require('gulp-live-server');

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

const watchDev = () => {
  // Watch CSS & JS
  gulp.watch(paths.scss, gulp.series(compileCSS));
  gulp.watch(paths.clientJS, gulp.series(lintJS, compileJS));

  // Start the app server
  const server = gls('dist-server/server.js', { stdio: 'inherit' });
  server.start();

  // // Reload server when backend files change
  // gulp.watch(paths.serverJS, () => {
  //   server.start.bind(server);
  // });

  // // Notify server when frontend files change
  // gulp.watch(['/**/*.{css,js,html}'], file => {
  //   server.notify(file);
  // });
};

exports.watch = gulp.series(lintJS, compileJS, compileCSS, watchDev);
exports.default = gulp.series(lintJS, compileJS, compileCSS);
