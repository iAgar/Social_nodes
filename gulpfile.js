const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const del = require('del');

gulp.task('css', function(done){
    console.log('Minifying CSS');
    gulp.src('./assets/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))

    return gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js', function(done){
    console.log('Minifying JS...');
    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
})

gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'js'), function(done){
    console.log('building assets');
    done();
})