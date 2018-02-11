// dev-server.js
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')
const {routers} = require("./router.json")
const app = express()
// 配置开发 IP & host
const ip = "localhost"
const host = "8080"
// 开发内置 console ／ polyfill ／ flexible ／ hotMiddle
const devScript = [
    "babel-polyfill",
    path.resolve(__dirname, './dev/tools/console.js'),
    path.resolve(__dirname, './dev/tools/flexible.js'),
    'webpack-hot-middleware/client?reload=true'
]
// webpack entry&plugins 配置
webpackConfig.entry = {}
routers.map((item,index)=>{
    let { name,template } = item
    //每个页面使用一个entry配置
    let routerScript = []
    devScript.map((js,i)=>{
        // 倒数第一个之前加入当前页面的JS
        if( i == devScript.length-2  ){
            let script = path.resolve(__dirname, `./dev/router/${template}/${template}.js`)
            routerScript.push(script)
        }
        routerScript.push(js)
    })
    console.log(routerScript)
    const plugin = new HtmlWebpackPlugin({
        filename:`${template}.html`,
        title:name,
        template:`./dev/router/${template}/${template}.html`,
        inject: true,
        chunks: [template]
    })
    webpackConfig.entry[template] = routerScript
    webpackConfig.plugins.push(plugin)
})
let compiler = webpack(webpackConfig)
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
    let pagename = req.params.pagename + '.html' || "index.html"
    let filepath = path.join(compiler.outputPath, pagename)
    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function (err, result) {
        if (err) { 
            console.error(err)
            return next('没有找到相关的路径') 
        }
        // 发送获取到的页面
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
    })
})

module.exports = app.listen(8080, function (err) {
    if (err) {
        return next('服务器启动错误')
        return
    }

    console.log(`启动服务：http://${ip}:${host}/`)
})