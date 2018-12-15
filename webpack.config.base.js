const path = require('path')

const PATHS = {
  build: path.join(__dirname, './dist'),
  modules: path.join(__dirname, 'node_modules'),
}

module.exports = {
  entry: ['@babel/polyfill', './src/index'],

  output: {
    path: PATHS.build,
    filename: './bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.svg$/,
        loader: 'babel-loader!svg-react-loader',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        exclude: /node_modules/,
        loader: 'file-loader?limit=8192',
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [],
  node: { fs: 'empty' },
  resolve: {
    extensions: ['.js', '.scss', '.css'],
    alias: {
      // Allows us to pull in svgs via symlink
      react: path.join(__dirname, 'node_modules/react'),
    },
  },
}
