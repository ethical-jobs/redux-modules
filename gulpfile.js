const gulp = require('gulp');
const rollup = require('rollup');
const globby = require('globby');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const babelrc = require('babelrc-rollup').default;
const pkg = require('./package.json');

gulp.task('build', () => {

  const patterns = ['src/index.js','!src/**/__tests__/**/*'];

  globby(patterns).then(paths => paths.forEach(path => {
    return rollup.rollup({
      entry: path,
      plugins: [
        nodeResolve({
          jsnext: true,
          main: true,
        }),
        commonjs(),    
        babel(babelrc()),
      ],
      external: Object.keys(pkg.dependencies),
    })
    .then(bundle => {
      bundle.write({
        dest: 'lib/es/index.js',
        format: 'es',
      });
      bundle.write({
        globals: {
          'immutable': 'Immutable',
          'redux-promise-middleware': 'promiseMiddleware',
          'ethical-jobs-sdk': 'ethicalJobsSdk',
          'ethical-jobs-redux': 'ethicalJobsRedux',
          'reselect': 'reselect',
        },
        dest: 'lib/umd/index.js',
        format: 'umd',
        moduleName: 'ethical-jobs-redux-modules',
      });
    });
  }));
});

gulp.task('build:watch', () => {
  gulp.watch('src/**/*.js', ['build']);
});
