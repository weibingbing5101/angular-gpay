/*
 * @file 静态代码检查
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
//import globalConfig from '../config/global';

import lintConfig from '../config/lint';


var configObj = {
  useEslintrc: false,
  globals:{
      "jQuery": true,
      "$": true,
      "angular": true
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      //"jsx": true,
      "experimentalObjectRestSpread": true,
      "modules": true
    }
  },
  "extends": "eslint:recommended",
  // "rules": {},// 自定义规则 注释 上面的txtends
  // 设置运行环境为浏览器 #http://eslint.org/docs/user-guide/configuring#specifying-environments
  envs: [
    'browser',
    'node',
    'commonjs',
    'es6',
    'amd'
  ]
}

gulp.task('lint', function() {
  return gulp.src(lintConfig.src)
    .pipe(eslint(configObj))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/*gulp.task('lint:concat', function() {
  return gulp.src(config.devSrc)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(config.dest))
    .pipe(eslint(configObj))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});*/