var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');
var distPath = path.resolve(__dirname, '../dist');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


config.plugins = config.plugins.concat([

  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    },
    compress:{
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  }),

  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('prod'),
      'DEBUG': false
    }
  })


]);


module.exports = config;
