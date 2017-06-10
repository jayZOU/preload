var gulp       = require('gulp'),
    rollup     = require('gulp-rollup'),
    pump       = require('pump'),
    babel      = require('gulp-babel'),
    uglify     = require('gulp-uglify');

gulp.task('es', function() {
  gulp.src('./src/*.js')
    // transform the files here. 
    .pipe(
    	rollup({
	      entry: ['./src/preload.js', './src/imageLoad.js', './src/cssLoad.js', './src/fontLoad.js'],
	      moduleName: ['preload', 'imageLoad', 'cssLoad', 'fontLoad'],
	    })
    )
    .pipe(gulp.dest('./dist/'));
});

gulp.task('cjs', function() {
  gulp.src('./src/*.js')
    // transform the files here. 
    .pipe(
    	rollup({
	      entry: ['./src/preload.js', './src/imageLoad.js', './src/cssLoad.js', './src/fontLoad.js'],
	      moduleName: ['preload', 'imageLoad', 'cssLoad', 'fontLoad'],
	      format: 'cjs',
	    })
    )
    .pipe(gulp.dest('./dist/cjs/'));
});

gulp.task('global', function() {
  gulp.src('./src/*.js')
    // transform the files here. 
    .pipe(
    	rollup({
	      entry: ['./src/preload.js', './src/imageLoad.js', './src/cssLoad.js', './src/fontLoad.js'],
	      moduleName: ['preload', 'imageLoad', 'cssLoad', 'fontLoad'],
	      format: 'iife',
	    })
    )

    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/iife/'));
});

gulp.task('umd', function() {
  gulp.src('./src/*.js')
    // transform the files here. 
    .pipe(
    	rollup({
	      entry: ['./src/preload.js', './src/imageLoad.js', './src/cssLoad.js', './src/fontLoad.js'],
	      moduleName: ['preload', 'imageLoad', 'cssLoad', 'fontLoad'],
	      format: 'umd',
	    })
    )
    .pipe(gulp.dest('./dist/umd/'));
});

// gulp.task('minifile', function() {
//   gulp.src(['./dist/**/*.js', '!./dist/*.js'])
//       // .pipe(babel({
//       //     presets: ['es2015']
//       //   }))
//         .pipe(uglify())
//         .pipe(gulp.dest('./dist'));
// });

gulp.task('minifile', function (cb) {
  pump([
        gulp.src(['./dist/iife/*.js']),
        uglify(),
        gulp.dest('./dist/iife')
    ],
    cb
  );
});


gulp.task('dev', function () {
	gulp.watch('./src/*.js', ['es', 'cjs', 'global', 'umd'])

})
// gulp.task('default', ['es-uglify', 'cjs-uglify', 'global-uglify', 'umd-uglify']);
