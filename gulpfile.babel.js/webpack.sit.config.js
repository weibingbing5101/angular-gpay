var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


config.plugins = config.plugins.concat([

  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }

  }),

  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('sit'),
      'DEBUG': false
    }
  })


]);


module.exports = config;
