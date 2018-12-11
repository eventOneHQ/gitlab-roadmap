const webpack = require('webpack')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader' // inject CSS to page
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function () {
                // post css plugins, can be exported to postcss.config.js
                return [require('precss'), require('autoprefixer')]
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/public'),
    publicPath: '/',
    filename: 'widget.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),
    new Dotenv(),
    new webpack.EnvironmentPlugin({
      GL_RM_INT_CONFIG_BASE_URL: 'http://localhost:3000'
    })
  ]
}
