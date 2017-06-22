var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

import globalConfig from './config/global';

const appPath = globalConfig.appPath;
const basePath = globalConfig.basePath;
const rootPath = globalConfig.rootPath;
const mobilePath = globalConfig.mobilePath;


module.exports = {
  devtool: 'sourcemap',
  output: {
    filename: './js/[name].[hash].js',
    publicPath: '',
    path: globalConfig.destPath,
  },
  entry: {
    pc: path.join(basePath, 'index.js')
    //mobile: path.join(mobilePath, 'index.js')
  },
  module: {
    loaders: [
      // /node_modules(?!\/gy\-ng)/
      { test: /\.js$/, exclude: [/app\/lib/, /node_modules/ ], loader: 'ng-annotate!babel' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: 'style!css' },
      // IMAGE
      {
        test: /.(gif|jpg|png)$/,
        loader: 'file?name=images/img-[hash].[ext]'
      },
      // FONT
      {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" }
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      angular: 'gn-angular'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(appPath, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      chunks: ['pc'], 
      hash: true
    }),

    /*new HtmlWebpackPlugin({
      template: path.join(appPath, 'mobile.html'),
      filename: 'mobile.html',
      inject: 'body',
      chunks: ['mobile'], 
      hash: true
    }),*/

	  new webpack.ProvidePlugin({
		  $: "jquery",
		  jQuery: "jquery"
	  }),

    /*new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })*/
  ]
};
