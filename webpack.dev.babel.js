/* eslint import/no-extraneous-dependencies: ["error", {}] */
import merge from 'webpack-merge'
import common from './webpack.config.babel'

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    host: '0.0.0.0',
  },
})
