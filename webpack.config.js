require('dotenv').config()
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
console.log('NODE_ENV: ', NODE_ENV) // eslint-disable-line

module.exports = {
  context: path.resolve('src'),
  entry: ['./scripts/main.js', './style/style.scss'],
  output: {
    path: path.resolve('dist'),
    filename: 'js/bundle-[hash].js',
    publicPath: '/',
  },
  mode: NODE_ENV,
  devtool: 'inline-source-map',
  module: {
    rules: [
      //  Javascript
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['@babel/env', '@babel/react'],
          },
        },
      },

      //  CSS
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },

      // SCSS
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      // HTML
      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      // IMAGES
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: [/fonts/],
        loader: 'file-loader?name=images/[name].[ext]&publicPath=../',
      },

      // FONTS
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        exclude: [/images/],
        loader: 'file-loader?name=fonts/[name].[ext]&publicPath=../',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      allowExternal: true,
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: NODE_ENV !== 'production',
      pngquant: {
        quality: '60-100',
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style-[hash].css',
      chunkFilename: '[id].css',
    }),
    new BrowserSyncPlugin({
      host: '0.0.0.0',
      port: 3000,
      server: {
        baseDir: ['dist'],
      },
      notify: false,
    }),
  ],
  optimization: {
    minimize: NODE_ENV === 'production',
    minimizer:
      NODE_ENV === 'production'
        ? [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              uglifyOptions: {
                sourceMap: true,
                compress: false,
                ecma: 6,
                mangle: true,
              },
            }),
          ]
        : [],
  },
}
