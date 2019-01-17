var path = require('path')
var staticCache = require('koa-static-cache')
var Koa = require('koa')


var app = new Koa()

app.use(staticCache(path.resolve(__dirname, 'public')))

app.listen(3333)