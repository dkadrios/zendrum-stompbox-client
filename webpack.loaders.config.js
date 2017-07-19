import path from 'path';

export default [
  {
    test: /\.js$/,
    loaders: ['babel-loader'],
    include: path.join(__dirname, 'src'),
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
];
