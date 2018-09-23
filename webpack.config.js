const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')

const outputDirectory = 'dist'

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      favicon: './src/client/favicon.ico',
    }),
  ],
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/': 'http://localhost:8080',
    },
  },
}
