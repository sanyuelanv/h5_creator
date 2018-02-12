// dev-server.js
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const { routers, consoleConfig, netWork } = require('../config.json')
const app = express()
// 配置开发 IP & host
const { ip, host } = netWork
// 开发内置 console ／ polyfill ／ flexible / 全局JS ／ hotMiddle
const devScript = [
  'babel-polyfill',
  path.resolve(__dirname, './tools/console.js'),
  path.resolve(__dirname, './tools/flexible.js'),
  path.resolve(__dirname, './app/app.js'),
  'webpack-hot-middleware/client?reload=true'
]
// webpack entry&plugins 配置
webpackConfig.entry = {}
routers.map((item, index) => {
  const { name, template } = item
  // 每个页面使用一个entry配置
  const routerScript = []
  devScript.map((js, i) => {
    // 倒数第一个之前加入当前页面的JS
    if (i === devScript.length - 2) {
      const script = path.resolve(__dirname, `./app/router/${template}/${template}.js`)
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
    template: './dev/tools/template.html',
    inject: true,
    chunks: [template]
  })
  webpackConfig.entry[template] = routerScript
  webpackConfig.plugins.push(plugin)
})
const compiler = webpack(webpackConfig)
// 服务器配置
app.use(WebpackDevMiddleware(compiler, {
  publicPath: `http://${ip}:${host}/`,
  stats: {
    colors: true,
    chunks: false
  },
  progress: true,
  inline: true,
  hot: true
}))
app.use(WebpackHotMiddleware(compiler))

// 服务器路由配置
app.get('/:pagename?', function (req, res, next) {
  const pagename = req.params.pagename + '.html' || 'index.html'
  const filepath = path.join(compiler.outputPath, pagename)
  // 使用webpack提供的outputFileSystem
  compiler.outputFileSystem.readFile(filepath, function (err, result) {
    if (err) {
      // console.error(err)
      // return next('没有找到相关的路径')
    }
    // 发送获取到的页面
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

module.exports = app.listen(8080, function (err, next) {
  if (err) {
    // console.error(err)
    return next('服务器启动错误')
  }
  console.log(`启动服务：http://${ip}:${host}/`)
})
