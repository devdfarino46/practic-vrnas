const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const rename = require('gulp-rename');
const ttfToWoff2 = require('gulp-ttf2woff2');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const util = require('gulp-util');


// Browsersync init
function _bs() {
    browserSync.init({
        // proxy: 'localhost/',
        // port: 80,
        server: './',
        open: false
    });
}

// Whatching
function _whatching() {
    gulp.watch(['**/*.html']).on('change', browserSync.reload);
    gulp.watch('scss/**/*.scss', _sass);
    gulp.watch(['js/**/*.js', '!js/**/*.min.js', '!js/**/*.min.js.map'], _compileJS);
}

// SCSS to CSS
function _sass() {
    return gulp.src(["scss/**/*.+(scss|css)"])
        .pipe(sass({
            // outputStyle: 'nested'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('css'))
        .pipe(cleanCSS({
            compatibility: 'ie9'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
}

// Compile JS
function _compileJS(done) {
    return browserify({
        entries: ['./js/main.js'],
        debug: false,
        transform: [babelify.configure({ presets: ['@babel/preset-env'] })]
    })
        .bundle()
        .pipe(source('main.min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(uglify())
          .on('error', util.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('js'));
}

function _ttfToWoff2() {
    return gulp.src('fonts/**/*.ttf')
        .pipe(ttfToWoff2())
        .pipe(gulp.dest('fonts'));
}

function _imageMin() {
    return gulp.src('img/**/*.+(png|jpeg|jpg|gif|svg)')
        .pipe(imageMin({verbose: true}))
        .pipe(gulp.dest('img'));
}

function _webp() {
    return gulp.src('img/**/*.+(png|jpeg|jpg)')
        .pipe(webp())
        .pipe(gulp.dest('img'));
}

exports.default = gulp.series(
    _sass,
    _compileJS,
    gulp.parallel(
      _bs,
      _whatching
    )
);

exports.ttfToWoff2 = _ttfToWoff2;
exports.imageMin = _imageMin;
exports.webp = _webp;