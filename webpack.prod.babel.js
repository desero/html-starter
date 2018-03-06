/* eslint import/no-extraneous-dependencies: ["error", {}] */
import merge from 'webpack-merge'
import webpack from 'webpack'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import common from './webpack.config.babel'

module.exports = merge(common, {
  devtool: 'none',
  plugins: [
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
})
