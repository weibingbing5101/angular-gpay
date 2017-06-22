var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');

import globalConfig from './config/global';
const basePath = globalConfig.basePath;

config.output.publicPath = '/';

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('dev'),
      'DEBUG': true
    }
  })
]);



module.exports = config;
