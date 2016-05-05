/// <binding BeforeBuild='copy-bootstrap' ProjectOpened='copy-bootstrap' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var destinationDistributionPath = 'Library/Resources';
var destinationSourcePath = 'Library/ExternalSource';
var destinationScriptsPath = destinationDistributionPath + '/scripts';
var destinationStylesPath = destinationDistributionPath + '/styles';
var destinationContentPath = destinationDistributionPath + '/content';

var sourcePath = 'bower_components';
var bootstrapSourcePath = sourcePath + '/bootstrap';
var jquerySourcePath = sourcePath + '/jquery';

gulp.task('default', () =>{
    runSequence('cleanup', ['copy-bootstrap', 'copy-jquery']);
});

gulp.task('cleanup', () => {
    return del([destinationDistributionPath, destinationSourcePath]);
});

gulp.task('copy-bootstrap', () =>{
    return runSequence(['copy-bootstrap-fonts', 'copy-bootstrap-less', 'copy-bootstrap-js']);
});

gulp.task('copy-bootstrap-fonts', () => {
    return gulp.src(bootstrapSourcePath + '/dist/fonts/**/*.*').pipe(gulp.dest(destinationContentPath + '/bootstrap/fonts'));
});

gulp.task('copy-bootstrap-less', () => {
    return gulp.src(bootstrapSourcePath + '/less/**/*.*').pipe(gulp.dest(destinationSourcePath + '/bootstrap/less'));
});

gulp.task('copy-bootstrap-js', () => {
    return gulp.src(bootstrapSourcePath + '/dist/js/bootstrap.js').pipe(gulp.dest(destinationScriptsPath));
});

gulp.task('copy-jquery', () => {
    return gulp.src(jquerySourcePath + '/dist/jquery.js').pipe(gulp.dest(destinationScriptsPath))
});