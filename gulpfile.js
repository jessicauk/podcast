require('any-promise/register')('bluebird');
var gulp = require('gulp'),
	inject = require('gulp-inject'),
	jade = require('gulp-jade'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	stylus = require('gulp-stylus');


//tarea que injecta los scripts en el index
gulp.task('index', function () {
	var target = gulp.src('index.html');
	var sources = gulp.src(['assets/build/*.js'], {read: false});
	return target.pipe(inject(sources))
		.pipe(gulp.dest('/index.html'))
});

//tarea que concatena y minifica los scripts de la aplicacion
gulp.task('js', function () {
	gulp.src('assets/js/**/*.js')
	.pipe(concat('compilacion.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/build/'))
});

//tarea que compila de .style preprocesador a .css
gulp.task('css', function () {
  return gulp.src('assets/css/stylus/import.styl')
    .pipe(stylus({compress:true}))
    .pipe(gulp.dest('assets/build/'))
});

//tarea que compila .jade a .html
gulp.task('templates', function () {
	return gulp.src('assets/lib/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('assets/templates/'))
});

//tarea que se ejecuta al tener cambios en los archivos
gulp.task('watch', function() {
	gulp.watch('assets/js/**/*.js',['js']);
	gulp.watch('assets/css/stylus/*.styl', ['css']);
	gulp.watch('assets/lib/*.jade', ['templates']);
});

gulp.task('trabaja', ['watch']);