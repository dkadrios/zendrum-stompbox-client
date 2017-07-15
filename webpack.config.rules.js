/* eslint-disable no-var */

var path = require('path');

const rules = [
  {
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: path.join(__dirname, 'src'),
  },
  {
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192',
  },
];

module.exports = rules;
