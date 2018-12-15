const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const template = require('html-webpack-template')
const baseConfig = require('./webpack.config.base.js')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  cache: false,

  devServer: {
    port: 8080,
    historyApiFallback: true,
    disableHostCheck: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: true,
              localIdentName: '[name]--[local]--[hash:base64:8]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '',
      favicon: './build-assets/favicon.ico',
      inject: false,
      template,
      // headHtmlSnippet: `
      // <link href="styles/fonts.css">`,
      bodyHtmlSnippet: `
        <div id="react-container"></div>
        <script>
          window.ENV_CONFIG = { apiHost: 'http://127.0.0.1:3002' }
        </script>
      `,
    }),
    new webpack.DefinePlugin({
      __DEV__: true,
      __TEST__: JSON.stringify(JSON.parse(process.env.BUILD_TEST || 'false')),
    }),
  ],
})
