import path from 'path';
import webpack from 'webpack';
import loaders from './webpack.loaders.config';

const PATHS = {
  build: path.join(__dirname, './dist'),
};

export default {
  devtool: 'source-map',
  entry: [
    './src/index',
  ],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
