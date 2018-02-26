const path = require('path')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  routers,
  consoleConfig
} = require('./config.json')
const webpackConfig = {
  entry: {},
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
    // 把React 定义为全局变量
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDom: 'react-dom'
    })
  ],
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'dev')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
      include: [path.resolve(__dirname, 'dev')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
      include: [path.resolve(__dirname, 'dev')],
      exclude: [nodeModuleDir]
    }
    ]
  }
}
// 开发内置 polyfill /console ／ flexible / 全局JS ／ hotMiddle
const devScript = [
  'babel-polyfill',
  path.resolve(__dirname, './dev/tools/console.js'),
  path.resolve(__dirname, './dev/app/globals/flexible.js'),
  'react',
  'react-dom',
  path.resolve(__dirname, './dev/app/globals/app.js'),
  'webpack-hot-middleware/client?reload=true'
]

// webpack entry&plugins 配置
routers.map((item, index) => {
  const {
    name,
    template
  } = item
  // 每个页面使用一个entry配置
  const routerScript = []
  devScript.map((js, i) => {
    // 倒数第一个之前加入当前页面的JS
    if (i === devScript.length - 1) {
      const script = path.resolve(__dirname, `./dev/app/router/${template}/index.js`)
      routerScript.push(script)
    }
    // 开启了console才把他加进去
    if (!consoleConfig && i === 1) {
      return
    }
    routerScript.push(js)
  })
  const plugin = new HtmlWebpackPlugin({
    filename: `${template}.html`,
    title: name,
    template: './dev/app/globals/index.html',
    inject: true,
    chunks: [template]
  })
  console.log(routerScript)
  webpackConfig.entry[template] = routerScript
  webpackConfig.plugins.push(plugin)
})
module.exports = webpackConfig
