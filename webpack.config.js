
var path = require('path');

module.exports = {
  entry: {
    app: './src/scripts/main.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: './dist'
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  }
};