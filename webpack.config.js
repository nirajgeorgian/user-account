const path = require('path')
const webpack = require('webpack')

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
      {test: /\.css$/, use: [ 'style-loader', 'css-loader' ]},
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader','eslint-loader']},
      {test: /\.jsx?$/, exclude: /node_modules/,loader: 'babel-loader'},
    ]
  }
}
