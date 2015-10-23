// generated on 2015-08-15 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import server from 'gulp-develop-server';

const $ = gulpLoadPlugins();

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format())
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', () => {
    lint('src/**/**/*.js');
});

gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('clean', del.bind(null, []));

gulp.task('serve', [], () => {
    server.listen({

    env : {
        DEBUG : 'test'
    },

    path : './index.js',

    });

    gulp.watch('./src/**/**/**/*.js').on('change', function(err){
        server.restart();
    });
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
