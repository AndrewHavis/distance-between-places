'use strict';

// Import Gulp and related libraries
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const copy = require('gulp-copy');
const sourceMaps = require('gulp-sourcemaps');

// Pug
gulp.task('pug', function() {
    return gulp.src('./dev/*.pug')
        .pipe(pug({
            pretty: '\t'
        }))
        .pipe(gulp.dest('./public'));
});

gulp.task('pug:watch', function() {
    gulp.watch('./dev/*.pug', ['pug']);
});

// SASS
gulp.task('sass', function() {
    return gulp.src('./dev/css/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourceMaps.write('./map'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./dev/**/*.scss', ['sass']);
});

// Copy (for JavaScript files)
gulp.task('copy', function() {
    gulp.src('./dev/**/*.js')
        .pipe(copy('./public/js', {
            prefix: 2 // Ignore the first two directories in the path
        }));
});

gulp.task('copy:watch', function() {
    gulp.watch('./dev/**/*.js', ['copy']);
});

// Build
gulp.task('build', ['pug', 'sass', 'copy']);
