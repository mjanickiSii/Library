/// <binding BeforeBuild='copy-bootstrap' ProjectOpened='copy-bootstrap' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

//var componentsDestinationPath = 'Library/ExternalResource';
var componentsDistributionPath = 'Library/Resources';
var componentsSrcPath = 'Library/ExternalSource';
var bootstrapDestinationPath = '/bootstrap';
//var jqueryDestinationPath = '/jquery';

var componentsSourcePath = 'bower_components';
var bootstrapSourcePath = '/bootstrap';
var jquerySourcePath = '/jquery';

gulp.task('default', () =>{
    runSequence('cleanup', ['copy-jquery']);/*'copy-bootstrap',*/
});

gulp.task('cleanup', () => {
    return del([componentsDistributionPath, componentsSrcPath]);
});

gulp.task('copy-bootstrap', () =>{
    return runSequence(['copy-bootstrap-fonts', 'copy-bootstrap-less', 'copy-bootstrap-js']);
});

gulp.task('copy-bootstrap-fonts', () => {
    return gulp.src(bootstrapSourcePath + '/dist/fonts/**/*.*').pipe(gulp.dest(bootstrapDestinationPath +'/fonts'));
});

gulp.task('copy-bootstrap-less', () => {
    return gulp.src(bootstrapSourcePath + '/less/**/*.*').pipe(gulp.dest(bootstrapDestinationPath + '/less'));
});

gulp.task('copy-bootstrap-js', () => {
    return gulp.src(bootstrapSourcePath + '/dist/js/bootstrap.js').pipe(gulp.dest(bootstrapDestinationPath +'/scripts'));
});

gulp.task('copy-jquery', () => {
    return gulp.src(componentsSourcePath + jquerySourcePath + '/dist/jquery.js').pipe(gulp.dest(componentsDistributionPath + '/scripts'))
});