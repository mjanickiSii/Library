/// <binding BeforeBuild='default' ProjectOpened='default' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var less = require('gulp-less');

var destinationDistributionPath = 'Library/Resources';
var destinationSourcePath = 'Library/ExternalSource';
var destinationScriptsPath = destinationDistributionPath + '/scripts';
var destinationStylesPath = destinationDistributionPath + '/styles';
var destinationContentPath = destinationDistributionPath + '/content';

var contentPath = "Library/Content";
var lessContentPath = contentPath + '/**/*.less';

var sourcePath = 'bower_components';
var bootstrapSourcePath = sourcePath + '/bootstrap';
var jquerySourcePath = sourcePath + '/jquery';
var reactSourcePath = sourcePath + '/react';

gulp.task('watch-less', () =>{
    return watch(lessContentPath, gulp.series('compile-less'));
});

gulp.task('compile-less', () => {
    return gulp.src(lessContentPath).
        pipe(less()).
        pipe(gulp.dest(destinationStylesPath));
});

gulp.task('cleanup', function(){
    return del([destinationDistributionPath, destinationSourcePath]);
});

gulp.task('copy-bootstrap-fonts', () => {
    return gulp.src(bootstrapSourcePath + '/dist/fonts/**/*.*').
        pipe(gulp.dest(destinationContentPath + '/bootstrap/fonts'));
});

gulp.task('copy-bootstrap-less', () => {
    return gulp.src(bootstrapSourcePath + '/less/**/*.*').
        pipe(gulp.dest(destinationSourcePath + '/bootstrap/less'));
});

gulp.task('copy-bootstrap-css', () => {
    return gulp.src(bootstrapSourcePath + '/dist/css/bootstrap.css').
        pipe(gulp.dest(destinationStylesPath));
});

gulp.task('copy-bootstrap-js', () => {
    return gulp.src(bootstrapSourcePath + '/dist/js/bootstrap.js').
        pipe(gulp.dest(destinationScriptsPath));
});

gulp.task('copy-jquery', () => {
    return gulp.src(jquerySourcePath + '/dist/jquery.js').
        pipe(gulp.dest(destinationScriptsPath))
});

gulp.task('copy-react', () => {
    return gulp.src([reactSourcePath + '/react.js', reactSourcePath + '/react-dom.js']).
        pipe(gulp.dest(destinationScriptsPath))
});

gulp.task('copy-bootstrap', gulp.parallel('copy-bootstrap-fonts', 'copy-bootstrap-css', 'copy-bootstrap-less', 'copy-bootstrap-js'));

gulp.task('start-dev', gulp.series('cleanup', gulp.parallel('copy-bootstrap', 'copy-jquery','copy-react'), gulp.parallel('compile-less')));//, 'watch-less'

gulp.task('default', gulp.series('start-dev'));
