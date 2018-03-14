import path from 'path'
import webpack from 'webpack' // eslint-disable-line

const PATHS = {
  build: path.join(__dirname, './dist'),
  modules: path.join(__dirname, 'node_modules'),
}

export default {
  devtool: 'source-map',
  entry: ['./src/index'],

  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(svg)$/,
        loader: 'file-loader?limit=8192',
      },
      {
        test: /\.css$/,
        // Anything in third-party should not be hashed
        exclude: /third-party/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /third-party.*\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: '[local]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?module&localIdentName=[local]---[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      __TEST__: JSON.stringify(JSON.parse(process.env.BUILD_TEST || 'false')),
      __API__: JSON.stringify('http://localhost:3002'),
      __BETA_TESTERS__: JSON.stringify(['ByU2inRSz', 'S1sWNadzM', 'Bkp7HyqqZW', 'SJzs8r-BG']),
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.css'],
  },
}
