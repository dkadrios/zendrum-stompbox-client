const webpackBundleAnalyzer = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const prodConfig = require('./webpack.config.prod.js')

module.exports = merge(prodConfig, {
  plugins: [
    new webpackBundleAnalyzer.BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
})
