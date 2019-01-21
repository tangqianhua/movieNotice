const Koa = require('koa');
const mongoose = require('mongoose')
const views = require('koa-views');
const { resolve } = require('path');
const { connect, initSchema } = require('./db/index.js')

const app = new Koa();
;(async () => {
  /*
    链接数据库
  */
  await connect()
  /*
  初始化schema
  */
 initSchema()
 /*
    利用子进程 爬虫 获取视频列表
  */
  require('./tasks/movieListChildProcess')
  // require('./tasks/videoDetailCholdprocess')
  app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
  }));

  app.use(async (ctx, next) => {
    await ctx.render('index', {
      name: 'bluescurry'
    });
  })

  app.listen(3000);
  })()