/// <binding BeforeBuild='copy-bootstrap' ProjectOpened='copy-bootstrap' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');

gulp.task('default', ['copy-bootstrap']);

gulp.task('copy-bootstrap', ['copy-bootstrap-less', 'copy-bootstrap-js']);

gulp.task('copy-bootstrap-less', function () {
    gulp.src('bower_components/bootstrap/less/**/*.*').pipe(gulp.dest('./ExternalResource/bootstrap/less'));
    gulp.src('bower_components/bootstrap/dist/fonts/**/*.*').pipe(gulp.dest('./ExternalResource/bootstrap/fonts'));
});

gulp.task('copy-bootstrap-js', function () {
    gulp.src('bower_components/bootstrap/dist/js/bootstrap.js').pipe(gulp.dest('./scripts'));
});