const path = require('path');

const gulp = require('gulp');
const util = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');

const babel = require('gulp-babel');
const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();
const historyAPIFallback = require('connect-history-api-fallback')();

const vendorScriptSources = [
  path.join(__dirname, './node_modules/jquery/dist/jquery.js'),
  path.join(__dirname, './node_modules/moment/moment.js'),
  path.join(__dirname, './node_modules/angular/angular.js'),
  path.join(__dirname, './node_modules/angular-ui-router/release/angular-ui-router.js'),
  path.join(__dirname, './node_modules/materialize-css/dist/js/materialize.js')
];

const scriptSources = [
  path.join(__dirname, './src/modules/*.js'),
  path.join(__dirname, './src/filters/*.js'),
  path.join(__dirname, './src/services/*.js'),
  path.join(__dirname, './src/directives/*.js'),
  path.join(__dirname, './src/controllers/*.js'),
  path.join(__dirname, './src/client/*.js')
];

const vendorStyleIncludePaths = [
  path.join(__dirname, './node_modules/normalize.css'),
  path.join(__dirname, './node_modules/bourbon/app/assets/stylesheets'),
  path.join(__dirname, './node_modules/materialize-css/sass')
];

const fontPaths = [
  path.join(__dirname, './node_modules/materialize-css/fonts/**/*')
];

const styleSources = [
  path.join(__dirname, './src/styles/lib/*.scss'),
  path.join(__dirname, './src/styles/app.scss')
];

function packageVendorScripts() {
  return gulp.src(vendorScriptSources)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(__dirname, './public/scripts')));
}

function compileScripts() {
  return gulp.src(scriptSources)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(babel({ presets: [ 'es2015' ] }).on('error', function(err) {
      const message = new util.PluginError('babel', err).toString();
      process.stderr.write(message + '\n');

      this.emit('end');
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(__dirname, './public/scripts')));
}

function packageVendorFonts() {
  return gulp.src(fontPaths)
    .pipe(gulp.dest(path.join(__dirname, './public/fonts')));
}

function compileStyles() {
  return gulp.src(path.join(__dirname, './src/styles/app.scss'))
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: vendorStyleIncludePaths }).on('error', function(err) {
      const message = new util.PluginError('sass', err).toString();
      process.stderr.write(message + '\n');

      this.emit('end');
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(__dirname, './public/styles')))
    .pipe(browserSync.stream());
}

gulp.task('vendor:scripts', packageVendorScripts);
gulp.task('compile:scripts', compileScripts);
gulp.task('build:scripts', [ 'compile:scripts' ], function(done) {
  browserSync.reload();
  done();
});

gulp.task('vendor:fonts', packageVendorFonts);
gulp.task('build:styles', compileStyles);

gulp.task('build', [ 'vendor:scripts', 'build:scripts', 'vendor:fonts', 'build:styles' ]);

gulp.task('serve', [ 'build' ], function() {
  browserSync.init({
    server: {
      baseDir: path.join(__dirname, './public'),
      middleware: [ historyAPIFallback ]
    }
  });
});
gulp.task('watch', [ 'serve' ], function() {
  gulp.watch(scriptSources, [ 'build:scripts' ]);
  gulp.watch(styleSources, [ 'build:styles' ]);
});

gulp.task('default', [ 'watch' ]);
