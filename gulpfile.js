const gulp         = require('gulp');
const browserSync  = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./www"
    });

    gulp.watch("www/scss/*.scss", ['sass']);
    gulp.watch("www/*.html").on('change', browserSync.reload);
    gulp.watch("www/projects/*.html").on('change', browserSync.reload);
	gulp.watch("www/jsDev/*.js", ['babel']);
	gulp.watch("www/jsDev/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("www/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("www/css"))
        .pipe(browserSync.stream());
});

gulp.task('babel', () => {
    return gulp.src('www/jsDev/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('www/js'));
});

gulp.task('default', ['serve']);
