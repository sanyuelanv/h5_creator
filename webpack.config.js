var path = require('path')
var webpack = require('webpack')
var node_module_dir = path.resolve(__dirname, 'node_module')

var webpackConfig = {
  entry:{},
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  plugins: [
    // 能在所有JS模块里面读取“__DEV__”这个值
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV || 'true'))
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
  ],
  devtool:'eval-cheap-module-source-map',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        include: [path.resolve(__dirname, 'dev')],
        exclude: [node_module_dir],
      },
      {
        test: /\.css$/,
        use: [ "style-loader", 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', "postcss-loader" ],
        include: [ path.resolve( __dirname, 'dev' ) ],
        exclude: [ node_module_dir ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ],
        include: [ path.resolve( __dirname, 'dev' ) ],
        exclude: [ node_module_dir ],
      }
    ]
  },
}

module.exports = webpackConfig