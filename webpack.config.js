const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');


module.exports = {
  // context means from where to start
  context: path.resolve(__dirname, './client'),
  // entry point of the file
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'app.bundle.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader','eslint-loader']},
      {test: /\.jsx?$/, exclude: /node_modules/,loader: 'babel-loader'},
    ]
  },
  plugins: [
    extractCSS,
    extractLESS
  ]
}
