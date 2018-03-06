import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import path from 'path'

const webpackConfig = {
  context: path.resolve('src'),
  entry: ['./index.html', './scripts/main.js', './style/style.scss'],
  output: {
    path: path.resolve('dist'),
    filename: 'js/bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [],
  },
  plugins: [],
}

webpackConfig.plugins.push(new CleanWebpackPlugin(['dist']))

webpackConfig.plugins.push(new ExtractTextPlugin('css/[name].css'))

webpackConfig.module.rules.push({
  test: /\.html$/,
  loader: 'file-loader?name=[name].[ext]',
})

webpackConfig.module.rules.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader!postcss-loader!sass-loader',
  }),
})

webpackConfig.module.rules.push({
  test: /\.css$/,
  loaders: ['style-loader', 'css-loader'],
})

webpackConfig.module.rules.push({
  test: /\.(jpe?g|png|gif|svg)$/,
  exclude: [/fonts/],
  loader: 'file-loader?name=images/[name].[ext]',
})

webpackConfig.module.rules.push({
  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  exclude: [/images/],
  loader: 'file-loader?name=fonts/[name].[ext]',
})

module.exports = webpackConfig
