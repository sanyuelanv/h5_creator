// dev-server.js
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const childProcess = require('child_process')
const {
  netWork
} = require('../config.json')
let cmd
switch (process.platform) {
  case 'wind32':
    cmd = 'start'
    break
  case 'linux':
    cmd = 'xdg-open'
    break
  case 'darwin':
    cmd = 'open'
    break
}

const app = express()
// 配置开发 IP & host
const {
  ip,
  host
} = netWork

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

module.exports = app.listen(host, function (err, next) {
  if (err) {
    // console.error(err)
    return next('服务器启动错误')
  }
  childProcess.exec(`${cmd} http://${ip}:${host}/`)
  console.log(`启动服务：http://${ip}:${host}/`)
})
