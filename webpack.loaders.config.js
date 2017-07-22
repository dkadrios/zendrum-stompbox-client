import path from 'path';

export default [
  {
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: path.join(__dirname, 'src'),
  },
  {
    test: /\.css$/,
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
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader?module&localIdentName=[local]---[hash:base64:5]',
      'postcss-loader',
      'sass-loader',
    ],
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192',
  },
  {
    test: /\.(svg)$/,
    loader: 'file-loader?limit=8192',
  },
];
