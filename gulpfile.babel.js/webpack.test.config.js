var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config');
var distPath = path.resolve(__dirname, '../dist');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;


config.output = {
  filename: './js/[name].[hash].js',
  publicPath: '',
  path:distPath
};

config.plugins = config.plugins.concat([

  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require', 'angular']
    }

  }),

  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('test'),
      'DEBUG': false
    }
  })


]);


module.exports = config;
