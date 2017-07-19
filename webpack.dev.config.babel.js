import path from 'path';
import webpack from 'webpack';
import loaders from './webpack.loaders.config';

export default {
  devtool: 'source-map',
  entry: [
    // 'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    }),
  ],
  module: {
    loaders: [...loaders],
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
};
