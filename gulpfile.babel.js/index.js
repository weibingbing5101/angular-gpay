'use strict';

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import sync from 'run-sequence';
import gulpSequence from 'gulp-sequence';
import rename from 'gulp-rename';
import removeFiles from 'gulp-remove-files';
import template from 'gulp-template';
import del from 'del';
import fs from 'fs';
import yargs from 'yargs';
import lodash from 'lodash';
import uglify from 'gulp-uglify';
import gutil from 'gulp-util';
import serve from 'browser-sync';
import webpackDevMiddelware from 'webpack-dev-middleware';
import webpachHotMiddelware from 'webpack-hot-middleware';
import colorsSupported from 'supports-color';
import minimist from 'minimist';
import tplHelper from './tools/tpl.helper';
 
import globalConfig from './config/global';
  
import generatorSet from './tools/generator.set';  
import generatorFactory from "./tools/generator.factory";
  
require('./tasks/lint');  

require('./tasks/component');

require('./tasks/static-move');
  
const basePath = globalConfig.basePath;
const appPath = globalConfig.appPath;

// helper method for resolving paths
let resolveToApp = (glob = '') => {
  return path.join(basePath, glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
  return path.join(basePath, 'components', glob); // app/components/{glob}
};

let commonTplPath = path.join(basePath, '../../generator/common');

let configDirPath = path.join(basePath, '../../generator.conf');

// map of all paths
let paths = {
  js: resolveToComponents('**/*!(.spec.js).js'), // exclude spec files
  styl: resolveToApp('**/*.styl'), // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(basePath, 'index.html')
  ],
  entry: globalConfig.basePath,
  output: basePath,
};



// use webpack.config.js to build modules
gulp.task('webpack', (cb) => {

  var options = minimist(
    process.argv.slice(2), {
      string: ['app'],
      default: {
        app: path.resolve(__dirname, 'dist')
      }
    }
  );
  process.env.APP = options.app;

  let configPath = './webpack.'+process.env.NODE_ENV+'.config';

  console.log(configPath)

  let config = require(configPath);


  webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true
    }));

    cb();
  });
});

gulp.task('html-rename', function(){
  return gulp.src(globalConfig.entryHTMLDestPath)
    .pipe(rename((pathObj) => {
      pathObj.basename = 'business-new';
    }))
    .pipe(gulp.dest(globalConfig.destPath));
})

gulp.task('favicon-move', function(){
  return gulp.src(path.join(globalConfig.appPath, 'favicon.ico') )
    .pipe(gulp.dest(globalConfig.destPath));
})

gulp.task('html-remove', function(cb) {
  return gulp.src(globalConfig.entryHTMLDestPath)
    .pipe(removeFiles());
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');

  var entry = config.entry;

  Object.keys(entry).forEach(function(key){
    var entryPath = entry[key];
    entry[key] = [
      'webpack-hot-middleware/client?reload=true',
      entryPath
    ]
  });

  var compiler = webpack(config);
  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {
      baseDir: basePath
    },
    middleware: [
      webpackDevMiddelware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpachHotMiddelware(compiler)
    ]
  });
});

gulp.task('watch', ['serve']);


gulp.task('default', ['serve']);
gulp.task('dev', ['serve']);

gulp.task('dev', ['server']);

gulp.task('clean', function(cb) {
  return del(globalConfig.destPath, cb);
});

gulp.task('test', function(cb) {
  process.env.NODE_ENV = 'test';
  // 使用gulp-sequence，保证任务需要顺序执行时不出问题
  gulpSequence(
    'clean',
    'static-move',
    'webpack',
    'favicon-move',
    //'html-rename',
    //'html-remove',
    //'reload',
    cb
  );
});

gulp.task('sit', function(cb) {
  process.env.NODE_ENV = 'sit';
  // 使用gulp-sequence，保证任务需要顺序执行时不出问题
  gulpSequence(
    'clean',
    'static-move',
    'webpack',
    'favicon-move',
    //'html-rename',
    //'html-remove',
    //'reload',
    cb
  );
});

gulp.task('prod', function(cb) {
  process.env.NODE_ENV = 'prod';
  // 使用gulp-sequence，保证任务需要顺序执行时不出问题
  gulpSequence(
    'clean',
    'static-move',
    'webpack',
    'favicon-move',
    //'html-rename',
    //'html-remove',
    //'reload',
    cb
  );
});

gulp.task('sandbox', function(cb) {
  process.env.NODE_ENV = 'sandbox';
  gulpSequence(
    'clean',
    'static-move',
    'webpack',
    'favicon-move',
    cb
  );
});
