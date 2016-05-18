/// <binding ProjectOpened='watch' />
/// <reference path="content/flux/dispatcher.js" />
/// <reference path="content/flux/dispatcher.js" />
/// <binding Clean='clean' ProjectOpened='watch' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    foreach = require('gulp-foreach'),
    util = require('gulp-util'),
    path = require('path');

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
paths.UITemplatesDir = paths.contentroot + "UITemplates/";
paths.UITemplates = paths.UITemplatesDir + "**/*.jsx";
paths.UITemplatesCompiledDir = paths.contentroot + "UITemplatesCompiled/";
paths.UITemplatesCompiled = paths.UITemplatesCompiledDir + "*.js";
paths.UITemplatesDest = paths.webroot + "js/";
paths.Flux = paths.contentroot + "Flux/**/*.js";

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

gulp.task('compile-uitemplates', function () {
    return gulp.src(paths.UITemplates)
        .pipe(babel({ presets: ['react'] }))
        .pipe(gulp.dest(paths.UITemplatesCompiledDir));
});

gulp.task('browserify-uitemplates', function () {
    return gulp.src(paths.UITemplatesCompiled)
        .pipe(foreach(function (stream, file) {
            return browserify(file.path)
                .bundle()
                .pipe(source(path.relative(file.base, file.path)))
                .pipe(gulp.dest(paths.UITemplatesDest))
        }))
});

gulp.task('watch', function () {
    return watch([paths.UITemplates,paths.Flux], gulp.series('rebuild-content'));
});

gulp.task('rebuild-content', gulp.series('compile-uitemplates', 'browserify-uitemplates'));

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", gulp.parallel("min:js", "min:css"));
