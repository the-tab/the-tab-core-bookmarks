const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './src',
  output: {
    library: 'the-tab-core-bookmarks',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'the-tab-core-bookmarks.js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
      }, {
        test: /\.less/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }));
  config.output.libraryTarget = 'commonjs';
}

module.exports = config;
