/* eslint-disable no-var */

var path = require('path');
var webpack = require('webpack');
var rules = require('./webpack.config.rules');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    }),
  ],
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
};
