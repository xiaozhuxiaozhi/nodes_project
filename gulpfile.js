var gulp = require('gulp');
var sass = require('gulp-sass');
var filter =require('gulp-filter');
var browserSync =require('browser-sync');
var imagemin =require('gulp-imagemin');
var reload =browserSync.reload;
gulp.task('sass', function() {
  //将你的默认的任务代码放在这
  // return sass('public/sass/*.scss',{style:'compressed'})
  // .pipe(gulp.dest('dist/css'))
  // .pipe(reload({
  // 	stream:true
  // }));

  return gulp.src('public/sass/*.scss')
         .pipe(sass({sourcemap:true}))
         .pipe(gulp.dest('dist/css'))
         .pipe(filter('**/*.css'))
         .pipe(reload({stream:true}));
});

gulp.task('scripts',function(){
	return gulp.src('public/js/*.js')
	.pipe(gulp.dest('dist/js'));
});

gulp.task('images',function(){
	return gulp.src('public/images/**/*')
	.pipe(imagemin({optimizationLevel:3, progressive:true,interlaced:true}))
	.pipe(gulp.dest('dist/src/img'));
});

gulp.task('server',['sass','scripts','images'],function(){
	browserSync({
		server:{
			baseDir:'./'
		},
		port:8000
	});
	gulp.watch(['*.html','js/**/*.js'],{
		cwd:'./'
	},reload);

	gulp.watch('public/sass/*.scss',['sass']);

	gulp.watch('public/js/*.js',['scripts']);

	gulp.watch('public/images/**/*',['images']);
});