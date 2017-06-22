import gulp from 'gulp';

gulp.task('component-package', [], function(){
	return gulp.src(blankTemplates)
    .pipe(template(tplData))
    .pipe(rename((path) => {
      path.basename = path.basename.replace('index', appname);
    }))
    .pipe(gulp.dest(destPath));
});