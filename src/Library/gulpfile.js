/// <binding Clean='clean' ProjectOpened='watch' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    babel = require('gulp-babel'),
    watch = require('gulp-watch');

var paths = {
    webroot: "./wwwroot/",
    contentroot: "./Content/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";
paths.UITemplates = paths.contentroot + "UITemplates/**/*.jsx";
paths.UITemplatesDest = paths.webroot + "js/";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", gulp.parallel("clean:js", "clean:css"));

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task('compile-babel', function () {
    return gulp.src(paths.UITemplates)
    .pipe(babel({ presets: ['react'] }))
        .pipe(gulp.dest(paths.UITemplatesDest));
});

gulp.task('watch-babel', function () {
    return watch(paths.UITemplates, gulp.series('compile-babel'));
});

gulp.task('watch', gulp.parallel('watch-babel'));

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", gulp.parallel("min:js", "min:css"));
