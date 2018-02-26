const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  routers
} = require('./config.json')
const devScript = [
  'babel-polyfill',
  path.resolve(__dirname, './dev/app/globals/flexible.js'),
  'react',
  'react-dom',
  path.resolve(__dirname, './dev/app/globals/app.js')
]

const webpackConfig = {
  entry: {
    'globals': devScript
  },
  output: {
    path: path.resolve(__dirname, 'build/src'),
    filename: '[name].js',
    publicPath: 'src/',
    chunkFilename: '[name].[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'dev')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader?minimize&modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader']
      }),
      include: [path.resolve(__dirname, 'dev')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: 'file-loader?name=[name].[ext]',
      include: [path.resolve(__dirname, 'dev')],
      exclude: [nodeModuleDir]
    }

    ]
  },
  node: { Buffer: false },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true
      }
    }),
    // 把React 定义为全局变量
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 修改CSS路径
    new ExtractTextPlugin({
      filename: (getPath) => {
        return getPath(path.join('[name].css')).replace('css/js', 'css')
      },
      allChunks: true
    })
  ]
}
routers.map((item, index) => {
  const {
    name,
    template
  } = item
  // 每个页面使用一个entry配置
  const routerScript = [path.resolve(__dirname, `./dev/app/router/${template}/index.js`)]
  const plugin = new HtmlWebpackPlugin({
    filename: `../${template}.html`,
    title: name,
    template: './dev/app/globals/index.html',
    inject: true,
    minify: {
      collapseWhitespace: true,
      conservativeCollapse: true
    },
    chunks: ['globals', template]
  })
  webpackConfig.entry[template] = routerScript
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
