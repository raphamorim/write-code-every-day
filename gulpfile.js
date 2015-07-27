var gulp        = require("gulp"),
	sass        = require("gulp-sass");

/* Compiling SASS files so far */
gulp.task("build-css", function() {
	gulp.src([ "./src/sass/**/*.sass", "./src/sass/**/*.scss" ])
	   .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
	   .pipe(gulp.dest("./assets/css/"));	   
});